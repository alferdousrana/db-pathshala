/* ============================================================
 * Store  — all learning progress, saved on this device (localStorage)
 * Sync   — optional Firebase (Google sign-in + Firestore) so progress
 *          follows you between mobile and web. Offline-first: the app
 *          always works locally; when online + signed in, it merges.
 * ============================================================ */
(function () {
  const KEY = 'dbp-state-v1';

  const blank = () => ({
    done: {},      // topicKey -> timestamp first learned
    quiz: {},      // chapterId -> {best,total,attempts,perfect,ts}
    notes: {},     // noteKey -> {text,title?,ts}
    doubts: {},    // id -> {topic,text,ts,resolved,deleted}
    badges: {},    // badgeId -> timestamp
    days: {},      // 'YYYY-MM-DD' -> true (activity days for streak)
    cq: {},        // 'ch1/0' -> {best, ts} self-graded CQ marks
    drafts: {},    // 'ch1/0' -> {text, ts} written answer drafts
    cqt: {},       // 'ch1' | 'mix' -> {best, total, attempts, ts} CQ model tests
    updatedAt: 0
  });

  function today() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function stable(v) {
    if (Array.isArray(v)) return '[' + v.map(stable).join(',') + ']';
    if (v && typeof v === 'object') return '{' + Object.keys(v).sort().map(k => JSON.stringify(k) + ':' + stable(v[k])).join(',') + '}';
    return JSON.stringify(v);
  }

  function load() {
    try { return Object.assign(blank(), JSON.parse(localStorage.getItem(KEY) || '{}')); }
    catch (e) { return blank(); }
  }

  /* Merge two states so nothing learned on any device is lost. */
  function merge(a, b) {
    a = Object.assign(blank(), a || {}); b = Object.assign(blank(), b || {});
    const m = blank();
    const keys = (x, y) => new Set([...Object.keys(x || {}), ...Object.keys(y || {})]);
    for (const k of keys(a.done, b.done)) m.done[k] = Math.min(a.done[k] || Infinity, b.done[k] || Infinity);
    for (const k of keys(a.quiz, b.quiz)) {
      const x = a.quiz[k] || {}, y = b.quiz[k] || {};
      m.quiz[k] = {
        best: Math.max(x.best || 0, y.best || 0),
        total: Math.max(x.total || 0, y.total || 0),
        attempts: Math.max(x.attempts || 0, y.attempts || 0),
        perfect: Math.max(x.perfect || 0, y.perfect || 0),
        ts: Math.max(x.ts || 0, y.ts || 0)
      };
    }
    for (const k of keys(a.notes, b.notes)) {
      const x = a.notes[k], y = b.notes[k];
      m.notes[k] = !x ? y : !y ? x : ((x.ts || 0) >= (y.ts || 0) ? x : y);
    }
    for (const k of keys(a.doubts, b.doubts)) {
      const x = a.doubts[k], y = b.doubts[k];
      m.doubts[k] = !x ? y : !y ? x : ((x.mts || x.ts || 0) >= (y.mts || y.ts || 0) ? x : y);
    }
    for (const k of keys(a.badges, b.badges)) m.badges[k] = Math.min(a.badges[k] || Infinity, b.badges[k] || Infinity);
    for (const k of keys(a.days, b.days)) m.days[k] = true;
    for (const k of keys(a.cq, b.cq)) {
      const x = a.cq[k] || {}, y = b.cq[k] || {};
      m.cq[k] = { best: Math.max(x.best || 0, y.best || 0), ts: Math.max(x.ts || 0, y.ts || 0) };
    }
    for (const k of keys(a.drafts, b.drafts)) {
      const x = a.drafts[k], y = b.drafts[k];
      m.drafts[k] = !x ? y : !y ? x : ((x.ts || 0) >= (y.ts || 0) ? x : y);
    }
    for (const k of keys(a.cqt, b.cqt)) {
      const x = a.cqt[k] || {}, y = b.cqt[k] || {};
      m.cqt[k] = { best: Math.max(x.best || 0, y.best || 0), total: Math.max(x.total || 0, y.total || 0), attempts: Math.max(x.attempts || 0, y.attempts || 0), ts: Math.max(x.ts || 0, y.ts || 0) };
    }
    m.updatedAt = Math.max(a.updatedAt || 0, b.updatedAt || 0);
    return m;
  }

  let state = load();
  const listeners = [];

  const Store = {
    get: () => state,
    today,
    stable,
    merge,
    onChange(fn) { listeners.push(fn); },
    /* local change made by the learner */
    mutate(fn) {
      fn(state);
      state.days[today()] = true;
      state.updatedAt = Date.now();
      localStorage.setItem(KEY, JSON.stringify(state));
      Sync.push();
      listeners.forEach(f => f(false));
    },
    /* replace with merged state (from cloud) */
    replace(next, fromRemote) {
      state = Object.assign(blank(), next);
      localStorage.setItem(KEY, JSON.stringify(state));
      listeners.forEach(f => f(!!fromRemote));
    },
    reset() {
      state = blank();
      localStorage.setItem(KEY, JSON.stringify(state));
      Sync.push(true);
      listeners.forEach(f => f(false));
    }
  };

  /* ---------------- Firebase sync ---------------- */
  const cfg = window.FIREBASE_CONFIG || {};
  const SDK = 'https://www.gstatic.com/firebasejs/10.12.2/';
  const syncListeners = [];
  let unsub = null, timer = null, db = null, auth = null;

  const Sync = {
    enabled: !!(cfg.apiKey && !String(cfg.apiKey).startsWith('PASTE')),
    ready: false,
    user: null,
    status: 'off',            // off | loading | signedout | syncing | synced | offline | error
    error: '',
    onChange(fn) { syncListeners.push(fn); },
    _emit() { syncListeners.forEach(f => f(Sync)); },
    _set(status, err) { Sync.status = status; Sync.error = err || ''; Sync._emit(); },

    async init() {
      if (!Sync.enabled) { Sync._set('off'); return; }
      Sync._set('loading');
      try {
        for (const f of ['firebase-app-compat.js', 'firebase-auth-compat.js', 'firebase-firestore-compat.js']) await loadScript(SDK + f);
        firebase.initializeApp(cfg);
        auth = firebase.auth();
        db = firebase.firestore();
        Sync.ready = true;
        auth.getRedirectResult().catch(e => Sync._set('error', e.message));
        auth.onAuthStateChanged(u => {
          Sync.user = u;
          if (unsub) { unsub(); unsub = null; }
          if (!u) { Sync._set('signedout'); return; }
          Sync._set('syncing');
          unsub = db.collection('users').doc(u.uid).onSnapshot(snap => {
            if (snap.metadata.hasPendingWrites) return;
            const local = Store.get();
            if (!snap.exists) { Sync.push(true); return; }
            let remote = {};
            try { remote = JSON.parse(snap.data().state || '{}'); } catch (e) {}
            const merged = merge(local, remote);
            const mj = stable(merged);
            if (mj !== stable(local)) Store.replace(merged, true);
            if (mj !== stable(Object.assign(blank(), remote))) Sync.push(true);
            else Sync._set(navigator.onLine ? 'synced' : 'offline');
          }, err => Sync._set('error', err.message));
        });
        window.addEventListener('online', () => Sync.user && Sync.push(true));
        window.addEventListener('offline', () => Sync.user && Sync._set('offline'));
      } catch (e) {
        Sync._set('error', 'Firebase load failed — ' + (e && e.message ? e.message : 'offline?'));
      }
    },

    async signIn() {
      if (!Sync.ready) return;
      const p = new firebase.auth.GoogleAuthProvider();
      try { await auth.signInWithPopup(p); }
      catch (e) {
        if (['auth/popup-blocked', 'auth/operation-not-supported-in-this-environment', 'auth/cancelled-popup-request'].includes(e.code)) {
          await auth.signInWithRedirect(p);
        } else if (e.code !== 'auth/popup-closed-by-user') {
          Sync._set('error', e.message);
        }
      }
    },

    async signOut() { if (auth) await auth.signOut(); },

    push(now) {
      if (!Sync.user || !db) return;
      clearTimeout(timer);
      const go = () => {
        Sync._set('syncing');
        db.collection('users').doc(Sync.user.uid).set({
          state: stable(Store.get()),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          name: Sync.user.displayName || ''
        }).then(() => Sync._set(navigator.onLine ? 'synced' : 'offline'))
          .catch(e => Sync._set('error', e.message));
      };
      if (now) go(); else timer = setTimeout(go, 1200);
    }
  };

  function loadScript(src) {
    return new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = src; s.onload = res; s.onerror = () => rej(new Error('cannot load ' + src));
      document.head.appendChild(s);
    });
  }

  window.Store = Store;
  window.Sync = Sync;
})();

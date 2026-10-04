/* ============================================================
 * Database Pathshala — main app
 * ============================================================ */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const CH = window.CHAPTERS;
  CH.forEach(c => { c.cq = (window.CQ || {})[c.id] || []; });
  const cqByKey = k => { const [cid, i] = k.split('/'); const c = CH.find(x => x.id === cid); return c && c.cq[+i]; };
  const cqMins = m => ({ 2: 3, 3: 5, 5: 9 })[m] || m * 2;
  const VIS = window.VISUALS;
  const view = $('#view');

  /* ---------------- language ---------------- */
  let LANG = localStorage.getItem('dbp-lang') || 'bn';
  const t = x => x == null ? '' : (typeof x === 'string' || typeof x === 'number') ? String(x) : (x[LANG] ?? x.en ?? '');
  const BN_DIG = '০১২৩৪৫৬৭৮৯';
  const n = x => LANG === 'bn' ? String(x).replace(/\d/g, d => BN_DIG[d]) : String(x);
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const UI = {
    bn: {
      appName: 'ডাটাবেস পাঠশালা', learn: 'শিখি', revise: 'রিভিশন', notes: 'নোট', me: 'আমি',
      hello: ['শুভ সকাল', 'শুভ দুপুর', 'শুভ সন্ধ্যা', 'রাত জেগে পড়ছ?'], continue: 'যেখানে থেমেছিলে', startHere: 'এখান থেকে শুরু করো', allDone: 'সব টপিক শেষ! এখন রিভিশন দাও',
      chapters: 'অধ্যায়সমূহ', chapter: 'অধ্যায়', topics: 'টপিক', done: 'শেষ', search: 'টপিক খুঁজো… (যেমন: foreign key)',
      noResult: 'কিছু পাওয়া যায়নি', mixTitle: 'মিক্সড মডেল টেস্ট', mixSub: 'সব অধ্যায় থেকে র‍্যান্ডম ১৫টা MCQ: পরীক্ষার আগে নিজেকে যাচাই করো',
      s3: '★★★ অবশ্যই', s2: '★★ গুরুত্বপূর্ণ', s1: '★ জেনে রাখো', slides: 'স্লাইড', quiz: 'অধ্যায়ের MCQ পরীক্ষা', quizSub: 'প্রশ্ন', best: 'সেরা', notTaken: 'এখনো দাওনি',
      written: 'লিখিত প্রশ্ন ও উত্তরের কাঠামো', writtenSub: 'উত্তর পরীক্ষার মতো English-এ', example: '🌍 বাস্তব জীবনের উদাহরণ', visual: 'ছবিতে বুঝি',
      examTitle: '⭐ পরীক্ষার খাতায় যা লিখবে', examSub: 'পরীক্ষা English-এ, তাই এই অংশ সবসময় English-এ থাকবে। হলুদ দাগ = keyword',
      copy: 'কপি', copied: 'কপি হয়েছে', myNote: '📝 আমার নোট', notePh: 'নিজের ভাষায় লিখে রাখো… (নিজে থেকে সেভ হয়)', saved: '✓ সেভ হয়েছে',
      dontGet: '🤔 বুঝি নাই', gotIt: '✓ বুঝেছি  +১০ XP', learned: '✓ এই টপিক শেখা শেষ', prev: 'আগের টপিক', next: 'পরের টপিক', takeQuiz: 'অধ্যায়ের MCQ দাও',
      doubtTitle: 'কী বুঝোনি? লিখে রাখো', doubtHint: 'পরে Google/YouTube-এ খুঁজে দেখতে পারবে। কোনো লাইন select করে এই বাটন চাপলে সেই লাইনটাও সেভ হবে।',
      doubtPh: 'যেমন: candidate key আর primary key-এর পার্থক্য ঠিক পরিষ্কার না…', save: 'সেভ করো', cancel: 'বাতিল', doubtSaved: 'বুঝি-নাই তালিকায় রাখা হলো 📌',
      question: 'প্রশ্ন', of: '/', check: 'উত্তর দেখো', nextQ: 'পরের প্রশ্ন', finish: 'ফলাফল দেখো', correct: 'সঠিক!', wrong: 'ভুল হয়েছে', why: 'কেন:',
      resultTitle: 'ফলাফল', score: 'স্কোর', retry: 'আবার দাও', backCh: 'অধ্যায়ে ফিরে যাও', review: 'ভুলগুলো আবার দেখো', addDoubt: 'বুঝি-নাই-তে রাখো', added: 'রাখা হয়েছে',
      yourAns: 'তোমার উত্তর', rightAns: 'সঠিক উত্তর', xpEarned: 'XP পেলে', perfectMsg: 'অসাধারণ! ফুল মার্কস 🎉', goodMsg: 'দারুণ! আর একটু হলেই ফুল মার্কস', okMsg: 'ভালো চেষ্টা! ভুলগুলো দেখে আবার দাও', lowMsg: 'চিন্তা নেই, টপিকগুলো আবার পড়ে আবার দাও',
      revTitle: 'এক নজরে রিভিশন', revSub: 'পরীক্ষার আগের রাতে শুধু এটুকু পড়লেই মূল পয়েন্ট মনে থাকবে', all: 'সব', onlyMust: 'শুধু ★★★ (অবশ্যই) টপিক', mixBtn: '🎲 মিক্সড টেস্ট দাও',
      doubts: 'বুঝি নাই', myNotes: 'আমার নোট', noDoubt: 'এখনো কোনো “বুঝি নাই” নেই', noDoubtSub: 'টপিক পড়ার সময় কিছু না বুঝলে 🤔 বাটন চাপো, এখানে জমা হবে',
      noNotes: 'এখনো কোনো নোট নেই', noNotesSub: 'টপিকের নিচে নোট লিখলে বা নতুন নোট বানালে এখানে দেখাবে', newNote: '＋ নতুন নোট', noteTitle: 'নোটের শিরোনাম', resolved: 'বুঝে গেছি ✓ +৫ XP', unresolve: 'আবার খোলো', del: 'মুছো', open: 'টপিকে যাও', searchG: 'Google', searchY: 'YouTube',
      resolvedLbl: 'সমাধান হয়েছে', confirmDel: 'মুছে ফেলবে?', general: 'সাধারণ নোট',
      level: 'লেভেল', streak: 'দিনের স্ট্রিক', xp: 'XP', toNext: 'পরের লেভেল', topicsDone: 'টপিক শেষ', quizzes: 'পরীক্ষা পাস', badges: 'ব্যাজ', badgeSub: 'শিখতে থাকো, আনলক হবে',
      sync: 'Sync (মোবাইল + ওয়েব)', syncOff: 'Firebase এখনো সেট করা হয়নি। আপাতত progress শুধু এই ডিভাইসে থাকছে। README.md-তে ৫ মিনিটের সেটআপ দেওয়া আছে।', syncLoading: 'Firebase লোড হচ্ছে…',
      signIn: 'Google দিয়ে Sign in', signOut: 'Sign out', syncedAs: 'Sync চালু:', syncing: 'Sync হচ্ছে…', synced: 'সব ডিভাইসে আপডেটেড ✓', offline: 'অফলাইন: নেট এলে নিজে sync হবে', syncErr: 'Sync সমস্যা:', signedOutTxt: 'Sign in করলে ফোন আর কম্পিউটারে একই progress থাকবে',
      install: 'অ্যাপ হিসেবে ইনস্টল করো', installSub: 'হোম স্ক্রিনে আইকন, অফলাইনেও পড়া যাবে', installBtn: 'ইনস্টল', installed: 'অ্যাপ ইনস্টল করা আছে ✓',
      iosSteps: 'iPhone-এ: Safari-র Share বাটন (□↑) চাপো → “Add to Home Screen”', otherSteps: 'Browser menu (⋮) → “Install app” বা “Add to Home screen”',
      settings: 'সেটিংস', language: 'ভাষা', theme: 'থিম', themeAuto: 'অটো', themeLight: 'লাইট', themeDark: 'ডার্ক', reset: 'সব progress মুছে ফেলো', resetConfirm: 'সত্যিই সব progress, নোট, ব্যাজ মুছে ফেলবে? এটা ফেরত আনা যাবে না।',
      newBadge: 'নতুন ব্যাজ!', levelUp: 'লেভেল আপ!', onbTitle: 'ডাটাবেস পাঠশালা', onbLead: 'CSE 209 Database Systems: স্লাইড ধরে ধরে বাংলায় বুঝো, English-এ পরীক্ষা দাও।',
      onbLang: 'কোন ভাষায় পড়বে? (পরে বদলানো যাবে)', onbInstall: '📲 ফোনে অ্যাপ হিসেবে ইনস্টল করো', onbStart: 'শুরু করি', onbSkip: 'পরে ইনস্টল করব, এখন শুরু করি',
      xpToast: 'XP', ofTopics: 'টপিক', questions: 'টি প্রশ্ন',
      cqSec: '✍️ CQ প্র্যাকটিস (২, ৩, ৫ মার্ক)', cqSecSub: 'প্রশ্ন পড়ে নিজে লেখো, তারপর মডেল উত্তরের সাথে মিলিয়ে নিজেকে নম্বর দাও', marks: 'মার্ক',
      cqTest: 'CQ মডেল টেস্ট', cqTestSub: '২ + ৩ + ৫ = ১০ মার্ক · ১৭ মিনিট · টাইমার সহ', cqMixTitle: 'CQ ফাইনাল মডেল টেস্ট', cqMixSub: 'সব অধ্যায় থেকে ২০ মার্ক · ৩৪ মিনিট: ঠিক পরীক্ষার মতো লেখো, তারপর নিজেই খাতা দেখো',
      yourAnswer: '✍️ তোমার উত্তর (English-এ)', ansPh: 'পরীক্ষার খাতায় যেভাবে লিখবে, ঠিক সেভাবে লেখো… (নিজে থেকে সেভ হয়)', startTimer: '⏱ টাইমার', min: 'মিনিট', timeUp: '⏰ সময় শেষ!',
      showModel: '✅ মডেল উত্তর দেখো', modelAns: '✅ মডেল উত্তর (Perfect answer)', rubric: '🧾 নিজের খাতা নিজে দেখো', rubricSub: 'তোমার উত্তরে যে পয়েন্টগুলো ঠিকভাবে লিখেছ, শুধু সেগুলোতে টিক দাও',
      yourScore: 'তোমার নম্বর', saveScore: 'নম্বর সেভ করো', bestMark: 'সেরা', howTo: 'এই মার্কের উত্তর কীভাবে লিখবে',
      guide2: '<b>২ মার্ক</b> = সংজ্ঞা + ১টা উদাহরণ, ২–৪ লাইন। “পার্থক্য” চাইলে ছোট ২-কলামের টেবিল দাও। লম্বা রচনা লিখে সময় নষ্ট কোরো না।',
      guide3: '<b>৩ মার্ক</b> = এক লাইনের সংজ্ঞা দিয়ে শুরু, তারপর ৩টা নম্বর দেওয়া পয়েন্ট, প্রতিটায় ছোট ব্যাখ্যা বা উদাহরণ। ৬–১০ লাইন।',
      guide5: '<b>৫ মার্ক</b> = ১) সংজ্ঞা/ভূমিকা ২) নম্বর দেওয়া পয়েন্ট বা টেবিল ৩) চিত্র, SQL বা উদাহরণ ৪) এক লাইনের উপসংহার। Keyword গুলোর নিচে দাগ দাও; চিত্র থাকলে নম্বর বাড়ে।',
      prevQ: 'আগের প্রশ্ন', nextCQ: 'পরের প্রশ্ন', submit: 'উত্তর জমা দাও', submitConfirm: 'উত্তর জমা দেবে? এরপর মডেল উত্তর দেখে নিজেকে নম্বর দেবে।', timeLeft: 'বাকি সময়',
      total: 'মোট', finishTest: 'ফলাফল সেভ করো', noAnswer: '(কিছু লেখোনি)', yourWritten: 'তুমি যা লিখেছ', cqAnswers: '✍️ CQ মডেল উত্তর', examPoints: '⭐ Exam পয়েন্ট', allMarks: 'সব',
      testDone: 'CQ টেস্টের ফলাফল', backHome: 'হোমে ফিরে যাও', item: 'প্রশ্ন'
    },
    en: {
      appName: 'Database Pathshala', learn: 'Learn', revise: 'Revise', notes: 'Notes', me: 'Me',
      hello: ['Good morning', 'Good afternoon', 'Good evening', 'Studying late?'], continue: 'Continue where you left off', startHere: 'Start here', allDone: 'All topics done! Time to revise',
      chapters: 'Chapters', chapter: 'Chapter', topics: 'topics', done: 'done', search: 'Search topics… (e.g. foreign key)',
      noResult: 'Nothing found', mixTitle: 'Mixed model test', mixSub: '15 random MCQs from every chapter: check yourself before the exam',
      s3: '★★★ Must know', s2: '★★ Important', s1: '★ Good to know', slides: 'Slides', quiz: 'Chapter MCQ test', quizSub: 'questions', best: 'Best', notTaken: 'Not taken yet',
      written: 'Written questions & answer outlines', writtenSub: 'Answers in exam English', example: '🌍 Real-world example', visual: 'See it',
      examTitle: '⭐ What to write in the exam', examSub: 'Your exam is in English, so this part always stays in English. Yellow = keywords',
      copy: 'Copy', copied: 'Copied', myNote: '📝 My note', notePh: 'Write it in your own words… (saves automatically)', saved: '✓ Saved',
      dontGet: '🤔 Didn’t get it', gotIt: '✓ Got it  +10 XP', learned: '✓ Topic learned', prev: 'Previous topic', next: 'Next topic', takeQuiz: 'Take the chapter MCQ',
      doubtTitle: 'What didn’t make sense?', doubtHint: 'You can search Google/YouTube for it later. Select a line before tapping the button to save that line too.',
      doubtPh: 'e.g. the difference between candidate and primary key isn’t clear…', save: 'Save', cancel: 'Cancel', doubtSaved: 'Added to your “didn’t get it” list 📌',
      question: 'Question', of: '/', check: 'Check', nextQ: 'Next question', finish: 'See result', correct: 'Correct!', wrong: 'Not quite', why: 'Why:',
      resultTitle: 'Result', score: 'Score', retry: 'Try again', backCh: 'Back to chapter', review: 'Review your mistakes', addDoubt: 'Add to “didn’t get it”', added: 'Added',
      yourAns: 'Your answer', rightAns: 'Correct answer', xpEarned: 'XP earned', perfectMsg: 'Outstanding! Full marks 🎉', goodMsg: 'Great! Nearly full marks', okMsg: 'Good effort! Review the mistakes and retry', lowMsg: 'No worries: re-read the topics and try again',
      revTitle: 'Revision at a glance', revSub: 'Read just this the night before the exam to recall every key point', all: 'All', onlyMust: 'Only ★★★ (must-know) topics', mixBtn: '🎲 Take the mixed test',
      doubts: 'Didn’t get it', myNotes: 'My notes', noDoubt: 'Nothing here yet', noDoubtSub: 'Tap 🤔 on any topic when something is unclear; it will collect here',
      noNotes: 'No notes yet', noNotesSub: 'Notes written under topics, or new notes, appear here', newNote: '＋ New note', noteTitle: 'Note title', resolved: 'Got it now ✓ +5 XP', unresolve: 'Reopen', del: 'Delete', open: 'Open topic', searchG: 'Google', searchY: 'YouTube',
      resolvedLbl: 'Resolved', confirmDel: 'Delete this?', general: 'General note',
      level: 'Level', streak: 'day streak', xp: 'XP', toNext: 'to next level', topicsDone: 'topics done', quizzes: 'tests passed', badges: 'Badges', badgeSub: 'Keep learning to unlock',
      sync: 'Sync (mobile + web)', syncOff: 'Firebase isn’t configured yet, so progress stays on this device. README.md has a 5-minute setup.', syncLoading: 'Loading Firebase…',
      signIn: 'Sign in with Google', signOut: 'Sign out', syncedAs: 'Syncing as', syncing: 'Syncing…', synced: 'Up to date on all devices ✓', offline: 'Offline: will sync when you reconnect', syncErr: 'Sync problem:', signedOutTxt: 'Sign in to keep the same progress on phone and computer',
      install: 'Install as an app', installSub: 'Home-screen icon, works offline too', installBtn: 'Install', installed: 'App is installed ✓',
      iosSteps: 'On iPhone: tap Safari’s Share button (□↑) → “Add to Home Screen”', otherSteps: 'Browser menu (⋮) → “Install app” or “Add to Home screen”',
      settings: 'Settings', language: 'Language', theme: 'Theme', themeAuto: 'Auto', themeLight: 'Light', themeDark: 'Dark', reset: 'Erase all progress', resetConfirm: 'Really erase all progress, notes and badges? This cannot be undone.',
      newBadge: 'New badge!', levelUp: 'Level up!', onbTitle: 'Database Pathshala', onbLead: 'CSE 209 Database Systems: understand every slide in Bangla, write the exam in English.',
      onbLang: 'Which language do you want to study in? (You can switch anytime)', onbInstall: '📲 Install on your phone as an app', onbStart: 'Let’s start', onbSkip: 'Install later, start now',
      xpToast: 'XP', ofTopics: 'topics', questions: 'questions',
      cqSec: '✍️ CQ practice (2, 3, 5 marks)', cqSecSub: 'Write your own answer first, then compare with the model answer and mark yourself', marks: 'marks',
      cqTest: 'CQ model test', cqTestSub: '2 + 3 + 5 = 10 marks · 17 minutes · timed', cqMixTitle: 'CQ final model test', cqMixSub: '20 marks from every chapter · 34 minutes: write like the real exam, then mark your own script',
      yourAnswer: '✍️ Your answer (in English)', ansPh: 'Write exactly as you would in the exam script… (saves automatically)', startTimer: '⏱ Timer', min: 'min', timeUp: '⏰ Time’s up!',
      showModel: '✅ Show model answer', modelAns: '✅ Model answer (perfect answer)', rubric: '🧾 Mark your own script', rubricSub: 'Tick only the points you wrote correctly in your answer',
      yourScore: 'Your marks', saveScore: 'Save marks', bestMark: 'Best', howTo: 'How to write a this-mark answer',
      guide2: '<b>2 marks</b> = definition + one example, 2–4 lines. For “differentiate”, a small two-column table. Don’t waste time on an essay.',
      guide3: '<b>3 marks</b> = one-line definition, then three numbered points, each with a short explanation or example. 6–10 lines.',
      guide5: '<b>5 marks</b> = 1) definition / introduction 2) numbered points or a table 3) a diagram, SQL or example 4) a one-line conclusion. Underline keywords; a diagram earns extra credit.',
      prevQ: 'Previous question', nextCQ: 'Next question', submit: 'Submit answers', submitConfirm: 'Submit your answers? Next you will compare with model answers and mark yourself.', timeLeft: 'Time left',
      total: 'Total', finishTest: 'Save result', noAnswer: '(nothing written)', yourWritten: 'What you wrote', cqAnswers: '✍️ CQ model answers', examPoints: '⭐ Exam points', allMarks: 'All',
      testDone: 'CQ test result', backHome: 'Back to home', item: 'Question'
    }
  };
  const u = k => UI[LANG][k] ?? UI.en[k] ?? k;

  /* ---------------- progress helpers ---------------- */
  const S = () => Store.get();
  const tkey = (c, tp) => c + '/' + tp;
  const allTopics = () => CH.flatMap(c => c.topics.map(tp => ({ c, tp })));
  const chDone = c => c.topics.filter(tp => S().done[tkey(c.id, tp.id)]).length;
  const doubtList = () => Object.entries(S().doubts).filter(([, d]) => d && !d.deleted).map(([id, d]) => ({ id, ...d }));
  const notesList = () => Object.entries(S().notes).filter(([, v]) => v && (v.text || '').trim()).map(([k, v]) => ({ k, ...v }));
  const stars = pct => pct >= 1 ? 3 : pct >= 0.8 ? 2 : pct >= 0.5 ? 1 : 0;

  function xpOf(s) {
    let xp = Object.keys(s.done).length * 10;
    for (const q of Object.values(s.quiz)) xp += (q.best || 0) * 10 + (q.perfect ? 30 : 0);
    xp += Object.values(s.doubts).filter(d => d && d.resolved && !d.deleted).length * 5;
    xp += Object.keys(s.badges).length * 20;
    for (const v of Object.values(s.cq || {})) xp += Math.round((v.best || 0) * 5);
    for (const v of Object.values(s.cqt || {})) xp += Math.round((v.best || 0) * 2);
    return xp;
  }
  const LEVELS = [0, 100, 250, 450, 700, 1000, 1400, 1900];
  const LNAMES = ['Row Rookie', 'Tuple Tamer', 'Key Keeper', 'Query Cadet', 'Join Master', 'Schema Architect', 'Normal-Form Ninja', 'DBA Legend'];
  function levelOf(xp) {
    let i = 0; while (i < LEVELS.length - 1 && xp >= LEVELS[i + 1]) i++;
    const lo = LEVELS[i], hi = LEVELS[i + 1] || lo + 600;
    return { i: i + 1, name: LNAMES[i], lo, hi, pct: Math.min(100, Math.round((xp - lo) / (hi - lo) * 100)) };
  }
  function streakOf(s) {
    const d = new Date(); let c = 0;
    const key = x => x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0');
    if (!s.days[key(d)]) d.setDate(d.getDate() - 1);
    while (s.days[key(d)]) { c++; d.setDate(d.getDate() - 1); }
    return c;
  }

  const BADGES = [
    { id: 'first', e: '🌱', n: { bn: 'প্রথম পদক্ষেপ', en: 'First step' }, d: { bn: 'প্রথম টপিক শেষ', en: 'Finish your first topic' }, ok: s => Object.keys(s.done).length >= 1 },
    { id: 'ten', e: '📚', n: { bn: 'টপিক শিকারি', en: 'Topic hunter' }, d: { bn: '১০টা টপিক শেষ', en: 'Finish 10 topics' }, ok: s => Object.keys(s.done).length >= 10 },
    { id: 'chapter', e: '🏁', n: { bn: 'অধ্যায় জয়', en: 'Chapter cleared' }, d: { bn: 'একটা অধ্যায়ের সব টপিক', en: 'All topics of one chapter' }, ok: s => CH.some(c => c.topics.every(tp => s.done[tkey(c.id, tp.id)])) },
    { id: 'quiz1', e: '🎯', n: { bn: 'প্রথম পরীক্ষা', en: 'First test' }, d: { bn: 'প্রথম MCQ পরীক্ষা দেওয়া', en: 'Take your first MCQ test' }, ok: s => Object.keys(s.quiz).length >= 1 },
    { id: 'sharp', e: '⚡', n: { bn: 'তুখোড়', en: 'Sharp mind' }, d: { bn: 'কোনো পরীক্ষায় ৮০%+', en: 'Score 80%+ on a test' }, ok: s => Object.values(s.quiz).some(q => q.total && q.best / q.total >= 0.8) },
    { id: 'perfect', e: '💯', n: { bn: 'ফুল মার্কস', en: 'Full marks' }, d: { bn: 'কোনো পরীক্ষায় ১০০%', en: '100% on a test' }, ok: s => Object.values(s.quiz).some(q => q.perfect) },
    { id: 'note3', e: '📝', n: { bn: 'নোটবাজ', en: 'Note taker' }, d: { bn: '৩টা নোট লেখা', en: 'Write 3 notes' }, ok: s => Object.values(s.notes).filter(v => v && (v.text || '').trim()).length >= 3 },
    { id: 'curious', e: '🤔', n: { bn: 'কৌতূহলী', en: 'Curious mind' }, d: { bn: 'প্রথম “বুঝি নাই”', en: 'Save your first doubt' }, ok: s => Object.values(s.doubts).some(d => d && !d.deleted) },
    { id: 'solver', e: '💡', n: { bn: 'সমাধানকারী', en: 'Doubt solver' }, d: { bn: '৩টা “বুঝি নাই” সমাধান', en: 'Resolve 3 doubts' }, ok: s => Object.values(s.doubts).filter(d => d && d.resolved && !d.deleted).length >= 3 },
    { id: 'streak3', e: '🔥', n: { bn: '৩ দিনের আগুন', en: '3-day streak' }, d: { bn: 'টানা ৩ দিন পড়া', en: 'Study 3 days in a row' }, ok: s => streakOf(s) >= 3 },
    { id: 'streak7', e: '🌋', n: { bn: '৭ দিনের আগুন', en: '7-day streak' }, d: { bn: 'টানা ৭ দিন পড়া', en: 'Study 7 days in a row' }, ok: s => streakOf(s) >= 7 },
    { id: 'allq', e: '🏆', n: { bn: 'সব অধ্যায় পাস', en: 'All chapters passed' }, d: { bn: 'প্রতিটা অধ্যায়ে ৬০%+', en: '60%+ on every chapter test' }, ok: s => CH.every(c => s.quiz[c.id] && s.quiz[c.id].best / s.quiz[c.id].total >= 0.6) },
    { id: 'writer', e: '✍️', n: { bn: 'লেখক', en: 'Writer' }, d: { bn: 'প্রথম CQ নিজে নম্বর দেওয়া', en: 'Self-mark your first CQ' }, ok: s => Object.keys(s.cq || {}).length >= 1 },
    { id: 'cq5', e: '🖋️', n: { bn: '৫-এ ৫', en: 'Five out of five' }, d: { bn: 'কোনো ৫ মার্কে পুরো নম্বর', en: 'Full marks on a 5-mark CQ' }, ok: s => Object.entries(s.cq || {}).some(([k, v]) => { const q = cqByKey(k); return q && q.m === 5 && v.best >= 5; }) },
    { id: 'cqtest', e: '📜', n: { bn: 'খাতা জমা', en: 'Script submitted' }, d: { bn: 'CQ মডেল টেস্টে ৭০%+', en: '70%+ on a CQ model test' }, ok: s => Object.values(s.cqt || {}).some(v => v.total && v.best / v.total >= 0.7) },
    { id: 'master', e: '👑', n: { bn: 'ডাটাবেস রাজা', en: 'Database master' }, d: { bn: 'সব টপিক শেষ', en: 'Finish every topic' }, ok: s => allTopics().every(({ c, tp }) => s.done[tkey(c.id, tp.id)]) }
  ];

  /* act = mutate + reward feedback */
  function act(fn, opts) {
    const before = xpOf(S()), lvBefore = levelOf(before).i;
    Store.mutate(fn);
    const newly = BADGES.filter(b => !S().badges[b.id] && b.ok(S()));
    if (newly.length) Store.mutate(s => newly.forEach(b => { s.badges[b.id] = Date.now(); }));
    const after = xpOf(S()), gain = after - before;
    if (newly.length) {
      const b = newly[0];
      toast(`${b.e} ${u('newBadge')} ${t(b.n)}  +${n(gain)} XP`);
      confetti();
    } else if (gain > 0 && !(opts && opts.silent)) {
      toast(`+${n(gain)} ${u('xpToast')} ✨`);
    }
    if (levelOf(after).i > lvBefore) { setTimeout(() => { toast(`🚀 ${u('levelUp')} ${u('level')} ${n(levelOf(after).i)}: ${levelOf(after).name}`); confetti(); }, newly.length ? 2200 : 300); }
    updateChrome();
    return gain;
  }

  /* ---------------- chrome: top bar, nav, theme ---------------- */
  function applyTheme() {
    const th = localStorage.getItem('dbp-theme') || 'auto';
    if (th === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', th);
  }
  function setLang(l) {
    LANG = l; localStorage.setItem('dbp-lang', l);
    document.documentElement.lang = l === 'bn' ? 'bn' : 'en';
    updateChrome(); render();
  }
  function updateChrome() {
    $('#brandName').textContent = u('appName');
    $$('.lang-switch button').forEach(b => b.classList.toggle('on', b.dataset.lang === LANG));
    $$('[data-ui]').forEach(el => { el.textContent = u(el.dataset.ui); });
    const open = doubtList().filter(d => !d.resolved).length;
    const dc = $('#doubtCount'); dc.hidden = !open; dc.textContent = n(open);
    $('#syncDot').dataset.s = Sync.status === 'synced' ? 'synced' : (Sync.status === 'syncing' || Sync.status === 'loading') ? 'syncing' : Sync.status === 'error' ? 'error' : '';
    $('#installTop').hidden = !(deferredPrompt && !isStandalone());
  }
  $$('.lang-switch button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
  $('#themeBtn').addEventListener('click', () => {
    const order = ['auto', 'light', 'dark'];
    const cur = localStorage.getItem('dbp-theme') || 'auto';
    const next = order[(order.indexOf(cur) + 1) % 3];
    localStorage.setItem('dbp-theme', next); applyTheme();
    toast(u('theme') + ': ' + u('theme' + next[0].toUpperCase() + next.slice(1)));
  });

  /* ---------------- install (PWA) ---------------- */
  let deferredPrompt = null;
  const isStandalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; updateChrome(); refreshInstallBlocks(); });
  window.addEventListener('appinstalled', () => { deferredPrompt = null; toast(u('installed')); updateChrome(); refreshInstallBlocks(); });
  async function doInstall() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      try { await deferredPrompt.userChoice; } catch (e) {}
      deferredPrompt = null; updateChrome(); refreshInstallBlocks();
    } else {
      openSheet(`<h2>${u('install')}</h2><p>${isIOS() ? u('iosSteps') : u('otherSteps')}</p><button class="btn primary block" data-close>OK</button>`);
    }
  }
  $('#installTop').addEventListener('click', doInstall);
  function installBlock() {
    if (isStandalone()) return '';
    return `<div class="install-card" data-install-block><div class="grow"><b>📲 ${u('install')}</b><p>${deferredPrompt ? u('installSub') : (isIOS() ? u('iosSteps') : u('installSub'))}</p></div>${deferredPrompt || !isIOS() ? `<button class="btn primary sm" data-act="install">${u('installBtn')}</button>` : ''}</div>`;
  }
  function refreshInstallBlocks() { $$('[data-install-block]').forEach(el => { el.outerHTML = installBlock() || '<span></span>'; }); }

  /* ---------------- sheet & toast & confetti ---------------- */
  const sheet = $('#sheet');
  function openSheet(html, onMount) {
    $('.sheet-panel', sheet).innerHTML = html;
    sheet.hidden = false;
    const first = $('textarea, input, button', sheet);
    if (first) setTimeout(() => first.focus(), 50);
    if (onMount) onMount($('.sheet-panel', sheet));
  }
  const closeSheet = () => { sheet.hidden = true; };
  sheet.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeSheet(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !sheet.hidden) closeSheet(); });

  let toastT;
  function toast(msg) {
    const el = $('#toast'); el.textContent = msg; el.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('show'), 2600);
  }

  function confetti() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cv = $('#confetti'), ctx = cv.getContext('2d');
    const W = cv.width = innerWidth * devicePixelRatio, H = cv.height = innerHeight * devicePixelRatio;
    const cols = ['#FFE24A', '#2453C6', '#138A5A', '#C93838', '#6B4FD8', '#C9741D'];
    const P = Array.from({ length: 140 }, () => ({ x: W / 2 + (Math.random() - .5) * W * .3, y: H * .35, vx: (Math.random() - .5) * 16 * devicePixelRatio, vy: (-Math.random() * 14 - 4) * devicePixelRatio, s: (4 + Math.random() * 6) * devicePixelRatio, c: cols[Math.random() * cols.length | 0], r: Math.random() * 6, vr: (Math.random() - .5) * .3 }));
    const t0 = performance.now();
    (function frame(now) {
      ctx.clearRect(0, 0, W, H);
      P.forEach(p => { p.vy += .45 * devicePixelRatio; p.x += p.vx; p.y += p.vy; p.vx *= .99; p.r += p.vr; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore(); });
      if (now - t0 < 2200) requestAnimationFrame(frame); else ctx.clearRect(0, 0, W, H);
    })(t0);
  }

  /* ---------------- code highlighting ---------------- */
  const KW = /\b(select|from|where|and|or|not|in|as|distinct|all|some|create|table|insert|into|values|delete|drop|alter|add|update|set|primary|foreign|key|references|null|is|like|escape|order|by|asc|desc|group|having|union|intersect|except|between|case|when|then|else|end|avg|min|max|sum|count|constraint|type|record|integer|string|char|varchar|int|float|on|cascade|grant|revoke|commit|rollback)\b/gi;
  function highlightCode(root) {
    $$('pre.code code', root || document).forEach(el => {
      if (el.dataset.hl) return;
      const src = el.textContent;
      const re = /(--[^\n]*|\/\*[\s\S]*?\*\/)|('(?:[^'\\]|\\.)*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]+)/g;
      let out = '', last = 0, m;
      while ((m = re.exec(src))) {
        out += esc(src.slice(last, m.index));
        if (m[1]) out += `<span class="cm">${esc(m[1])}</span>`;
        else if (m[2]) out += `<span class="str">${esc(m[2])}</span>`;
        else if (m[3]) out += `<span class="num">${m[3]}</span>`;
        else { KW.lastIndex = 0; out += KW.test(m[4]) ? `<span class="kw">${m[4]}</span>` : esc(m[4]); }
        last = re.lastIndex;
      }
      el.innerHTML = out + esc(src.slice(last)); el.dataset.hl = 1;
    });
  }
  window.highlightCode = highlightCode;

  /* ---------------- visuals ---------------- */
  function visHTML(key) {
    const v = VIS[key]; if (!v) return '';
    return typeof v === 'function' ? v(LANG) : v.html(LANG);
  }
  function mountVisuals(root) {
    $$('[data-vis]', root).forEach(el => {
      const v = VIS[el.dataset.vis];
      if (v && typeof v === 'object' && v.init) v.init(el, LANG);
    });
    $$('.vslot', root).forEach(el => {
      const k = el.dataset.v; el.innerHTML = visHTML(k);
      const v = VIS[k]; if (v && v.init) v.init(el, LANG);
    });
    highlightCode(root);
  }

  /* ---------------- router ---------------- */
  let lastSel = '';
  document.addEventListener('selectionchange', () => {
    const s = (getSelection() + '').trim();
    if (s && s.length < 500 && $('.prose') && getSelection().anchorNode && $('.topic-page')?.contains(getSelection().anchorNode)) lastSel = s;
  });

  function route() {
    const h = location.hash.replace(/^#\/?/, '');
    const p = h.split('/');
    return { p };
  }
  function setTab(tab) { $$('.bottomnav a').forEach(a => a.classList.toggle('on', a.dataset.tab === tab)); }

  let QZ = null;
  function render() {
    const { p } = route();
    closeSheet();
    lastSel = '';
    if (p[0] === 'ch' && p[1]) return renderChapter(p[1]);
    if (p[0] === 't' && p[2]) return renderTopic(p[1], p[2]);
    if (p[0] === 'quiz' && p[1]) return renderQuiz(p[1]);
    if (p[0] === 'cq' && p[2] != null) return renderCQ(p[1], p[2]);
    if (p[0] === 'cqtest' && p[1]) return renderCQTest(p[1]);
    if (p[0] === 'revise') return p[1] === 'cq' ? renderReviseCQ(p[2]) : renderRevise(p[1]);
    if (p[0] === 'notes') return renderNotes(p[1]);
    if (p[0] === 'me') return renderMe();
    return renderHome();
  }
  function paint(html, tab) {
    view.innerHTML = html;
    setTab(tab);
    mountVisuals(view);
  }
  window.addEventListener('hashchange', () => { if (!location.hash.startsWith('#/quiz')) QZ = null; if (!location.hash.startsWith('#/cqtest')) { CT = null; clearInterval(ctTimer); } stopCqTimer(); render(); window.scrollTo(0, 0); });

  /* ---------------- HOME ---------------- */
  function nextTopic() {
    for (const { c, tp } of allTopics()) if (!S().done[tkey(c.id, tp.id)]) return { c, tp };
    return null;
  }
  function renderHome() {
    const s = S(), xp = xpOf(s), lv = levelOf(xp), st = streakOf(s);
    const hr = new Date().getHours();
    const hi = u('hello')[hr < 12 ? 0 : hr < 17 ? 1 : hr < 22 ? 2 : 3];
    const nt = nextTopic();
    const started = Object.keys(s.done).length > 0;
    const cont = nt
      ? `<a class="btn big" href="#/t/${nt.c.id}/${nt.tp.id}"><span>${started ? u('continue') : u('startHere')}<small>${u('chapter')} ${n(nt.c.num)} · ${esc(t(nt.tp.title))}</small></span><span aria-hidden="true">▶</span></a>`
      : `<a class="btn big" href="#/revise"><span>${u('allDone')}</span><span>⭐</span></a>`;
    const chs = CH.map(c => {
      const d = chDone(c), q = s.quiz[c.id], st2 = q ? stars(q.best / q.total) : 0;
      return `<li><a class="chap" href="#/ch/${c.id}" style="--c:${c.color}">
        <span class="num">${n(c.num)}</span>
        <span><h3>${esc(t(c.title))}</h3><span class="meta">${n(c.topics.length)} ${u('topics')} · ${n(d)}/${n(c.topics.length)} ${u('done')}</span><div class="pbar"><span style="width:${d / c.topics.length * 100}%"></span></div></span>
        <span class="qstars" aria-label="quiz stars">${'★'.repeat(st2)}<span class="off">${'★'.repeat(3 - st2)}</span></span></a></li>`;
    }).join('');
    paint(`
      <section class="hero">
        <div class="row" style="justify-content:space-between;align-items:flex-start">
          <div><p class="hello">${hi} 👋</p><h1>${u('level')} ${n(lv.i)} · ${lv.name}</h1></div>
          <span class="streak" title="${u('streak')}">🔥 ${n(st)}</span>
        </div>
        <div class="xpbar"><span style="width:${lv.pct}%"></span></div>
        <p class="xpmeta">${n(xp)} XP · ${u('toNext')}: ${n(lv.hi)} XP</p>
        ${cont}
      </section>
      ${installBlock()}
      <div class="search"><input type="search" id="q" placeholder="${u('search')}" aria-label="${u('search')}" autocomplete="off"></div>
      <div class="results" id="results"></div>
      <div class="sec-title"><h2>${u('chapters')}</h2><span class="muted small">CSE 209</span></div>
      <ol class="chapters">${chs}</ol>
      <a class="card mixcard" href="#/quiz/mix"><span class="ico">🎲</span><span><b>${u('mixTitle')}</b><p class="muted small">${u('mixSub')}</p></span></a>
      <a class="card mixcard" href="#/cqtest/mix" style="border:2px solid var(--hl)"><span class="ico">📜</span><span class="grow"><b>${u('cqMixTitle')}</b><p class="muted small">${u('cqMixSub')}</p></span>${S().cqt.mix ? `<span class="small"><b>${n(S().cqt.mix.best)}/${n(S().cqt.mix.total)}</b></span>` : ''}</a>
    `, 'home');
    const q = $('#q'), res = $('#results');
    q.addEventListener('input', () => {
      const v = q.value.trim().toLowerCase();
      if (v.length < 2) { res.innerHTML = ''; return; }
      const strip = h => h.replace(/<[^>]+>/g, ' ').toLowerCase();
      const hits = allTopics().filter(({ tp }) => (t(tp.title) + ' ' + tp.title.en + ' ' + strip(tp.body.en) + ' ' + strip(tp.body.bn)).toLowerCase().includes(v)).slice(0, 8);
      res.innerHTML = hits.length ? hits.map(({ c, tp }) => `<a href="#/t/${c.id}/${tp.id}"><b>${esc(t(tp.title))}</b><small>${u('chapter')} ${n(c.num)} · ${esc(t(c.title))}</small></a>`).join('') : `<p class="muted small">${u('noResult')}</p>`;
    });
  }

  /* ---------------- CHAPTER ---------------- */
  const impTag = s => `<span class="imp s${s}">${u('s' + s)}</span>`;
  function renderChapter(cid) {
    const c = CH.find(x => x.id === cid); if (!c) return renderHome();
    const s = S(), q = s.quiz[c.id], d = chDone(c);
    const list = c.topics.map((tp, i) => {
      const dn = !!s.done[tkey(c.id, tp.id)];
      return `<li class="${dn ? 'done' : ''}"><a href="#/t/${c.id}/${tp.id}"><span class="tn">${dn ? '✓' : n(i + 1)}</span><span class="tt">${esc(t(tp.title))}</span>${impTag(tp.stars)}</a></li>`;
    }).join('');
    const st2 = q ? stars(q.best / q.total) : 0;
    const cqList = c.cq.map((q, i) => {
      const b = s.cq[c.id + '/' + i];
      return `<li class="${b ? 'done' : ''}"><a href="#/cq/${c.id}/${i}"><span class="tn mk m${q.m}">${n(q.m)}</span><span class="tt">${esc(q.q.en)}</span><span class="small muted">${b ? n(b.best) + '/' + n(q.m) : ''}</span></a></li>`;
    }).join('');
    const ct = s.cqt[c.id];
    paint(`
      <a class="crumb" href="#/">← ${u('chapters')}</a>
      <header class="chap-head" style="--c:${c.color}">
        <div class="kicker">${u('chapter')} ${n(c.num)}</div>
        <h1>${esc(t(c.title))}</h1>
        <p class="muted" style="margin:0 0 8px">${esc(t(c.blurb))}</p>
        <div class="pbar"><span style="width:${d / c.topics.length * 100}%"></span></div>
        <p class="src" style="margin:6px 0 0">${n(d)}/${n(c.topics.length)} ${u('done')} · ${u('slides')}: ${esc(c.source)}</p>
      </header>
      <div class="sec-title"><h2>${u('topics')[0].toUpperCase() + u('topics').slice(1)}</h2></div>
      <ol class="topic-list">${list}</ol>
      <a class="card mixcard" href="#/quiz/${c.id}" style="border:2px solid ${c.color}">
        <span class="ico">📝</span>
        <span class="grow"><b>${u('quiz')}</b><p class="muted small">${n(c.quiz.length)} ${u('questions')} · ${q ? `${u('best')}: ${n(q.best)}/${n(q.total)}` : u('notTaken')}</p></span>
        <span class="qstars">${'★'.repeat(st2)}<span class="off">${'★'.repeat(3 - st2)}</span></span>
      </a>
      <div class="sec-title"><h2>${u('cqSec')}</h2></div>
      <p class="muted small" style="margin-top:-6px">${u('cqSecSub')}</p>
      <ol class="topic-list">${cqList}</ol>
      <a class="card mixcard" href="#/cqtest/${c.id}" style="border:2px solid var(--hl)"><span class="ico">📜</span><span class="grow"><b>${u('cqTest')}</b><p class="muted small">${u('cqTestSub')}${ct ? ` · ${u('best')}: ${n(ct.best)}/${n(ct.total)}` : ''}</p></span></a>
    `, 'home');
  }

  /* ---------------- TOPIC ---------------- */
  let noteTimer;
  function renderTopic(cid, tid) {
    const c = CH.find(x => x.id === cid); if (!c) return renderHome();
    const i = c.topics.findIndex(x => x.id === tid); if (i < 0) return renderChapter(cid);
    const tp = c.topics[i], key = tkey(c.id, tp.id), s = S();
    const dn = !!s.done[key];
    const note = (s.notes['topic:' + key] || {}).text || '';
    const prev = c.topics[i - 1], next = c.topics[i + 1];
    const vis = tp.visual ? `<figure class="visual" data-vis="${tp.visual}"><figcaption>🖼️ ${u('visual')}</figcaption>${visHTML(tp.visual)}</figure>` : '';
    paint(`
      <article class="topic-page" style="--c:${c.color}">
        <a class="crumb" href="#/ch/${c.id}">← ${u('chapter')} ${n(c.num)} · ${esc(t(c.title))}</a>
        <header class="topic-head">
          <h1>${esc(t(tp.title))}</h1>
          <div class="row wrap">${impTag(tp.stars)}<span class="muted small">${n(i + 1)}/${n(c.topics.length)}</span>${dn ? `<span class="done-flag small">${u('learned')}</span>` : ''}</div>
        </header>
        <div class="prose">${t(tp.body)}</div>
        ${vis}
        <section class="example"><h3>${u('example')}</h3>${t(tp.example)}</section>
        <section class="exam">
          <button class="btn sm ghost copy" data-act="copy-exam">${u('copy')}</button>
          <h3>${u('examTitle')}</h3>
          <p class="sub"><span class="en-tag">EN</span> ${u('examSub')}</p>
          <ul>${tp.exam.map(x => `<li>${x}</li>`).join('')}</ul>
        </section>
        <section class="mynote">
          <h3>${u('myNote')}</h3>
          <textarea id="note" placeholder="${u('notePh')}" aria-label="${u('myNote')}">${esc(note)}</textarea>
          <div class="saved" id="savedMsg"></div>
        </section>
        <div class="actions">
          <button class="btn hl-btn" data-act="doubt">${u('dontGet')}</button>
          ${dn ? `<button class="btn ok" disabled>${u('learned')}</button>` : `<button class="btn primary" data-act="done">${u('gotIt')}</button>`}
        </div>
        <nav class="pager">
          ${prev ? `<a class="btn" href="#/t/${c.id}/${prev.id}"><span>← ${u('prev')}<small>${esc(t(prev.title))}</small></span></a>` : '<span></span>'}
          ${next ? `<a class="btn" href="#/t/${c.id}/${next.id}"><span>${u('next')} →<small>${esc(t(next.title))}</small></span></a>` : `<a class="btn primary" href="#/quiz/${c.id}">📝 ${u('takeQuiz')}</a>`}
        </nav>
      </article>
    `, 'home');
    const ta = $('#note');
    ta.addEventListener('input', () => {
      clearTimeout(noteTimer);
      noteTimer = setTimeout(() => {
        act(st => { st.notes['topic:' + key] = { text: ta.value, ts: Date.now() }; }, { silent: true });
        $('#savedMsg').textContent = u('saved');
      }, 700);
    });
    view.querySelector('[data-act="done"]')?.addEventListener('click', () => {
      act(st => { st.done[key] = Date.now(); });
      if (!S().badges.first || Object.keys(S().done).length % 5 === 0) confetti();
      if (next) setTimeout(() => { location.hash = `#/t/${c.id}/${next.id}`; }, 650);
      else renderTopic(cid, tid);
    });
    view.querySelector('[data-act="doubt"]').addEventListener('click', () => openDoubt(key, tp));
    view.querySelector('[data-act="copy-exam"]').addEventListener('click', e => {
      const txt = t(tp.title).length ? tp.title.en + '\n' + tp.exam.map(x => '• ' + x.replace(/<[^>]+>/g, '')).join('\n') : '';
      navigator.clipboard?.writeText(txt).then(() => { e.target.textContent = u('copied'); });
    });
  }

  function openDoubt(key, tp, prefill) {
    const sel = prefill != null ? '' : lastSel;
    openSheet(`<h2>${u('doubtTitle')}</h2><p class="muted small">${u('doubtHint')}</p>
      ${sel ? `<blockquote class="doubt" style="margin:0 0 10px;padding:8px 10px;border-left:3px solid var(--hl);background:var(--hl-soft);border-radius:0 8px 8px 0">${esc(sel)}</blockquote>` : ''}
      <textarea id="dtext" placeholder="${u('doubtPh')}">${esc(prefill || '')}</textarea>
      <div class="row mt"><button class="btn grow" data-close>${u('cancel')}</button><button class="btn primary grow" id="dsave">${u('save')}</button></div>`, panel => {
      $('#dsave', panel).addEventListener('click', () => {
        const text = $('#dtext', panel).value.trim();
        if (!text && !sel) { $('#dtext', panel).focus(); return; }
        const id = 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
        act(s => { s.doubts[id] = { topic: key, quote: sel, text, ts: Date.now(), mts: Date.now(), resolved: false }; }, { silent: true });
        closeSheet(); toast(u('doubtSaved'));
      });
    });
  }

  /* ---------------- QUIZ ---------------- */
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function buildQuiz(id) {
    let pool;
    if (id === 'mix') pool = shuffle(CH.flatMap(c => c.quiz.map(q => ({ ...q, ch: c })))).slice(0, 15);
    else { const c = CH.find(x => x.id === id); if (!c) return null; pool = shuffle(c.quiz.map(q => ({ ...q, ch: c }))); }
    return { id, qs: pool.map(q => ({ ...q, order: shuffle(q.o.map((_, i) => i)) })), i: 0, picks: [], done: false, gain: 0 };
  }
  function renderQuiz(id) {
    if (!QZ || QZ.id !== id) QZ = buildQuiz(id);
    if (!QZ) return renderHome();
    if (QZ.done) return renderResult();
    const q = QZ.qs[QZ.i], picked = QZ.picks[QZ.i];
    const title = id === 'mix' ? u('mixTitle') : `${u('chapter')} ${n(q.ch.num)} · ${u('quiz')}`;
    const dots = QZ.qs.map((qq, k) => `<i class="${k < QZ.picks.length ? (QZ.picks[k] === qq.a ? 'r' : 'w') : k === QZ.i ? 'c' : ''}"></i>`).join('');
    const L = ['A', 'B', 'C', 'D', 'E'];
    const opts = q.order.map((oi, k) => {
      let cls = '';
      if (picked != null) { if (oi === q.a) cls = 'right'; else if (oi === picked) cls = 'wrong'; }
      return `<button class="opt ${cls}" data-oi="${oi}" ${picked != null ? 'disabled' : ''}><span class="l">${L[k]}</span><span>${t(q.o[oi])}</span></button>`;
    }).join('');
    const last = QZ.i === QZ.qs.length - 1;
    paint(`
      <a class="crumb" href="${id === 'mix' ? '#/' : '#/ch/' + id}">← ${id === 'mix' ? u('chapters') : u('backCh')}</a>
      <div class="qhead"><h2 style="margin:0">${title}</h2><span class="muted">${n(QZ.i + 1)}${u('of')}${n(QZ.qs.length)}</span></div>
      <div class="qdots">${dots}</div>
      <div class="card">
        ${id === 'mix' ? `<p class="muted small" style="margin:0 0 6px">${u('chapter')} ${n(q.ch.num)} · ${esc(t(q.ch.title))}</p>` : ''}
        <div class="qtext">${t(q.q)}</div>
        <div class="opts">${opts}</div>
        ${picked != null ? `<div class="why"><b>${picked === q.a ? '✅ ' + u('correct') : '❌ ' + u('wrong')}</b> ${u('why')} ${t(q.why)}</div>
          <button class="btn primary block mt" id="qnext">${last ? u('finish') : u('nextQ')}</button>` : ''}
      </div>
    `, 'home');
    $$('.opt', view).forEach(b => b.addEventListener('click', () => {
      QZ.picks[QZ.i] = +b.dataset.oi;
      if (navigator.vibrate) navigator.vibrate(+b.dataset.oi === q.a ? 15 : [30, 40, 30]);
      renderQuiz(id);
      $('#qnext')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }));
    $('#qnext')?.addEventListener('click', () => {
      if (last) {
        const score = QZ.picks.filter((p, k) => p === QZ.qs[k].a).length, total = QZ.qs.length;
        QZ.done = true; QZ.score = score;
        QZ.gain = act(s => {
          const old = s.quiz[id] || { best: 0, total, attempts: 0, perfect: 0 };
          s.quiz[id] = { best: Math.max(old.best || 0, score), total, attempts: (old.attempts || 0) + 1, perfect: (old.perfect || score === total) ? 1 : 0, ts: Date.now() };
        }, { silent: true });
        if (score / total >= 0.8) confetti();
      } else QZ.i++;
      renderQuiz(id); window.scrollTo(0, 0);
    });
  }
  function renderResult() {
    const id = QZ.id, total = QZ.qs.length, score = QZ.score, pct = score / total, st = stars(pct);
    const msg = pct === 1 ? u('perfectMsg') : pct >= 0.8 ? u('goodMsg') : pct >= 0.5 ? u('okMsg') : u('lowMsg');
    const wrong = QZ.qs.map((q, k) => ({ q, p: QZ.picks[k], k })).filter(x => x.p !== x.q.a);
    const rev = wrong.map(({ q, p, k }) => `<div class="card"><p><b>${t(q.q)}</b></p>
      <p class="small">❌ ${u('yourAns')}: ${t(q.o[p])}</p><p class="small">✅ ${u('rightAns')}: <b>${t(q.o[q.a])}</b></p>
      <p class="small muted">${t(q.why)}</p>
      <button class="btn sm" data-add="${k}">🤔 ${u('addDoubt')}</button></div>`).join('');
    paint(`
      <div class="result card">
        <h2>${u('resultTitle')}</h2>
        <div class="ring" style="--p:${Math.round(pct * 100)}"><div>${n(score)}/${n(total)}</div></div>
        <div class="bigstars">${'★'.repeat(st)}<span class="off">${'★'.repeat(3 - st)}</span></div>
        <p style="font-weight:600;margin:6px 0">${msg}</p>
        ${QZ.gain > 0 ? `<div class="xp-gain">+${n(QZ.gain)} ${u('xpEarned')}</div>` : '<div style="height:10px"></div>'}
        <div class="row"><button class="btn grow" id="retry">${u('retry')}</button><a class="btn primary grow" href="${id === 'mix' ? '#/revise' : '#/ch/' + id}">${id === 'mix' ? u('revise') : u('backCh')}</a></div>
      </div>
      ${wrong.length ? `<div class="sec-title"><h2>${u('review')}</h2></div><div class="review">${rev}</div>` : ''}
    `, 'home');
    $('#retry').addEventListener('click', () => { QZ = buildQuiz(id); renderQuiz(id); window.scrollTo(0, 0); });
    $$('[data-add]', view).forEach(b => b.addEventListener('click', () => {
      const q = QZ.qs[+b.dataset.add];
      const tid = 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
      const plain = h => String(h).replace(/<[^>]+>/g, '');
      act(s => { s.doubts[tid] = { topic: q.ch.id + '/' + q.ch.topics[0].id, chapterOnly: true, quote: plain(t(q.q)), text: '✅ ' + plain(t(q.o[q.a])) + ': ' + plain(t(q.why)), ts: Date.now(), mts: Date.now(), resolved: false }; }, { silent: true });
      b.disabled = true; b.textContent = '✓ ' + u('added');
    }));
  }


  /* ---------------- CQ PRACTICE ---------------- */
  const cqReveal = {};
  let cqTimer = null, cqEnd = 0, draftTimer;
  const mmss = sec => { sec = Math.max(0, Math.round(sec)); return n(String(Math.floor(sec / 60)).padStart(2, '0') + ':' + String(sec % 60).padStart(2, '0')); };
  function stopCqTimer() { clearInterval(cqTimer); cqTimer = null; }
  const mkTag = m => `<span class="mk m${m}">${n(m)} ${u('marks')}</span>`;
  function rubricHTML(q, ticks, attr) {
    return `<div class="rubric">${q.rub.map((r, k) => `<label><input type="checkbox" ${attr}="${k}" ${ticks.has(k) ? 'checked' : ''}><span>${esc(r[0])}</span><b>${n(r[1])}</b></label>`).join('')}</div>`;
  }
  const tickScore = (q, ticks) => Math.round(q.rub.reduce((a, r, k) => a + (ticks.has(k) ? r[1] : 0), 0) * 100) / 100;

  function renderCQ(cid, idx) {
    const c = CH.find(x => x.id === cid); if (!c) return renderHome();
    const i = +idx, q = c.cq[i]; if (!q) return renderChapter(cid);
    const key = cid + '/' + i, s = S(), best = s.cq[key], draft = (s.drafts[key] || {}).text || '';
    const rev = cqReveal[key];
    const prev = c.cq[i - 1], next = c.cq[i + 1];
    paint(`
      <a class="crumb" href="#/ch/${c.id}">← ${u('chapter')} ${n(c.num)} · ${esc(t(c.title))}</a>
      <div class="row wrap" style="margin-bottom:10px">${mkTag(q.m)}<span class="muted small">${n(i + 1)}/${n(c.cq.length)} · ⏱ ${n(cqMins(q.m))} ${u('min')}</span>${best ? `<span class="done-flag small">${u('bestMark')}: ${n(best.best)}/${n(q.m)}</span>` : ''}</div>
      <div class="card cq-q"><p class="cq-en">${esc(q.q.en)}</p>${LANG === 'bn' ? `<p class="muted small" style="margin:0">${esc(q.q.bn)}</p>` : ''}</div>
      <details class="written guide"><summary>💡 ${u('howTo').replace('this-mark', q.m + '-mark')}</summary><div class="ans">${u('guide' + q.m)}</div></details>
      <section class="mynote">
        <div class="row" style="justify-content:space-between;margin-bottom:6px"><h3 style="margin:0">${u('yourAnswer')}</h3><button class="btn sm" id="tmr">${cqTimer ? mmss((cqEnd - Date.now()) / 1000) : u('startTimer') + ' ' + n(cqMins(q.m)) + "'"}</button></div>
        <textarea id="cqans" class="cq-ta" placeholder="${u('ansPh')}" spellcheck="true" lang="en">${esc(draft)}</textarea>
        <div class="saved" id="savedMsg"></div>
      </section>
      ${rev ? `
        <section class="model"><h3>${u('modelAns')}</h3><div class="prose">${q.ans}</div></section>
        <section class="card rubric-card"><h3>${u('rubric')}</h3><p class="muted small">${u('rubricSub')}</p>
          ${rubricHTML(q, rev, 'data-rk')}
          <div class="rub-total">${u('yourScore')}: <b id="rscore">${n(tickScore(q, rev))}</b> / ${n(q.m)}</div>
          <button class="btn ok block" id="savescore">${u('saveScore')}</button>
        </section>` : `<button class="btn primary block big" id="reveal">${u('showModel')}</button>`}
      <nav class="pager mt">
        ${prev ? `<a class="btn" href="#/cq/${c.id}/${i - 1}"><span>← ${u('prevQ')}<small>${n(prev.m)} ${u('marks')}</small></span></a>` : '<span></span>'}
        ${next ? `<a class="btn" href="#/cq/${c.id}/${i + 1}"><span>${u('nextCQ')} →<small>${n(next.m)} ${u('marks')}</small></span></a>` : `<a class="btn primary" href="#/cqtest/${c.id}">📜 ${u('cqTest')}</a>`}
      </nav>`, 'home');
    const ta = $('#cqans');
    ta.addEventListener('input', () => {
      clearTimeout(draftTimer);
      draftTimer = setTimeout(() => { act(st => { st.drafts[key] = { text: ta.value, ts: Date.now() }; }, { silent: true }); $('#savedMsg').textContent = u('saved'); }, 700);
    });
    $('#tmr').addEventListener('click', () => {
      if (cqTimer) { stopCqTimer(); $('#tmr').textContent = u('startTimer'); return; }
      cqEnd = Date.now() + cqMins(q.m) * 60000;
      cqTimer = setInterval(() => {
        const left = (cqEnd - Date.now()) / 1000, b = $('#tmr');
        if (b) b.textContent = mmss(left);
        if (left <= 0) { stopCqTimer(); toast(u('timeUp')); if (navigator.vibrate) navigator.vibrate([200, 100, 200]); if (b) b.textContent = u('timeUp'); }
      }, 1000);
      $('#tmr').textContent = mmss(cqMins(q.m) * 60);
      ta.focus();
    });
    $('#reveal')?.addEventListener('click', () => { cqReveal[key] = new Set(); stopCqTimer(); renderCQ(cid, idx); $('.model')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    $$('[data-rk]', view).forEach(cb => cb.addEventListener('change', () => {
      const k = +cb.dataset.rk; cb.checked ? rev.add(k) : rev.delete(k);
      $('#rscore').textContent = n(tickScore(q, rev));
    }));
    $('#savescore')?.addEventListener('click', () => {
      const sc = tickScore(q, rev);
      act(st => { const o = st.cq[key] || { best: 0 }; st.cq[key] = { best: Math.max(o.best || 0, sc), ts: Date.now() }; });
      if (sc >= q.m) confetti();
      renderCQ(cid, idx);
    });
  }

  /* ---------------- CQ MODEL TEST ---------------- */
  let CT = null, ctTimer = null;
  function buildCT(id) {
    const pick = (arr, m) => shuffle(arr.filter(x => x.q.m === m));
    const all = c => c.cq.map((q, i) => ({ c, i, q }));
    let items = [];
    if (id === 'mix') {
      const pool = CH.flatMap(all);
      [2, 2, 3, 3, 5, 5].forEach(m => {
        const used = new Set(items.map(x => x.c.id));
        const cand = pick(pool, m).filter(x => !items.includes(x));
        items.push(cand.find(x => !used.has(x.c.id)) || cand[0]);
      });
    } else {
      const c = CH.find(x => x.id === id); if (!c) return null;
      [2, 3, 5].forEach(m => { const p = pick(all(c), m); if (p[0]) items.push(p[0]); });
    }
    items = items.filter(Boolean);
    const total = items.reduce((a, x) => a + x.q.m, 0);
    const mins = items.reduce((a, x) => a + cqMins(x.q.m), 0);
    return { id, items, total, mins, phase: 'write', answers: items.map(() => ''), ticks: items.map(() => new Set()), end: Date.now() + mins * 60000 };
  }
  function ctTick() {
    clearInterval(ctTimer);
    ctTimer = setInterval(() => {
      if (!CT || CT.phase !== 'write') { clearInterval(ctTimer); return; }
      const left = (CT.end - Date.now()) / 1000, el = $('#ctime');
      if (el) { el.textContent = mmss(left); el.classList.toggle('low', left < 120); }
      if (left <= 0) { clearInterval(ctTimer); toast(u('timeUp')); if (navigator.vibrate) navigator.vibrate([300, 100, 300]); CT.phase = 'grade'; renderCQTest(CT.id); window.scrollTo(0, 0); }
    }, 1000);
  }
  function renderCQTest(id) {
    if (!CT || CT.id !== id) { CT = buildCT(id); if (CT) ctTick(); }
    if (!CT) return renderHome();
    const title = id === 'mix' ? u('cqMixTitle') : `${u('chapter')} ${n(CH.find(x => x.id === id).num)} · ${u('cqTest')}`;
    const back = id === 'mix' ? '#/' : '#/ch/' + id;
    const qhead = (x, k) => `<div class="row wrap" style="margin-bottom:6px"><b>${u('item')} ${n(k + 1)}</b>${mkTag(x.q.m)}${id === 'mix' ? `<span class="muted small">${u('chapter')} ${n(x.c.num)}</span>` : ''}</div><p class="cq-en">${esc(x.q.q.en)}</p>${LANG === 'bn' ? `<p class="muted small">${esc(x.q.q.bn)}</p>` : ''}`;
    if (CT.phase === 'write') {
      paint(`
        <a class="crumb" href="${back}">← ${u('backCh')}</a>
        <div class="testbar"><span><b>${title}</b><small class="muted"> · ${u('total')} ${n(CT.total)} ${u('marks')}</small></span><span class="clock" id="ctime">${mmss((CT.end - Date.now()) / 1000)}</span></div>
        ${CT.items.map((x, k) => `<div class="card mt">${qhead(x, k)}<textarea class="cq-ta" data-ci="${k}" placeholder="${u('ansPh')}" lang="en">${esc(CT.answers[k])}</textarea></div>`).join('')}
        <button class="btn primary block big mt" id="ctsubmit">📜 ${u('submit')}</button>`, 'home');
      $$('[data-ci]', view).forEach(ta => ta.addEventListener('input', () => { CT.answers[+ta.dataset.ci] = ta.value; }));
      $('#ctsubmit').addEventListener('click', () => { if (!confirm(u('submitConfirm'))) return; CT.phase = 'grade'; clearInterval(ctTimer); renderCQTest(id); window.scrollTo(0, 0); });
      return;
    }
    const sum = () => Math.round(CT.items.reduce((a, x, k) => a + tickScore(x.q, CT.ticks[k]), 0) * 100) / 100;
    if (CT.phase === 'grade') {
      paint(`
        <a class="crumb" href="${back}">← ${u('backCh')}</a>
        <h1>${u('rubric')}</h1><p class="muted">${u('rubricSub')}</p>
        ${CT.items.map((x, k) => `<div class="card mt">${qhead(x, k)}
          <h3 class="small">${u('yourWritten')}</h3><div class="user-ans">${CT.answers[k].trim() ? esc(CT.answers[k]) : `<i class="muted">${u('noAnswer')}</i>`}</div>
          <section class="model"><h3>${u('modelAns')}</h3><div class="prose">${x.q.ans}</div></section>
          ${rubricHTML(x.q, CT.ticks[k], 'data-ct="' + k + '" data-rk')}
          <div class="rub-total">${u('yourScore')}: <b data-sc="${k}">${n(tickScore(x.q, CT.ticks[k]))}</b> / ${n(x.q.m)}</div></div>`).join('')}
        <div class="testbar bottom"><span>${u('total')}: <b id="cttotal">${n(sum())}</b> / ${n(CT.total)}</span><button class="btn ok" id="ctsave">${u('finishTest')}</button></div>`, 'home');
      $$('[data-ct]', view).forEach(cb => cb.addEventListener('change', () => {
        const k = +cb.dataset.ct, r = +cb.dataset.rk;
        cb.checked ? CT.ticks[k].add(r) : CT.ticks[k].delete(r);
        $(`[data-sc="${k}"]`).textContent = n(tickScore(CT.items[k].q, CT.ticks[k]));
        $('#cttotal').textContent = n(sum());
      }));
      $('#ctsave').addEventListener('click', () => {
        const total = sum();
        CT.score = total; CT.phase = 'done';
        CT.gain = act(st => {
          CT.items.forEach((x, k) => { const key = x.c.id + '/' + x.i, sc = tickScore(x.q, CT.ticks[k]); const o = st.cq[key] || { best: 0 }; st.cq[key] = { best: Math.max(o.best || 0, sc), ts: Date.now() }; });
          const o = st.cqt[id] || { best: 0, attempts: 0 };
          st.cqt[id] = { best: Math.max(o.best || 0, total), total: CT.total, attempts: (o.attempts || 0) + 1, ts: Date.now() };
        }, { silent: true });
        if (total / CT.total >= 0.7) confetti();
        renderCQTest(id); window.scrollTo(0, 0);
      });
      return;
    }
    const pct = CT.score / CT.total;
    const msg = pct === 1 ? u('perfectMsg') : pct >= 0.8 ? u('goodMsg') : pct >= 0.5 ? u('okMsg') : u('lowMsg');
    paint(`
      <div class="result card"><h2>${u('testDone')}</h2>
        <div class="ring" style="--p:${Math.round(pct * 100)}"><div>${n(CT.score)}/${n(CT.total)}</div></div>
        <p style="font-weight:600">${msg}</p>
        ${CT.gain > 0 ? `<div class="xp-gain">+${n(CT.gain)} ${u('xpEarned')}</div>` : ''}
        <div class="list" style="text-align:left">${CT.items.map((x, k) => `<a class="btn" style="justify-content:space-between" href="#/cq/${x.c.id}/${x.i}"><span>${mkTag(x.q.m)} ${esc(x.q.q.en.slice(0, 48))}…</span><b>${n(tickScore(x.q, CT.ticks[k]))}/${n(x.q.m)}</b></a>`).join('')}</div>
        <div class="row mt"><button class="btn grow" id="ctagain">${u('retry')}</button><a class="btn primary grow" href="${back}">${id === 'mix' ? u('backHome') : u('backCh')}</a></div>
      </div>`, 'home');
    $('#ctagain').addEventListener('click', () => { CT = null; renderCQTest(id); window.scrollTo(0, 0); });
  }

  function renderReviseCQ(mk) {
    const m = +mk || 0;
    const tabs = `<div class="seg" style="margin:12px 0"><a class="segl" href="#/revise">${u('examPoints')}</a><a class="segl on" href="#/revise/cq">${u('cqAnswers')}</a></div>`;
    const chips = `<div class="chips">${[0, 2, 3, 5].map(x => `<a class="chip ${m === x ? 'on' : ''}" href="#/revise/cq${x ? '/' + x : ''}">${x ? n(x) + ' ' + u('marks') : u('allMarks')}</a>`).join('')}</div>`;
    const body = CH.map(c => {
      const qs = c.cq.map((q, i) => ({ q, i })).filter(x => !m || x.q.m === m);
      if (!qs.length) return '';
      return `<div class="rev-ch" style="--c:${c.color}">${u('chapter')} ${n(c.num)}: ${esc(t(c.title))}</div>` + qs.map(({ q, i }) => `
        <details class="written cqd"><summary>${mkTag(q.m)} ${esc(q.q.en)}</summary><div class="ans prose">${q.ans}<p class="mt"><a class="btn sm" href="#/cq/${c.id}/${i}">✍️ ${u('yourAnswer').replace('✍️ ', '')}</a></p></div></details>`).join('');
    }).join('');
    paint(`<h1>${u('revTitle')}</h1>${tabs}${chips}<a class="btn primary block mt" href="#/cqtest/mix">📜 ${u('cqMixTitle')}</a>${body}`, 'revise');
  }

  /* ---------------- REVISE ---------------- */
  function renderRevise(filter) {
    const only = sessionStorage.getItem('dbp-only3') === '1';
    const chips = `<div class="chips"><a class="chip ${!filter ? 'on' : ''}" href="#/revise">${u('all')}</a>${CH.map(c => `<a class="chip ${filter === c.id ? 'on' : ''}" href="#/revise/${c.id}">${n(c.num)}. ${esc(t(c.title)).slice(0, 26)}${t(c.title).length > 26 ? '…' : ''}</a>`).join('')}</div>`;
    const body = CH.filter(c => !filter || c.id === filter).map(c => {
      const tps = c.topics.filter(tp => !only || tp.stars === 3);
      if (!tps.length) return '';
      return `<div class="rev-ch" style="--c:${c.color}">${u('chapter')} ${n(c.num)}: ${esc(t(c.title))}</div>` + tps.map(tp => `
        <div class="card rev-topic exam" style="border-width:1px">
          <h3><a href="#/t/${c.id}/${tp.id}">${esc(t(tp.title))}</a>${impTag(tp.stars)}</h3>
          <ul>${tp.exam.map(x => `<li>${x}</li>`).join('')}</ul>
        </div>`).join('');
    }).join('');
    paint(`
      <h1>${u('revTitle')}</h1>
      <div class="seg" style="margin:12px 0"><a class="segl on" href="#/revise">${u('examPoints')}</a><a class="segl" href="#/revise/cq">${u('cqAnswers')}</a></div>
      <p class="muted">${u('revSub')}</p>
      ${chips}
      <label class="toggle"><input type="checkbox" id="only3" ${only ? 'checked' : ''}> ${u('onlyMust')}</label>
      <a class="btn primary block" href="#/quiz/mix">${u('mixBtn')}</a>
      ${body}
    `, 'revise');
    $('#only3').addEventListener('change', e => { sessionStorage.setItem('dbp-only3', e.target.checked ? '1' : '0'); renderRevise(filter); });
  }

  /* ---------------- NOTES ---------------- */
  function topicByKey(k) {
    const [cid, tid] = k.split('/'); const c = CH.find(x => x.id === cid); const tp = c && c.topics.find(x => x.id === tid);
    return c && tp ? { c, tp } : null;
  }
  function renderNotes(tab) {
    tab = tab || 'doubts';
    let content = '';
    if (tab === 'doubts') {
      const ds = doubtList().sort((a, b) => (a.resolved - b.resolved) || (b.ts - a.ts));
      content = ds.length ? ds.map(d => {
        const ref = topicByKey(d.topic);
        const title = ref ? (d.chapterOnly ? t(ref.c.title) : t(ref.tp.title)) : '';
        const qText = [ref ? (d.chapterOnly ? ref.c.title.en : ref.tp.title.en) : '', d.quote || d.text].join(' ').slice(0, 160) + ' DBMS';
        return `<div class="card doubt ${d.resolved ? 'res' : ''}">
          <p class="small muted" style="margin:0 0 4px">${ref ? `${u('chapter')} ${n(ref.c.num)} · ${esc(title)}` : ''}${d.resolved ? ` · ✅ ${u('resolvedLbl')}` : ''}</p>
          ${d.quote ? `<blockquote>${esc(d.quote)}</blockquote>` : ''}
          ${d.text ? `<div class="q">${esc(d.text)}</div>` : ''}
          <div class="row wrap">
            <a class="btn sm" target="_blank" rel="noopener" href="https://www.google.com/search?q=${encodeURIComponent(qText)}">🔎 ${u('searchG')}</a>
            <a class="btn sm" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=${encodeURIComponent(qText)}">▶️ ${u('searchY')}</a>
            ${ref && !d.chapterOnly ? `<a class="btn sm" href="#/t/${ref.c.id}/${ref.tp.id}">${u('open')}</a>` : ''}
          </div>
          <div class="row wrap">
            <button class="btn sm ${d.resolved ? '' : 'ok'}" data-res="${d.id}">${d.resolved ? u('unresolve') : u('resolved')}</button>
            <button class="btn sm ghost" data-del="${d.id}">🗑 ${u('del')}</button>
          </div></div>`;
      }).join('') : `<div class="empty"><div class="big">🤔</div><b>${u('noDoubt')}</b><p class="small">${u('noDoubtSub')}</p></div>`;
    } else {
      const ns = notesList().sort((a, b) => b.ts - a.ts);
      content = `<button class="btn block" id="newNote">${u('newNote')}</button>` + (ns.length ? ns.map(x => {
        const isTopic = x.k.startsWith('topic:');
        const ref = isTopic ? topicByKey(x.k.slice(6)) : null;
        const head = ref ? `${u('chapter')} ${n(ref.c.num)} · ${esc(t(ref.tp.title))}` : esc(x.title || u('general'));
        return `<div class="card"><p class="small muted" style="margin:0 0 6px"><b>${head}</b></p><div style="white-space:pre-wrap">${esc(x.text)}</div>
          <div class="row wrap mt">${ref ? `<a class="btn sm" href="#/t/${ref.c.id}/${ref.tp.id}">${u('open')}</a>` : `<button class="btn sm" data-edit="${esc(x.k)}">✏️</button>`}
          <button class="btn sm ghost" data-delnote="${esc(x.k)}">🗑 ${u('del')}</button></div></div>`;
      }).join('') : `<div class="empty"><div class="big">📝</div><b>${u('noNotes')}</b><p class="small">${u('noNotesSub')}</p></div>`);
    }
    paint(`
      <h1>${u('notes')}</h1>
      <div class="seg"><button class="${tab === 'doubts' ? 'on' : ''}" data-tab="doubts">🤔 ${u('doubts')} (${n(doubtList().filter(d => !d.resolved).length)})</button><button class="${tab === 'mine' ? 'on' : ''}" data-tab="mine">📝 ${u('myNotes')} (${n(notesList().length)})</button></div>
      <div class="list">${content}</div>
    `, 'notes');
    $$('.seg button', view).forEach(b => b.addEventListener('click', () => { location.hash = '#/notes/' + b.dataset.tab; }));
    $$('[data-res]', view).forEach(b => b.addEventListener('click', () => {
      const id = b.dataset.res;
      act(s => { s.doubts[id] = { ...s.doubts[id], resolved: !s.doubts[id].resolved, mts: Date.now() }; });
      renderNotes(tab);
    }));
    $$('[data-del]', view).forEach(b => b.addEventListener('click', () => {
      if (!confirm(u('confirmDel'))) return;
      const id = b.dataset.del; act(s => { s.doubts[id] = { ...s.doubts[id], deleted: true, mts: Date.now() }; }, { silent: true }); renderNotes(tab);
    }));
    $$('[data-delnote]', view).forEach(b => b.addEventListener('click', () => {
      if (!confirm(u('confirmDel'))) return;
      const k = b.dataset.delnote; act(s => { s.notes[k] = { text: '', ts: Date.now() }; }, { silent: true }); renderNotes(tab);
    }));
    const editNote = k => {
      const cur = k ? S().notes[k] : { title: '', text: '' };
      openSheet(`<h2>${u('newNote').replace('＋ ', '')}</h2><input type="text" id="ntitle" placeholder="${u('noteTitle')}" value="${esc(cur.title || '')}"><textarea id="ntext" class="mt" style="margin-top:10px;min-height:160px" placeholder="${u('notePh')}">${esc(cur.text || '')}</textarea>
        <div class="row mt"><button class="btn grow" data-close>${u('cancel')}</button><button class="btn primary grow" id="nsave">${u('save')}</button></div>`, panel => {
        $('#nsave', panel).addEventListener('click', () => {
          const text = $('#ntext', panel).value; if (!text.trim()) return;
          const key = k || 'free:' + Date.now().toString(36);
          act(s => { s.notes[key] = { title: $('#ntitle', panel).value.trim(), text, ts: Date.now() }; }, { silent: true });
          closeSheet(); renderNotes('mine');
        });
      });
    };
    $('#newNote')?.addEventListener('click', () => editNote(null));
    $$('[data-edit]', view).forEach(b => b.addEventListener('click', () => editNote(b.dataset.edit)));
  }

  /* ---------------- ME ---------------- */
  function syncHTML() {
    if (!Sync.enabled) return `<p class="small">${u('syncOff')}</p>`;
    if (Sync.status === 'loading') return `<p class="small">${u('syncLoading')}</p>`;
    if (Sync.status === 'error' && !Sync.user) return `<p class="small" style="color:var(--bad)">${u('syncErr')} ${esc(Sync.error)}</p><button class="btn primary" data-act="signin">${u('signIn')}</button>`;
    if (!Sync.user) return `<p class="small">${u('signedOutTxt')}</p><button class="btn primary" data-act="signin">🔐 ${u('signIn')}</button>`;
    const st = Sync.status === 'synced' ? u('synced') : Sync.status === 'offline' ? u('offline') : Sync.status === 'error' ? `${u('syncErr')} ${esc(Sync.error)}` : u('syncing');
    return `<div class="row">${Sync.user.photoURL ? `<img class="avatar" src="${esc(Sync.user.photoURL)}" alt="" referrerpolicy="no-referrer">` : '👤'}<div class="grow"><b>${u('syncedAs')} ${esc(Sync.user.displayName || Sync.user.email || '')}</b><p class="small muted" style="margin:0">${st}</p></div></div><button class="btn sm mt" data-act="signout">${u('signOut')}</button>`;
  }
  function renderMe() {
    const s = S(), xp = xpOf(s), lv = levelOf(xp), st = streakOf(s);
    const passed = CH.filter(c => s.quiz[c.id] && s.quiz[c.id].best / s.quiz[c.id].total >= 0.6).length;
    const totalT = allTopics().length;
    const th = localStorage.getItem('dbp-theme') || 'auto';
    paint(`
      <div class="card">
        <div class="lvl"><div class="ring" style="--p:${lv.pct}"><div>${n(lv.i)}</div></div>
          <div><p class="muted small" style="margin:0">${u('level')} ${n(lv.i)}</p><h2 style="margin:0">${lv.name}</h2><p class="small muted" style="margin:4px 0 0">${n(xp)} XP · ${u('toNext')}: ${n(lv.hi)} XP</p></div></div>
        <div class="stats">
          <div class="stat"><b>🔥 ${n(st)}</b><span>${u('streak')}</span></div>
          <div class="stat"><b>${n(Object.keys(s.done).length)}/${n(totalT)}</b><span>${u('topicsDone')}</span></div>
          <div class="stat"><b>${n(passed)}/${n(CH.length)}</b><span>${u('quizzes')}</span></div>
        </div>
      </div>
      <div class="sec-title"><h2>${u('badges')}</h2><span class="muted small">${n(Object.keys(s.badges).length)}/${n(BADGES.length)}</span></div>
      <div class="badges">${BADGES.map(b => `<div class="bdg ${s.badges[b.id] ? 'got' : 'lock'}"><div class="e">${b.e}</div><b>${esc(t(b.n))}</b><small>${esc(t(b.d))}</small></div>`).join('')}</div>
      <div class="sec-title"><h2>${u('sync')}</h2></div>
      <div class="card sync-box" id="syncBox">${syncHTML()}</div>
      ${installBlock() || `<p class="muted small mt">${u('installed')}</p>`}
      <div class="sec-title"><h2>${u('settings')}</h2></div>
      <div class="card">
        <div class="setting"><span>${u('language')}</span><div class="lang-switch"><button data-l="bn" class="${LANG === 'bn' ? 'on' : ''}">বাংলা</button><button data-l="en" class="${LANG === 'en' ? 'on' : ''}">English</button></div></div>
        <div class="setting"><span>${u('theme')}</span><div class="lang-switch">${['auto', 'light', 'dark'].map(x => `<button data-th="${x}" class="${th === x ? 'on' : ''}">${u('theme' + x[0].toUpperCase() + x.slice(1))}</button>`).join('')}</div></div>
        <div class="setting"><span></span><button class="btn sm ghost" data-act="reset" style="color:var(--bad)">${u('reset')}</button></div>
      </div>
      <p class="muted small" style="text-align:center;margin-top:20px">CSE 209 · Database Systems · v1</p>
    `, 'me');
    $$('[data-l]', view).forEach(b => b.addEventListener('click', () => setLang(b.dataset.l)));
    $$('[data-th]', view).forEach(b => b.addEventListener('click', () => { localStorage.setItem('dbp-theme', b.dataset.th); applyTheme(); renderMe(); }));
  }

  /* global click delegation */
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-act]'); if (!a) return;
    const k = a.dataset.act;
    if (k === 'install') doInstall();
    if (k === 'signin') Sync.signIn();
    if (k === 'signout') Sync.signOut();
    if (k === 'reset' && confirm(u('resetConfirm'))) { Store.reset(); render(); }
  });

  /* store & sync listeners */
  Store.onChange(fromRemote => {
    updateChrome();
    if (fromRemote) {
      const editing = document.activeElement && /TEXTAREA|INPUT/.test(document.activeElement.tagName);
      if (!editing && !QZ && !CT) render();
    }
  });
  Sync.onChange(() => {
    updateChrome();
    const box = $('#syncBox'); if (box) box.innerHTML = syncHTML();
  });

  /* ---------------- onboarding ---------------- */
  function onboarding() {
    if (localStorage.getItem('dbp-onboarded')) return;
    const ov = document.createElement('div');
    ov.className = 'onboard';
    const draw = () => {
      ov.innerHTML = `<div>
        <img src="icons/icon-192.png" width="84" height="84" alt="">
        <h1>${u('onbTitle')}</h1>
        <p class="lead">${u('onbLead')}</p>
        <div class="label">${u('onbLang')}</div>
        <div class="lang-pick"><button data-ol="bn" class="${LANG === 'bn' ? 'on' : ''}">বাংলা</button><button data-ol="en" class="${LANG === 'en' ? 'on' : ''}">English</button></div>
        ${isStandalone() ? '' : (deferredPrompt ? `<button class="btn big light" data-oi>${u('onbInstall')}</button>` : `<div class="steps">📲 ${isIOS() ? u('iosSteps') : u('otherSteps')}</div>`)}
        <button class="btn big ${isStandalone() || !deferredPrompt ? 'light' : 'outline'}" data-ogo>${isStandalone() || !deferredPrompt ? u('onbStart') : u('onbSkip')}</button>
      </div>`;
    };
    draw();
    document.body.appendChild(ov);
    ov.addEventListener('click', async e => {
      if (e.target.dataset.ol) { LANG = e.target.dataset.ol; localStorage.setItem('dbp-lang', LANG); updateChrome(); render(); draw(); }
      if (e.target.closest('[data-oi]')) { await doInstall(); draw(); }
      if (e.target.closest('[data-ogo]')) { localStorage.setItem('dbp-onboarded', '1'); ov.remove(); }
    });
    window.addEventListener('beforeinstallprompt', () => { if (document.body.contains(ov)) draw(); });
  }

  /* ---------------- boot ---------------- */
  applyTheme();
  document.documentElement.lang = LANG;
  updateChrome();
  render();
  onboarding();
  Sync.init();
  if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('./sw.js').catch(() => {});
})();

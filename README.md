# ডাটাবেস পাঠশালা · Database Pathshala

CSE 209 Database Systems-এর মিড-টার্ম প্রস্তুতির অ্যাপ। স্লাইড ধরে ধরে বাংলায় শেখা, English-এ পরীক্ষা।
HTML + CSS + JavaScript, কোনো build step নেই। Mobile-এ install করা যায় (PWA), অফলাইনেও চলে।

**ভেতরে আছে:** ৬টা অধ্যায় · ৫৮টা টপিক · ৬৩টা MCQ · ৩৯টা CQ (২/৩/৫ মার্ক) মডেল উত্তর ও মার্কিং রুব্রিকসহ · টাইমারসহ CQ মডেল টেস্ট · ৫৫টার বেশি diagram ও interactive playground · নোট · “বুঝি নাই” তালিকা · XP, লেভেল, স্ট্রিক, ১৩টা ব্যাজ · বাংলা/English · light/dark থিম · Firebase sync।

---

## ১. GitHub Pages-এ Deploy (৫ মিনিট)

1. GitHub-এ নতুন **public** repository বানাও, যেমন `db-pathshala`।
2. এই ফোল্ডারের **সব ফাইল** (index.html, css/, js/, icons/, sw.js, manifest.webmanifest) repository-র root-এ upload করো।
   (Website থেকে: *Add file → Upload files* → সব টেনে ছাড়ো → *Commit*)
3. Repository → **Settings → Pages** → *Source*: `Deploy from a branch` → Branch: `main`, folder: `/ (root)` → **Save**।
4. ১–২ মিনিট পরে লিংক পাবে: `https://তোমার-username.github.io/db-pathshala/`

ফোনে লিংকটা খুললে শুরুতেই **Install** অপশন আসবে (Android Chrome)। iPhone-এ Safari-র Share (□↑) → *Add to Home Screen*।

> কনটেন্ট বা কোড আপডেট করলে `sw.js`-এর প্রথম লাইনে `dbp-v1` → `dbp-v2` করে দিও, তাহলে ইনস্টল করা অ্যাপও নতুন version নেবে।

---

## ২. Firebase Sync চালু করা (মোবাইল ↔ ওয়েব)

Firebase ছাড়াও অ্যাপ পুরোপুরি চলে; তখন progress শুধু সেই ডিভাইসে থাকে। সব ডিভাইসে একই progress চাইলে:

1. <https://console.firebase.google.com> → **Add project** (Google Analytics লাগবে না)।
2. Project-এর হোমে **Web (`</>`)** আইকন → app-এর নাম দাও → Register।
   যে `firebaseConfig` দেখাবে সেটা কপি করে **`js/firebase-config.js`**-এ `PASTE_...` গুলোর জায়গায় বসাও।
3. **Build → Authentication → Get started → Sign-in method → Google → Enable** → Save।
4. **Authentication → Settings → Authorized domains → Add domain** → `তোমার-username.github.io`
5. **Build → Firestore Database → Create database** → Production mode → কাছের location (যেমন `asia-south1`)।
6. Firestore → **Rules** ট্যাবে নিচেরটা বসিয়ে **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

7. পরিবর্তিত `firebase-config.js` GitHub-এ আবার upload করো। এরপর অ্যাপের **আমি (Me)** পেজে *Sign in with Google*।

এই rule-এর ফলে প্রত্যেকে শুধু নিজের data পড়তে/লিখতে পারে। `apiKey` public থাকা স্বাভাবিক, এটা গোপন চাবি না।

**Sync কীভাবে কাজ করে:** প্রতিটা ডিভাইস আগে নিজের কাছে সেভ করে (অফলাইনেও)। অনলাইনে থাকলে Firestore-এর সাথে merge হয়: শেখা টপিক, সেরা স্কোর আর ব্যাজ কখনো হারায় না; নোটের ক্ষেত্রে সবচেয়ে নতুনটা থাকে।

---

## ৩. লোকালি চালানো

Service worker-এর জন্য একটা ছোট server লাগে (ফাইলে ডাবল-ক্লিক করলে install/offline কাজ করবে না):

```
python -m http.server 8000
```
তারপর <http://localhost:8000>

---

## ৪. কনটেন্ট বদলানো / নতুন অধ্যায় যোগ

| ফাইল | কী আছে |
|---|---|
| `js/data/ch1.js` … `ch6.js` | প্রতিটা অধ্যায়ের টপিক, উদাহরণ, exam point, লিখিত প্রশ্ন, MCQ |
| `js/data/cq1.js`, `cq2.js` | CQ প্রশ্ন, মডেল উত্তর (`ans`), মার্কিং রুব্রিক (`rub`: প্রতিটা পয়েন্টের নম্বর যোগ করলে মোট মার্ক হতে হবে) |
| `js/visuals.js` | সব diagram ও playground |
| `js/app.js` | পেজ, quiz, XP/ব্যাজ, নোট, install |
| `js/sync.js` | লোকাল সেভ + Firebase sync |
| `css/style.css` | ডিজাইন ও থিম |

নতুন অধ্যায় (যেমন Normalization) যোগ করতে `ch6.js` কপি করে `ch7.js` বানাও, `id: 'ch7', num: 7` দাও, `index.html`-এ `<script src="js/data/ch7.js">` লাইন যোগ করো, আর `sw.js`-এর তালিকায় ফাইলটা যোগ করো।

টপিকের গঠন:
```js
{ id: 'unique-id', stars: 3,            // 3 = অবশ্যই, 2 = গুরুত্বপূর্ণ, 1 = জেনে রাখো
  visual: 'erBasic',                    // VISUALS-এর একটা key (ঐচ্ছিক)
  title:   { bn: '…', en: '…' },
  body:    { bn: `<p>… <mark>হাইলাইট</mark></p>`, en: `…` },
  example: { bn: '…', en: '…' },
  exam:    ['<b>Keyword</b>: English answer line', …] }
```

---

**Source slides:** Lecture-1_Introduction, Lecture_2, 3_Relational_Model, relational_algebra, Lecture-4_SQL, 5_ER_Diagram (Farhana Akter Sunny, CSE 209). Reference: Silberschatz, *Database System Concepts* (6th ed.).

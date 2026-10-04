/* ============================================================
 * VISUALS — every diagram is generated here so it follows the
 * light/dark theme and the bn/en language switch.
 * A visual is either fn(lang) => html, or {html(lang), init(el, lang)}.
 * ============================================================ */
(function () {
  const V = {};
  let uid = 0;
  const L = (lang, bn, en) => (lang === 'bn' ? bn : en);
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const mk = (id, cls) => `<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="${cls || 'ah'}"/></marker>`;
  const svg = (w, h, inner, defs, label) => `<svg viewBox="0 0 ${w} ${h}" class="viz" role="img"${label ? ` aria-label="${esc(label)}"` : ''}>${defs ? `<defs>${defs}</defs>` : ''}${inner}</svg>`;
  const T = (x, y, s, cls) => `<text x="${x}" y="${y}" class="${cls || ''}">${s}</text>`;
  const R = (x, y, w, h, cls, rx) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx == null ? 8 : rx}" class="${cls || 'box'}"/>`;
  const Ln = (x1, y1, x2, y2, cls, m) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls || 'ln'}"${m ? ` marker-end="url(#${m})"` : ''}/>`;
  const E = (cx, cy, rx, ry, cls) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" class="${cls || 'box'}"/>`;
  const D = (cx, cy, w, h, cls) => `<polygon points="${cx},${cy - h / 2} ${cx + w / 2},${cy} ${cx},${cy + h / 2} ${cx - w / 2},${cy}" class="${cls || 'box'}"/>`;
  function cyl(cx, top, w, h, cls) {
    const rx = w / 2, ry = Math.min(w * 0.14, 13);
    cls = cls || 'cyl';
    return `<path class="${cls}" d="M${cx - rx},${top} v${h} a${rx},${ry} 0 0 0 ${w},0 v${-h} z"/><ellipse class="${cls}" cx="${cx}" cy="${top}" rx="${rx}" ry="${ry}"/>`;
  }
  /* entity rectangle with attributes listed inside (textbook style) */
  function entity(x, y, w, name, attrs, pk) {
    const h = 24 + attrs.length * 17 + 6;
    let s = R(x, y, w, h, 'box', 6) + `<rect x="${x}" y="${y}" width="${w}" height="24" rx="6" class="p"/>` + T(x + w / 2, y + 17, name, 'b wt tc');
    attrs.forEach((a, i) => { s += T(x + 8, y + 40 + i * 17, a, 'mono' + (i < (pk || 0) ? ' u' : '')); });
    return s;
  }
  /* small SVG table */
  function stable(x, y, cols, rows, o) {
    o = o || {};
    const rh = o.rh || 22, hh = o.hh || 24;
    let s = '', cx = x;
    const W = cols.reduce((a, c) => a + c.w, 0);
    s += R(x, y, W, hh + rows.length * rh, 'box', 6);
    s += `<rect x="${x}" y="${y}" width="${W}" height="${hh}" rx="6" class="${o.head || 'p'}"/>`;
    rows.forEach((r, i) => { if (o.hl && o.hl.includes(i)) s += `<rect x="${x + 1}" y="${y + hh + i * rh}" width="${W - 2}" height="${rh}" class="h"/>`; });
    cols.forEach((c, j) => {
      if (c.bg) s += `<rect x="${cx}" y="${y + hh}" width="${c.w}" height="${rows.length * rh}" class="${c.bg}" style="opacity:.55"/>`;
      s += T(cx + 6, y + hh - 8, c.n, 'b wt' + (c.pk ? ' u' : '') + (o.headText ? ' ' + o.headText : '')).replace('class="b wt', o.head === 'soft' ? 'class="b' : 'class="b wt');
      rows.forEach((r, i) => { s += T(cx + 6, y + hh + i * rh + rh - 7, esc(r[j]), 'mono'); });
      if (j > 0) s += Ln(cx, y, cx, y + hh + rows.length * rh, 'ln');
      cx += c.w;
    });
    for (let i = 1; i <= rows.length - 1; i++) s += `<line x1="${x}" y1="${y + hh + i * rh}" x2="${x + W}" y2="${y + hh + i * rh}" class="ln" style="stroke:var(--line)"/>`;
    return s;
  }
  /* HTML data table */
  function tbl(head, rows, o) {
    o = o || {};
    const hlR = o.hl || [], offR = o.off || [], hlC = o.cols || [], pk = o.pk || [];
    let h = `<div class="tscroll"><table class="dt">${o.cap ? `<caption>${o.cap}</caption>` : ''}<thead><tr>`;
    head.forEach((c, j) => { h += `<th class="${hlC.includes(j) ? 'on' : ''}${pk.includes(j) ? ' pk' : ''}">${esc(c)}</th>`; });
    h += '</tr></thead><tbody>';
    rows.forEach((r, i) => {
      const style = o.rowStyle ? ` style="${o.rowStyle(r, i)}"` : '';
      h += `<tr class="${hlR.includes(i) ? 'on' : offR.includes(i) ? 'off' : ''}"${style}>`;
      r.forEach((c, j) => { h += `<td class="${hlC.includes(j) && !hlR.includes(i) ? 'on' : ''}">${c === null ? '<i>null</i>' : esc(c)}</td>`; });
      h += '</tr>';
    });
    return h + '</tbody></table></div>';
  }
  const grid = cells => `<div class="vgrid">${cells.map((c, i) => `<div class="vcell c${(c.c || (i % 5) + 1)}"><div class="e">${c.e || ''}</div><b>${c.t}</b><span>${c.d || ''}</span></div>`).join('')}</div>`;
  const vsTable = (lang, head, rows) => `<div class="tscroll"><table class="dt vs-table"><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${L(lang, c[0], c[1] == null ? c[0] : c[1])}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

  /* ---------- sample data (from the slides' university database) ---------- */
  const IH = ['ID', 'name', 'dept_name', 'salary'];
  const INSTR = [
    ['10101', 'Srinivasan', 'Comp. Sci.', 65000],
    ['12121', 'Wu', 'Finance', 90000],
    ['15151', 'Mozart', 'Music', 40000],
    ['22222', 'Einstein', 'Physics', 95000],
    ['33456', 'Gold', 'Physics', 87000],
    ['45565', 'Katz', 'Comp. Sci.', 75000],
    ['76766', 'Crick', 'Biology', 72000],
    ['83821', 'Brandt', 'Comp. Sci.', 92000]
  ];
  const TH = ['ID', 'course_id', 'sec_id', 'semester', 'year'];
  const TEACH = [
    ['10101', 'CS-101', '1', 'Fall', 2017],
    ['10101', 'CS-347', '1', 'Fall', 2017],
    ['12121', 'FIN-201', '1', 'Spring', 2018],
    ['22222', 'PHY-101', '1', 'Fall', 2017],
    ['45565', 'CS-101', '1', 'Spring', 2018],
    ['45565', 'CS-319', '1', 'Spring', 2018],
    ['83821', 'CS-190', '2', 'Spring', 2017]
  ];
  const idx = (arr, f) => arr.map((r, i) => (f(r) ? i : -1)).filter(i => i >= 0);
  const uniq = rows => { const s = new Set(); return rows.filter(r => { const k = JSON.stringify(r); if (s.has(k)) return false; s.add(k); return true; }); };
  V.data = { IH, INSTR, TH, TEACH };

  /* ================= CHAPTER 1 ================= */
  V.dataInfo = lang => {
    const id = 'm' + (++uid);
    const sc = [78, 65, 92, 54, 88];
    let s = T(16, 26, L(lang, 'DATA: কাঁচা তথ্য', 'DATA: raw facts'), 'b');
    sc.forEach((v, i) => {
      const x = 14 + i * 68, rot = i % 2 ? -5 : 4;
      s += `<g transform="rotate(${rot} ${x + 28} 58)">${R(x, 40, 56, 34, 'soft', 8)}${T(x + 28, 63, v, 'b lg tc')}</g>`;
    });
    s += T(180, 100, L(lang, 'প্রতিটা ছাত্রের আলাদা নম্বর, একা কোনো অর্থ নেই', 'Each student’s score alone means little'), 'sm tc');
    s += Ln(180, 110, 180, 150, 'lnp thick', id);
    s += T(192, 135, L(lang, 'Process: সাজাও, গড় করো', 'Process: organise, average'), 'sm b tp');
    s += R(26, 158, 308, 92, 'ps', 14);
    s += T(44, 182, 'INFORMATION', 'b tp');
    s += T(44, 210, L(lang, 'ক্লাসের গড় নম্বর = 75.4', 'Class average = 75.4'), 'b lg');
    s += T(44, 234, L(lang, 'সর্বোচ্চ 92, সর্বনিম্ন 54 → সিদ্ধান্ত নেওয়া যায়', 'Highest 92, lowest 54 → useful for decisions'), 'sm');
    sc.forEach((v, i) => { const h = v / 100 * 34; s += `<rect x="${262 + i * 12}" y="${198 - h}" width="8" height="${h}" rx="2" class="p"/>`; });
    return svg(360, 262, s, mk(id, 'ahp'), 'Data vs Information');
  };

  V.dbSystem = lang => {
    let s = '';
    const box = (x, y, w, t1, t2, cls) => R(x, y, w, 48, cls, 12) + T(x + w / 2, y + 21, t1, 'b tc') + T(x + w / 2, y + 39, t2, 'sm tc');
    s += box(10, 10, 152, 'Software', 'DBMS: MySQL, Oracle', 'ps');
    s += box(198, 10, 152, 'Hardware', L(lang, 'Server, disk, RAM', 'Server, disk, RAM'), 'o');
    s += Ln(100, 58, 146, 98, 'ln') + Ln(260, 58, 214, 98, 'ln') + Ln(180, 170, 180, 182, 'ln');
    s += cyl(180, 100, 112, 54);
    s += T(180, 136, 'Data', 'b tc lg') + T(180, 152, '(Database)', 'sm tc');
    s += box(102, 182, 156, 'Users', L(lang, 'ছাত্র, শিক্ষক, DBA', 'Students, teachers, DBA'), 'g');
    s += T(180, 252, L(lang, 'Database system দিয়ে user যা করতে পারে:', 'A database system lets users:'), 'sm tc');
    ['Store', 'Update', 'Retrieve', 'Organise', 'Protect'].forEach((w, i) => { s += R(8 + i * 69, 262, 64, 24, 'hs', 12) + T(40 + i * 69, 278, w, 'b tc sm'); });
    return svg(360, 296, s, '', 'Database system components');
  };

  V.dbmsLayer = lang => {
    const id = 'm' + (++uid);
    let s = '';
    [['Mobile app', 12], ['Website', 128], ['Admin panel', 244]].forEach(([n, x]) => { s += R(x, 10, 104, 38, 'soft', 10) + T(x + 52, 34, n, 'b tc sm'); });
    s += Ln(64, 48, 120, 92, 'ln', id) + Ln(180, 48, 180, 92, 'ln', id) + Ln(296, 48, 240, 92, 'ln', id);
    s += R(30, 94, 300, 70, 'p', 14);
    s += T(180, 122, 'DBMS (software)', 'b wt tc lg');
    s += T(180, 146, L(lang, 'query · security · backup · concurrency', 'query · security · backup · concurrency'), 'wt tc sm').replace('class="wt tc sm"', 'class="tc sm" style="fill:#fff;opacity:.9"');
    s += Ln(180, 164, 180, 190, 'ln', id);
    s += cyl(180, 202, 160, 46);
    s += T(180, 236, 'Database', 'b tc lg');
    s += T(180, 286, L(lang, 'App কখনো সরাসরি file ধরে না, সব কাজ DBMS-এর মাধ্যমে', 'Apps never touch files directly; everything goes through the DBMS'), 'sm tc');
    return svg(360, 298, s, mk(id), 'DBMS between applications and database');
  };

  V.users = lang => grid([
    { e: '🙋', t: 'End users', d: L(lang, 'Database ব্যবহার করে নিজের কাজ করে। যেমন: bKash app দিয়ে টাকা পাঠানো', 'Use the system to reach a goal, e.g. sending money with the bKash app') },
    { e: '👩‍💻', t: 'Application developers', d: L(lang, 'Software লেখে যাতে end user database ব্যবহার করতে পারে', 'Write software so end users can work with the database') },
    { e: '🛡️', t: 'DBA (Database Administrator)', d: L(lang, 'Database design ও manage করে: backup, security, access', 'Designs & manages the database: backup, security, access') },
    { e: '⚙️', t: 'Database systems programmer', d: L(lang, 'DBMS software নিজেই লেখে। যেমন MySQL-এর developer', 'Writes the DBMS software itself, e.g. the MySQL team') }
  ]);

  V.apps = lang => grid([
    { e: '🏦', t: 'Banking', d: L(lang, 'লেনদেন (transactions): DBBL, bKash', 'Transactions: DBBL, bKash') },
    { e: '✈️', t: 'Airlines', d: L(lang, 'টিকেট reservation ও flight schedule: Biman', 'Reservations & schedules: Biman') },
    { e: '🎓', t: 'Universities', d: L(lang, 'Course registration, grade, result', 'Registration, grades, results') },
    { e: '🛒', t: 'Sales', d: L(lang, 'Customer, product, purchase: Shwapno', 'Customers, products, purchases: Shwapno') },
    { e: '📦', t: 'Online retailers', d: L(lang, 'Order tracking, “তোমার জন্য” recommendation: Daraz', 'Order tracking, recommendations: Daraz') },
    { e: '🏭', t: 'Manufacturing', d: L(lang, 'Production, inventory, supply chain: garments factory', 'Production, inventory, supply chain') },
    { e: '👔', t: 'Human resources', d: L(lang, 'Employee record, salary, tax deduction', 'Employee records, salaries, tax') }
  ]);

  V.funcGrid = lang => grid([
    { e: '💾', t: 'Data storage management', d: L(lang, 'Data কোথায়, কীভাবে disk-এ থাকবে', 'Where & how data lives on disk') },
    { e: '🔁', t: 'Transaction management', d: L(lang, 'একটা কাজ পুরো হবে নাহলে একদম হবে না', 'A task finishes fully or not at all') },
    { e: '✅', t: 'Integrity services', d: L(lang, 'ভুল data ঢুকতে না দেওয়া (rules)', 'Rules that block wrong data') },
    { e: '🛟', t: 'Backup & recovery', d: L(lang, 'Crash হলে data ফেরত আনা', 'Bring data back after a crash') },
    { e: '👥', t: 'Concurrency control', d: L(lang, 'অনেকে একসাথে কাজ করলেও গোলমাল নেই', 'Many users at once, no conflict') },
    { e: '✏️', t: 'Data manipulation', d: L(lang, 'Insert, update, delete, query', 'Insert, update, delete, query') },
    { e: '📖', t: 'Data dictionary / catalog', d: L(lang, 'Metadata: data সম্পর্কে data', 'Metadata: data about data') },
    { e: '🔐', t: 'Authorization / security', d: L(lang, 'কে কী দেখতে/বদলাতে পারবে', 'Who can see / change what') },
    { e: '🧰', t: 'Utility services', d: L(lang, 'Import/export, monitoring tools', 'Import/export, monitoring tools') },
    { e: '🔌', t: 'Access & APIs', d: L(lang, 'Program থেকে database ব্যবহার (JDBC, ODBC)', 'Programs talk to DB (JDBC, ODBC)') }
  ]);

  V.fileVsDb = lang => {
    const id = 'm' + (++uid);
    let s = T(10, 20, L(lang, '❌ File Processing System', '❌ File Processing System'), 'b tbad');
    const cols = [
      ['Registration', ['Reg_Number', 'Name', 'Father Name', 'Phone', 'Address', 'Class']],
      ['Examination', ['Reg_Number', 'Name', 'Address', 'Class', 'Semester', 'Grade']],
      ['Library', ['Reg_Number', 'Name', 'Father Name', 'Books Issued', 'Fine']]
    ];
    const dup = ['Reg_Number', 'Name', 'Father Name', 'Address', 'Class'];
    cols.forEach(([n, f], i) => {
      const x = 8 + i * 120;
      s += R(x, 30, 104, 30, 'soft', 8) + T(x + 52, 50, n, 'b tc sm');
      s += Ln(x + 52, 60, x + 52, 80, 'ln', id);
      s += `<path d="M${x},84 h88 l16,16 v92 h-104 z" class="box"/>`;
      f.forEach((a, k) => {
        if (dup.includes(a)) s += `<rect x="${x + 4}" y="${92 + k * 15}" width="96" height="13" rx="3" class="h"/>`;
        s += T(x + 8, 102 + k * 15, a, 'mono');
      });
      s += T(x + 52, 188, L(lang, 'নিজস্ব file', 'own file'), 'xs tc');
    });
    s += T(180, 210, L(lang, 'হলুদ = একই data বারবার রাখা (Redundancy)', 'Yellow = the same data stored again and again (redundancy)'), 'sm tc b tw');
    s += Ln(10, 222, 350, 222, 'ln dash');
    s += T(10, 244, L(lang, '✅ Database Approach (DBMS)', '✅ Database Approach (DBMS)'), 'b tok');
    cols.forEach(([n], i) => {
      const x = 8 + i * 120;
      s += R(x, 254, 104, 30, 'soft', 8) + T(x + 52, 274, n, 'b tc sm');
      s += Ln(x + 52, 284, 180 + (i - 1) * 70, 308, 'ln', id);
    });
    s += R(60, 310, 240, 32, 'p', 10) + T(180, 331, 'DBMS', 'b wt tc');
    s += Ln(180, 342, 180, 358, 'ln', id);
    s += cyl(180, 368, 200, 32);
    s += T(180, 392, 'University Students Database', 'b tc sm');
    s += T(180, 428, L(lang, 'এক জায়গায় data, সবাই share করে', 'Data in one place, shared by all'), 'sm tc');
    return svg(360, 438, s, mk(id), 'File system vs database approach');
  };

  V.fileVsDbTable = lang => vsTable(lang, [L(lang, 'বিষয়', 'Aspect'), 'File System', 'DBMS'], [
    [['Data redundancy'], ['বেশি: একই data অনেক file-এ', 'High: same data in many files'], ['নিয়ন্ত্রিত (controlled)', 'Controlled']],
    [['Data sharing'], ['সীমিত, কঠিন', 'Limited, difficult'], ['সহজ, centralized', 'Easy, centralized']],
    [['Program–data'], ['Dependent: structure code-এর ভিতরে', 'Dependent: structure inside code'], ['Independent', 'Independent']],
    [['Integrity & security'], ['দুর্বল', 'Weak'], ['Constraints ও authorization আছে', 'Constraints & authorization']],
    [['Concurrent access'], ['গোলমাল হয়', 'Causes anomalies'], ['Concurrency control', 'Concurrency control']],
    [['Backup & recovery'], ['হাতে করতে হয়', 'Manual'], ['DBMS নিজে support করে', 'Built-in support']],
    [['Query'], ['প্রতিটা দরকারে নতুন program', 'New program for every need'], ['SQL দিয়ে সাথে সাথে', 'Instant with SQL']]
  ]);

  /* ================= CHAPTER 2 ================= */
  V.abstraction = lang => {
    const id = 'm' + (++uid);
    let s = '';
    s += R(6, 6, 348, 96, 'g', 14) + T(18, 28, 'View level', 'b') + T(342, 28, L(lang, 'User কী দেখবে', 'What each user sees'), 'sm te');
    [[L(lang, 'Student portal', 'Student portal'), 'name, CGPA'], [L(lang, 'Accounts', 'Accounts'), 'name, fees'], [L(lang, 'Public site', 'Public site'), L(lang, 'শুধু name', 'name only')]].forEach(([a, b], i) => {
      const x = 18 + i * 112;
      s += R(x, 40, 100, 48, 'box', 8) + T(x + 50, 60, a, 'b tc sm') + T(x + 50, 78, b, 'xs tc');
    });
    s += Ln(180, 102, 180, 118, 'ln', id);
    s += R(6, 120, 348, 100, 'ps', 14) + T(18, 142, 'Logical level', 'b') + T(342, 142, L(lang, 'কী data, কী relationship', 'What data & relationships'), 'sm te');
    s += T(18, 168, 'instructor(ID, name, dept_name, salary)', 'mono');
    s += T(18, 188, 'department(dept_name, building, budget)', 'mono');
    s += T(18, 208, L(lang, '+ relationships, constraints', '+ relationships, constraints'), 'sm');
    s += Ln(180, 220, 180, 236, 'ln', id);
    s += R(6, 238, 348, 92, 'o', 14) + T(18, 260, 'Physical level', 'b') + T(342, 260, L(lang, 'কীভাবে disk-এ জমা', 'How it is stored on disk'), 'sm te');
    ['0101', '1100', '0011', '1010', '0110', '1001'].forEach((b, i) => { s += R(18 + i * 56, 272, 48, 22, 'box', 4) + T(42 + i * 56, 287, b, 'mono tc'); });
    s += T(18, 318, L(lang, 'Block, index, file: সাধারণ user এসব দেখে না', 'Blocks, indexes, files: hidden from normal users'), 'sm');
    return svg(360, 336, s, mk(id), 'Three levels of abstraction');
  };

  V.schemaInstance = lang => {
    let s = R(6, 6, 348, 76, 'ps', 14);
    s += T(18, 28, L(lang, 'SCHEMA = নকশা (design)', 'SCHEMA = the design'), 'b tp');
    s += T(18, 50, 'student(ID, name, dept_name)', 'mono');
    s += T(18, 70, L(lang, 'খুব কম বদলায়, যেন বাড়ির blueprint', 'Rarely changes, like a building blueprint'), 'sm');
    const snap = (x, title, rows, newRow) => {
      let q = R(x, 100, 170, 150, 'box', 12) + T(x + 10, 120, title, 'b sm');
      const cx = [x + 10, x + 50, x + 112];
      ['ID', 'name', 'dept'].forEach((h, j) => { q += T(cx[j], 142, h, 'b sm'); });
      q += Ln(x + 8, 148, x + 162, 148, 'ln');
      rows.forEach((r, i) => {
        if (newRow === i) q += `<rect x="${x + 6}" y="${153 + i * 22}" width="158" height="20" rx="4" class="h"/>`;
        r.forEach((c, j) => { q += T(cx[j], 168 + i * 22, c, 'mono'); });
      });
      return q;
    };
    s += snap(6, L(lang, 'Instance: সোমবার ১০টা', 'Instance @ Mon 10 AM'), [['101', 'Rahim', 'CSE'], ['102', 'Nusrat', 'EEE']]);
    s += snap(184, L(lang, 'Instance: মঙ্গলবার ১০টা', 'Instance @ Tue 10 AM'), [['101', 'Rahim', 'CSE'], ['102', 'Nusrat', 'EEE'], ['103', 'Tanvir', 'CSE']], 2);
    s += T(180, 274, L(lang, 'নতুন ছাত্র ভর্তি হলো → instance বদলালো, schema একই', 'A new student joined → instance changed, schema did not'), 'sm tc b');
    return svg(360, 288, s, '', 'Schema vs instance');
  };

  V.threeSchema = lang => {
    const id = 'm' + (++uid);
    let s = '';
    s += R(4, 4, 352, 80, 'soft', 12) + T(14, 22, L(lang, 'External level (External schema)', 'External level (External schema)'), 'b sm');
    ['View 1: Student', 'View 2: Teacher', 'View 3: Accounts'].forEach((v, i) => { s += R(12 + i * 116, 32, 104, 40, 'g', 8) + T(64 + i * 116, 57, v, 'tc xs b'); });
    s += Ln(64, 72, 140, 118, 'ln', id) + Ln(180, 72, 180, 118, 'ln', id) + Ln(296, 72, 220, 118, 'ln', id);
    s += T(352, 98, 'logical data independence', 'xs te tp');
    s += R(4, 104, 352, 76, 'soft', 12) + T(14, 122, 'Conceptual / Logical level', 'b sm');
    s += R(60, 126, 240, 44, 'ps', 10) + T(180, 145, 'Conceptual schema', 'b tc sm') + T(180, 162, L(lang, 'entity, relationship, constraint', 'entities, relationships, constraints'), 'xs tc');
    s += Ln(180, 170, 180, 212, 'ln', id);
    s += T(352, 194, 'physical data independence', 'xs te tp');
    s += R(4, 200, 352, 76, 'soft', 12) + T(14, 218, 'Internal / Physical level', 'b sm');
    s += R(60, 222, 240, 44, 'o', 10) + T(180, 241, 'Internal schema', 'b tc sm') + T(180, 258, L(lang, 'storage, index, compression, encryption', 'storage, indexes, compression, encryption'), 'xs tc');
    s += Ln(180, 266, 180, 290, 'ln', id);
    s += cyl(180, 300, 120, 26) + T(180, 326, 'Stored database', 'b tc sm');
    return svg(360, 346, s, mk(id), 'Three-schema architecture');
  };

  V.dataModels = lang => grid([
    { e: '📋', t: 'Relational model', d: L(lang, 'Table দিয়ে data ও relationship। আজকের প্রায় সব DB (MySQL)', 'Tables for data & relationships. Most DBs today (MySQL)'), c: 1 },
    { e: '🔷', t: 'Entity-Relationship (ER)', d: L(lang, 'মূলত database design-এর জন্য (diagram)', 'Mainly for database design (diagrams)'), c: 2 },
    { e: '🧩', t: 'Object-based', d: L(lang, 'Object-oriented ও object-relational', 'Object-oriented & object-relational'), c: 4 },
    { e: '🏷️', t: 'Semi-structured (XML)', d: L(lang, 'একই ধরনের data-তে ভিন্ন attribute থাকতে পারে', 'Items of the same type may have different attributes'), c: 3 },
    { e: '🕸️', t: 'Network model', d: L(lang, 'পুরনো model: graph আকারে record', 'Older: records linked as a graph'), c: 5 },
    { e: '🌳', t: 'Hierarchical model', d: L(lang, 'পুরনো model: tree আকারে (parent-child)', 'Older: tree of parent-child records'), c: 5 }
  ]);

  V.erNotation = lang => {
    let s = '';
    const cells = [
      ['Rectangle', L(lang, 'Entity set', 'Entity set'), (x, y) => R(x - 46, y - 17, 92, 34, 'ps', 2) + T(x, y + 5, 'student', 'tc sm b')],
      ['Ellipse', L(lang, 'Attribute', 'Attribute'), (x, y) => E(x, y, 46, 18, 'box') + T(x, y + 5, 'name', 'tc sm')],
      ['Diamond', L(lang, 'Relationship set', 'Relationship set'), (x, y) => D(x, y, 96, 40, 'o') + T(x, y + 5, 'takes', 'tc sm b')],
      ['Line', L(lang, 'Attribute ↔ entity, entity ↔ relationship যুক্ত করে', 'Links attributes/entities/relationships'), (x, y) => R(x - 70, y - 12, 50, 24, 'ps', 2) + Ln(x - 20, y, x + 22, y, 'ln thick') + E(x + 48, y, 26, 13, 'box')],
      ['Double ellipse', 'Multivalued attribute', (x, y) => E(x, y, 48, 20, 'g') + E(x, y, 41, 14, 'g') + T(x, y + 5, 'phone', 'tc sm')],
      ['Dashed ellipse', 'Derived attribute', (x, y) => `<ellipse cx="${x}" cy="${y}" rx="46" ry="18" class="o dash"/>` + T(x, y + 5, 'age', 'tc sm')],
      ['Double line', 'Total participation', (x, y) => R(x - 70, y - 12, 50, 24, 'ps', 2) + Ln(x - 20, y - 3, x + 26, y - 3, 'ln') + Ln(x - 20, y + 3, x + 26, y + 3, 'ln') + D(x + 50, y, 48, 26, 'o')],
      ['Double rectangle', 'Weak entity set', (x, y) => R(x - 50, y - 20, 100, 40, 'ps', 2) + R(x - 44, y - 14, 88, 28, 'ps', 2) + T(x, y + 5, 'section', 'tc sm b')]
    ];
    cells.forEach(([shape, mean, draw], i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = 6 + col * 176, y = 6 + row * 92;
      s += R(x, y, 172, 86, 'soft', 12);
      s += draw(x + 86, y + 28);
      s += T(x + 86, y + 64, shape, 'b tc sm');
      s += T(x + 86, y + 79, mean.length > 30 ? mean.slice(0, 30) + '…' : mean, 'xs tc');
    });
    return svg(360, 374, s, '', 'ER diagram notation');
  };

  V.relationAnatomy = lang => {
    const id = 'm' + (++uid);
    const cols = [56, 86, 104, 70], x0 = 30, names = IH;
    const rows = INSTR.filter((r, i) => [0, 1, 3, 5].includes(i));
    let s = T(180, 22, L(lang, 'Relation (= table): instructor', 'Relation (= table): instructor'), 'b tc lg');
    s += T(128, 46, L(lang, 'Attribute (= column)', 'Attribute (= column)'), 'b sm tp');
    s += Ln(128, 52, 128, 72, 'lnp', id);
    let cx = x0;
    s += `<rect x="${x0 + 56}" y="74" width="86" height="122" class="ps" style="opacity:.6"/>`;
    s += `<rect x="${x0}" y="148" width="316" height="24" class="h"/>`;
    s += `<rect x="${x0}" y="74" width="316" height="122" rx="6" class="ln"/>`;
    s += `<rect x="${x0}" y="74" width="316" height="26" rx="6" class="p"/>`;
    cols.forEach((w, j) => {
      s += T(cx + 6, 92, names[j], 'b wt sm');
      rows.forEach((r, i) => { s += T(cx + 6, 116 + i * 24, r[j], 'mono'); });
      if (j) s += Ln(cx, 74, cx, 196, 'ln');
      cx += w;
    });
    s += Ln(250, 222, 250, 176, 'lnp', id);
    s += T(250, 236, L(lang, 'Tuple (= row)', 'Tuple (= row)'), 'b sm tp tc');
    s += T(180, 258, L(lang, 'Degree = column সংখ্যা (4) · Cardinality = row সংখ্যা', 'Degree = no. of columns (4) · Cardinality = no. of rows'), 'xs tc');
    return svg(360, 266, s, mk(id, 'ahp'), 'Parts of a relation');
  };

  V.dbTypes = lang => {
    let s = '';
    const B = (x, y, w, t, cls) => R(x, y, w, 30, cls, 8) + T(x + w / 2, y + 20, t, 'b tc sm' + (cls === 'p' ? ' wt' : ''));
    s += B(120, 6, 120, L(lang, 'DBMS-এর ধরন', 'Types of DBMS'), 'p');
    s += Ln(180, 36, 85, 66, 'ln') + Ln(180, 36, 275, 66, 'ln');
    s += B(8, 66, 154, L(lang, 'User সংখ্যা অনুযায়ী', 'By number of users'), 'ps');
    s += B(198, 66, 154, L(lang, 'Site location অনুযায়ী', 'By site location'), 'ps');
    s += Ln(85, 96, 45, 126, 'ln') + Ln(85, 96, 125, 126, 'ln');
    s += B(8, 126, 74, 'Single-user', 'soft') + B(88, 126, 74, 'Multi-user', 'soft');
    s += Ln(275, 96, 236, 120, 'ln') + Ln(275, 96, 314, 120, 'ln');
    s += B(198, 120, 76, 'Centralized', 'g') + B(278, 120, 76, 'Distributed', 'o');
    s += B(198, 156, 76, 'Parallel', 'v') + B(278, 156, 76, 'Client/Server', 'hs');
    s += T(85, 182, L(lang, 'যেমন: নিজের PC-র MS Access', 'e.g. MS Access on your own PC'), 'xs tc');
    s += T(85, 196, L(lang, 'বনাম ব্যাংকের DB (হাজার user)', 'vs a bank DB (1000s of users)'), 'xs tc');
    return svg(360, 206, s, '', 'Classification of DBMS');
  };

  V.centralized = lang => {
    let s = `<rect x="110" y="40" width="140" height="120" rx="16" class="g dash"/>`;
    s += T(180, 60, L(lang, 'একটাই site', 'Single site'), 'b tc sm');
    s += R(140, 70, 80, 28, 'p', 6) + T(180, 89, 'DBMS', 'b wt tc sm');
    s += cyl(180, 116, 70, 24);
    const term = [[30, 30], [30, 130], [330, 30], [330, 130], [180, 196]];
    term.forEach(([x, y], i) => {
      s += Ln(x, y, 180, 100, 'ln dash');
      s += R(x - 26, y - 14, 52, 28, 'box', 6) + T(x, y + 5, '🖥️ ' + (i + 1), 'tc sm');
    });
    s += T(180, 236, L(lang, 'সব terminal এক জায়গার কম্পিউটারে data চায়', 'All terminals use the data at one central computer'), 'sm tc');
    return svg(360, 246, s, '', 'Centralized database');
  };

  V.distributed = lang => {
    let s = '';
    const site = (x, y, city) => R(x, y, 112, 90, 'o', 12) + T(x + 56, y + 20, city, 'b tc sm') + R(x + 26, y + 28, 60, 20, 'p', 5) + T(x + 56, y + 42, 'DBMS', 'b wt tc xs') + cyl(x + 56, y + 62, 54, 16);
    s += Ln(66, 56, 294, 56, 'lnp thick dash') + Ln(66, 56, 180, 190, 'lnp thick dash') + Ln(294, 56, 180, 190, 'lnp thick dash');
    s += site(10, 10, L(lang, 'ঢাকা', 'Dhaka')) + site(238, 10, L(lang, 'চট্টগ্রাম', 'Chattogram')) + site(124, 150, L(lang, 'সিলেট', 'Sylhet'));
    s += R(130, 92, 100, 24, 'box', 12) + T(180, 109, '🌐 Network', 'tc sm b');
    s += T(180, 262, L(lang, 'User ভাবে একটাই database, আসলে data ৩ শহরে', 'User sees ONE database; data really lives in 3 cities'), 'sm tc b');
    return svg(360, 272, s, '', 'Distributed database');
  };

  V.parallel = lang => {
    let s = '';
    const unitX = [132, 210, 288];
    const row = (y0, title, sub) => R(4, y0, 352, 98, 'soft', 12) + T(14, y0 + 30, title, 'b sm') + T(14, y0 + 48, sub, 'xs');
    // shared memory
    let y = 6;
    s += row(y, 'Shared memory', L(lang, 'সব CPU একই memory', 'All CPUs share memory'));
    unitX.forEach(x => { s += R(x, y + 10, 60, 22, 'ps', 5) + T(x + 30, y + 26, 'CPU', 'tc xs b') + Ln(x + 30, y + 32, x + 30, y + 42, 'ln'); });
    s += R(132, y + 42, 216, 20, 'h', 6) + T(240, y + 56, 'Shared Memory', 'tc xs b');
    unitX.forEach(x => { s += Ln(x + 30, y + 62, x + 30, y + 72, 'ln') + cyl(x + 30, y + 78, 34, 10); });
    // shared disk
    y = 110;
    s += row(y, 'Shared disk', L(lang, 'সব CPU একই disk (cluster)', 'All CPUs share disks (cluster)'));
    unitX.forEach(x => { s += R(x, y + 10, 60, 30, 'ps', 5) + T(x + 30, y + 23, 'CPU', 'tc xs b') + T(x + 30, y + 35, '+ Mem', 'tc xs') + Ln(x + 30, y + 40, x + 30, y + 54, 'ln'); });
    s += R(132, y + 54, 216, 34, 'h', 6) + cyl(160, y + 64, 26, 10) + cyl(190, y + 64, 26, 10) + T(268, y + 76, 'Shared Disks', 'tc xs b');
    // shared nothing
    y = 214;
    s += row(y, 'Shared nothing', L(lang, 'কিছুই share করে না', 'Neither memory nor disk shared'));
    unitX.forEach(x => { s += R(x, y + 8, 60, 62, 'ps', 6) + T(x + 30, y + 24, 'CPU', 'tc xs b') + T(x + 30, y + 38, 'Mem', 'tc xs') + cyl(x + 30, y + 48, 30, 10) + Ln(x + 30, y + 70, x + 30, y + 84, 'ln'); });
    s += Ln(150, y + 84, 330, y + 84, 'lnp thick') + T(240, y + 96, 'interconnection network', 'tc xs tp');
    s += T(180, 330, L(lang, 'Hierarchical = এই তিনটার মিশ্রণ', 'Hierarchical = a hybrid of these three'), 'sm tc b');
    return svg(360, 340, s, '', 'Parallel database architectures');
  };

  V.parVsDist = lang => vsTable(lang, ['', 'Parallel DB', 'Distributed DB'], [
    [['দূরত্ব', 'Distance'], ['Machine কাছাকাছি (একই server room)', 'Machines close (same server room)'], ['অনেক দূরে হতে পারে (ভিন্ন মহাদেশ)', 'Can be far apart (different continents)']],
    [['Connection'], ['Dedicated high-speed LAN, switch', 'Dedicated high-speed LANs & switches'], ['Public network, যেমন Internet', 'Public network, e.g. the Internet']],
    [['Communication cost'], ['কম ধরা হয়', 'Assumed small'], ['উপেক্ষা করা যায় না', 'Cannot be ignored']],
    [['Architecture'], ['Shared-memory / shared-disk / shared-nothing', 'Shared-memory, shared-disk or shared-nothing'], ['সাধারণত shared-nothing', 'Usually shared-nothing']]
  ]);

  V.clientServer = lang => {
    const id = 'm' + (++uid);
    let s = T(66, 18, 'Client (Front-end)', 'b tc sm');
    [['💻 Laptop', 30], ['📱 Phone', 84], ['🖥️ PC', 138]].forEach(([n, y]) => { s += R(10, y, 112, 38, 'g', 10) + T(66, y + 24, n, 'tc sm b') + Ln(122, y + 19, 158, 105, 'ln'); });
    s += E(180, 105, 34, 22, 'soft') + T(180, 109, 'Network', 'tc xs b');
    s += Ln(214, 105, 236, 105, 'ln', id);
    s += R(238, 34, 114, 150, 'ps', 14) + T(295, 54, 'Server', 'b tc') + T(295, 70, '(Back-end)', 'xs tc');
    s += R(254, 82, 82, 26, 'p', 6) + T(295, 100, 'DBMS', 'b wt tc sm') + cyl(295, 130, 70, 30);
    s += T(180, 212, L(lang, 'Client request পাঠায় → Server DBMS কাজ করে → ফলাফল ফেরত', 'Client sends request → server DBMS works → result returns'), 'sm tc');
    return svg(360, 222, s, mk(id), 'Client server database');
  };

  /* ================= CHAPTER 3 ================= */
  V.domain = lang => vsTable(lang, ['Attribute', 'Domain', L(lang, 'বৈধ ✓', 'Valid ✓'), L(lang, 'অবৈধ ✗', 'Invalid ✗')], [
    [['name'], ['অক্ষর (alphabetic)', 'Alphabetic text'], ['"Nusrat"'], ['12345']],
    [['age'], ['০ বা তার বেশি পূর্ণসংখ্যা', 'Non-negative integer'], ['21'], ['-5']],
    [['cgpa'], ['0.00 থেকে 4.00', '0.00 to 4.00'], ['3.75'], ['5.20']],
    [['semester'], ['Fall / Spring / Summer'], ['Fall'], ['Winter']]
  ]);

  V.attrTypes = lang => {
    let s = '';
    s += Ln(96, 40, 180, 58, 'ln') + Ln(264, 40, 180, 58, 'ln') + Ln(180, 88, 180, 122, 'ln');
    s += Ln(80, 120, 130, 135, 'ln') + Ln(266, 112, 230, 132, 'ln') + Ln(80, 186, 130, 150, 'ln') + Ln(262, 192, 230, 148, 'ln') + `<line x1="180" y1="158" x2="180" y2="196" class="ln dash"/>`;
    s += E(96, 26, 50, 15, 'ps') + T(96, 30, 'first_name', 'tc xs b');
    s += E(264, 26, 48, 15, 'ps') + T(264, 30, 'last_name', 'tc xs b');
    s += E(180, 72, 38, 16, 'ps') + T(180, 77, 'name', 'tc sm b');
    s += R(130, 122, 100, 36, 'p', 2) + T(180, 145, 'student', 'tc b wt');
    s += E(56, 110, 34, 16, 'box') + T(56, 115, 'ID', 'tc sm b u');
    s += E(304, 106, 46, 20, 'g') + E(304, 106, 39, 14, 'g') + T(304, 111, 'phone', 'tc sm');
    s += E(56, 190, 44, 16, 'box') + T(56, 194, 'dept_name', 'tc xs');
    s += E(296, 196, 58, 16, 'box') + T(296, 200, 'date_of_birth', 'tc xs');
    s += `<ellipse cx="180" cy="212" rx="36" ry="16" class="o dash"/>` + T(180, 217, 'age', 'tc sm');
    s += `<path d="M238,198 Q214,214 218,212" class="ln dash"/>`;
    const leg = [['box', 'Simple'], ['ps', 'Composite'], ['g', 'Multivalued'], ['o', 'Derived']];
    leg.forEach(([c, n], i) => { s += R(10 + i * 88, 248, 14, 14, c, 3) + T(30 + i * 88, 260, n, 'xs b'); });
    s += T(180, 284, L(lang, 'age কে date_of_birth থেকে হিসাব করা যায়, তাই derived', 'age can be computed from date_of_birth, so it is derived'), 'xs tc');
    return svg(360, 294, s, '', 'Types of attributes');
  };

  V.keyPlay = {
    html: lang => `<div class="colpick" role="group" aria-label="columns"></div><div class="kp-table"></div><div class="verdict mid" aria-live="polite"></div><p class="vnote">${L(lang, 'Column বেছে দেখো: এই combination দিয়ে কি প্রতিটা row আলাদা করা যায়?', 'Tick columns: can this combination tell every row apart?')}</p>`,
    init(el, lang) {
      const cols = ['Roll_no', 'Registration_no', 'Name', 'Dept'];
      const rows = [[101, 'GUB-2201', 'Rahim', 'CSE'], [102, 'GUB-2202', 'Karim', 'EEE'], [103, 'GUB-2203', 'Rahim', 'EEE'], [104, 'GUB-2204', 'Nusrat', 'CSE'], [105, 'GUB-2205', 'Karim', 'CSE'], [106, 'GUB-2206', 'Rahim', 'CSE']];
      const sel = new Set();
      const pick = el.querySelector('.colpick');
      pick.innerHTML = cols.map((c, i) => `<label><input type="checkbox" value="${i}"> ${c}</label>`).join('');
      const unique = set => { const k = rows.map(r => [...set].sort().map(i => r[i]).join('|')); return new Set(k).size === rows.length; };
      const dupRows = set => { const k = rows.map(r => [...set].sort().map(i => r[i]).join('|')); return k.map((x, i) => (k.indexOf(x) !== k.lastIndexOf(x) ? i : -1)).filter(i => i >= 0); };
      const draw = () => {
        const S = [...sel];
        el.querySelector('.kp-table').innerHTML = tbl(cols, rows, { cols: S, hl: S.length ? dupRows(sel) : [], cap: 'student' });
        const v = el.querySelector('.verdict');
        const name = '{' + S.sort().map(i => cols[i]).join(', ') + '}';
        if (!S.length) { v.className = 'verdict mid'; v.textContent = L(lang, '👆 উপরে এক বা একাধিক column বেছে নাও', '👆 Pick one or more columns above'); return; }
        if (!unique(sel)) { v.className = 'verdict no'; v.textContent = L(lang, `✗ ${name} Super key না: হলুদ row গুলোর মান একই, তাই আলাদা করা যায় না`, `✗ ${name} is NOT a super key: the yellow rows share the same value`); return; }
        const redundant = S.some(i => { const sub = new Set(S.filter(j => j !== i)); return sub.size && unique(sub); });
        if (redundant) { v.className = 'verdict mid'; v.textContent = L(lang, `◐ ${name} Super key ✓, কিন্তু Candidate key না: এর মধ্যে বাড়তি column আছে (minimal না)`, `◐ ${name} is a super key ✓ but NOT a candidate key: it has extra columns (not minimal)`); return; }
        v.className = 'verdict yes'; v.textContent = L(lang, `✓ ${name} Candidate key (minimal super key)! এটাকে Primary key বানানো যায়`, `✓ ${name} is a candidate key (minimal super key)! It could be chosen as the primary key`);
      };
      pick.addEventListener('change', e => { const i = +e.target.value; e.target.checked ? sel.add(i) : sel.delete(i); draw(); });
      draw();
    }
  };

  V.keyNest = lang => {
    let s = R(6, 6, 348, 240, 'soft', 18);
    s += T(20, 28, 'Super keys', 'b');
    s += T(20, 48, '{Roll_no, Name}  {Reg_no, Name}  {Roll_no, Reg_no}', 'mono');
    s += T(20, 66, '{Roll_no, Reg_no, Name} ...', 'mono');
    s += R(24, 82, 312, 152, 'ps', 16);
    s += T(38, 104, L(lang, 'Candidate keys (minimal super key)', 'Candidate keys (minimal super keys)'), 'b tp');
    s += T(38, 126, '{Roll_no}     {Registration_no}', 'mono');
    s += T(38, 144, L(lang, 'যেটা primary হয় না, সেটা Alternate key', 'Ones not chosen = alternate keys'), 'xs');
    s += R(42, 158, 276, 64, 'h', 12);
    s += T(56, 182, L(lang, 'Primary key (designer বেছে নেয়)', 'Primary key (chosen by designer)'), 'b').replace('class="b"', 'class="b" style="fill:#1a1505"');
    s += T(56, 206, '{Roll_no}', 'mono').replace('class="mono"', 'class="mono" style="fill:#1a1505"');
    return svg(360, 252, s, '', 'Super key, candidate key, primary key');
  };

  V.foreignKey = lang => {
    const id = 'm' + (++uid);
    let s = T(20, 20, L(lang, 'CATEGORY (parent table)', 'CATEGORY (parent table)'), 'b sm');
    s += stable(20, 28, [{ n: 'CategoryName  PK', w: 160, pk: 1 }, { n: 'ParentCategory', w: 140 }], [['Fiction', 'Adult'], ['Science', 'Adult'], ['Kids', 'Children']], { rh: 20 });
    s += T(10, 164, L(lang, 'BOOKSHELF (child table)', 'BOOKSHELF (child table)'), 'b sm');
    s += stable(10, 172, [{ n: 'Title  PK', w: 120, pk: 1 }, { n: 'Publisher', w: 86 }, { n: 'CategoryName FK', w: 134 }], [['Himu', 'Anyaprokash', 'Fiction'], ['Brief History', 'Bantam', 'Science'], ['Thakurmar Jhuli', 'Mitra', 'Kids']], { rh: 20 });
    s += `<rect x="216" y="196" width="134" height="60" class="h" style="opacity:.45"/>`;
    s += `<path d="M283,170 C283,140 100,150 100,116" class="lnp thick" marker-end="url(#${id})"/>`;
    s += T(200, 150, 'references', 'b sm tp');
    s += T(180, 280, L(lang, 'BOOKSHELF-এ "Poetry" category দিলে? ✗ CATEGORY-তে নেই, তাই error', 'Insert a book with category "Poetry"? ✗ Not in CATEGORY, so rejected'), 'xs tc tbad b');
    return svg(360, 292, s, mk(id, 'ahp'), 'Foreign key');
  };

  V.uniSchema = lang => {
    const box = (x, y, name, attrs, pk) => {
      const h = 24 + attrs.length * 17 + 4;
      let q = R(x, y, 152, h, 'box', 6) + `<rect x="${x}" y="${y}" width="152" height="24" rx="6" class="p"/>` + T(x + 76, y + 17, name, 'b wt tc sm');
      attrs.forEach((a, i) => { q += T(x + 8, y + 38 + i * 17, a, 'mono' + (pk.includes(i) ? ' u' : '')); });
      return q;
    };
    const id = 'm' + (++uid);
    const P = d => `<path d="${d}" class="lnp" marker-end="url(#${id})"/>`;
    let s = '';
    s += box(14, 8, 'department', ['dept_name', 'building', 'budget'], [0]);
    s += box(194, 8, 'course', ['course_id', 'title', 'dept_name', 'credits'], [0]);
    s += box(14, 120, 'instructor', ['ID', 'name', 'dept_name', 'salary'], [0]);
    s += box(194, 120, 'student', ['ID', 'name', 'dept_name', 'tot_cred'], [0]);
    s += box(14, 240, 'teaches', ['ID', 'course_id', 'sec_id', 'semester', 'year'], [0, 1, 2, 3, 4]);
    s += box(194, 240, 'takes', ['ID', 'course_id', 'sec_id', 'semester', 'year', 'grade'], [0, 1, 2, 3, 4]);
    s += P('M14,188 H4 V42 H12');
    s += P('M194,76 H180 V38 H168');
    s += P('M194,188 H174 V46 H168');
    s += P('M14,274 H9 V154 H12');
    s += P('M346,274 H354 V154 H348');
    s += P('M166,291 H186 V42 H192');
    s += P('M346,291 H358 V34 H348');
    s += T(180, 384, L(lang, 'নীল তীর = Foreign key → যে table-এর Primary key-কে refer করে', 'Blue arrow = foreign key → the primary key it refers to'), 'xs tc');
    return svg(360, 394, s, mk(id, 'ahp'), 'University schema diagram');
  };

  /* ================= CHAPTER 4: Relational Algebra ================= */
  V.raOps = lang => vsTable(lang, [L(lang, 'চিহ্ন', 'Symbol'), L(lang, 'নাম', 'Name'), L(lang, 'ধরন', 'Type'), L(lang, 'কী করে', 'What it does')], [
    [['σ'], ['Select'], ['Unary'], ['শর্ত মেনে row বাছাই', 'Picks rows matching a condition']],
    [['π'], ['Project'], ['Unary'], ['নির্দিষ্ট column রাখে', 'Keeps chosen columns']],
    [['∪'], ['Union'], ['Binary'], ['দুই relation-এর সব tuple', 'Tuples in either relation']],
    [['−'], ['Set difference'], ['Binary'], ['প্রথমটায় আছে, দ্বিতীয়টায় নেই', 'In the first but not the second']],
    [['×'], ['Cartesian product'], ['Binary'], ['প্রতিটা row × প্রতিটা row', 'Every row paired with every row']],
    [['ρ'], ['Rename'], ['Unary'], ['ফলাফলকে নতুন নাম দেয়', 'Gives a result a name']],
    [['∩ ⋈ ←'], [L(lang, 'অতিরিক্ত', 'Additional'), 'Additional'], ['—'], ['Intersection, Join, Assignment', 'Intersection, Join, Assignment']]
  ]);

  const exprBox = (ra, sql, say) => `<div class="play-expr"><div class="ra">${ra}</div>${say ? `<div class="say">${say}</div>` : ''}${sql ? `<div class="sql">SQL: ${esc(sql)}</div>` : ''}</div>`;

  V.raSelect = lang => {
    const hl = idx(INSTR, r => r[2] === 'Physics');
    return exprBox('σ <sub>dept_name="Physics"</sub> (instructor)', "select * from instructor where dept_name = 'Physics'", L(lang, 'হলুদ row গুলোই শর্ত পূরণ করে → শুধু সেগুলো থাকবে', 'Yellow rows satisfy the condition → only they remain'))
      + tbl(IH, INSTR, { hl, off: INSTR.map((_, i) => i).filter(i => !hl.includes(i)), cap: 'instructor' })
      + tbl(IH, INSTR.filter(r => r[2] === 'Physics'), { cap: L(lang, 'ফলাফল', 'Result') });
  };

  V.raProject = lang => {
    const depts = INSTR.map(r => [r[2]]);
    return exprBox('π <sub>name, salary</sub> (instructor)', 'select name, salary from instructor', L(lang, 'হলুদ column গুলো থাকবে, বাকিগুলো মুছে যাবে', 'Yellow columns stay; the rest are erased'))
      + tbl(IH, INSTR.slice(0, 5), { cols: [1, 3], cap: 'instructor' })
      + exprBox('π <sub>dept_name</sub> (instructor)', '', L(lang, `${depts.length}টা row থেকে duplicate বাদ দিয়ে ${uniq(depts).length}টা: relation হলো set!`, `${depts.length} rows shrink to ${uniq(depts).length}: duplicates removed, because a relation is a set!`))
      + `<div class="tables-row two">${tbl(['dept_name'], depts, { hl: [5, 7], cap: L(lang, 'Duplicate সহ', 'With duplicates') })}${tbl(['dept_name'], uniq(depts), { cap: L(lang, 'ফলাফল', 'Result') })}</div>`;
  };

  V.raCompose = lang => `<div class="flow">
    <div class="step"><b>instructor</b>${L(lang, '৮টা row', '8 rows')}</div><span class="arr">→</span>
    <div class="step"><b>σ dept="Physics"</b>${L(lang, '২টা row', '2 rows')}</div><span class="arr">→</span>
    <div class="step"><b>π name</b>${L(lang, '১টা column', '1 column')}</div><span class="arr">→</span>
    <div class="step"><b>{Einstein, Gold}</b>${L(lang, 'ফলাফল', 'result')}</div></div>
    <p class="vnote">π<sub>name</sub>(σ<sub>dept_name="Physics"</sub>(instructor)): ${L(lang, 'ভিতরেরটা আগে চলে, তারপর বাইরেরটা', 'the inner operation runs first, then the outer one')}</p>`;

  const P_I = [INSTR[0], INSTR[3]];
  const P_T = [TEACH[0], TEACH[1], TEACH[3]];
  const PROD = [];
  P_I.forEach(a => P_T.forEach(b => PROD.push([a[0], a[1], b[0], b[1]])));
  const PH = ['instructor.ID', 'name', 'teaches.ID', 'course_id'];
  const match = idx(PROD, r => r[0] === r[2]);

  V.raProduct = lang => `<div class="tables-row two">${tbl(['ID', 'name'], P_I.map(r => [r[0], r[1]]), { cap: 'instructor (2 rows)' })}${tbl(['ID', 'course_id'], P_T.map(r => [r[0], r[1]]), { cap: 'teaches (3 rows)' })}</div>`
    + exprBox('instructor × teaches', 'select * from instructor, teaches', L(lang, '২ × ৩ = ৬টা row: প্রতিটা instructor প্রতিটা course-এর সাথে জোড়া। হলুদ গুলোতেই আসলে ID মেলে।', '2 × 3 = 6 rows: every instructor paired with every course. Only the yellow ones have matching IDs.'))
    + tbl(PH, PROD, { hl: match, cap: 'instructor × teaches' });

  V.raJoin = lang => exprBox('σ <sub>instructor.ID = teaches.ID</sub> (instructor × teaches)', 'select * from instructor, teaches where instructor.ID = teaches.ID', L(lang, 'Cartesian product থেকে শুধু অর্থবহ জোড়া রাখো = Join', 'Keep only the meaningful pairs from the product = join'))
    + tbl(PH, PROD, { hl: match, off: PROD.map((_, i) => i).filter(i => !match.includes(i)), cap: L(lang, 'ধাপ ১: product, ধাপ ২: শর্তে ছাঁকা', 'Step 1: product, step 2: filter') })
    + tbl(PH, PROD.filter((_, i) => match.includes(i)), { cap: L(lang, 'ফলাফল (join)', 'Result (join)') });

  V.setVenn = {
    html: lang => `<div class="vtabs"><button data-op="u" class="on">∪ Union</button><button data-op="i">∩ Intersect</button><button data-op="d">− Difference</button></div><div class="venn-svg"></div><div class="play-expr venn-ex"></div>`,
    init(el, lang) {
      const A = ['CS-347', 'PHY-101'], AB = ['CS-101'], B = ['FIN-201', 'CS-319'];
      const draw = op => {
        const on = { a: op !== 'i', ab: op !== 'd', b: op === 'u' };
        let s = '';
        s += `<defs><clipPath id="vca"><circle cx="135" cy="105" r="88"/></clipPath></defs>`;
        s += `<circle cx="135" cy="105" r="88" class="${on.a ? 'h' : 'soft'}" style="opacity:${on.a ? .85 : 1}"/>`;
        s += `<circle cx="225" cy="105" r="88" class="${on.b ? 'h' : 'soft'}" style="opacity:${on.b ? .85 : 1}"/>`;
        s += `<circle cx="225" cy="105" r="88" clip-path="url(#vca)" class="${on.ab ? 'h' : 'soft'}"/>`;
        s += `<circle cx="135" cy="105" r="88" class="ln"/><circle cx="225" cy="105" r="88" class="ln"/>`;
        s += T(90, 16, 'Fall 2017', 'b tc sm') + T(270, 16, 'Spring 2018', 'b tc sm');
        A.forEach((c, i) => { s += T(95, 95 + i * 22, c, 'mono tc'); });
        AB.forEach(c => { s += T(180, 110, c, 'mono tc b'); });
        B.forEach((c, i) => { s += T(266, 95 + i * 22, c, 'mono tc'); });
        el.querySelector('.venn-svg').innerHTML = svg(360, 200, s, '', 'Set operations');
        const sym = { u: '∪', i: '∩', d: '−' }[op];
        const sql = { u: 'union', i: 'intersect', d: 'except' }[op];
        const res = { u: [...A, ...AB, ...B], i: AB, d: A }[op];
        const say = {
          u: L(lang, 'যেকোনো একটাতে থাকলেই', 'In either semester'),
          i: L(lang, 'দুইটাতেই থাকতে হবে', 'Must be in both'),
          d: L(lang, 'Fall-এ আছে কিন্তু Spring-এ নেই', 'In Fall but NOT in Spring')
        }[op];
        el.querySelector('.venn-ex').innerHTML = `<div class="ra">π<sub>course_id</sub>(σ<sub>Fall 2017</sub>(section)) ${sym} π<sub>course_id</sub>(σ<sub>Spring 2018</sub>(section))</div><div class="say">${say} → <b>{${res.join(', ')}}</b></div><div class="sql">SQL: (…Fall 2017…) ${sql} (…Spring 2018…)</div>`;
        el.querySelectorAll('.vtabs button').forEach(b => b.classList.toggle('on', b.dataset.op === op));
      };
      el.querySelector('.vtabs').addEventListener('click', e => { if (e.target.dataset.op) draw(e.target.dataset.op); });
      draw('u');
    }
  };

  V.raRename = lang => `<div class="flow"><div class="step"><b>STUDENT</b>${L(lang, 'পুরনো নাম', 'old name')}</div><span class="arr">ρ</span><div class="step"><b>STUDENT1</b>${L(lang, 'নতুন নাম', 'new name')}</div></div>
    <p class="vnote">ρ(STUDENT1, STUDENT) &nbsp;·&nbsp; ρ(STUDENT_NAMES, π<sub>ROLL_NO, NAME</sub>(STUDENT))</p>
    <div class="flow mt"><div class="step"><b>Physics ← σ<sub>Physics</sub>(instructor)</b></div><div class="step"><b>Music ← σ<sub>Music</sub>(instructor)</b></div><span class="arr">→</span><div class="step"><b>Physics ∪ Music</b>${L(lang, 'Assignment ←', 'Assignment ←')}</div></div>`;

  V.raPlay = {
    html: lang => `<div class="play-ops"></div><div class="play-out"></div><p class="vnote">${L(lang, 'যেকোনো operation চাপো: Relational Algebra, সমান SQL, আর ফলাফল একসাথে দেখো', 'Tap any operation to see the algebra, the equivalent SQL and the result together')}</p>`,
    init(el, lang) {
      const fall = uniq(TEACH.filter(r => r[3] === 'Fall' && r[4] === 2017).map(r => [r[1]]));
      const spr = uniq(TEACH.filter(r => r[3] === 'Spring' && r[4] === 2018).map(r => [r[1]]));
      const has = (set, v) => set.some(x => x[0] === v[0]);
      const ops = [
        { b: 'σ Physics', ra: 'σ<sub>dept_name="Physics"</sub>(instructor)', sql: "select * from instructor where dept_name = 'Physics'", run: () => [IH, INSTR.filter(r => r[2] === 'Physics')] },
        { b: 'σ salary>80000', ra: 'σ<sub>salary&gt;80000</sub>(instructor)', sql: 'select * from instructor where salary > 80000', run: () => [IH, INSTR.filter(r => r[3] > 80000)] },
        { b: 'σ CS ∧ >70000', ra: 'σ<sub>dept_name="Comp. Sci." ∧ salary&gt;70000</sub>(instructor)', sql: "select * from instructor where dept_name = 'Comp. Sci.' and salary > 70000", run: () => [IH, INSTR.filter(r => r[2] === 'Comp. Sci.' && r[3] > 70000)] },
        { b: 'π name,salary', ra: 'π<sub>name, salary</sub>(instructor)', sql: 'select name, salary from instructor', run: () => [['name', 'salary'], INSTR.map(r => [r[1], r[3]])] },
        { b: 'π dept_name', ra: 'π<sub>dept_name</sub>(instructor)', sql: 'select distinct dept_name from instructor', run: () => [['dept_name'], uniq(INSTR.map(r => [r[2]]))] },
        { b: 'π(σ)', ra: 'π<sub>name</sub>(σ<sub>dept_name="Physics"</sub>(instructor))', sql: "select name from instructor where dept_name = 'Physics'", run: () => [['name'], INSTR.filter(r => r[2] === 'Physics').map(r => [r[1]])] },
        { b: '⋈ join', ra: 'π<sub>name, course_id</sub>(σ<sub>instructor.ID=teaches.ID</sub>(instructor × teaches))', sql: 'select name, course_id\nfrom instructor, teaches\nwhere instructor.ID = teaches.ID', run: () => { const o = []; INSTR.forEach(a => TEACH.forEach(b => { if (a[0] === b[0]) o.push([a[1], b[1]]); })); return [['name', 'course_id'], o]; } },
        { b: '∪', ra: 'Fall2017 ∪ Spring2018', sql: '(select course_id … Fall 2017) union (select course_id … Spring 2018)', run: () => [['course_id'], uniq([...fall, ...spr])] },
        { b: '∩', ra: 'Fall2017 ∩ Spring2018', sql: '… intersect …', run: () => [['course_id'], fall.filter(x => has(spr, x))] },
        { b: '−', ra: 'Fall2017 − Spring2018', sql: '… except …', run: () => [['course_id'], fall.filter(x => !has(spr, x))] }
      ];
      const box = el.querySelector('.play-ops');
      box.innerHTML = ops.map((o, i) => `<button data-i="${i}">${o.b}</button>`).join('');
      const show = i => {
        const o = ops[i], [h, rows] = o.run();
        el.querySelector('.play-out').innerHTML = exprBox(o.ra, o.sql, L(lang, `ফলাফল: ${rows.length}টা tuple`, `Result: ${rows.length} tuple(s)`)) + tbl(h, rows, { cap: L(lang, 'ফলাফল', 'Result') });
        box.querySelectorAll('button').forEach(b => b.classList.toggle('on', +b.dataset.i === i));
      };
      box.addEventListener('click', e => { const b = e.target.closest('button'); if (b) show(+b.dataset.i); });
      show(0);
    }
  };

  /* ================= CHAPTER 5: SQL ================= */
  V.sqlTypes = lang => vsTable(lang, ['Type', L(lang, 'কী রাখে', 'Stores'), L(lang, 'উদাহরণ', 'Example')], [
    [['char(n)'], ['নির্দিষ্ট দৈর্ঘ্যের লেখা (0–255)', 'Fixed-length text (0–255)'], ["char(5): '10101'"]],
    [['varchar(n)'], ['পরিবর্তনশীল দৈর্ঘ্য, সর্বোচ্চ n (0–65535)', 'Variable length up to n (0–65535)'], ["varchar(20): 'Einstein'"]],
    [['int'], ['পূর্ণসংখ্যা', 'Integer'], ['credits = 3']],
    [['float(n)'], ['ভগ্নাংশ সংখ্যা, কমপক্ষে n digit precision', 'Floating point, at least n digits'], ['3.14159']],
    [['float(p,d)'], ['মোট p digit, দশমিকের পর d', 'p digits total, d after the point'], ['(3,1): 44.5 ✓  444.5 ✗']],
    [['date'], ['YYYY-MM-DD', 'YYYY-MM-DD'], ["'2026-10-04'"]]
  ]);

  V.sqlCats = lang => grid([
    { e: '🏗️', t: 'DDL: Definition', d: L(lang, 'Structure বানায়/বদলায়: <code>CREATE</code> <code>ALTER</code> <code>DROP</code> <code>TRUNCATE</code>', 'Builds/changes structure: <code>CREATE</code> <code>ALTER</code> <code>DROP</code> <code>TRUNCATE</code>'), c: 1 },
    { e: '🔍', t: 'DQL: Query', d: L(lang, 'Data পড়ে: <code>SELECT</code>', 'Reads data: <code>SELECT</code>'), c: 2 },
    { e: '✏️', t: 'DML: Manipulation', d: L(lang, 'Data বদলায়: <code>INSERT</code> <code>UPDATE</code> <code>DELETE</code>', 'Changes data: <code>INSERT</code> <code>UPDATE</code> <code>DELETE</code>'), c: 3 },
    { e: '🔐', t: 'DCL: Control', d: L(lang, 'অনুমতি দেয়/নেয়: <code>GRANT</code> <code>REVOKE</code>', 'Permissions: <code>GRANT</code> <code>REVOKE</code>'), c: 4 },
    { e: '🔁', t: 'TCL: Transaction', d: L(lang, 'Transaction সামলায়: <code>COMMIT</code> <code>ROLLBACK</code> <code>SAVEPOINT</code>', 'Transactions: <code>COMMIT</code> <code>ROLLBACK</code> <code>SAVEPOINT</code>'), c: 5 }
  ]);

  V.constraints = lang => grid([
    { e: '🚫', t: 'not null', d: L(lang, 'ঘর খালি রাখা যাবে না। <code>name varchar(20) not null</code>', 'Value can’t be empty. <code>name varchar(20) not null</code>'), c: 3 },
    { e: '🔑', t: 'primary key (A1,…,An)', d: L(lang, 'Unique + not null নিজে থেকেই', 'Unique, and automatically not null'), c: 1 },
    { e: '🔗', t: 'foreign key (Am,…) references r', d: L(lang, 'মান অবশ্যই r table-এর primary key-তে থাকতে হবে', 'Values must exist in r’s primary key'), c: 4 }
  ]);

  V.deleteVsDrop = lang => {
    let s = '';
    const mini = (x, rows, ghost) => {
      let q = `<rect x="${x}" y="40" width="104" height="${22 + rows * 18}" rx="6" class="${ghost ? 'r dash' : 'box'}"/>`;
      if (!ghost) {
        q += `<rect x="${x}" y="40" width="104" height="22" rx="6" class="p"/>` + T(x + 8, 56, 'ID  name  dept', 'wt xs b').replace('class="wt xs b"', 'class="xs b" style="fill:#fff"');
        for (let i = 0; i < rows; i++) q += T(x + 8, 76 + i * 18, ['101 Rahim CSE', '102 Nusrat EEE', '103 Tanvir CSE'][i], 'mono');
      }
      return q;
    };
    s += T(56, 24, L(lang, 'আগে', 'Before'), 'b tc sm') + mini(4, 3);
    s += T(180, 24, 'delete from student', 'mono tc b') + mini(128, 0);
    s += T(180, 96, L(lang, 'Table আছে, row নেই', 'Table stays, rows gone'), 'xs tc tw b');
    s += T(304, 24, 'drop table student', 'mono tc b') + mini(252, 2, true) + T(304, 70, '✗', 'tc lg tbad b');
    s += T(304, 96, L(lang, 'Table-ই নেই!', 'Table itself is gone!'), 'xs tc tbad b');
    s += T(180, 148, L(lang, 'delete = DML (data মোছে) · drop = DDL (structure মোছে)', 'delete = DML (removes data) · drop = DDL (removes structure)'), 'sm tc b');
    return svg(360, 160, s, '', 'delete vs drop');
  };

  V.sqlAnatomy = lang => vsTable(lang, ['SQL', 'Relational algebra', L(lang, 'কাজ', 'Job')], [
    [['<code>select A1, A2</code>'], ['π (project)'], ['কোন column দেখাবে', 'Which columns to show']],
    [['<code>from r1, r2</code>'], ['× (Cartesian product)'], ['কোন table থেকে', 'Which tables to use']],
    [['<code>where P</code>'], ['σ (select)'], ['কোন row রাখবে (শর্ত)', 'Which rows to keep (condition)']]
  ]) + `<div class="flow mt"><div class="step"><b>FROM</b>${L(lang, '১. table নাও', '1. take tables')}</div><span class="arr">→</span><div class="step"><b>WHERE</b>${L(lang, '২. row ছাঁকো', '2. filter rows')}</div><span class="arr">→</span><div class="step"><b>SELECT</b>${L(lang, '৩. column বাছো', '3. pick columns')}</div></div><p class="vnote">${L(lang, 'লেখা হয় select-from-where, কিন্তু DBMS ভাবে from → where → select ক্রমে', 'Written select-from-where, but evaluated from → where → select')}</p>`;

  V.likeDemo = {
    html: lang => `<div class="like-in"><input type="text" value="%dar%" aria-label="pattern" spellcheck="false"></div><div class="vtabs"></div><div class="like-list"></div><p class="vnote">${L(lang, '<b>%</b> = যেকোনো সংখ্যক অক্ষর (০ সহ) · <b>_</b> = ঠিক একটা অক্ষর · সবুজ = মিলেছে', '<b>%</b> = any number of characters (even 0) · <b>_</b> = exactly one character · green = match')}</p>`,
    init(el) {
      const words = ['Sardar', 'Haidar', 'Darwin', 'Intro to DB', 'Intro', 'Comp. Sci.', 'Computer', 'Cat', 'Dog', 'Ox', 'Database', '100%'];
      const pats = ['%dar%', 'Intro%', '%Comp%', '___', '___%', 'D%', '%e%'];
      const inp = el.querySelector('input');
      el.querySelector('.vtabs').innerHTML = pats.map(p => `<button data-p="${p}">${p}</button>`).join('');
      const toRe = p => new RegExp('^' + p.split('').map(c => c === '%' ? '.*' : c === '_' ? '.' : c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('') + '$', 'i');
      const draw = () => {
        let re; try { re = toRe(inp.value); } catch (e) { return; }
        el.querySelector('.like-list').innerHTML = words.map(w => `<span class="${re.test(w) ? 'm' : ''}">${re.test(w) ? '✓' : '✗'} '${esc(w)}'</span>`).join('');
        el.querySelectorAll('.vtabs button').forEach(b => b.classList.toggle('on', b.dataset.p === inp.value));
      };
      inp.addEventListener('input', draw);
      el.querySelector('.vtabs').addEventListener('click', e => { if (e.target.dataset.p) { inp.value = e.target.dataset.p; draw(); } });
      draw();
    }
  };

  V.orderBy = lang => {
    const r = INSTR.slice(0, 6).map(x => [x[1], x[2]]);
    const s1 = [...r].sort((a, b) => a[0].localeCompare(b[0]));
    const s2 = [...r].sort((a, b) => a[1].localeCompare(b[1]) || a[0].localeCompare(b[0]));
    return `<div class="tables-row two">${tbl(['name', 'dept_name'], s1, { cols: [0], cap: 'order by name' })}${tbl(['name', 'dept_name'], s2, { cols: [1], cap: 'order by dept_name, name' })}</div><p class="vnote">${L(lang, 'Default = asc (ছোট→বড়, A→Z)। উল্টো চাইলে desc। দ্বিতীয় column তখনই কাজে লাগে যখন প্রথমটার মান একই (Comp. Sci. দুইজন → name দিয়ে সাজানো)', 'Default is asc (A→Z). Use desc to reverse. The second column breaks ties (two Comp. Sci. rows → sorted by name)')}</p>`;
  };

  V.nullDemo = lang => vsTable(lang, [L(lang, 'Expression', 'Expression'), L(lang, 'ফলাফল', 'Result'), L(lang, 'কেন', 'Why')], [
    [['<code>5 + null</code>'], ['<b>null</b>'], ['অজানা + সংখ্যা = অজানা', 'Unknown + number = unknown']],
    [['<code>salary = null</code>'], ['<b>unknown</b> ✗'], ['null-কে = দিয়ে তুলনা চলে না', 'You can’t compare null with =']],
    [['<code>salary is null</code>'], ['true / false ✓'], ['null খোঁজার সঠিক উপায়', 'The right way to test for null']],
    [['<code>count(*)</code> vs <code>avg(salary)</code>'], ['—'], ['Aggregate null বাদ দেয় (count(*) ছাড়া)', 'Aggregates ignore nulls (except count(*))']]
  ]);

  V.groupBy = lang => {
    const tone = { 'Biology': 'var(--ok)', 'Comp. Sci.': 'var(--primary)', 'Finance': 'var(--warn)', 'Music': 'var(--violet)', 'Physics': 'var(--bad)' };
    const sorted = [...INSTR].sort((a, b) => a[2].localeCompare(b[2]));
    const st = r => `background: color-mix(in srgb, ${tone[r[1] || r[2]] || tone[r[0]]} 14%, transparent)`;
    const groups = {};
    sorted.forEach(r => { (groups[r[2]] = groups[r[2]] || []).push(r[3]); });
    const res = Object.keys(groups).map(d => [d, Math.round(groups[d].reduce((a, b) => a + b, 0) / groups[d].length)]);
    const pass = idx(res, r => r[1] > 80000);
    return tbl(['name', 'dept_name', 'salary'], sorted.map(r => [r[1], r[2], r[3]]), { cap: L(lang, '১. dept_name অনুযায়ী দল (group) বানাও', '1. Form groups by dept_name'), rowStyle: r => st([null, r[1]]) })
      + tbl(['dept_name', 'avg_salary'], res, { cap: L(lang, '২. প্রতি দলের avg(salary)', '2. avg(salary) per group'), rowStyle: r => st([r[0]]) })
      + tbl(['dept_name', 'avg_salary'], res, { hl: pass, off: res.map((_, i) => i).filter(i => !pass.includes(i)), cap: L(lang, '৩. having avg(salary) > 80000: শুধু হলুদ দল', '3. having avg(salary) > 80000: only yellow groups remain') });
  };

  V.someAll = lang => {
    let s = '';
    const line = (y, set, label, res, good) => {
      let q = Ln(20, y, 340, y, 'ln');
      for (let n = 0; n <= 10; n++) q += Ln(20 + n * 32, y - 4, 20 + n * 32, y + 4, 'ln') + T(20 + n * 32, y + 18, n, 'xs tc');
      set.forEach(v => { q += `<circle cx="${20 + v * 32}" cy="${y}" r="7" class="${v > 5 ? 'g' : 'r'}"/>`; });
      q += `<polygon points="${180},${y - 12} ${174},${y - 22} ${186},${y - 22}" class="p"/>` + T(180, y - 26, 'F = 5', 'b tc sm tp');
      q += T(20, y - 30, label, 'b mono') + T(340, y - 30, res, 'b te ' + (good ? 'tok' : 'tbad'));
      return q;
    };
    s += line(60, [0, 5, 6], '5 < some {0,5,6}', 'TRUE (6)', true);
    s += line(146, [0, 5, 6], '5 < all {0,5,6}', 'FALSE (0,5)', false);
    s += T(180, 190, L(lang, 'some = অন্তত একটার চেয়ে · all = সবগুলোর চেয়ে', 'some = than at least one · all = than every one'), 'sm tc b');
    s += T(180, 210, '= some ≡ in   ·   ≠ all ≡ not in', 'mono tc');
    return svg(360, 220, s, '', 'some vs all');
  };

  V.sqlPlay = {
    html: lang => `<div class="play-ops"></div><div class="play-out"></div><p class="vnote">${L(lang, 'Query বেছে নাও → ফলাফল দেখো (instructor ও teaches table থেকে)', 'Choose a query → see its result (on the instructor and teaches tables)')}</p>`,
    init(el, lang) {
      const avgBy = () => { const g = {}; INSTR.forEach(r => { (g[r[2]] = g[r[2]] || []).push(r[3]); }); return Object.keys(g).sort().map(d => [d, +(g[d].reduce((a, b) => a + b, 0) / g[d].length).toFixed(2)]); };
      const Q = [
        { b: 'where … and', q: "select name\nfrom instructor\nwhere dept_name = 'Comp. Sci.' and salary > 80000", run: () => [['name'], INSTR.filter(r => r[2] === 'Comp. Sci.' && r[3] > 80000).map(r => [r[1]])] },
        { b: 'distinct', q: 'select distinct dept_name\nfrom instructor', run: () => [['dept_name'], uniq(INSTR.map(r => [r[2]]))] },
        { b: 'arithmetic + as', q: 'select ID, name, salary/12 as monthly_salary\nfrom instructor', run: () => [['ID', 'name', 'monthly_salary'], INSTR.map(r => [r[0], r[1], (r[3] / 12).toFixed(2)])] },
        { b: 'like', q: "select name\nfrom instructor\nwhere name like '%in%'", run: () => [['name'], INSTR.filter(r => /in/i.test(r[1])).map(r => [r[1]])] },
        { b: 'between + order by', q: 'select name, salary\nfrom instructor\nwhere salary between 70000 and 90000\norder by name', run: () => [['name', 'salary'], INSTR.filter(r => r[3] >= 70000 && r[3] <= 90000).map(r => [r[1], r[3]]).sort((a, b) => a[0].localeCompare(b[0]))] },
        { b: 'count(*)', q: 'select count(*)\nfrom instructor', run: () => [['count(*)'], [[INSTR.length]]] },
        { b: 'group by', q: 'select dept_name, avg(salary) as avg_salary\nfrom instructor\ngroup by dept_name', run: () => [['dept_name', 'avg_salary'], avgBy()] },
        { b: 'having', q: 'select dept_name, avg(salary)\nfrom instructor\ngroup by dept_name\nhaving avg(salary) > 80000', run: () => [['dept_name', 'avg(salary)'], avgBy().filter(r => r[1] > 80000)] },
        { b: 'join', q: 'select name, course_id\nfrom instructor, teaches\nwhere instructor.ID = teaches.ID', run: () => { const o = []; INSTR.forEach(a => TEACH.forEach(b => { if (a[0] === b[0]) o.push([a[1], b[1]]); })); return [['name', 'course_id'], o]; } },
        { b: '> all', q: "select name\nfrom instructor\nwhere salary > all (select salary\n                    from instructor\n                    where dept_name = 'Biology')", run: () => [['name'], INSTR.filter(r => r[3] > 72000).map(r => [r[1]])] },
        { b: '> some', q: "select name\nfrom instructor\nwhere salary > some (select salary\n                     from instructor\n                     where dept_name = 'Physics')", run: () => [['name'], INSTR.filter(r => r[3] > 87000).map(r => [r[1]])] },
        { b: 'in (subquery)', q: "select name\nfrom instructor\nwhere ID in (select ID from teaches\n             where semester = 'Fall' and year = 2017)", run: () => [['name'], INSTR.filter(r => TEACH.some(t => t[0] === r[0] && t[3] === 'Fall' && t[4] === 2017)).map(r => [r[1]])] }
      ];
      const box = el.querySelector('.play-ops');
      box.innerHTML = Q.map((o, i) => `<button data-i="${i}">${o.b}</button>`).join('');
      const show = i => {
        const o = Q[i], [h, rows] = o.run();
        el.querySelector('.play-out').innerHTML = `<pre class="code"><code>${esc(o.q)}</code></pre>` + tbl(h, rows, { cap: L(lang, `ফলাফল: ${rows.length}টা row`, `Result: ${rows.length} row(s)`) });
        if (window.highlightCode) window.highlightCode(el);
        box.querySelectorAll('button').forEach(b => b.classList.toggle('on', +b.dataset.i === i));
      };
      box.addEventListener('click', e => { const b = e.target.closest('button'); if (b) show(+b.dataset.i); });
      show(0);
    }
  };

  V.instrTable = lang => `<div class="tables-row">${tbl(IH, INSTR, { cap: 'instructor', pk: [0] })}${tbl(TH, TEACH, { cap: 'teaches', pk: [0, 1, 2, 3, 4] })}</div>`;

  /* ================= CHAPTER 6: ER ================= */
  V.erBasic = lang => {
    let s = entity(8, 34, 112, 'instructor', ['ID', 'name', 'salary'], 1);
    s += Ln(120, 76, 136, 76, 'ln thick') + Ln(224, 76, 240, 76, 'ln thick');
    s += D(180, 76, 88, 48, 'o') + T(180, 81, 'advisor', 'tc b sm');
    s += entity(240, 34, 112, 'student', ['ID', 'name', 'tot_cred'], 1);
    s += T(64, 22, 'Entity set', 'xs tc b tp') + T(180, 40, 'Relationship set', 'xs tc b tw') + T(296, 22, 'Entity set', 'xs tc b tp');
    s += R(30, 148, 300, 56, 'soft', 12);
    s += T(180, 170, '22222 (Einstein)  ⟷  44553 (Peltier)', 'mono tc b');
    s += T(180, 192, L(lang, 'একটা নির্দিষ্ট জোড়া = একটা relationship', 'One specific pair = one relationship'), 'xs tc');
    s += T(180, 226, L(lang, 'Underline = primary key', 'Underline = primary key'), 'xs tc');
    return svg(360, 236, s, '', 'Entities and relationship');
  };

  V.degreeRoles = lang => {
    let s = '';
    s += Ln(110, 38, 134, 44, 'ln') + Ln(250, 38, 226, 44, 'ln') + Ln(180, 66, 180, 92, 'ln');
    s += R(10, 22, 100, 32, 'ps', 2) + T(60, 43, 'instructor', 'tc b sm');
    s += R(250, 22, 100, 32, 'ps', 2) + T(300, 43, 'project', 'tc b sm');
    s += D(180, 44, 96, 44, 'o') + T(180, 49, 'proj_guide', 'tc b xs');
    s += R(130, 92, 100, 32, 'ps', 2) + T(180, 113, 'student', 'tc b sm');
    s += T(180, 148, L(lang, 'Ternary relationship (degree = 3)', 'Ternary relationship (degree = 3)'), 'b tc sm tp');
    s += Ln(10, 162, 350, 162, 'ln dash');
    s += R(30, 206, 100, 34, 'ps', 2) + T(80, 228, 'course', 'tc b sm');
    s += `<path d="M130,214 L260,196" class="ln"/><path d="M130,232 L260,250" class="ln"/>`;
    s += `<polygon points="260,198 300,223 260,248 220,223" class="o"/>` + T(260, 228, 'prereq', 'tc b xs');
    s += T(190, 196, 'course_id', 'mono tc tp') + T(190, 262, 'prereq_id', 'mono tc tp');
    s += T(180, 288, L(lang, 'Roles: একই entity set দুই ভূমিকায়', 'Roles: one entity set in two roles'), 'b tc sm tp');
    return svg(360, 298, s, '', 'Degree and roles');
  };

  V.cardinality = {
    html: lang => `<div class="vtabs"><button data-k="11" class="on">1 : 1</button><button data-k="1n">1 : N</button><button data-k="n1">N : 1</button><button data-k="mn">M : N</button></div><div class="card-svg"></div><div class="play-expr card-ex"></div>`,
    init(el, lang) {
      const sets = {
        '11': { A: L(lang, 'নাগরিক', 'Citizen'), B: L(lang, 'NID কার্ড', 'NID card'), l: [[0, 0], [1, 2], [2, 1]], say: L(lang, 'একজন নাগরিকের একটাই NID, একটা NID একজনেরই', 'One citizen has one NID; one NID belongs to one citizen') },
        '1n': { A: L(lang, 'Department', 'Department'), B: L(lang, 'Student', 'Student'), l: [[0, 0], [0, 1], [1, 2], [2, 3]], say: L(lang, 'একটা department-এ অনেক student, প্রতিটা student একটাই department-এ', 'One department has many students; each student is in one department') },
        'n1': { A: L(lang, 'Student', 'Student'), B: L(lang, 'Advisor', 'Advisor'), l: [[0, 0], [1, 0], [2, 1], [3, 2]], say: L(lang, 'অনেক student-এর একই advisor হতে পারে, কিন্তু প্রতিটা student-এর একজনই', 'Many students can share an advisor; each student has at most one') },
        'mn': { A: L(lang, 'Student', 'Student'), B: L(lang, 'Course', 'Course'), l: [[0, 0], [0, 1], [1, 0], [2, 2], [2, 3], [3, 2]], say: L(lang, 'একজন student অনেক course নেয়, একটা course-এ অনেক student', 'A student takes many courses; a course has many students') }
      };
      const draw = k => {
        const d = sets[k];
        let s = E(90, 116, 64, 96, 'ps') + E(270, 116, 64, 96, 'o');
        s += T(90, 12, d.A, 'b tc') + T(270, 12, d.B, 'b tc');
        d.l.forEach(([a, b]) => { s += Ln(98, 50 + a * 44, 262, 50 + b * 44, 'lnp thick'); });
        for (let i = 0; i < 4; i++) {
          s += `<circle cx="90" cy="${50 + i * 44}" r="8" class="p"/>` + T(70, 55 + i * 44, 'a' + (i + 1), 'xs te');
          s += `<circle cx="270" cy="${50 + i * 44}" r="8" class="p"/>` + T(290, 55 + i * 44, 'b' + (i + 1), 'xs');
        }
        el.querySelector('.card-svg').innerHTML = svg(360, 220, s, '', 'Mapping cardinality');
        el.querySelector('.card-ex').innerHTML = `<div class="ra">${{ '11': 'One to one', '1n': 'One to many', 'n1': 'Many to one', 'mn': 'Many to many' }[k]}</div><div class="say">${d.say}</div><div class="sql">${L(lang, 'কিছু element কারও সাথে যুক্ত না-ও থাকতে পারে (যেমন a4/b4)', 'Some elements may not be mapped at all (e.g. a4 / b4)')}</div>`;
        el.querySelectorAll('.vtabs button').forEach(b => b.classList.toggle('on', b.dataset.k === k));
      };
      el.querySelector('.vtabs').addEventListener('click', e => { if (e.target.dataset.k) draw(e.target.dataset.k); });
      draw('11');
    }
  };

  V.participation = lang => {
    const id = 'm' + (++uid);
    let s = R(8, 40, 96, 40, 'ps', 2) + T(56, 65, 'instructor', 'tc b sm');
    s += Ln(136, 60, 106, 60, 'ln thick', id);
    s += D(180, 60, 88, 48, 'o') + T(180, 65, 'advisor', 'tc b sm');
    s += Ln(224, 56, 256, 56, 'ln') + Ln(224, 64, 256, 64, 'ln');
    s += R(256, 40, 96, 40, 'ps', 2) + T(304, 65, 'student', 'tc b sm');
    s += T(120, 50, '0..*', 'mono tc b tp') + T(240, 48, '1..1', 'mono tc b tp');
    s += T(14, 116, L(lang, '→ তীর = “one” দিক: student-এর advisor একজনই', '→ Arrow = “one” side: a student has one advisor'), 'sm');
    s += T(14, 140, L(lang, '═ Double line = total: প্রতিটা student-এর advisor থাকতেই হবে', '═ Double line = total: every student MUST have one'), 'sm');
    s += T(14, 164, L(lang, '— Single line = partial: সব instructor advisor না-ও হতে পারেন', '— Single line = partial: not every instructor advises'), 'sm');
    s += T(14, 188, L(lang, 'l..h: min 1 = total, max 1 = সর্বোচ্চ একটা, * = সীমা নেই', 'l..h: min 1 = total, max 1 = at most one, * = no limit'), 'sm');
    return svg(360, 200, s, mk(id), 'Participation and cardinality limits');
  };

  V.weakEntity = lang => {
    const id = 'm' + (++uid);
    let s = '';
    s += Ln(56, 74, 30, 120, 'ln') + Ln(56, 74, 96, 120, 'ln');
    s += Ln(304, 74, 250, 124, 'ln') + Ln(304, 74, 304, 124, 'ln') + Ln(304, 74, 352 - 6, 124, 'ln');
    s += R(8, 34, 96, 40, 'ps', 2) + T(56, 59, 'course', 'tc b sm');
    s += Ln(136, 54, 106, 54, 'ln thick', id);
    s += D(180, 54, 88, 48, 'o') + D(180, 54, 72, 36, 'o') + T(180, 58, 'sec_course', 'tc b xs');
    s += Ln(224, 50, 256, 50, 'ln') + Ln(224, 58, 256, 58, 'ln');
    s += R(256, 34, 96, 40, 'ps', 2) + R(261, 39, 86, 30, 'ps', 2) + T(304, 59, 'section', 'tc b sm');
    s += E(30, 136, 30, 15, 'box') + T(30, 140, 'course_id', 'tc xs u');
    s += E(98, 136, 28, 15, 'box') + T(98, 140, 'title', 'tc xs');
    s += E(240, 138, 30, 15, 'box') + T(240, 142, 'sec_id', 'tc xs') + `<line x1="224" y1="145" x2="256" y2="145" class="ln dash"/>`;
    s += E(304, 152, 32, 15, 'box') + T(304, 156, 'semester', 'tc xs');
    s += E(334, 124, 22, 13, 'box') + T(334, 128, 'year', 'tc xs');
    s += T(180, 186, L(lang, 'sec_id = discriminator (dashed underline)', 'sec_id = discriminator (dashed underline)'), 'xs tc');
    s += R(10, 198, 340, 34, 'hs', 10);
    s += T(180, 220, 'PK(section) = course_id + sec_id + semester + year', 'mono tc b').replace('class="mono tc b"', 'class="mono tc b" style="fill:#1a1505"');
    return svg(360, 240, s, mk(id), 'Weak entity set');
  };

  V.erToTable = lang => vsTable(lang, [L(lang, 'ER-এ যা আছে', 'In the ER diagram'), L(lang, 'Table (schema) হবে', 'Becomes the schema')], [
    [['Strong entity set'], ['<code>student(ID, name, tot_cred)</code>']],
    [['Weak entity set'], ['<code>section(course_id, sec_id, sem, year)</code> + identifying PK', '<code>section(course_id, sec_id, sem, year)</code>: includes owner’s PK']],
    [['Many-to-many relationship'], ['<code>advisor(s_id, i_id)</code>: দুই দিকের PK + নিজের attribute', '<code>advisor(s_id, i_id)</code>: both PKs + own attributes']],
    [['Many-to-one (total on many side)'], ['আলাদা table লাগে না: many দিকে FK যোগ (instructor.dept_name)', 'No extra table: add FK on the many side (instructor.dept_name)']],
    [['Composite attribute name'], ['ভেঙে ফেলো: <code>first_name, last_name</code>', 'Flatten: <code>first_name, last_name</code>']],
    [['Multivalued attribute phone'], ['নতুন table: <code>inst_phone(ID, phone_number)</code>', 'New table: <code>inst_phone(ID, phone_number)</code>']]
  ]);

  V.isa = lang => {
    let s = R(130, 8, 100, 34, 'p', 2) + T(180, 30, 'person', 'tc b wt');
    s += Ln(180, 42, 180, 58, 'ln');
    s += `<polygon points="180,58 148,96 212,96" class="o"/>` + T(180, 89, 'ISA', 'tc xs b');
    s += T(228, 76, 'overlapping', 'xs b tw');
    s += Ln(160, 96, 85, 130, 'ln') + Ln(200, 96, 275, 130, 'ln');
    s += R(30, 130, 110, 34, 'ps', 2) + T(85, 152, 'employee', 'tc b sm');
    s += R(220, 130, 110, 34, 'ps', 2) + T(275, 152, 'student', 'tc b sm');
    s += Ln(85, 164, 85, 180, 'ln');
    s += `<polygon points="85,180 55,214 115,214" class="o"/>` + T(85, 207, 'ISA', 'tc xs b');
    s += T(124, 200, 'disjoint', 'xs b tw');
    s += Ln(70, 214, 58, 250, 'ln') + Ln(100, 214, 174, 250, 'ln');
    s += R(8, 250, 100, 34, 'ps', 2) + T(58, 272, 'instructor', 'tc b sm');
    s += R(124, 250, 100, 34, 'ps', 2) + T(174, 272, 'secretary', 'tc b sm');
    s += T(240, 206, L(lang, 'নিচের সবাই person-এর', 'Lower sets inherit'), 'xs b');
    s += T(240, 222, 'ID, name,', 'mono');
    s += T(240, 238, 'street, city', 'mono');
    s += T(240, 254, L(lang, 'উত্তরাধিকার পায়', 'from person'), 'xs b');
    s += T(180, 306, L(lang, '↓ উপর থেকে নিচে = Specialization · ↑ নিচ থেকে উপরে = Generalization', '↓ top-down = specialization · ↑ bottom-up = generalization'), 'xs tc b');
    return svg(360, 316, s, '', 'Specialization ISA');
  };

  V.aggregation = lang => {
    let s = `<rect x="6" y="20" width="348" height="146" rx="14" class="hs dash"/>`;
    s += T(16, 14, L(lang, 'Aggregation: পুরো relationship-কে একটা entity ধরা হলো', 'Aggregation: the whole relationship treated as an entity'), 'xs b tw');
    s += Ln(112, 54, 136, 56, 'ln') + Ln(248, 54, 224, 56, 'ln') + Ln(180, 76, 180, 114, 'ln');
    s += R(16, 38, 96, 34, 'ps', 2) + T(64, 60, 'instructor', 'tc b sm');
    s += D(180, 56, 88, 40, 'o') + T(180, 60, 'proj_guide', 'tc b xs');
    s += R(248, 38, 96, 34, 'ps', 2) + T(296, 60, 'project', 'tc b sm');
    s += R(130, 114, 100, 34, 'ps', 2) + T(180, 136, 'student', 'tc b sm');
    s += Ln(180, 166, 180, 190, 'ln thick');
    s += D(180, 210, 84, 40, 'o') + T(180, 214, 'eval_for', 'tc b xs');
    s += Ln(180, 230, 180, 248, 'ln');
    s += R(124, 248, 112, 34, 'ps', 2) + T(180, 270, 'evaluation', 'tc b sm');
    s += T(180, 302, 'eval_for(s_ID, project_id, i_ID, evaluation_id)', 'mono tc');
    return svg(360, 312, s, '', 'Aggregation');
  };


  V.uniER = lang => {
    const id = 'm' + (++uid);
    const box = (x, y, n) => R(x, y, 104, 34, 'ps', 2) + T(x + 52, y + 22, n, 'tc b sm');
    let s = '';
    // instructor ═ inst_dept → department
    s += Ln(112, 44, 134, 44, 'ln') + Ln(112, 50, 134, 50, 'ln');
    s += Ln(226, 47, 248, 47, 'ln', id);
    // advisor: → instructor, ═ student
    s += Ln(60, 137, 60, 66, 'ln', id);
    s += Ln(57, 177, 57, 250, 'ln') + Ln(63, 177, 63, 250, 'ln');
    // stud_dept: ═ student, → department
    s += Ln(108, 250, 166, 160, 'ln') + Ln(114, 253, 171, 163, 'ln');
    s += `<path d="M256,157 H300 V66" class="ln" marker-end="url(#${id})"/>`;
    // takes: many-many
    s += Ln(112, 267, 142, 267, 'ln') + Ln(218, 267, 248, 267, 'ln') + Ln(180, 287, 180, 300, 'ln');
    s += box(8, 30, 'instructor') + box(248, 30, 'department') + box(8, 250, 'student') + box(248, 250, 'course');
    s += D(180, 47, 92, 40, 'o') + T(180, 51, 'inst_dept', 'tc xs b');
    s += D(60, 157, 86, 40, 'o') + T(60, 161, 'advisor', 'tc xs b');
    s += D(210, 157, 92, 40, 'o') + T(210, 161, 'stud_dept', 'tc xs b');
    s += D(180, 267, 76, 40, 'o') + T(180, 271, 'takes', 'tc xs b');
    s += E(180, 313, 30, 13, 'box') + T(180, 317, 'grade', 'tc xs');
    s += T(76, 112, '1', 'xs b tp') + T(76, 230, 'N', 'xs b tp') + T(126, 286, 'M', 'xs b tp') + T(232, 286, 'N', 'xs b tp');
    s += T(180, 345, L(lang, '→ = one · — = many · ═ = total participation', '→ = one · — = many · ═ = total participation'), 'xs tc b');
    return svg(360, 354, s, mk(id), 'University ER diagram');
  };

  V.designPhases = lang => `<div class="flow">
    <div class="step"><b>1</b>${L(lang, 'User-এর data চাহিদা বোঝা', 'Understand users’ data needs')}</div><span class="arr">→</span>
    <div class="step"><b>2</b>${L(lang, 'Data model বেছে conceptual schema (ER)', 'Pick a data model → conceptual schema (ER)')}</div><span class="arr">→</span>
    <div class="step"><b>3</b>${L(lang, 'Functional requirements: কী কী operation হবে', 'Functional requirements: which operations')}</div><span class="arr">→</span>
    <div class="step"><b>4</b>${L(lang, 'Table-এ রূপান্তর (logical) → storage (physical)', 'Convert to tables (logical) → storage (physical)')}</div></div>`;

  window.VISUALS = V;
  window.VIS_HELPERS = { tbl, esc };
})();

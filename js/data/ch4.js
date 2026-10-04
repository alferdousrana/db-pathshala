window.CHAPTERS = window.CHAPTERS || [];
CHAPTERS.push({
  id: 'ch4', num: 4, color: '#7C3AED', icon: 'σ', source: 'relational_algebra',
  title: { bn: 'Relational Algebra', en: 'Relational Algebra' },
  blurb: { bn: 'σ π ∪ ∩ − × ρ ←: চোখের সামনে result দেখে শেখো', en: 'σ π ∪ ∩ − × ρ ←: learn by watching the results' },
  topics: [
    {
      id: 'ra-intro', stars: 3, visual: 'raOps',
      title: { bn: 'Relational Algebra ও ৬টা মৌলিক Operator', en: 'Relational Algebra and the Six Basic Operators' },
      body: {
        bn: `<p><b>Relational algebra</b> হলো একটা <mark>procedural language</mark>, যার operation গুলো <mark>এক বা দুইটা relation input নিয়ে একটা নতুন relation output দেয়</mark>।</p>
<p><b>৬টা basic operator</b> (⭐ মুখস্থ):</p>
<ul><li><b>select: σ</b></li><li><b>project: π</b></li><li><b>union: ∪</b></li><li><b>set difference: −</b></li><li><b>Cartesian product: ×</b></li><li><b>rename: ρ</b></li></ul>
<p class="tip">“Procedural” মানে <b>কীভাবে</b> ফলাফল পাবে সেটা ধাপে ধাপে বলতে হয়। Output নিজেও relation বলে এক operation-এর ফল আরেকটার input হতে পারে।</p>`,
        en: `<p><b>Relational algebra</b> is a <mark>procedural language</mark> consisting of operations that <mark>take one or two relations as input and produce a new relation as their result</mark>.</p>
<p><b>Six basic operators</b> (⭐ memorise):</p>
<ul><li><b>select: σ</b></li><li><b>project: π</b></li><li><b>union: ∪</b></li><li><b>set difference: −</b></li><li><b>Cartesian product: ×</b></li><li><b>rename: ρ</b></li></ul>
<p class="tip">“Procedural” means you state <b>how</b> to get the result, step by step. Because every output is itself a relation, results can feed into other operations.</p>`
      },
      example: {
        bn: `<p>রান্নার রেসিপির মতো: “চাল ধোও (σ), পানি ঝরাও (π), ডাল মেশাও (×)…”: প্রতিটা ধাপ আগের ধাপের ফল নিয়ে কাজ করে। Relational algebra-ও তাই।</p>`,
        en: `<p>Like a recipe: “wash the rice (σ), drain it (π), mix in lentils (×)…”, each step works on the previous step’s result. Relational algebra is the same.</p>`
      },
      exam: [
        '<b>Relational algebra</b>: a procedural language consisting of a set of operations that take one or two relations as input and produce a new relation as their result.',
        'Six basic operators: <b>select (σ)</b>, <b>project (π)</b>, <b>union (∪)</b>, <b>set difference (−)</b>, <b>Cartesian product (×)</b>, <b>rename (ρ)</b>.'
      ]
    },
    {
      id: 'select', stars: 3, visual: 'raSelect',
      title: { bn: 'Select Operation (σ)', en: 'Select Operation (σ)' },
      body: {
        bn: `<p><b>Select</b> operation <mark>predicate (শর্ত) পূরণ করে এমন tuple (row) বাছাই করে</mark>।</p>
<p>Notation: <code>σ<sub>p</sub>(r)</code>, যেখানে <b>p</b> = selection predicate।</p>
<p>উদাহরণ: Physics department-এর instructor: <code>σ<sub>dept_name="Physics"</sub>(instructor)</code></p>
<p>Predicate-এ comparison: <code>= ≠ &gt; ≥ &lt; ≤</code>। একাধিক শর্ত যুক্ত করা যায়: <b>∧ (and), ∨ (or), ¬ (not)</b>।</p>
<p>Physics-এ salary &gt; 90,000: <code>σ<sub>dept_name="Physics" ∧ salary&gt;90000</sub>(instructor)</code></p>
<p class="warn">⚠️ সাবধান: relational algebra-র <b>select (σ) row বাছে</b>, কিন্তু SQL-এর <code>select</code> clause আসলে <b>column বাছে (π)</b>। নাম এক, কাজ আলাদা!</p>`,
        en: `<p>The <b>select</b> operation <mark>selects tuples (rows) that satisfy a given predicate</mark>.</p>
<p>Notation: <code>σ<sub>p</sub>(r)</code>, where <b>p</b> is the selection predicate.</p>
<p>Example, instructors in Physics: <code>σ<sub>dept_name="Physics"</sub>(instructor)</code></p>
<p>Comparisons allowed: <code>= ≠ &gt; ≥ &lt; ≤</code>. Combine predicates with <b>∧ (and), ∨ (or), ¬ (not)</b>.</p>
<p>Physics with salary &gt; 90,000: <code>σ<sub>dept_name="Physics" ∧ salary&gt;90000</sub>(instructor)</code></p>
<p class="warn">⚠️ Careful: relational-algebra <b>select (σ) picks rows</b>, but SQL’s <code>select</code> clause actually <b>picks columns (π)</b>. Same name, different job!</p>`
      },
      example: {
        bn: `<p>Daraz-এ filter দাও “Price &lt; ৳১০০০ এবং Rating ≥ ৪”। লাখ product থেকে শুধু শর্ত মেলা product গুলো (row) দেখায়। এটা σ।</p>`,
        en: `<p>On Daraz, filter “Price &lt; ৳1000 and rating ≥ 4”. Out of millions, only the products (rows) meeting the condition remain. That’s σ.</p>`
      },
      exam: [
        '<b>Select (σ)</b>: selects tuples that satisfy a given predicate. Notation σ<sub>p</sub>(r), p is the selection predicate.',
        'Comparisons: =, ≠, &gt;, ≥, &lt;, ≤; connectives: ∧ (and), ∨ (or), ¬ (not). Example: σ<sub>dept_name="Physics" ∧ salary&gt;90000</sub>(instructor).'
      ]
    },
    {
      id: 'project', stars: 3, visual: 'raProject',
      title: { bn: 'Project Operation (π)', en: 'Project Operation (π)' },
      body: {
        bn: `<p><b>Project</b> operation <mark>যে attribute (column) গুলো দেখতে চাই শুধু সেগুলো রাখে</mark>, বাকি column মুছে দেয়।</p>
<p>Notation: <code>π<sub>A1, A2, …, Ak</sub>(r)</code>: A1, A2 হলো attribute-এর নাম, r হলো relation।</p>
<p>ফলাফল হলো k টা column-এর relation। <mark>Duplicate row বাদ যায়, কারণ relation হলো set</mark>।</p>
<p>উদাহরণ: dept_name বাদ দিতে: <code>π<sub>ID, name, salary</sub>(instructor)</code></p>`,
        en: `<p>The <b>project</b> operation <mark>keeps only the attributes (columns) we want to see</mark>; the rest are eliminated.</p>
<p>Notation: <code>π<sub>A1, A2, …, Ak</sub>(r)</code>, where A1, A2 are attribute names and r is a relation.</p>
<p>The result is a relation of k columns. <mark>Duplicate rows are removed, since relations are sets</mark>.</p>
<p>Example, drop dept_name: <code>π<sub>ID, name, salary</sub>(instructor)</code></p>`
      },
      example: {
        bn: `<p>Result sheet থেকে তুমি শুধু “নাম আর CGPA” কলাম প্রিন্ট করলে, বাকি কলাম (ঠিকানা, ফোন) বাদ। এটা π। আর “কোন কোন department আছে” জানতে চাইলে CSE একবারই আসবে, যদিও ১০০ জন CSE-র।</p>`,
        en: `<p>Printing only the “name and CGPA” columns of a result sheet, dropping address and phone, is π. Asking “which departments exist?” lists CSE once, even if 100 students are in CSE.</p>`
      },
      exam: [
        '<b>Project (π)</b>: shows only the listed attributes; the rest are eliminated. Notation π<sub>A1,A2,…,Ak</sub>(r).',
        'The result has k columns; <b>duplicate rows are removed</b> since relations are sets. Example: π<sub>ID, name, salary</sub>(instructor).'
      ]
    },
    {
      id: 'composition', stars: 2, visual: 'raCompose',
      title: { bn: 'Operation-এর Composition', en: 'Composition of Relational Operations' },
      body: {
        bn: `<p>প্রতিটা relational-algebra operation-এর ফল একটা relation, তাই <mark>operation গুলো একটার ভিতর আরেকটা বসিয়ে (compose করে) বড় expression বানানো যায়</mark>।</p>
<p>উদাহরণ: Physics department-এর সব instructor-এর নাম:</p>
<p><code>π<sub>name</sub>(σ<sub>dept_name="Physics"</sub>(instructor))</code></p>
<p class="tip">পড়ো ভিতর থেকে বাইরে: আগে σ দিয়ে Physics-এর row বাছো, তারপর π দিয়ে শুধু name রাখো।</p>`,
        en: `<p>The result of a relational-algebra operation is a relation, so <mark>operations can be composed together into a relational-algebra expression</mark>.</p>
<p>Example, names of all instructors in Physics:</p>
<p><code>π<sub>name</sub>(σ<sub>dept_name="Physics"</sub>(instructor))</code></p>
<p class="tip">Read inside out: σ first picks Physics rows, then π keeps only name.</p>`
      },
      example: {
        bn: `<p>Foodpanda: আগে “Dhanmondi-র restaurant” বাছো (σ), তারপর শুধু “নাম আর delivery time” দেখাও (π)। দুই ধাপ মিলে একটা expression।</p>`,
        en: `<p>Foodpanda: first choose “restaurants in Dhanmondi” (σ), then show only “name and delivery time” (π). Two steps, one expression.</p>`
      },
      exam: [
        'Since the result of a relational-algebra operation is a relation, operations can be <b>composed</b> into a relational-algebra expression.',
        'Example: π<sub>name</sub>(σ<sub>dept_name="Physics"</sub>(instructor)) finds names of all instructors in the Physics department.'
      ]
    },
    {
      id: 'product', stars: 3, visual: 'raProduct',
      title: { bn: 'Cartesian Product (×)', en: 'Cartesian Product (×)' },
      body: {
        bn: `<p><b>Cartesian product</b> <mark>এক table-এর প্রতিটা row-কে অন্য table-এর প্রতিটা row-এর সাথে জোড়া দেয়</mark>। একে <b>cross product</b>-ও বলে।</p>
<p><code>instructor(ID, name, dept_name, salary)</code><br><code>teaches(ID, course_id, sec_id, semester, year)</code></p>
<p>লেখা হয়: <code>instructor × teaches</code></p>
<p>দুই relation-এই ID আছে, তাই আলাদা করতে relation-এর নাম আগে বসাই: <code>instructor.ID</code>, <code>teaches.ID</code>।</p>
<p class="tip">🧮 Row সংখ্যা = r-এর row × s-এর row। Column সংখ্যা = দুইটার column যোগফল।</p>`,
        en: `<p>The <b>Cartesian product</b> <mark>combines each row of one table with each row of the other</mark>. It is also called the <b>cross product</b>.</p>
<p><code>instructor(ID, name, dept_name, salary)</code><br><code>teaches(ID, course_id, sec_id, semester, year)</code></p>
<p>Written: <code>instructor × teaches</code></p>
<p>Since ID appears in both, we prefix the relation name: <code>instructor.ID</code>, <code>teaches.ID</code>.</p>
<p class="tip">🧮 Rows = rows(r) × rows(s). Columns = columns(r) + columns(s).</p>`
      },
      example: {
        bn: `<p>৩টা শার্ট আর ৪টা প্যান্ট থাকলে মোট ৩ × ৪ = ১২ রকম পোশাক বানানো যায়। Cartesian product ঠিক এটাই: সব সম্ভাব্য জোড়া, অর্থবহ হোক বা না হোক।</p>`,
        en: `<p>With 3 shirts and 4 trousers you can make 3 × 4 = 12 outfits. The Cartesian product is exactly that: every possible pair, sensible or not.</p>`
      },
      exam: [
        '<b>Cartesian product (×)</b>: combines each row in one table with each row in the other table; also called the <b>cross product</b>. Example: instructor × teaches.',
        'Common attributes are distinguished by prefixing the relation name: instructor.ID, teaches.ID.'
      ]
    },
    {
      id: 'join', stars: 3, visual: 'raJoin',
      title: { bn: 'Join Operation', en: 'Join Operation' },
      body: {
        bn: `<p><code>instructor × teaches</code> প্রতিটা instructor-কে প্রতিটা teaches tuple-এর সাথে জোড়া দেয়, তাই <mark>বেশিরভাগ row অর্থহীন</mark> (যে instructor ঐ course পড়ায়ইনি)।</p>
<p>শুধু অর্থবহ row রাখতে product-এর উপর select বসাই:</p>
<p><code>σ<sub>instructor.ID = teaches.ID</sub>(instructor × teaches)</code></p>
<p class="tip">মনে রাখো: <b>Join = Cartesian product + Select</b>। আর SQL-এ: <code>from instructor, teaches where instructor.ID = teaches.ID</code>।</p>`,
        en: `<p><code>instructor × teaches</code> pairs every instructor with every teaches tuple, so <mark>most resulting rows are meaningless</mark> (instructors paired with courses they never taught).</p>
<p>To keep only the meaningful ones, apply a select on the product:</p>
<p><code>σ<sub>instructor.ID = teaches.ID</sub>(instructor × teaches)</code></p>
<p class="tip">Remember: <b>join = Cartesian product + select</b>. In SQL: <code>from instructor, teaches where instructor.ID = teaches.ID</code>.</p>`
      },
      example: {
        bn: `<p>Ridesharing app: সব rider × সব driver জোড়া বানালে কোটি জোড়া। কিন্তু app শুধু সেই জোড়া রাখে যেখানে <i>ride.driver_id = driver.id</i>, অর্থাৎ আসল trip গুলো। এটা join।</p>`,
        en: `<p>A ride app pairing every rider with every driver gives millions of pairs, but it keeps only pairs where <i>ride.driver_id = driver.id</i>: the real trips. That’s a join.</p>`
      },
      exam: [
        'The Cartesian product associates every tuple of instructor with every tuple of teaches; most resulting rows are about instructors who did not teach that course.',
        '<b>Join</b>: σ<sub>instructor.ID = teaches.ID</sub>(instructor × teaches) keeps only tuples pertaining to instructors and the courses they taught.'
      ]
    },
    {
      id: 'set-ops', stars: 3, visual: 'setVenn',
      title: { bn: 'Union, Intersection, Set Difference', en: 'Union, Intersection, Set Difference' },
      body: {
        bn: `<p><b>Union (r ∪ s)</b>: দুইটা relation একসাথে করে। <mark>যেকোনো একটাতে থাকলেই</mark> ফলাফলে আসে।</p>
<p>Fall 2017 <b>অথবা</b> Spring 2018-এ পড়ানো course:<br><code>π<sub>course_id</sub>(σ<sub>semester="Fall" ∧ year=2017</sub>(section)) ∪ π<sub>course_id</sub>(σ<sub>semester="Spring" ∧ year=2018</sub>(section))</code></p>
<p><b>Set intersection (r ∩ s)</b>: <mark>দুইটাতেই আছে</mark> এমন tuple। Fall 2017 <b>এবং</b> Spring 2018 দুটোতেই পড়ানো course: একই expression, মাঝে ∩।</p>
<p><b>Set difference (r − s)</b>: <mark>প্রথমটায় আছে কিন্তু দ্বিতীয়টায় নেই</mark>। Fall 2017-এ পড়ানো কিন্তু Spring 2018-এ না: মাঝে −।</p>
<p class="tip">⚠️ শর্ত: দুই relation-এর column সংখ্যা ও domain মিলতে হবে (union-compatible)। তাই আগে π দিয়ে শুধু course_id নেওয়া হয়েছে।</p>`,
        en: `<p><b>Union (r ∪ s)</b>: combines two relations; a tuple is in the result if it is <mark>in either one</mark>.</p>
<p>Courses taught in Fall 2017 <b>or</b> Spring 2018:<br><code>π<sub>course_id</sub>(σ<sub>semester="Fall" ∧ year=2017</sub>(section)) ∪ π<sub>course_id</sub>(σ<sub>semester="Spring" ∧ year=2018</sub>(section))</code></p>
<p><b>Set intersection (r ∩ s)</b>: tuples <mark>in both</mark> relations. Courses taught in both Fall 2017 <b>and</b> Spring 2018: the same expression with ∩.</p>
<p><b>Set difference (r − s)</b>: tuples <mark>in the first but not in the second</mark>. Taught in Fall 2017 but not Spring 2018: use −.</p>
<p class="tip">⚠️ Both relations must have the same number of columns with compatible domains (union-compatible), which is why π keeps only course_id first.</p>`
      },
      example: {
        bn: `<p>তোমার Facebook friend list = A, বন্ধুর list = B। <b>A ∩ B</b> = Mutual friends। <b>A − B</b> = যাদের তুমি চেনো কিন্তু বন্ধু চেনে না। <b>A ∪ B</b> = দুজনের মিলিয়ে সবাই।</p>`,
        en: `<p>Your Facebook friends = A, a friend’s = B. <b>A ∩ B</b> = mutual friends. <b>A − B</b> = people you know but they don’t. <b>A ∪ B</b> = everyone either of you knows.</p>`
      },
      exam: [
        '<b>Union (r ∪ s)</b>: combines two relations; e.g. courses taught in Fall 2017 or Spring 2018.',
        '<b>Set intersection (r ∩ s)</b>: tuples in both input relations; e.g. courses taught in both Fall 2017 and Spring 2018.',
        '<b>Set difference (r − s)</b>: tuples in one relation but not in the other; e.g. courses in Fall 2017 but not in Spring 2018.'
      ]
    },
    {
      id: 'assign-rename', stars: 2, visual: 'raRename',
      title: { bn: 'Assignment (←) ও Rename (ρ)', en: 'Assignment (←) and Rename (ρ)' },
      body: {
        bn: `<p><b>Assignment (←)</b>: বড় expression-এর অংশকে <mark>temporary relation variable-এ রাখা</mark>, programming-এর assignment-এর মতো।</p>
<pre class="code"><code>Physics ← σ dept_name="Physics" (instructor)
Music   ← σ dept_name="Music" (instructor)
Physics ∪ Music</code></pre>
<p>এভাবে query-কে কয়েকটা assignment-এর পর একটা final expression হিসেবে, একটা sequential program-এর মতো লেখা যায়।</p>
<p><b>Rename (ρ)</b>: relational-algebra expression-এর ফলের কোনো নাম থাকে না; <mark>ρ<sub>x</sub>(E) ফলাফল E-কে x নামে দেয়</mark>।</p>
<ul><li><code>ρ(STUDENT1, STUDENT)</code>: STUDENT-কে STUDENT1 নাম দেওয়া</li>
<li><code>ρ(STUDENT_NAMES, π<sub>ROLL_NO, NAME</sub>(STUDENT))</code>: নতুন relation</li></ul>`,
        en: `<p><b>Assignment (←)</b>: stores parts of an expression in <mark>temporary relation variables</mark>, like assignment in programming.</p>
<pre class="code"><code>Physics ← σ dept_name="Physics" (instructor)
Music   ← σ dept_name="Music" (instructor)
Physics ∪ Music</code></pre>
<p>A query can then be written as a sequential program: a series of assignments followed by an expression whose value is the result.</p>
<p><b>Rename (ρ)</b>: results of expressions have no name; <mark>ρ<sub>x</sub>(E) returns the result of E under the name x</mark>.</p>
<ul><li><code>ρ(STUDENT1, STUDENT)</code>: rename STUDENT to STUDENT1</li>
<li><code>ρ(STUDENT_NAMES, π<sub>ROLL_NO, NAME</sub>(STUDENT))</code>: create a new named relation</li></ul>`
      },
      example: {
        bn: `<p>Exam-এর আগে notes থেকে “গুরুত্বপূর্ণ প্রশ্ন” আলাদা খাতায় লিখে নাম দিলে “Suggestion”: এটা assignment/rename। পরে শুধু “Suggestion” বললেই চলে।</p>`,
        en: `<p>Before exams you copy important questions into a separate notebook called “Suggestions”: that’s assignment/rename. Later you just refer to “Suggestions”.</p>`
      },
      exam: [
        '<b>Assignment (←)</b>: assigns parts of a relational-algebra expression to temporary relation variables; a query becomes a sequential program of assignments followed by a final expression.',
        '<b>Rename (ρ)</b>: ρ<sub>x</sub>(E) returns the result of expression E under the name x. Example: ρ(STUDENT1, STUDENT).'
      ]
    },
    {
      id: 'equivalent', stars: 1, visual: 'raPlay',
      title: { bn: 'Equivalent Query + Playground', en: 'Equivalent Queries + Playground' },
      body: {
        bn: `<p>একই প্রশ্নের relational algebra-তে <mark>একাধিক উপায়ে লেখা যায়</mark>। Physics-এ salary &gt; 90,000:</p>
<ul><li>Query 1: <code>σ<sub>dept_name="Physics" ∧ salary&gt;90000</sub>(instructor)</code></li>
<li>Query 2: <code>σ<sub>dept_name="Physics"</sub>(σ<sub>salary&gt;90000</sub>(instructor))</code></li></ul>
<p>দুইটা হুবহু এক নয়, কিন্তু <b>equivalent</b>: <mark>যেকোনো database-এ একই ফল দেয়</mark>।</p>
<p class="tip">🎮 নিচের playground-এ সব operation চাপো, algebra আর SQL পাশাপাশি দেখো।</p>`,
        en: `<p>There is <mark>more than one way to write a query</mark> in relational algebra. Physics instructors with salary &gt; 90,000:</p>
<ul><li>Query 1: <code>σ<sub>dept_name="Physics" ∧ salary&gt;90000</sub>(instructor)</code></li>
<li>Query 2: <code>σ<sub>dept_name="Physics"</sub>(σ<sub>salary&gt;90000</sub>(instructor))</code></li></ul>
<p>They are not identical, but they are <b>equivalent</b>: <mark>they give the same result on any database</mark>.</p>
<p class="tip">🎮 Try every operation below and compare the algebra with SQL.</p>`
      },
      example: {
        bn: `<p>বাসা থেকে ক্যাম্পাসে যেতে দুইটা রাস্তা, একটা Mirpur Road হয়ে, একটা Begum Rokeya Sarani হয়ে। পথ আলাদা, পৌঁছাও একই জায়গায়। DBMS-এর query optimizer দ্রুততম রাস্তাটা বেছে নেয়।</p>`,
        en: `<p>Two routes to campus, via Mirpur Road or Begum Rokeya Sarani: different paths, same destination. The DBMS’s query optimizer picks the fastest one.</p>`
      },
      exam: [
        'There is more than one way to write a query in relational algebra.',
        'Two queries are <b>equivalent</b> if they give the same result on any database, e.g. σ<sub>A ∧ B</sub>(r) and σ<sub>A</sub>(σ<sub>B</sub>(r)).'
      ]
    }
  ],
  written: [
    { q: 'What is relational algebra? List the six basic operators with their symbols.', a: ['Procedural language; operations take one/two relations and produce a new relation.', 'select σ, project π, union ∪, set difference −, Cartesian product ×, rename ρ.'] },
    { q: 'Write relational algebra to find the names of all instructors in the Physics department.', a: ['π name (σ dept_name="Physics" (instructor))', 'Explain composition: inner σ first, then π.'] },
    { q: 'Explain Cartesian product and join with an example.', a: ['instructor × teaches pairs every tuple with every tuple; attributes renamed instructor.ID, teaches.ID.', 'Join: σ instructor.ID=teaches.ID (instructor × teaches) keeps only matching pairs.'] },
    { q: 'Find courses taught in Fall 2017 but not in Spring 2018 (and the union/intersection versions).', a: ['π course_id(σ semester="Fall" ∧ year=2017(section)) − π course_id(σ semester="Spring" ∧ year=2018(section))', 'Replace − with ∪ for “or”, with ∩ for “both”.'] }
  ],
  quiz: [
    { q: { bn: 'Relational algebra কী ধরনের language?', en: 'Relational algebra is what kind of language?' }, o: ['Procedural', 'Non-procedural', 'Markup', 'Object-oriented'], a: 0, why: { bn: 'স্লাইড: A procedural language।', en: 'Slide: a procedural language.' } },
    { q: { bn: 'কোনটা ৬টা basic operator-এর মধ্যে নেই?', en: 'Which is NOT one of the six basic operators?' }, o: ['Select σ', 'Rename ρ', 'Intersection ∩', 'Set difference −'], a: 2, why: { bn: 'Intersection অতিরিক্ত operator, basic ৬টার মধ্যে নেই।', en: 'Intersection is an additional operator, not one of the six basic ones.' } },
    { q: { bn: 'শর্ত মেনে ROW বাছাই করে কোন operator?', en: 'Which operator picks ROWS by a condition?' }, o: ['π', 'σ', '×', 'ρ'], a: 1, why: { bn: 'σ = select = row বাছাই।', en: 'σ (select) picks rows.' } },
    { q: { bn: 'π-এর ফলাফলে duplicate row থাকে না কেন?', en: 'Why does π remove duplicate rows?' }, o: [{ bn: 'Relation একটা set', en: 'A relation is a set' }, { bn: 'Disk বাঁচাতে', en: 'To save disk' }, { bn: 'Primary key-র জন্য', en: 'Because of primary keys' }, { bn: 'এটা SQL-এর নিয়ম', en: 'It’s an SQL rule' }], a: 0, why: { bn: 'Relations are sets, তাই duplicate থাকে না।', en: 'Relations are sets, so no duplicates.' } },
    { q: { bn: 'r-এ ৪টা, s-এ ৫টা row। r × s-এ কয়টা row?', en: 'r has 4 rows, s has 5. How many rows in r × s?' }, o: ['9', '20', '5', '1'], a: 1, why: { bn: '৪ × ৫ = ২০।', en: '4 × 5 = 20.' } },
    { q: { bn: 'Join = ?', en: 'Join = ?' }, o: [{ bn: 'Union + Project', en: 'Union + project' }, { bn: 'Cartesian product + Select', en: 'Cartesian product + select' }, { bn: 'Rename + Difference', en: 'Rename + difference' }, { bn: 'Project + Rename', en: 'Project + rename' }], a: 1, why: { bn: 'σ(instructor × teaches) = join।', en: 'σ(instructor × teaches) = join.' } },
    { q: { bn: '“Fall 2017-এ পড়ানো কিন্তু Spring 2018-এ না”: কোন operator?', en: '“Taught in Fall 2017 but NOT in Spring 2018” uses…' }, o: ['∪', '∩', '−', '×'], a: 2, why: { bn: 'একটায় আছে কিন্তু অন্যটায় নেই = set difference।', en: 'In one but not the other = set difference.' } },
    { q: { bn: 'π<sub>name</sub>(σ<sub>dept="Physics"</sub>(instructor))-এ কোনটা আগে চলে?', en: 'In π<sub>name</sub>(σ<sub>dept="Physics"</sub>(instructor)), which runs first?' }, o: ['π', 'σ', { bn: 'দুটো একসাথে', en: 'Both together' }, { bn: 'কোনোটাই না', en: 'Neither' }], a: 1, why: { bn: 'ভিতরেরটা (σ) আগে।', en: 'The inner one (σ) runs first.' } },
    { q: { bn: 'Expression-এর ফলকে নাম দিতে কোন operator?', en: 'Which operator names the result of an expression?' }, o: ['ρ', 'σ', '←', '∩'], a: 0, why: { bn: 'ρ = rename।', en: 'ρ = rename.' } },
    { q: { bn: 'দুটো query “equivalent” মানে…', en: 'Two queries are “equivalent” when they…' }, o: [{ bn: 'হুবহু একই লেখা', en: 'Are written identically' }, { bn: 'যেকোনো database-এ একই ফল দেয়', en: 'Give the same result on any database' }, { bn: 'একই সময় নেয়', en: 'Take the same time' }, { bn: 'একই operator ব্যবহার করে', en: 'Use the same operators' }], a: 1, why: { bn: 'Same result on any database।', en: 'Same result on any database.' } }
  ]
});

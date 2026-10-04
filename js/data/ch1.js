window.CHAPTERS = window.CHAPTERS || [];
CHAPTERS.push({
  id: 'ch1', num: 1, color: '#2453C6', icon: '🗄️', source: 'Lecture-1_Introduction',
  title: { bn: 'ডাটাবেস সিস্টেম পরিচিতি', en: 'Introduction to Database Systems' },
  blurb: { bn: 'Data, Information, DBMS, File system বনাম Database', en: 'Data, information, DBMS, file system vs database' },
  topics: [
    {
      id: 'data-info', stars: 3, visual: 'dataInfo',
      title: { bn: 'Data ও Information', en: 'Data and Information' },
      body: {
        bn: `<p><b>Data</b> হলো কাঁচা (raw), অগোছালো তথ্যের টুকরো, যেগুলোকে <mark>process করতে হয়</mark>। আলাদাভাবে দেখলে এগুলো এলোমেলো, প্রায় অর্থহীন মনে হয়। যেমন: একজন ছাত্রের পরীক্ষার নম্বর <code>78</code>।</p>
<p>এই data-কে যখন <mark>process, organize, structure করে কোনো context-এ সাজানো হয়</mark> যাতে কাজে লাগে, তখন তাকে বলে <b>Information</b>। যেমন: পুরো ক্লাসের গড় নম্বর <code>75.4</code>।</p>
<p class="tip">🧠 মনে রাখার কৌশল: <b>Data = চাল-ডাল</b> (কাঁচামাল), <b>Information = খিচুড়ি</b> (রান্না করা, খাওয়া যায়)। রান্নার কাজটাই হলো processing।</p>`,
        en: `<p><b>Data</b> are raw, unorganized facts that <mark>need to be processed</mark>. On their own they can look random and useless. Example: one student’s test score <code>78</code>.</p>
<p>When data is <mark>processed, organized, structured or presented in a given context</mark> so that it becomes useful, it is called <b>information</b>. Example: the class average <code>75.4</code>.</p>
<p class="tip">🧠 Memory trick: <b>data = raw rice and lentils</b>, <b>information = cooked khichuri</b>. Cooking is the processing.</p>`
      },
      example: {
        bn: `<p>bKash-এ তোমার প্রতিটা Send Money বা Cash Out হলো একটা করে <b>data</b>: তারিখ, টাকার পরিমাণ, নম্বর। মাস শেষে অ্যাপ যখন দেখায় “এই মাসে মোট ৳৮,৫০০ খরচ, সবচেয়ে বেশি মোবাইল রিচার্জে”, সেটা <b>information</b>। এটা দেখে তুমি সিদ্ধান্ত নিতে পারো।</p>`,
        en: `<p>Every Send Money or Cash Out in bKash is one piece of <b>data</b>: date, amount, number. When the app shows “You spent ৳8,500 this month, mostly on mobile recharge”, that is <b>information</b>, and it helps you decide.</p>`
      },
      exam: [
        '<b>Data</b>: raw, unorganized facts that need to be processed. Example: each student’s test score is one piece of data.',
        '<b>Information</b>: data that is processed, organized, structured or presented in a given context so as to make it useful. Example: the average score of a class or of the entire school.',
        'Data is the <b>input</b> of processing; information is the <b>output</b>, and it supports decision making.'
      ]
    },
    {
      id: 'what-db', stars: 2, visual: 'dbSystem',
      title: { bn: 'Database ও Database System কী?', en: 'What is a Database and a Database System?' },
      body: {
        bn: `<p><b>Database</b> হলো সম্পর্কিত data-র একটা সংগঠিত সংগ্রহ, যা কম্পিউটারে রাখা হয় যাতে <mark>দ্রুত ও সহজে খোঁজা (search) ও বের করা (retrieve) যায়</mark>।</p>
<p>স্লাইডের তিনটা সংজ্ঞা:</p>
<ul><li>“A set of information held in a computer” (Oxford)</li><li>“One or more large structured sets of persistent data, usually associated with software to update and query the data” (FOLDOC)</li><li>“A collection of data arranged for ease and speed of search and retrieval” (Dictionary.com)</li></ul>
<p>একটা <b>Database System</b>-এর <mark>৪টা অংশ: Data, Software, Hardware, Users</mark>। আমাদের কোর্সে মূল ফোকাস Software (DBMS)।</p>
<p>Database system দিয়ে user তার data <b>Store, Update, Retrieve, Organise, Protect</b> করতে পারে।</p>
<p><b>কেন পড়ব?</b> প্রায় সব software বিশাল পরিমাণ তথ্য নিয়ে কাজ করে, আর database হলো Computer Science-এর একটা “core topic”। CSE graduate হিসেবে এটা জানা ধরে নেওয়া হয়।</p>`,
        en: `<p>A <b>database</b> is an organized collection of related data stored in a computer so it can be <mark>searched and retrieved quickly and easily</mark>.</p>
<p>Definitions from the slide:</p>
<ul><li>“A set of information held in a computer” (Oxford)</li><li>“One or more large structured sets of persistent data, usually associated with software to update and query the data” (FOLDOC)</li><li>“A collection of data arranged for ease and speed of search and retrieval” (Dictionary.com)</li></ul>
<p>A <b>database system</b> has <mark>four parts: data, software, hardware and users</mark>. This course focuses mainly on the software (the DBMS).</p>
<p>It allows users to <b>store, update, retrieve, organise and protect</b> their data.</p>
<p><b>Why study it?</b> Most applications handle large amounts of information, and databases are a core topic of computer science that every CS graduate is expected to know.</p>`
      },
      example: {
        bn: `<p>তোমার university-র database-এ আছে সব ছাত্রের নাম, ID, course, result, library-র বই। Daraz-এর database-এ আছে লাখ লাখ product, order আর customer। দুটোতেই data (database), software (MySQL/Oracle), hardware (server) আর users (তুমি, admin) মিলে একটা database system।</p>`,
        en: `<p>Your university’s database holds every student’s name, ID, courses, results and library loans. Daraz’s database holds millions of products, orders and customers. Both are database systems: data, software (MySQL/Oracle), hardware (servers) and users (you, the admins).</p>`
      },
      exam: [
        '<b>Database</b>: a collection of related data arranged for ease and speed of search and retrieval.',
        'A <b>database system</b> consists of: <b>data</b> (the database), <b>software</b>, <b>hardware</b> and <b>users</b>.',
        'Database systems allow users to <b>store, update, retrieve, organise and protect</b> their data.'
      ]
    },
    {
      id: 'dbms', stars: 3, visual: 'dbmsLayer',
      title: { bn: 'DBMS ও RDBMS', en: 'DBMS and RDBMS' },
      body: {
        bn: `<p>Database হলো তথ্যের সংগ্রহ, আর <b>DBMS (Database Management System)</b> হলো <mark>সেই software যা ওই তথ্যকে নিয়ন্ত্রণ (control) ও পরিচালনা করে</mark>।</p>
<p><b>উদাহরণ:</b> Oracle, DB2 (IBM), MS SQL Server, MS Access, Ingres, PostgreSQL, MySQL।</p>
<p><b>RDBMS (Relational DBMS)</b> হলো এমন DBMS যা data-কে <mark>সম্পর্কযুক্ত table (relation) আকারে</mark> রাখে, key দিয়ে table গুলোর মধ্যে সম্পর্ক তৈরি করে, আর SQL দিয়ে query করে। MySQL, Oracle, PostgreSQL, SQL Server সবই RDBMS।</p>
<div class="tscroll"><table><thead><tr><th>DBMS</th><th>RDBMS</th></tr></thead><tbody>
<tr><td>Data file/navigational আকারে রাখতে পারে</td><td>Data সবসময় table (row-column) আকারে</td></tr>
<tr><td>Data-র মধ্যে সম্পর্ক বাধ্যতামূলক না</td><td>Primary/foreign key দিয়ে table-এর সম্পর্ক</td></tr>
<tr><td>Normalization সাধারণত নেই</td><td>Normalization support করে</td></tr>
<tr><td>ছোট data, কম user</td><td>বিশাল data, অনেক user একসাথে</td></tr>
<tr><td>Integrity constraint দুর্বল</td><td>Integrity constraint শক্তিশালী</td></tr></tbody></table></div>`,
        en: `<p>A database is a collection of information; a <b>DBMS (Database Management System)</b> is <mark>the software that controls that information</mark>.</p>
<p><b>Examples:</b> Oracle, DB2 (IBM), MS SQL Server, MS Access, Ingres, PostgreSQL, MySQL.</p>
<p>An <b>RDBMS (Relational DBMS)</b> stores data as <mark>related tables (relations)</mark>, links tables using keys, and is queried with SQL. MySQL, Oracle, PostgreSQL and SQL Server are all RDBMSs.</p>
<div class="tscroll"><table><thead><tr><th>DBMS</th><th>RDBMS</th></tr></thead><tbody>
<tr><td>May store data as files / navigational form</td><td>Always stores data as tables (rows and columns)</td></tr>
<tr><td>Relationships between data not required</td><td>Tables related through primary/foreign keys</td></tr>
<tr><td>Usually no normalization</td><td>Supports normalization</td></tr>
<tr><td>Small data, few users</td><td>Large data, many concurrent users</td></tr>
<tr><td>Weak integrity constraints</td><td>Strong integrity constraints</td></tr></tbody></table></div>`
      },
      example: {
        bn: `<p>Facebook app (application) সরাসরি hard disk-এ লেখে না। তুমি পোস্ট দিলে app DBMS-কে বলে “এটা save করো”, DBMS ঠিক করে কোথায় রাখবে, কে দেখতে পারবে, server crash করলে কীভাবে ফেরত আনবে। DBMS হলো app আর data-র মাঝের দারোয়ান + ম্যানেজার।</p>`,
        en: `<p>The Facebook app never writes straight to a hard disk. When you post, the app asks the DBMS to save it; the DBMS decides where it goes, who may see it and how to recover it after a crash. The DBMS is the gatekeeper and manager between the app and the data.</p>`
      },
      exam: [
        '<b>DBMS</b>: a software system that controls (stores, manages and retrieves) the information in a database. Examples: Oracle, DB2, MS SQL Server, MS Access, PostgreSQL, MySQL.',
        '<b>RDBMS</b>: a DBMS based on the relational model; data is stored in tables and relationships are maintained using keys; queried with SQL.',
        'DBMS vs RDBMS: (1) files vs tables, (2) no relationships vs key-based relationships, (3) no normalization vs normalization, (4) small/single-user vs large/multi-user.'
      ]
    },
    {
      id: 'users', stars: 2, visual: 'users',
      title: { bn: 'Database Users', en: 'Database Users' },
      body: {
        bn: `<p>Database-এর সাথে চার ধরনের মানুষ কাজ করে:</p>
<ul><li><b>End users</b>: কোনো লক্ষ্য পূরণে database system ব্যবহার করে।</li>
<li><b>Application developers</b>: এমন software লেখে যাতে end user database-এর সাথে কাজ করতে পারে।</li>
<li><b>Database Administrator (DBA)</b>: <mark>database system design ও manage করে</mark>।</li>
<li><b>Database systems programmer</b>: database software (DBMS) নিজেই লেখে।</li></ul>`,
        en: `<p>Four kinds of people work with a database:</p>
<ul><li><b>End users</b>: use the database system to achieve some goal.</li>
<li><b>Application developers</b>: write software that lets end users interface with the database system.</li>
<li><b>Database Administrator (DBA)</b>: <mark>designs and manages the database system</mark>.</li>
<li><b>Database systems programmer</b>: writes the database software (the DBMS) itself.</li></ul>`
      },
      example: {
        bn: `<p>Pathao-তে: তুমি ride book করো (end user); Pathao-র app টিম Android app বানায় (application developer); একজন DBA ঠিক করে কোন table থাকবে, রাতে backup নেয়; আর PostgreSQL-এর open-source টিম DBMS টাই বানায় (systems programmer)।</p>`,
        en: `<p>In Pathao: you book a ride (end user); Pathao’s app team builds the Android app (application developers); a DBA designs tables and runs nightly backups; and the PostgreSQL open-source team builds the DBMS itself (systems programmers).</p>`
      },
      exam: [
        '<b>End users</b>: use the database system to achieve some goal.',
        '<b>Application developers</b>: write software to allow end users to interface with the database system.',
        '<b>DBA</b>: designs and manages the database system. <b>Database systems programmer</b>: writes the database software itself.'
      ]
    },
    {
      id: 'apps', stars: 2, visual: 'apps',
      title: { bn: 'DBMS-এর প্রয়োগ (Applications)', en: 'Applications of DBMS' },
      body: {
        bn: `<p>Database আমাদের জীবনের প্রায় সব জায়গায়। স্লাইডের তালিকা:</p>
<ul><li><b>Banking</b>: transactions</li><li><b>Airlines</b>: reservations, schedules</li><li><b>Universities</b>: registration, grades</li><li><b>Sales</b>: customers, products, purchases</li><li><b>Online retailers</b>: order tracking, customized recommendations</li><li><b>Manufacturing</b>: production, inventory, orders, supply chain</li><li><b>Human resources</b>: employee records, salaries, tax deductions</li></ul>
<p><mark>Database অনেক বড় হতে পারে, আর জীবনের সব দিক ছুঁয়ে যায়।</mark></p>`,
        en: `<p>Databases are everywhere. From the slide:</p>
<ul><li><b>Banking</b>: transactions</li><li><b>Airlines</b>: reservations, schedules</li><li><b>Universities</b>: registration, grades</li><li><b>Sales</b>: customers, products, purchases</li><li><b>Online retailers</b>: order tracking, customized recommendations</li><li><b>Manufacturing</b>: production, inventory, orders, supply chain</li><li><b>Human resources</b>: employee records, salaries, tax deductions</li></ul>
<p><mark>Databases can be very large and touch all aspects of our lives.</mark></p>`
      },
      example: {
        bn: `<p>আজ সকাল থেকে তুমি হয়তো ৫টা database ছুঁয়েছ: মোবাইল রিচার্জ (telco DB), bKash (bank DB), university portal (university DB), Foodpanda order (retailer DB), আর YouTube recommendation (online DB)!</p>`,
        en: `<p>Since this morning you have probably touched five databases: a mobile recharge (telco DB), bKash (banking DB), the university portal, a Foodpanda order (retailer DB) and YouTube recommendations!</p>`
      },
      exam: [
        'Applications of DBMS: <b>Banking</b> (transactions), <b>Airlines</b> (reservations, schedules), <b>Universities</b> (registration, grades), <b>Sales</b> (customers, products, purchases).',
        '<b>Online retailers</b> (order tracking, recommendations), <b>Manufacturing</b> (production, inventory, supply chain), <b>Human resources</b> (employee records, salaries, tax deductions).'
      ]
    },
    {
      id: 'functions', stars: 2, visual: 'funcGrid',
      title: { bn: 'DBMS-এর Functions ও Services', en: 'Functions and Services of a DBMS' },
      body: {
        bn: `<p>একটা DBMS নিচের কাজগুলো করে (স্লাইডে ১০টা আছে, নাম মুখস্থ রাখো):</p>
<ol><li><b>Data Storage Management</b>: data disk-এ কোথায়, কীভাবে থাকবে।</li>
<li><b>Transaction Management</b>: একটা কাজ (transaction) হয় পুরো হবে নাহয় একদম হবে না।</li>
<li><b>Integrity Services</b>: rule ভেঙে ভুল data ঢুকতে দেয় না।</li>
<li><b>Backup and Recovery Management</b>: crash হলে data ফেরত আনে।</li>
<li><b>Concurrency Control Services</b>: <mark>অনেক user একসাথে কাজ করলেও data গোলমাল হয় না</mark>।</li>
<li><b>Data Manipulation Management</b>: insert, update, delete, query।</li>
<li><b>Data Dictionary / System Catalog Management</b>: <mark>metadata (data সম্পর্কে data)</mark> রাখে।</li>
<li><b>Authorization / Security Management</b>: কে কী দেখতে/বদলাতে পারবে।</li>
<li><b>Utility Services</b>: import/export, monitoring ইত্যাদি tool।</li>
<li><b>Database Access and Application Programming Interfaces</b>: program থেকে database ব্যবহারের পথ।</li></ol>`,
        en: `<p>A DBMS provides these ten functions (learn the names):</p>
<ol><li><b>Data Storage Management</b>: where and how data lives on disk.</li>
<li><b>Transaction Management</b>: a transaction completes fully or not at all.</li>
<li><b>Integrity Services</b>: rules that keep wrong data out.</li>
<li><b>Backup and Recovery Management</b>: restores data after a failure.</li>
<li><b>Concurrency Control Services</b>: <mark>many users can work at once without corrupting data</mark>.</li>
<li><b>Data Manipulation Management</b>: insert, update, delete, query.</li>
<li><b>Data Dictionary / System Catalog Management</b>: stores <mark>metadata (data about data)</mark>.</li>
<li><b>Authorization / Security Management</b>: who may see or change what.</li>
<li><b>Utility Services</b>: import/export, monitoring tools.</li>
<li><b>Database Access and Application Programming Interfaces</b>: how programs reach the database.</li></ol>`
      },
      example: {
        bn: `<p>Eid-এর আগে একই সময়ে হাজার মানুষ Biman-এর একই flight-এর শেষ সিট বুক করতে চাইছে। <b>Concurrency control</b> নিশ্চিত করে সিটটা একজনই পাবে। টাকা কাটা হলো কিন্তু টিকেট হলো না? <b>Transaction management</b> পুরো কাজ বাতিল করে টাকা ফেরত দেয়।</p>`,
        en: `<p>Before Eid, a thousand people try to book the last seat on the same Biman flight. <b>Concurrency control</b> makes sure only one gets it. Money deducted but no ticket? <b>Transaction management</b> rolls the whole thing back.</p>`
      },
      exam: [
        'Functions of DBMS: <b>Data storage management</b>, <b>Transaction management</b>, <b>Integrity services</b>, <b>Backup and recovery management</b>, <b>Concurrency control services</b>.',
        '<b>Data manipulation management</b>, <b>Data dictionary/system catalog management</b> (metadata), <b>Authorization/security management</b>, <b>Utility services</b>, <b>Database access and APIs</b>.'
      ]
    },
    {
      id: 'filesystem', stars: 3, visual: 'fileVsDb',
      title: { bn: 'File Processing System ও এর অসুবিধা', en: 'File Processing System and its Disadvantages' },
      body: {
        bn: `<p><b>File Processing System</b> হলো কিছু application program-এর সংগ্রহ যা end user-কে সেবা দেয় (যেমন report বানানো), যেখানে <mark>প্রতিটা program নিজের data নিজে define ও manage করে</mark>।</p>
<p>ছবিতে দেখো: Registration, Examination, Library: তিন বিভাগের আলাদা file, আর <b>Reg_Number, Name</b> তিন জায়গাতেই আছে!</p>
<p><b>অসুবিধাগুলো:</b></p>
<ul><li><b>Program-Data Dependence</b>: <mark>file-এর structure program code-এর ভিতরে লেখা</mark>, প্রতিটা program নিজের file-এর metadata রাখে। File বদলালে program-ও বদলাতে হয়।</li>
<li><b>Duplication of Data (Data Redundancy)</b>: একই data আলাদা আলাদা program-এর কপিতে। এতে <mark>জায়গা নষ্ট, আর একই জিনিসের ভিন্ন মান বা ভিন্ন format</mark> হতে পারে।</li>
<li><b>Limited Data Sharing</b>: কোনো centralized control নেই; program গুলো ভিন্ন ভাষায় লেখা, তাই একে অপরের file সহজে পড়তে পারে না।</li></ul>`,
        en: `<p>A <b>file processing system</b> is a collection of application programs that perform services for end users (such as producing reports), where <mark>each program defines and manages its own data</mark>.</p>
<p>In the picture: Registration, Examination and Library each keep their own files, and <b>Reg_Number and Name</b> appear in all three!</p>
<p><b>Disadvantages:</b></p>
<ul><li><b>Program-data dependence</b>: <mark>the file structure is defined in the program code</mark>; every program keeps metadata for each file it uses. Change the file and you must change the program.</li>
<li><b>Duplication of data (data redundancy)</b>: different programs hold separate copies of the same data, causing <mark>wasted space and possibly different values and/or formats for the same item</mark>.</li>
<li><b>Limited data sharing</b>: no centralized control; programs written in different languages cannot easily access each other’s files.</li></ul>`
      },
      example: {
        bn: `<p>তুমি মোবাইল নম্বর বদলালে, registration অফিসে update করলে। কিন্তু library-র file-এ পুরনো নম্বরই থেকে গেল, তাই বই ফেরতের SMS যায় পুরনো নম্বরে। এটাই redundancy থেকে আসা <b>inconsistency</b>।</p>`,
        en: `<p>You change your phone number at the registration office, but the library’s file still has the old one, so the overdue-book SMS goes to the wrong number. That is <b>inconsistency</b> caused by redundancy.</p>`
      },
      exam: [
        '<b>File processing system</b>: a collection of application programs that perform services for end users, where each program defines and manages its own data.',
        '<b>Program-data dependence</b>: file structure is defined in the program code; all programs maintain metadata for each file they use.',
        '<b>Data redundancy</b>: the same data held by different programs, leading to wasted space and different values/formats for the same item.',
        '<b>Limited data sharing</b>: no centralized control of data; programs in different languages cannot easily access each other’s files.'
      ]
    },
    {
      id: 'advantages', stars: 3, visual: 'fileVsDbTable',
      title: { bn: 'Database Approach-এর সুবিধা ও File vs DBMS', en: 'Advantages of the Database Approach; File vs DBMS' },
      body: {
        bn: `<p>সব বিভাগ (Registration, Examination, Library) একটা <b>DBMS</b>-এর মাধ্যমে একটাই <b>University Students Database</b> ব্যবহার করলে সুবিধা:</p>
<ul><li><b>Data Sharing</b>: এক জায়গার data সব application ব্যবহার করে।</li>
<li><b>Data Independence</b>: data-র structure বদলালেও program বদলাতে হয় না।</li>
<li><b>Controlled Redundancy</b>: <mark>অপ্রয়োজনীয় duplicate কমে</mark>, ফলে consistency বাড়ে।</li>
<li><b>Better Data Integrity</b>: rule (constraint) দিয়ে ভুল data আটকানো যায়।</li></ul>
<p class="tip">⭐ পরীক্ষায় প্রায়ই আসে: <b>“File processing system ও DBMS-এর মধ্যে চারটা পার্থক্য লেখো।”</b> নিচের টেবিলের যেকোনো ৪টা লিখলেই হবে।</p>`,
        en: `<p>When every department uses one <b>University Students Database</b> through a single <b>DBMS</b>, we gain:</p>
<ul><li><b>Data sharing</b>: all applications use the same data.</li>
<li><b>Data independence</b>: changing the data structure does not force program changes.</li>
<li><b>Controlled redundancy</b>: <mark>unnecessary duplicates are reduced</mark>, so consistency improves.</li>
<li><b>Better data integrity</b>: constraints block invalid data.</li></ul>
<p class="tip">⭐ A favourite exam question: <b>“List four significant differences between a file processing system and a DBMS.”</b> Any four rows of the table below will do.</p>`
      },
      example: {
        bn: `<p>নতুন GUB portal-এ তুমি একবার মোবাইল নম্বর বদলালে registration, exam, library সবাই সাথে সাথে নতুন নম্বর দেখে, কারণ সবাই একই database থেকে পড়ে।</p>`,
        en: `<p>On a modern university portal you update your phone number once, and registration, exams and the library all see it instantly, because they read from the same database.</p>`
      },
      exam: [
        'Advantages of the database approach: <b>data sharing</b>, <b>data independence</b>, <b>controlled redundancy</b>, <b>better data integrity</b>.',
        'File system vs DBMS: (1) high redundancy vs controlled redundancy, (2) limited vs easy data sharing, (3) program-data dependence vs data independence, (4) weak vs strong integrity and security.',
        'Also: no concurrency control vs concurrency control; manual vs built-in backup and recovery.'
      ]
    }
  ],
  written: [
    { q: 'What is data and information? Explain with example.', a: ['Data: raw, unorganized facts that need processing (e.g. each student’s test score).', 'Information: processed, organized data presented in context to be useful (e.g. class average score).', 'Show the relation: data → processing → information → decision.'] },
    { q: 'Briefly discuss the applications of database management system (DBMS).', a: ['Banking: transactions. Airlines: reservations, schedules.', 'Universities: registration, grades. Sales: customers, products, purchases.', 'Online retailers: order tracking, recommendations. Manufacturing: production, inventory, supply chain.', 'Human resources: employee records, salaries, tax deductions. Conclude: databases touch all aspects of life.'] },
    { q: 'What are RDBMS and DBMS? List four significant differences between a file processing system and a DBMS.', a: ['DBMS: software that controls the information in a database (Oracle, MySQL…).', 'RDBMS: DBMS based on the relational model — data in tables linked by keys, queried with SQL.', 'Differences: redundancy (high vs controlled); sharing (limited vs easy); program-data dependence vs independence; integrity/security (weak vs strong); concurrency; backup & recovery.'] }
  ],
  quiz: [
    { q: { bn: 'নিচের কোনটা “Information”?', en: 'Which of these is “information”?' }, o: [{ bn: 'একজন ছাত্রের নম্বর 78', en: 'One student’s score: 78' }, { bn: 'পুরো ক্লাসের গড় নম্বর 75.4', en: 'The class average: 75.4' }, { bn: 'একটা roll number', en: 'A roll number' }, { bn: 'একটা ফোন নম্বর', en: 'A phone number' }], a: 1, why: { bn: 'গড় নম্বর data process করে পাওয়া, তাই এটা information।', en: 'The average is produced by processing data, so it is information.' } },
    { q: { bn: 'DBMS আসলে কী?', en: 'What exactly is a DBMS?' }, o: [{ bn: 'একটা hardware', en: 'A piece of hardware' }, { bn: 'Database নিয়ন্ত্রণকারী software', en: 'Software that controls a database' }, { bn: 'একটা table', en: 'A table' }, { bn: 'একটা programming language', en: 'A programming language' }], a: 1, why: { bn: 'DBMS = database-কে control করার software।', en: 'A DBMS is the software that controls the database.' } },
    { q: { bn: 'কোনটা DBMS না?', en: 'Which one is NOT a DBMS?' }, o: ['MySQL', 'Oracle', 'PostgreSQL', 'Python'], a: 3, why: { bn: 'Python একটা programming language, DBMS না।', en: 'Python is a programming language, not a DBMS.' } },
    { q: { bn: 'Database system কে design ও manage করে?', en: 'Who designs and manages the database system?' }, o: ['End user', 'Application developer', 'DBA', 'Database systems programmer'], a: 2, why: { bn: 'DBA = Database Administrator: design ও manage করে।', en: 'The DBA (Database Administrator) designs and manages it.' } },
    { q: { bn: 'একই data অনেক file-এ বারবার থাকাকে কী বলে?', en: 'Storing the same data in many files is called…' }, o: ['Data redundancy', 'Data independence', 'Data integrity', 'Concurrency'], a: 0, why: { bn: 'Duplication of data = Data redundancy।', en: 'Duplication of data = data redundancy.' } },
    { q: { bn: '“File-এর structure program code-এর ভিতরে define করা”: এই সমস্যার নাম?', en: '“File structure is defined inside the program code” — this problem is called…' }, o: ['Limited data sharing', 'Program-data dependence', 'Controlled redundancy', 'Data dictionary'], a: 1, why: { bn: 'এটাই program-data dependence।', en: 'That is program-data dependence.' } },
    { q: { bn: 'Database system-এর ৪টা অংশ কোনগুলো?', en: 'The four components of a database system are…' }, o: [{ bn: 'Data, Software, Hardware, Users', en: 'Data, software, hardware, users' }, { bn: 'Table, Row, Column, Key', en: 'Table, row, column, key' }, { bn: 'CPU, RAM, Disk, Network', en: 'CPU, RAM, disk, network' }, { bn: 'SQL, DDL, DML, DCL', en: 'SQL, DDL, DML, DCL' }], a: 0, why: { bn: 'স্লাইড ৮: Data, Software, Hardware, Users।', en: 'Slide 8: data, software, hardware, users.' } },
    { q: { bn: 'অনেক user একসাথে update করলে গোলমাল ঠেকায় কোন service?', en: 'Which service prevents conflicts when many users update at once?' }, o: ['Backup and recovery', 'Concurrency control', 'Utility services', 'Data dictionary'], a: 1, why: { bn: 'Concurrency control একসাথে চলা কাজ সামলায়।', en: 'Concurrency control manages simultaneous access.' } },
    { q: { bn: 'Metadata (data সম্পর্কে data) কোথায় রাখা হয়?', en: 'Where is metadata (data about data) kept?' }, o: ['Data dictionary / system catalog', 'Transaction log', 'Utility services', 'Application program'], a: 0, why: { bn: 'Data dictionary বা system catalog-এ metadata থাকে।', en: 'The data dictionary / system catalog stores metadata.' } },
    { q: { bn: 'কোনটা Database approach-এর সুবিধা নয়?', en: 'Which is NOT an advantage of the database approach?' }, o: ['Data sharing', 'Controlled redundancy', 'Better data integrity', 'Program-data dependence'], a: 3, why: { bn: 'Program-data dependence হলো file system-এর অসুবিধা।', en: 'Program-data dependence is a disadvantage of file systems.' } }
  ]
});

window.CHAPTERS = window.CHAPTERS || [];
CHAPTERS.push({
  id: 'ch3', num: 3, color: '#C2410C', icon: '🔑', source: '3_Relational_Model',
  title: { bn: 'Relational Model: Attribute ও Key', en: 'Relational Model: Attributes and Keys' },
  blurb: { bn: 'Relation, attribute-এর ধরন, Super/Candidate/Primary/Foreign key', en: 'Relations, attribute types, super/candidate/primary/foreign keys' },
  topics: [
    {
      id: 'relation-terms', stars: 3, visual: 'relationAnatomy',
      title: { bn: 'Relation, Tuple, Attribute', en: 'Relation, Tuple, Attribute' },
      body: {
        bn: `<p>Relational model-এ:</p>
<ul><li><mark><b>Relation</b> = table</mark></li><li><mark><b>Tuple</b> = row</mark></li><li><mark><b>Attribute</b> = column</mark></li></ul>
<p>যেমন <code>instructor</code> relation-এর ৪টা attribute: <b>ID, name, dept_name, salary</b>। প্রতিটা row একজন instructor-এর তথ্য, অর্থাৎ একটা tuple।</p>`,
        en: `<p>In the relational model:</p>
<ul><li><mark><b>Relation</b> refers to a table</mark></li><li><mark><b>Tuple</b> refers to a row</mark></li><li><mark><b>Attribute</b> refers to a column</mark></li></ul>
<p>The <code>instructor</code> relation has four attributes: <b>ID, name, dept_name, salary</b>. Each row describes one instructor, i.e. one tuple.</p>`
      },
      example: {
        bn: `<p>তোমার ক্লাসের result sheet: পুরো sheet টা relation, “Roll, Name, CGPA” শিরোনাম গুলো attribute, আর তোমার নামের লাইনটা একটা tuple।</p>`,
        en: `<p>Your class result sheet: the whole sheet is the relation, the headings “Roll, Name, CGPA” are attributes, and the line with your name is one tuple.</p>`
      },
      exam: [
        'In the relational model, the term <b>relation</b> refers to a table, <b>tuple</b> refers to a row, and <b>attribute</b> refers to a column.',
        'Example: relation instructor has four attributes: ID, name, dept_name and salary.'
      ]
    },
    {
      id: 'attribute-domain', stars: 2, visual: 'domain',
      title: { bn: 'Attribute ও Domain', en: 'Attribute and Domain' },
      body: {
        bn: `<p>Entity-কে প্রকাশ করা হয় তার বৈশিষ্ট্য দিয়ে, এগুলোকে বলে <b>attribute</b>। সব attribute-এর মান (value) থাকে। যেমন student entity-র attribute: name, class, age।</p>
<p>প্রতিটা attribute-এর জন্য একটা নির্দিষ্ট <b>domain</b> থাকে: <mark>যে মানগুলো দেওয়া যাবে তার সীমা (range)</mark>। যেমন ছাত্রের নাম সংখ্যা হতে পারে না; বয়স negative হতে পারে না।</p>`,
        en: `<p>Entities are represented by their properties, called <b>attributes</b>. Every attribute has a value. A student entity may have name, class and age.</p>
<p>Each attribute has a <b>domain</b>: <mark>the range of values that may be assigned to it</mark>. A student’s name cannot be numeric; a student’s age cannot be negative.</p>`
      },
      example: {
        bn: `<p>ভর্তি form-এ “বয়স” ঘরে <code>-5</code> লিখলে website error দেয়, কারণ age-এর domain হলো ০ বা তার বেশি পূর্ণসংখ্যা।</p>`,
        en: `<p>Type <code>-5</code> in the “age” box of an admission form and the website rejects it, because the domain of age is non-negative integers.</p>`
      },
      exam: [
        '<b>Attribute</b>: a property used to represent an entity; all attributes have values. Example: name, class, age of a student.',
        '<b>Domain</b>: the range of values that can be assigned to an attribute (e.g. name must be alphabetic; age cannot be negative).'
      ]
    },
    {
      id: 'attr-types', stars: 3, visual: 'attrTypes',
      title: { bn: 'Attribute-এর ধরন', en: 'Types of Attributes' },
      body: {
        bn: `<ul><li><b>Simple attribute</b>: <mark>atomic মান, আর ভাগ করা যায় না</mark>। যেমন ছাত্রের ১০ সংখ্যার phone number।</li>
<li><b>Composite attribute</b>: <mark>একাধিক simple attribute মিলে তৈরি</mark>। যেমন পুরো নাম = first_name + last_name।</li>
<li><b>Derived attribute</b>: physical database-এ থাকে না, <mark>অন্য attribute থেকে হিসাব করে বের হয়</mark>। যেমন date_of_birth থেকে age; department-এর average_salary।</li>
<li><b>Single-value attribute</b>: একটাই মান। যেমন Social_Security_Number (বা NID)।</li>
<li><b>Multi-value attribute</b>: <mark>একাধিক মান থাকতে পারে</mark>। যেমন একজনের একাধিক phone number, email।</li></ul>`,
        en: `<ul><li><b>Simple attribute</b>: <mark>atomic values that cannot be divided further</mark>, e.g. a student’s 10-digit phone number.</li>
<li><b>Composite attribute</b>: <mark>made of more than one simple attribute</mark>, e.g. full name = first_name + last_name.</li>
<li><b>Derived attribute</b>: not stored in the physical database; <mark>derived from other attributes</mark>, e.g. age from date_of_birth, or a department’s average_salary.</li>
<li><b>Single-value attribute</b>: holds one value, e.g. Social_Security_Number (or NID).</li>
<li><b>Multi-value attribute</b>: <mark>may hold more than one value</mark>, e.g. several phone numbers or email addresses.</li></ul>`
      },
      example: {
        bn: `<p>তোমার NID কার্ড: <b>NID নম্বর</b> single-valued; <b>নাম</b> composite; তোমার একাধিক <b>মোবাইল নম্বর</b> multi-valued; আর <b>বয়স</b> কার্ডে লেখা নেই, জন্মতারিখ থেকে বের হয়, তাই derived।</p>`,
        en: `<p>Your NID card: the <b>NID number</b> is single-valued; <b>name</b> is composite; your several <b>mobile numbers</b> are multi-valued; <b>age</b> isn’t printed but comes from your birth date, so it’s derived.</p>`
      },
      exam: [
        '<b>Simple</b>: atomic, cannot be divided (phone number). <b>Composite</b>: made of several simple attributes (name → first_name, last_name).',
        '<b>Derived</b>: not stored, derived from other attributes (age from date_of_birth; average_salary).',
        '<b>Single-value</b>: one value (Social_Security_Number). <b>Multi-value</b>: more than one value (phone numbers, email addresses).'
      ]
    },
    {
      id: 'super-key', stars: 3, visual: 'keyPlay',
      title: { bn: 'Key ও Super Key', en: 'Keys and Super Key' },
      body: {
        bn: `<p><b>Key</b> relational database-এর অত্যন্ত গুরুত্বপূর্ণ অংশ। Key দিয়ে:</p>
<ul><li>Table-এর মধ্যে সম্পর্ক তৈরি ও চেনা যায়</li><li><mark>প্রতিটা record (row)-কে unique-ভাবে চেনা যায়</mark></li></ul>
<p><b>Super key</b> = superset of a key। <mark>এক বা একাধিক attribute-এর set যা একসাথে প্রতিটা tuple-কে unique-ভাবে চেনাতে পারে</mark>।</p>
<ul><li><code>ID</code> একাই একজন instructor-কে আলাদা করে, তাই ID super key।</li>
<li><code>name</code> super key না, কারণ একই নামের কয়েকজন থাকতে পারে।</li>
<li><code>{ID, name}</code>-ও super key (ID তো আছেই)।</li></ul>
<p>স্লাইডের উদাহরণ: <code>{Roll_no}</code>, <code>{Registration_no}</code>, <code>{Roll_no, Registration_no}</code>, <code>{Roll_no, Name}</code>, <code>{Name, Registration_no}</code>, <code>{Roll_no, Name, Registration_no}</code>: সবগুলো super key।</p>
<p class="tip">👇 নিচের playground-এ নিজে column বেছে test করো!</p>`,
        en: `<p><b>Keys</b> are a very important part of a relational database. They:</p>
<ul><li>establish and identify relations between tables</li><li><mark>ensure every record can be uniquely identified</mark> by one or more fields</li></ul>
<p>A <b>super key</b> is a superset of a key: <mark>a set of one or more attributes that, taken collectively, uniquely identify each tuple</mark>.</p>
<ul><li><code>ID</code> alone distinguishes instructors, so ID is a super key.</li>
<li><code>name</code> is not, because several instructors may share a name.</li>
<li><code>{ID, name}</code> is also a super key (it contains ID).</li></ul>
<p>Slide example: <code>{Roll_no}</code>, <code>{Registration_no}</code>, <code>{Roll_no, Registration_no}</code>, <code>{Roll_no, Name}</code>, <code>{Name, Registration_no}</code>, <code>{Roll_no, Name, Registration_no}</code> are all super keys.</p>
<p class="tip">👇 Test it yourself in the playground below!</p>`
      },
      example: {
        bn: `<p>ক্লাসে “রহিম” নামে দুইজন। শিক্ষক “রহিম” ডাকলে দুজনই দাঁড়ায়, তাই name দিয়ে চেনা যায় না। “Roll 101” ডাকলে একজনই দাঁড়ায়। Roll তাই key। “Roll 101 রহিম” ডাকলেও একজন, কিন্তু নামটা বাড়তি, তাই এটা super key।</p>`,
        en: `<p>Two students are named “Rahim”. Call “Rahim” and both stand up, so name can’t identify them. Call “Roll 101” and only one stands. “Roll 101 Rahim” also gets one person, but the name is extra baggage: that’s a super key.</p>`
      },
      exam: [
        '<b>Keys</b> are used to establish and identify relations between tables, and ensure each record can be uniquely identified by one or more fields.',
        '<b>Super key</b>: a set of one or more attributes that, taken collectively, can identify all other attributes uniquely. Example: {ID} and {ID, name} are super keys of instructor; {name} is not.'
      ]
    },
    {
      id: 'candidate-key', stars: 3, visual: 'keyNest',
      title: { bn: 'Candidate Key: “minimal super key”', en: 'Candidate Key: the minimal super key' },
      body: {
        bn: `<p><b>Candidate key</b> হলো এমন attribute set যা tuple-কে unique-ভাবে চেনায় এবং <mark>যার মধ্যে কোনো বাড়তি (অপ্রয়োজনীয়) attribute নেই</mark>। অর্থাৎ <b>candidate key হলো minimal super key</b>।</p>
<p><b>Justify</b> (⭐ পরীক্ষার প্রশ্ন): <code>Student(ID, name, dept_name)</code>-এর super key: ID, ID+name, ID+dept_name, name+dept_name, ID+name+dept_name।</p>
<ul><li><code>{ID}</code> candidate, কারণ এখান থেকে কিছু সরালে আর key থাকে না।</li>
<li>ধরো name+dept_name দিয়েও আলাদা করা যায়, তাহলে <code>{name, dept_name}</code>-ও candidate।</li>
<li>কিন্তু <code>{ID, name}</code> candidate <b>না</b>: <mark>শুধু ID-ই যথেষ্ট, name বাড়তি</mark>।</li></ul>
<p>একটা table-এ একাধিক candidate key থাকতে পারে।</p>`,
        en: `<p>A <b>candidate key</b> is a set of attributes that uniquely identifies tuples and <mark>contains no extra (unnecessary) attributes</mark>. In other words, <b>candidate keys are minimal super keys</b>.</p>
<p><b>Justification</b> (⭐ exam question): for <code>Student(ID, name, dept_name)</code>, super keys are ID, ID+name, ID+dept_name, name+dept_name, ID+name+dept_name.</p>
<ul><li><code>{ID}</code> is a candidate key: remove anything and it stops being a key.</li>
<li>If name+dept_name also distinguishes students, <code>{name, dept_name}</code> is a candidate key too.</li>
<li>But <code>{ID, name}</code> is <b>not</b> a candidate key: <mark>ID alone is enough; name is redundant</mark>.</li></ul>
<p>A table may have several candidate keys.</p>`
      },
      example: {
        bn: `<p>GUB-তে তোমাকে চেনা যায় Student ID দিয়ে, আবার Registration number দিয়েও। দুটোই আলাদাভাবে যথেষ্ট, তাই দুটোই candidate key। “ID + নাম” super key, কিন্তু minimal না।</p>`,
        en: `<p>At university you can be identified by student ID and also by registration number. Each is enough alone, so both are candidate keys. “ID + name” is a super key but not minimal.</p>`
      },
      exam: [
        '<b>Candidate key</b>: a set of attributes that uniquely identifies tuples in a table, with no redundant attribute. <b>“Candidate key is the minimal of super key.”</b>',
        'Justification: in instructor, {ID} and {name, dept_name} can be candidate keys; {ID, name} is a super key but NOT a candidate key because ID alone is a candidate key.',
        'Several distinct sets of attributes may serve as candidate keys.'
      ]
    },
    {
      id: 'primary-key', stars: 3, visual: 'keyNest',
      title: { bn: 'Primary Key', en: 'Primary Key' },
      body: {
        bn: `<p><b>Primary key</b> হলো <mark>database designer যে candidate key-টা বেছে নেয়</mark> entity set-এর entity গুলো চেনার জন্য।</p>
<ul><li>এর মান কখনো বা খুব কমই বদলায়।</li>
<li>যেমন একজন মানুষের <b>address</b> primary key-র অংশ হওয়া উচিত না (বাসা বদলায়)।</li>
<li>Social-security number (NID) কখনো বদলায় না, তাই ভালো পছন্দ।</li>
<li><mark>দুইটা tuple-এর primary key-র মান একই হতে পারে না</mark> (এবং null হতে পারে না)।</li></ul>
<p class="tip">যে candidate key primary হলো না, তাকে বলে <b>alternate key</b>।</p>`,
        en: `<p>The <b>primary key</b> is <mark>the candidate key chosen by the database designer</mark> to identify entities within an entity set.</p>
<ul><li>Its values are never, or very rarely, changed.</li>
<li>A person’s <b>address</b> should not be part of the primary key (people move).</li>
<li>Social-security numbers never change, so they are a good choice.</li>
<li><mark>No two tuples may have the same primary key value</mark> (and it cannot be null).</li></ul>
<p class="tip">Candidate keys not chosen as primary are called <b>alternate keys</b>.</p>`
      },
      example: {
        bn: `<p>মোবাইল অপারেটর তোমাকে চেনে NID দিয়ে, মোবাইল নম্বর দিয়ে না। কারণ নম্বর port/বদল হতে পারে, NID বদলায় না।</p>`,
        en: `<p>A mobile operator identifies you by NID, not by your phone number, because numbers can be ported or changed while an NID never changes.</p>`
      },
      exam: [
        '<b>Primary key</b>: a candidate key chosen by the database designer to identify entities within an entity set (a minimal super key).',
        'Its values are never or very rarely changed (address is a bad choice; social-security number is good). No two tuples may have the same primary key value.'
      ]
    },
    {
      id: 'foreign-key', stars: 3, visual: 'foreignKey',
      title: { bn: 'Foreign Key ও Referential Integrity', en: 'Foreign Key and Referential Integrity' },
      body: {
        bn: `<p><b>Foreign key</b> হলো এক বা একাধিক column, <mark>যার মান অন্য table-এর primary key-র মান থেকে আসে</mark>।</p>
<p><b>Foreign key constraint</b>-কে <b>referential integrity constraint</b>-ও বলে: <mark>foreign key-এর মান অবশ্যই অন্য table-এর primary key-তে আসলেই থাকতে হবে</mark>।</p>
<pre class="code"><code>create table CATEGORY(
  CategoryName   VARCHAR2(12) primary key,
  ParentCategory VARCHAR2(8),
  SubCategory    VARCHAR2(20));

create table BOOKSHELF(
  Title        VARCHAR2(100) primary key,
  Publisher    VARCHAR2(20),
  CategoryName VARCHAR2(20),
  Rating       VARCHAR2(2),
  constraint CATFK foreign key (CategoryName)
    references CATEGORY(CategoryName));</code></pre>
<p><b>on delete cascade</b>: parent table (CATEGORY) থেকে কোনো row মুছলে, <mark>child table (BOOKSHELF)-এর নির্ভরশীল row-ও নিজে থেকে মুছে যায়</mark>, তাই referential integrity বজায় থাকে। চাইলে মোছার বদলে FK-কে NULL-ও করা যায়।</p>`,
        en: `<p>A <b>foreign key</b> is one or more columns <mark>whose values are based on the primary key values of another table</mark>.</p>
<p>A <b>foreign key constraint</b>, also called a <b>referential integrity constraint</b>, says <mark>the foreign key values must correspond to actual primary key values in the other table</mark>.</p>
<pre class="code"><code>create table CATEGORY(
  CategoryName   VARCHAR2(12) primary key,
  ParentCategory VARCHAR2(8),
  SubCategory    VARCHAR2(20));

create table BOOKSHELF(
  Title        VARCHAR2(100) primary key,
  Publisher    VARCHAR2(20),
  CategoryName VARCHAR2(20),
  Rating       VARCHAR2(2),
  constraint CATFK foreign key (CategoryName)
    references CATEGORY(CategoryName));</code></pre>
<p><b>on delete cascade</b>: deleting a row in the parent (CATEGORY) <mark>automatically deletes the dependent rows in the child (BOOKSHELF)</mark>, maintaining referential integrity. Alternatively the FK can be set to NULL.</p>`
      },
      example: {
        bn: `<p>Daraz-এর <code>orders</code> table-এ <code>customer_id</code> একটা foreign key, যেটা <code>customers</code> table-কে refer করে। এমন customer-এর order রাখা যাবে না যে customer-ই নেই। Account delete করলে (cascade) তার order history-ও মুছে যেতে পারে।</p>`,
        en: `<p>In Daraz’s <code>orders</code> table, <code>customer_id</code> is a foreign key referring to <code>customers</code>. You can’t store an order for a customer who doesn’t exist. Delete the account (cascade) and the order history can go with it.</p>`
      },
      exam: [
        '<b>Foreign key</b>: a combination of columns with values based on the primary key values from another table.',
        '<b>Referential integrity constraint</b>: foreign key values must correspond to actual values of the primary key in the other (referenced) table.',
        '<b>on delete cascade</b>: when a parent row is deleted, dependent child rows are deleted automatically, maintaining referential integrity.'
      ]
    },
    {
      id: 'schema-diagram', stars: 2, visual: 'uniSchema',
      title: { bn: 'University Database-এর Schema Diagram', en: 'Schema Diagram for the University Database' },
      body: {
        bn: `<p><b>Schema diagram</b>-এ প্রতিটা relation একটা box: উপরে relation-এর নাম, নিচে attribute গুলো। <mark>Primary key underline করা</mark>, আর <mark>foreign key থেকে তীর যায় referenced relation-এর primary key-র দিকে</mark>।</p>
<p>এই diagram আঁকতে বলা হয় পরীক্ষায়। মূল relation গুলো মুখস্থ রাখো:</p>
<ul><li><code>department(<u>dept_name</u>, building, budget)</code></li>
<li><code>instructor(<u>ID</u>, name, dept_name, salary)</code></li>
<li><code>student(<u>ID</u>, name, dept_name, tot_cred)</code></li>
<li><code>course(<u>course_id</u>, title, dept_name, credits)</code></li>
<li><code>teaches(<u>ID, course_id, sec_id, semester, year</u>)</code></li>
<li><code>takes(<u>ID, course_id, sec_id, semester, year</u>, grade)</code></li>
<li><code>advisor(<u>s_ID</u>, i_ID)</code>, <code>section(...)</code>, <code>classroom(...)</code>, <code>prereq(...)</code>, <code>time_slot(...)</code></li></ul>`,
        en: `<p>In a <b>schema diagram</b> each relation is a box with its name on top and attributes below. <mark>Primary keys are underlined</mark>, and <mark>arrows run from a foreign key to the referenced relation’s primary key</mark>.</p>
<p>You may be asked to draw it. Remember the main relations:</p>
<ul><li><code>department(<u>dept_name</u>, building, budget)</code></li>
<li><code>instructor(<u>ID</u>, name, dept_name, salary)</code></li>
<li><code>student(<u>ID</u>, name, dept_name, tot_cred)</code></li>
<li><code>course(<u>course_id</u>, title, dept_name, credits)</code></li>
<li><code>teaches(<u>ID, course_id, sec_id, semester, year</u>)</code></li>
<li><code>takes(<u>ID, course_id, sec_id, semester, year</u>, grade)</code></li>
<li><code>advisor(<u>s_ID</u>, i_ID)</code>, <code>section(...)</code>, <code>classroom(...)</code>, <code>prereq(...)</code>, <code>time_slot(...)</code></li></ul>`
      },
      example: {
        bn: `<p>এটা যেন শহরের মানচিত্র: box গুলো এলাকা, তীর গুলো রাস্তা। কোন table থেকে কোন table-এ “যাওয়া” যায় (join করা যায়) তা এক নজরে দেখা যায়।</p>`,
        en: `<p>It’s like a city map: boxes are neighbourhoods and arrows are roads. One look tells you which tables you can “travel” between (join).</p>`
      },
      exam: [
        'A <b>schema diagram</b> shows each relation as a box (name + attributes), with <b>primary keys underlined</b> and <b>foreign key dependencies as arrows</b> to the referenced primary key.',
        'Draw department, instructor, student, course, teaches, takes, advisor with arrows: instructor.dept_name → department, takes.ID → student, teaches.ID → instructor, etc.'
      ]
    }
  ],
  written: [
    { q: 'What is an attribute? Describe the different types of attributes with examples.', a: ['Attribute: property representing an entity; has a domain.', 'Simple vs composite (name → first/last).', 'Derived (age from date_of_birth).', 'Single-valued (SSN) vs multi-valued (phone numbers).'] },
    { q: 'Briefly describe the different types of keys with examples.', a: ['Super key: attributes identifying tuples uniquely ({ID}, {ID,name}).', 'Candidate key: minimal super key ({ID}, {Registration_no}).', 'Primary key: candidate key chosen by the designer; rarely changes; unique & not null.', 'Foreign key: refers to the primary key of another table (BOOKSHELF.CategoryName → CATEGORY).'] },
    { q: '“Candidate key is the minimal of super key.” Justify with examples.', a: ['List super keys of Student(ID, name, dept_name).', '{ID} is minimal → candidate; {name, dept_name} may also be candidate.', '{ID, name} is a super key but not candidate because ID alone suffices.', 'Therefore every candidate key is a super key with no redundant attribute.'] },
    { q: 'Draw the schema diagram of the university database.', a: ['Boxes for department, instructor, student, course, section, teaches, takes, advisor, prereq, classroom, time_slot.', 'Underline primary keys.', 'Arrows from foreign keys to referenced primary keys.'] }
  ],
  quiz: [
    { q: { bn: 'Relational model-এ “attribute” মানে…', en: 'In the relational model, an “attribute” is a…' }, o: [{ bn: 'Row', en: 'Row' }, { bn: 'Column', en: 'Column' }, { bn: 'Table', en: 'Table' }, { bn: 'Database', en: 'Database' }], a: 1, why: { bn: 'Attribute = column।', en: 'Attribute = column.' } },
    { q: { bn: 'Age-কে date_of_birth থেকে বের করা যায়। Age কোন ধরনের attribute?', en: 'Age can be computed from date_of_birth. Age is a…' }, o: ['Composite', 'Multi-valued', 'Derived', 'Simple key'], a: 2, why: { bn: 'অন্য attribute থেকে হিসাব হয় = derived।', en: 'Computed from another attribute = derived.' } },
    { q: { bn: 'একজনের একাধিক phone number: attribute টা…', en: 'A person with several phone numbers: the attribute is…' }, o: ['Single-valued', 'Multi-valued', 'Derived', 'Atomic key'], a: 1, why: { bn: 'একাধিক মান = multi-valued।', en: 'Many values = multi-valued.' } },
    { q: { bn: 'first_name + last_name মিলে name: এটা…', en: 'name made of first_name + last_name is…' }, o: ['Composite attribute', 'Derived attribute', 'Foreign key', 'Domain'], a: 0, why: { bn: 'একাধিক simple attribute মিলে = composite।', en: 'Made of several simple attributes = composite.' } },
    { q: { bn: 'Candidate key হলো…', en: 'A candidate key is a…' }, o: [{ bn: 'যেকোনো column', en: 'Any column' }, { bn: 'Minimal super key', en: 'Minimal super key' }, { bn: 'Foreign key', en: 'Foreign key' }, { bn: 'Null থাকা column', en: 'A column with nulls' }], a: 1, why: { bn: 'Candidate key is the minimal of super key।', en: 'Candidate key is the minimal super key.' } },
    { q: { bn: 'instructor(ID, name, …)-এ {ID, name} কী?', en: 'In instructor(ID, name, …), {ID, name} is…' }, o: [{ bn: 'Super key, কিন্তু candidate না', en: 'A super key but not a candidate key' }, { bn: 'Candidate key', en: 'A candidate key' }, { bn: 'কোনো key-ই না', en: 'Not a key at all' }, { bn: 'Foreign key', en: 'A foreign key' }], a: 0, why: { bn: 'ID একাই যথেষ্ট, তাই {ID, name} minimal না।', en: 'ID alone suffices, so {ID, name} isn’t minimal.' } },
    { q: { bn: 'Primary key-র অংশ হওয়া উচিত নয় কোনটা?', en: 'Which should NOT be part of a primary key?' }, o: ['Student ID', 'NID number', 'Address', 'Registration no'], a: 2, why: { bn: 'Address বদলাতে পারে।', en: 'An address can change.' } },
    { q: { bn: 'Foreign key-কে আর কোন constraint বলে?', en: 'A foreign key constraint is also called a…' }, o: ['Domain constraint', 'Referential integrity constraint', 'Not null constraint', 'Check constraint'], a: 1, why: { bn: 'FK constraint = referential integrity constraint।', en: 'FK constraint = referential integrity constraint.' } },
    { q: { bn: 'Parent row মুছলে child row-ও মুছে যায়: কোন clause?', en: 'Deleting a parent row also deletes child rows. Which clause?' }, o: ['on delete cascade', 'drop table', 'primary key', 'not null'], a: 0, why: { bn: 'on delete cascade।', en: 'on delete cascade.' } },
    { q: { bn: 'Schema diagram-এ primary key কীভাবে দেখানো হয়?', en: 'How is a primary key shown in a schema diagram?' }, o: [{ bn: 'Underline করে', en: 'Underlined' }, { bn: 'লাল রঙে', en: 'In red' }, { bn: 'Diamond দিয়ে', en: 'With a diamond' }, { bn: 'Dashed line দিয়ে', en: 'With a dashed line' }], a: 0, why: { bn: 'PK underline করা থাকে।', en: 'Primary keys are underlined.' } }
  ]
});

window.CHAPTERS = window.CHAPTERS || [];
CHAPTERS.push({
  id: 'ch5', num: 5, color: '#B42318', icon: '⌨️', source: 'Lecture-4_SQL',
  title: { bn: 'SQL', en: 'SQL' },
  blurb: { bn: 'Create, insert, select-from-where, like, group by, having, subquery', en: 'Create, insert, select-from-where, like, group by, having, subqueries' },
  topics: [
    {
      id: 'datatypes', stars: 2, visual: 'sqlTypes',
      title: { bn: 'SQL Data Types', en: 'Data Types in SQL' },
      body: {
        bn: `<ul><li><b>char(n)</b>: <mark>নির্দিষ্ট দৈর্ঘ্যের</mark> string, দৈর্ঘ্য n (0–255)।</li>
<li><b>varchar(n)</b>: <mark>পরিবর্তনশীল দৈর্ঘ্যের</mark> string, সর্বোচ্চ n (0–65535)।</li>
<li><b>int</b>: integer (machine-dependent সীমার মধ্যে)।</li>
<li><b>float(n)</b>: floating point, অন্তত n digit precision।</li>
<li><b>float(p,d)</b>: মোট p digit, দশমিকের পরে d digit। যেমন <code>numeric(3,1)</code>-এ 44.5 রাখা যায়, কিন্তু 444.5 বা 0.32 না।</li>
<li><b>date</b>: format <code>YYYY-MM-DD</code>, পরিসর '1000-01-01' থেকে '9999-12-31'।</li></ul>
<p class="tip">char(5)-এ "Wu" রাখলে বাকি ৩ ঘর space দিয়ে ভরে (সবসময় ৫ byte)। varchar(5)-এ "Wu" নেয় শুধু ২ ঘর।</p>`,
        en: `<ul><li><b>char(n)</b>: <mark>fixed-length</mark> string of length n (0–255).</li>
<li><b>varchar(n)</b>: <mark>variable-length</mark> string, maximum n (0–65535).</li>
<li><b>int</b>: integer (a machine-dependent finite subset).</li>
<li><b>float(n)</b>: floating point with at least n digits of precision.</li>
<li><b>float(p,d)</b>: p digits, d of them after the decimal point. E.g. <code>numeric(3,1)</code> stores 44.5 exactly, but not 444.5 or 0.32.</li>
<li><b>date</b>: format <code>YYYY-MM-DD</code>, range '1000-01-01' to '9999-12-31'.</li></ul>
<p class="tip">“Wu” in char(5) is padded with 3 spaces (always 5 characters). In varchar(5) it takes only 2.</p>`
      },
      example: {
        bn: `<p>ছাত্রের <b>ID</b> সবসময় ৯ অক্ষর, তাই <code>char(9)</code>। <b>নাম</b> ছোট-বড় হয়, তাই <code>varchar(50)</code>। <b>CGPA</b> 3.75, তাই <code>float(3,2)</code>। <b>জন্মতারিখ</b> <code>date</code>।</p>`,
        en: `<p>A student <b>ID</b> is always 9 characters, so <code>char(9)</code>. <b>Names</b> vary in length: <code>varchar(50)</code>. <b>CGPA</b> 3.75: <code>float(3,2)</code>. <b>Birth date</b>: <code>date</code>.</p>`
      },
      exam: [
        '<b>char(n)</b>: fixed-length character string of length n. <b>varchar(n)</b>: variable-length string with maximum length n.',
        '<b>int</b>: integer. <b>float(n)</b>: floating point with at least n digits. <b>float(p,d)</b>: p digits with d to the right of the decimal point (numeric(3,1) stores 44.5 but not 444.5 or 0.32).',
        '<b>date</b>: YYYY-MM-DD, range 1000-01-01 to 9999-12-31.'
      ]
    },
    {
      id: 'commands', stars: 3, visual: 'sqlCats',
      title: { bn: 'SQL Command-এর ভাগ: DDL, DQL, DML, DCL, TCL', en: 'SQL Command Categories: DDL, DQL, DML, DCL, TCL' },
      body: {
        bn: `<p>SQL command প্রধানত ৫ ভাগে:</p>
<ul><li><b>DDL: Data Definition Language</b>: structure তৈরি/বদল: CREATE, ALTER, DROP, TRUNCATE</li>
<li><b>DQL: Data Query Language</b>: data পড়া: SELECT</li>
<li><b>DML: Data Manipulation Language</b>: data বদল: INSERT, UPDATE, DELETE</li>
<li><b>DCL: Data Control Language</b>: অনুমতি: GRANT, REVOKE</li>
<li><b>TCL: Transaction Control Language</b>: transaction: COMMIT, ROLLBACK, SAVEPOINT</li></ul>
<p class="tip">🧠 মনে রাখো: <b>D</b>efinition = ঘর বানানো, <b>M</b>anipulation = ঘরের আসবাব নাড়াচাড়া, <b>Q</b>uery = ঘরে কী আছে দেখা, <b>C</b>ontrol = চাবি কাকে দেবে, <b>T</b>ransaction = কাজ পাকা করা বা বাতিল করা।</p>`,
        en: `<p>SQL commands fall into five categories:</p>
<ul><li><b>DDL: Data Definition Language</b>: create/change structure: CREATE, ALTER, DROP, TRUNCATE</li>
<li><b>DQL: Data Query Language</b>: read data: SELECT</li>
<li><b>DML: Data Manipulation Language</b>: change data: INSERT, UPDATE, DELETE</li>
<li><b>DCL: Data Control Language</b>: permissions: GRANT, REVOKE</li>
<li><b>TCL: Transaction Control Language</b>: transactions: COMMIT, ROLLBACK, SAVEPOINT</li></ul>
<p class="tip">🧠 <b>D</b>efinition = build the house, <b>M</b>anipulation = move the furniture, <b>Q</b>uery = look at what’s inside, <b>C</b>ontrol = who gets a key, <b>T</b>ransaction = confirm or undo the work.</p>`
      },
      example: {
        bn: `<p>নতুন semester শুরু: IT অফিস <code>CREATE TABLE</code> দিয়ে নতুন table বানায় (DDL), ভর্তির সময় <code>INSERT</code> (DML), তুমি result দেখো <code>SELECT</code> (DQL), শিক্ষককে grade বসানোর অনুমতি <code>GRANT</code> (DCL), ভুল হলে <code>ROLLBACK</code> (TCL)।</p>`,
        en: `<p>New semester: IT creates tables with <code>CREATE TABLE</code> (DDL), admission adds rows with <code>INSERT</code> (DML), you view results with <code>SELECT</code> (DQL), teachers get grading rights via <code>GRANT</code> (DCL), and mistakes are undone with <code>ROLLBACK</code> (TCL).</p>`
      },
      exam: [
        'SQL commands: <b>DDL</b> (Data Definition), <b>DQL</b> (Data Query), <b>DML</b> (Data Manipulation), <b>DCL</b> (Data Control), <b>TCL</b> (Transaction Control).',
        'DDL: CREATE, ALTER, DROP, TRUNCATE · DQL: SELECT · DML: INSERT, UPDATE, DELETE · DCL: GRANT, REVOKE · TCL: COMMIT, ROLLBACK, SAVEPOINT.'
      ]
    },
    {
      id: 'create-table', stars: 3, visual: 'constraints',
      title: { bn: 'Create Table ও Integrity Constraint', en: 'Create Table and Integrity Constraints' },
      body: {
        bn: `<p>SQL relation তৈরি হয় <code>create table</code> দিয়ে:</p>
<pre class="code"><code>create table r (A1 D1, A2 D2, ..., An Dn,
    (integrity-constraint1),
    ...,
    (integrity-constraintk))</code></pre>
<p><b>r</b> = relation-এর নাম, <b>Ai</b> = attribute-এর নাম, <b>Di</b> = Ai-এর domain (data type)।</p>
<pre class="code"><code>create table instructor (
    ID        char(5),
    name      varchar(20) not null,
    dept_name varchar(20),
    salary    int,
    primary key (ID),
    foreign key (dept_name) references department);</code></pre>
<p><b>Integrity constraints:</b> <code>not null</code>, <code>primary key (A1, …, An)</code>, <code>foreign key (Am, …, An) references r</code>।</p>
<p class="tip">⭐ <mark>primary key declare করলে attribute নিজে থেকেই not null হয়ে যায়</mark>।</p>
<pre class="code"><code>create table takes (
    ID        varchar(5),
    course_id varchar(8),
    sec_id    varchar(8),
    semester  varchar(6),
    year      int,
    grade     varchar(2),
    primary key (ID, course_id, sec_id, semester, year),
    foreign key (ID) references student,
    foreign key (course_id, sec_id, semester, year) references section);</code></pre>`,
        en: `<p>An SQL relation is defined with <code>create table</code>:</p>
<pre class="code"><code>create table r (A1 D1, A2 D2, ..., An Dn,
    (integrity-constraint1),
    ...,
    (integrity-constraintk))</code></pre>
<p><b>r</b> is the relation name, each <b>Ai</b> an attribute, <b>Di</b> its domain (data type).</p>
<pre class="code"><code>create table instructor (
    ID        char(5),
    name      varchar(20) not null,
    dept_name varchar(20),
    salary    int,
    primary key (ID),
    foreign key (dept_name) references department);</code></pre>
<p><b>Integrity constraints:</b> <code>not null</code>, <code>primary key (A1, …, An)</code>, <code>foreign key (Am, …, An) references r</code>.</p>
<p class="tip">⭐ <mark>A primary key declaration automatically ensures not null.</mark></p>
<pre class="code"><code>create table takes (
    ID        varchar(5),
    course_id varchar(8),
    sec_id    varchar(8),
    semester  varchar(6),
    year      int,
    grade     varchar(2),
    primary key (ID, course_id, sec_id, semester, year),
    foreign key (ID) references student,
    foreign key (course_id, sec_id, semester, year) references section);</code></pre>`
      },
      example: {
        bn: `<p>Online form-এ “নাম*” তারকা চিহ্ন দেখেছ? ওটাই <code>not null</code>। আর একই email দিয়ে দুইবার account খোলা যায় না, কারণ email-এ unique/primary key constraint।</p>`,
        en: `<p>Seen “Name*” with an asterisk on a form? That’s <code>not null</code>. You can’t open two accounts with the same email because email has a unique/primary-key constraint.</p>`
      },
      exam: [
        'An SQL relation is defined using <b>create table r (A1 D1, …, An Dn, (integrity-constraint1), …)</b>; r = relation name, Ai = attribute, Di = domain of Ai.',
        'Integrity constraints: <b>not null</b>, <b>primary key (A1,…,An)</b>, <b>foreign key (Am,…,An) references r</b>. A primary key declaration automatically ensures not null.'
      ]
    },
    {
      id: 'modify', stars: 3, visual: 'deleteVsDrop',
      title: { bn: 'Insert, Delete, Update, Drop, Alter', en: 'Insert, Delete, Update, Drop, Alter' },
      body: {
        bn: `<pre class="code"><code>insert into instructor values ('10211', 'Smith', 'Biology', 66000);
insert into course (course_id, title, dept_name, credits)
    values ('CS-437', 'Database Systems', 'Comp. Sci.', 4);
insert into student values ('3003', 'Green', 'Finance', null);
-- select থেকে insert: সব instructor-কে student বানাও
insert into student select ID, name, dept_name, 0 from instructor;

delete from student;                                -- সব row মোছে
delete from instructor where dept_name = 'Finance';
drop table r;                                       -- পুরো table মোছে
alter table r add A D;     -- নতুন attribute, পুরনো row-তে null
alter table r drop A;      -- অনেক DB support করে না</code></pre>
<p class="warn">⭐ <b>delete</b> vs <b>drop</b>: <code>delete from student</code> <mark>সব row মোছে কিন্তু table থাকে</mark>; <code>drop table student</code> <mark>পুরো table (structure সহ) মুছে ফেলে</mark>।</p>
<p><b>Update</b>: ১,০০,০০০-এর বেশি salary হলে ৩% বাড়াও, বাকিদের ৫%:</p>
<pre class="code"><code>update instructor set salary = salary * 1.03 where salary > 100000;
update instructor set salary = salary * 1.05 where salary <= 100000;</code></pre>
<p><mark>ক্রম গুরুত্বপূর্ণ!</mark> উল্টো করলে কেউ কেউ দুইবার বাড়তি পাবে। <code>case</code> দিয়ে এক statement-এ করা ভালো:</p>
<pre class="code"><code>update instructor
set salary = case
               when salary <= 100000 then salary * 1.05
               else salary * 1.03
             end;</code></pre>
<p><b>Average-এর কম salary মুছতে</b>: SQL আগে avg হিসাব করে মোছার row খুঁজে নেয়, তারপর মোছে (avg আবার হিসাব করে না)।</p>`,
        en: `<pre class="code"><code>insert into instructor values ('10211', 'Smith', 'Biology', 66000);
insert into course (course_id, title, dept_name, credits)
    values ('CS-437', 'Database Systems', 'Comp. Sci.', 4);
insert into student values ('3003', 'Green', 'Finance', null);
-- insert from a select: add all instructors as students
insert into student select ID, name, dept_name, 0 from instructor;

delete from student;                                -- removes all rows
delete from instructor where dept_name = 'Finance';
drop table r;                                       -- removes the table
alter table r add A D;     -- new attribute, null in existing rows
alter table r drop A;      -- not supported by many databases</code></pre>
<p class="warn">⭐ <b>delete</b> vs <b>drop</b>: <code>delete from student</code> <mark>removes all tuples but keeps the table</mark>; <code>drop table student</code> <mark>removes the whole table, structure included</mark>.</p>
<p><b>Update</b>: raise salaries over 100,000 by 3%, others by 5%:</p>
<pre class="code"><code>update instructor set salary = salary * 1.03 where salary > 100000;
update instructor set salary = salary * 1.05 where salary <= 100000;</code></pre>
<p><mark>The order is important!</mark> Reversed, some instructors would get two raises. A <code>case</code> statement does it in one go:</p>
<pre class="code"><code>update instructor
set salary = case
               when salary <= 100000 then salary * 1.05
               else salary * 1.03
             end;</code></pre>
<p><b>Deleting below-average salaries</b>: SQL first computes avg and finds all tuples to delete, then deletes them (without recomputing avg).</p>`
      },
      example: {
        bn: `<p>WhatsApp-এ “Clear chat” করলে মেসেজ মুছে যায় কিন্তু chat টা থাকে: এটা <b>delete</b>। “Delete chat” করলে পুরো chat-ই নেই: এটা <b>drop</b>।</p>`,
        en: `<p>WhatsApp “Clear chat” removes the messages but the chat stays: that’s <b>delete</b>. “Delete chat” removes the chat itself: that’s <b>drop</b>.</p>`
      },
      exam: [
        '<b>insert into</b> r <b>values</b> (…); also insert into r select … (the select is fully evaluated before inserting).',
        '<b>delete from</b> r removes all tuples but keeps the relation; <b>drop table</b> r removes the relation itself.',
        '<b>alter table</b> r add A D (existing tuples get null) / alter table r drop A. <b>update</b> … set … where …: order of updates matters; use <b>case</b> for conditional updates.'
      ]
    },
    {
      id: 'basic-query', stars: 3, visual: 'sqlAnatomy',
      title: { bn: 'Basic Query: select-from-where', en: 'Basic Query Structure: select-from-where' },
      body: {
        bn: `<pre class="code"><code>select A1, A2, ..., An
from   r1, r2, ..., rm
where  P</code></pre>
<p><b>Ai</b> = attribute, <b>ri</b> = relation, <b>P</b> = predicate (শর্ত)। <mark>SQL query-র ফলাফলও একটা relation</mark>।</p>
<ul><li><code>select</code> ↔ relational algebra-র <b>projection (π)</b></li>
<li><code>from</code> ↔ <b>Cartesian product (×)</b></li>
<li><code>where</code> ↔ <b>selection predicate (σ)</b></li></ul>
<p class="tip">SQL নাম case-insensitive: <code>Name ≡ NAME ≡ name</code>।</p>`,
        en: `<pre class="code"><code>select A1, A2, ..., An
from   r1, r2, ..., rm
where  P</code></pre>
<p><b>Ai</b> is an attribute, <b>ri</b> a relation, <b>P</b> a predicate. <mark>The result of an SQL query is a relation.</mark></p>
<ul><li><code>select</code> ↔ relational-algebra <b>projection (π)</b></li>
<li><code>from</code> ↔ <b>Cartesian product (×)</b></li>
<li><code>where</code> ↔ <b>selection predicate (σ)</b></li></ul>
<p class="tip">SQL names are case-insensitive: <code>Name ≡ NAME ≡ name</code>.</p>`
      },
      example: {
        bn: `<p>দোকানদারকে বলছ: “আমাকে দাও (<b>select</b>) দাম আর নাম, তোমার ফ্রিজের ড্রিংকস থেকে (<b>from</b>), যেগুলো ৫০ টাকার কম (<b>where</b>)।” SQL ঠিক এভাবেই কথা বলে।</p>`,
        en: `<p>Asking a shopkeeper: “Give me (<b>select</b>) the name and price, of the drinks in your fridge (<b>from</b>), that cost under 50 taka (<b>where</b>).” SQL talks exactly like that.</p>`
      },
      exam: [
        'Typical SQL query: <b>select</b> A1,…,An <b>from</b> r1,…,rm <b>where</b> P. Ai = attribute, ri = relation, P = predicate; the result is a relation.',
        'select ↔ projection (π); from ↔ Cartesian product (×); where ↔ selection predicate (σ).'
      ]
    },
    {
      id: 'select-clause', stars: 2, visual: 'raProject',
      title: { bn: 'select clause: distinct, *, arithmetic, as', en: 'The select Clause: distinct, *, arithmetic, as' },
      body: {
        bn: `<p>SQL relation ও query result-এ <mark>duplicate থাকতে পারে</mark> (relational algebra-র মতো নয়!)।</p>
<pre class="code"><code>select distinct dept_name from instructor;   -- duplicate বাদ
select all dept_name from instructor;        -- duplicate রাখে (default)
select * from instructor;                    -- * = সব attribute
select '437';                                -- from ছাড়া literal
select '437' as FOO;                         -- column-এর নাম FOO
select ID, name, salary/12 as monthly_salary from instructor;</code></pre>
<p>select-এ <code>+ − * /</code> দিয়ে arithmetic চলে; <code>as</code> দিয়ে column বা relation-এর <b>rename</b>। <code>as</code> লেখা optional: <code>instructor as T ≡ instructor T</code>।</p>
<p class="tip">🎮 নিচের runner-এ query বেছে result দেখো।</p>`,
        en: `<p>SQL allows <mark>duplicates in relations and query results</mark> (unlike relational algebra!).</p>
<pre class="code"><code>select distinct dept_name from instructor;   -- remove duplicates
select all dept_name from instructor;        -- keep duplicates (default)
select * from instructor;                    -- * = all attributes
select '437';                                -- literal without from
select '437' as FOO;                         -- name the column FOO
select ID, name, salary/12 as monthly_salary from instructor;</code></pre>
<p>Arithmetic <code>+ − * /</code> works in select; <code>as</code> <b>renames</b> columns or relations, and is optional: <code>instructor as T ≡ instructor T</code>.</p>
<p class="tip">🎮 Pick queries in the runner below to see their results.</p>`
      },
      example: {
        bn: `<p>বেতন মাসিক দেখাতে <code>salary/12 as monthly_salary</code>: database-এ বার্ষিক রাখা, কিন্তু HR app মাসিক দেখায়। আর Daraz-এ “কোন কোন brand আছে” দেখাতে <code>distinct brand</code>।</p>`,
        en: `<p><code>salary/12 as monthly_salary</code>: the database stores yearly pay but the HR app shows monthly. Listing which brands exist on Daraz uses <code>distinct brand</code>.</p>`
      },
      exam: [
        'SQL allows duplicates; <b>distinct</b> after select eliminates them; <b>all</b> keeps them (default). <b>*</b> denotes all attributes.',
        'select can contain arithmetic expressions (+, −, *, /); <b>as</b> renames: select ID, name, salary/12 as monthly_salary from instructor.'
      ]
    },
    {
      id: 'where', stars: 3, visual: 'raSelect',
      title: { bn: 'where clause: and, or, not, between', en: 'The where Clause: and, or, not, between' },
      body: {
        bn: `<p><code>where</code> clause ফলাফলের জন্য শর্ত দেয়, যা relational algebra-র <b>selection predicate</b>।</p>
<pre class="code"><code>select name from instructor
where dept_name = 'Comp. Sci.' and salary > 80000;

select name from instructor
where salary between 90000 and 100000;   -- 90000 ও 100000 সহ</code></pre>
<ul><li><b>AND</b>: <mark>সব শর্ত সত্য হলে</mark> record দেখায়</li>
<li><b>OR</b>: <mark>যেকোনো একটা সত্য হলে</mark></li>
<li><b>NOT</b>: শর্ত সত্য <b>না</b> হলে</li></ul>
<pre class="code"><code>SELECT * FROM Customers WHERE Country='Germany' AND City='Berlin';
SELECT * FROM Customers WHERE City='Berlin' OR City='München';
SELECT * FROM Customers WHERE NOT Country='Germany';
SELECT * FROM Customers
WHERE Country='Germany' AND (City='Berlin' OR City='München');
SELECT * FROM Customers WHERE NOT Country='Germany' AND NOT Country='USA';</code></pre>
<p class="warn">⚠️ AND-OR মেশালে <b>bracket</b> দাও, না হলে ফল উল্টাপাল্টা হবে।</p>`,
        en: `<p>The <code>where</code> clause specifies conditions the result must satisfy: the relational-algebra <b>selection predicate</b>.</p>
<pre class="code"><code>select name from instructor
where dept_name = 'Comp. Sci.' and salary > 80000;

select name from instructor
where salary between 90000 and 100000;   -- inclusive</code></pre>
<ul><li><b>AND</b> shows a record if <mark>all conditions are true</mark></li>
<li><b>OR</b> shows a record if <mark>any condition is true</mark></li>
<li><b>NOT</b> shows a record if the condition is <b>not</b> true</li></ul>
<pre class="code"><code>SELECT * FROM Customers WHERE Country='Germany' AND City='Berlin';
SELECT * FROM Customers WHERE City='Berlin' OR City='München';
SELECT * FROM Customers WHERE NOT Country='Germany';
SELECT * FROM Customers
WHERE Country='Germany' AND (City='Berlin' OR City='München');
SELECT * FROM Customers WHERE NOT Country='Germany' AND NOT Country='USA';</code></pre>
<p class="warn">⚠️ Use <b>brackets</b> when mixing AND and OR, or the result changes.</p>`
      },
      example: {
        bn: `<p>Bikroy.com-এ খুঁজছ: “Dhaka-য় AND দাম ৫০,০০০ থেকে ৮০,০০০-এর between, (Samsung OR Xiaomi), NOT used”: পুরোটাই একটা where clause!</p>`,
        en: `<p>Searching Bikroy.com for phones “in Dhaka AND price between 50,000 and 80,000 AND (Samsung OR Xiaomi) AND NOT used” is one big where clause!</p>`
      },
      exam: [
        'The <b>where</b> clause specifies conditions the result must satisfy; it corresponds to the selection predicate. Conditions combine with <b>and</b>, <b>or</b>, <b>not</b>.',
        '<b>between</b>: where salary between 90000 and 100000 (inclusive).',
        'AND displays a record if all conditions are TRUE; OR if any is TRUE; NOT if the condition is NOT TRUE.'
      ]
    },
    {
      id: 'from-join', stars: 3, visual: 'raJoin',
      title: { bn: 'from clause, Join ও Alias (T, S)', en: 'The from Clause, Joins and Aliases (T, S)' },
      body: {
        bn: `<p><code>from</code> clause query-তে ব্যবহৃত relation গুলোর তালিকা, যা <b>Cartesian product</b>। <code>select * from instructor, teaches</code> সব জোড়া বানায়; common attribute হয় <code>instructor.ID</code>, <code>teaches.ID</code>।</p>
<p>একা Cartesian product খুব কাজের না, <mark>where শর্তের সাথে মিলে join হয়</mark>:</p>
<pre class="code"><code>-- যে instructor কোনো course পড়িয়েছেন, তাদের নাম ও course_id
select name, course_id
from instructor, teaches
where instructor.ID = teaches.ID;

-- শুধু Art department-এর
select name, course_id
from instructor, teaches
where instructor.ID = teaches.ID and instructor.dept_name = 'Art';</code></pre>
<p><b>Rename (alias)</b>: একই table-কে দুইবার ব্যবহার করতে:</p>
<pre class="code"><code>-- Comp. Sci.-এর অন্তত একজনের চেয়ে বেশি বেতন যাদের
select distinct T.name
from instructor as T, instructor as S
where T.salary > S.salary and S.dept_name = 'Comp. Sci.';</code></pre>
<p>Tuple comparison-ও চলে: <code>where (instructor.ID, dept_name) = (teaches.ID, 'Biology')</code>।</p>`,
        en: `<p>The <code>from</code> clause lists the relations involved: a <b>Cartesian product</b>. <code>select * from instructor, teaches</code> generates every pair; common attributes become <code>instructor.ID</code>, <code>teaches.ID</code>.</p>
<p>The product alone isn’t useful, but <mark>combined with a where condition it becomes a join</mark>:</p>
<pre class="code"><code>-- names of instructors who taught a course, with the course_id
select name, course_id
from instructor, teaches
where instructor.ID = teaches.ID;

-- only those in the Art department
select name, course_id
from instructor, teaches
where instructor.ID = teaches.ID and instructor.dept_name = 'Art';</code></pre>
<p><b>Rename (alias)</b> lets you use one table twice:</p>
<pre class="code"><code>-- instructors earning more than at least one Comp. Sci. instructor
select distinct T.name
from instructor as T, instructor as S
where T.salary > S.salary and S.dept_name = 'Comp. Sci.';</code></pre>
<p>Tuple comparison also works: <code>where (instructor.ID, dept_name) = (teaches.ID, 'Biology')</code>.</p>`
      },
      example: {
        bn: `<p>T আর S যেন একই ক্লাসের দুই কপি roll call খাতা। এক খাতা থেকে একজন (T), অন্য খাতা থেকে একজন (S) নিয়ে তুলনা করছ: “T কি S-এর চেয়ে লম্বা?”</p>`,
        en: `<p>T and S are like two copies of the same roll-call register: pick someone from each copy and compare, “is T taller than S?”</p>`
      },
      exam: [
        'The <b>from</b> clause lists the relations involved and corresponds to the Cartesian product; useful when combined with a where condition (join).',
        'Example: select name, course_id from instructor, teaches where instructor.ID = teaches.ID.',
        'The <b>as</b> clause renames relations: from instructor as T, instructor as S where T.salary &gt; S.salary and S.dept_name = \'Comp. Sci.\'; “as” is optional.'
      ]
    },
    {
      id: 'like', stars: 3, visual: 'likeDemo',
      title: { bn: 'String Operation: like, %, _', en: 'String Operations: like, %, _' },
      body: {
        bn: `<p>String pattern match করতে <code>like</code> operator, দুইটা বিশেষ অক্ষর দিয়ে:</p>
<ul><li><b>% (percent)</b>: <mark>যেকোনো substring</mark> (০ বা তার বেশি অক্ষর)</li>
<li><b>_ (underscore)</b>: <mark>ঠিক একটা অক্ষর</mark></li></ul>
<pre class="code"><code>select name from instructor where name like '%dar%';
like '100 \\%' escape '\\'     -- আসল % খুঁজতে escape</code></pre>
<ul><li><code>'Intro%'</code>: “Intro” দিয়ে শুরু</li><li><code>'%Comp%'</code>: “Comp” কোথাও আছে</li><li><code>'___'</code>: ঠিক ৩ অক্ষর</li><li><code>'___%'</code>: অন্তত ৩ অক্ষর</li></ul>
<p>অন্য string operation: concatenation <code>||</code>, upper/lower case, length, substring।</p>`,
        en: `<p>The <code>like</code> operator matches patterns using two special characters:</p>
<ul><li><b>% (percent)</b>: <mark>matches any substring</mark> (zero or more characters)</li>
<li><b>_ (underscore)</b>: <mark>matches exactly one character</mark></li></ul>
<pre class="code"><code>select name from instructor where name like '%dar%';
like '100 \\%' escape '\\'     -- escape to match a real %</code></pre>
<ul><li><code>'Intro%'</code>: begins with “Intro”</li><li><code>'%Comp%'</code>: contains “Comp”</li><li><code>'___'</code>: exactly three characters</li><li><code>'___%'</code>: at least three characters</li></ul>
<p>Other string operations: concatenation <code>||</code>, upper/lower case conversion, length, substrings.</p>`
      },
      example: {
        bn: `<p>Contact list-এ “dar” লিখে search করলে Sardar, Haidar, Talukdar সবাই আসে: এটা <code>like '%dar%'</code>। ১১ সংখ্যার নম্বর যাচাই = <code>'___________'</code> (১১টা _)।</p>`,
        en: `<p>Typing “dar” in your contacts brings up Sardar, Haidar and Talukdar: that’s <code>like '%dar%'</code>. Checking an 11-digit number = <code>'___________'</code> (11 underscores).</p>`
      },
      exam: [
        '<b>like</b> uses patterns with two special characters: <b>%</b> matches any substring; <b>_</b> matches any single character.',
        '\'Intro%\' begins with “Intro”; \'%Comp%\' contains “Comp”; \'___\' exactly three characters; \'___%\' at least three characters. Use escape to match % itself.'
      ]
    },
    {
      id: 'order-null-set', stars: 2, visual: 'orderBy',
      title: { bn: 'order by, Set Operation ও Null', en: 'order by, Set Operations and Null' },
      body: {
        bn: `<p><b>order by</b>: ফলাফল সাজায়; <mark>default ascending (asc)</mark>, উল্টো <code>desc</code>।</p>
<pre class="code"><code>select distinct name from instructor order by name;
... order by name desc
... order by dept_name, name</code></pre>
<p><b>Set operation</b>: <code>union</code>, <code>intersect</code>, <code>except</code>। <mark>এগুলো নিজে থেকে duplicate বাদ দেয়</mark>; রাখতে চাইলে <code>union all</code>, <code>intersect all</code>, <code>except all</code>।</p>
<pre class="code"><code>(select course_id from section where sem = 'Fall' and year = 2009)
union      -- or: intersect / except
(select course_id from section where sem = 'Spring' and year = 2010);</code></pre>
<p><b>Null</b>: <mark>অজানা মান বা মান নেই</mark>। Null-যুক্ত যেকোনো arithmetic-এর ফল null (<code>5 + null = null</code>)। Null খুঁজতে <code>is null</code>:</p>
<pre class="code"><code>select name from instructor where salary is null;</code></pre>
<div class="vslot" data-v="nullDemo"></div>`,
        en: `<p><b>order by</b> sorts the output; <mark>ascending is the default</mark>, use <code>desc</code> for descending.</p>
<pre class="code"><code>select distinct name from instructor order by name;
... order by name desc
... order by dept_name, name</code></pre>
<p><b>Set operations</b>: <code>union</code>, <code>intersect</code>, <code>except</code>. <mark>Each automatically eliminates duplicates</mark>; to keep them use <code>union all</code>, <code>intersect all</code>, <code>except all</code>.</p>
<pre class="code"><code>(select course_id from section where sem = 'Fall' and year = 2009)
union      -- or: intersect / except
(select course_id from section where sem = 'Spring' and year = 2010);</code></pre>
<p><b>Null</b> signifies <mark>an unknown value or that a value does not exist</mark>. Any arithmetic with null gives null (<code>5 + null = null</code>). Test with <code>is null</code>:</p>
<pre class="code"><code>select name from instructor where salary is null;</code></pre>
<div class="vslot" data-v="nullDemo"></div>`
      },
      example: {
        bn: `<p>Merit list = <code>order by cgpa desc</code>। ভর্তি form-এ “বিকল্প ফোন” ফাঁকা রাখলে সেখানে <b>null</b>: শূন্য না, “জানা নেই”।</p>`,
        en: `<p>A merit list is <code>order by cgpa desc</code>. Leaving “alternate phone” empty on a form stores <b>null</b>: not zero, but “unknown”.</p>`
      },
      exam: [
        '<b>order by</b> lists tuples in sorted order; <b>asc</b> is default, <b>desc</b> for descending; can sort on multiple attributes.',
        'Set operations <b>union</b>, <b>intersect</b>, <b>except</b> automatically eliminate duplicates; multiset versions union all, intersect all, except all retain them.',
        '<b>null</b> signifies an unknown or non-existent value; arithmetic involving null returns null; use <b>is null</b> to check.'
      ]
    },
    {
      id: 'aggregate', stars: 3, visual: 'groupBy',
      title: { bn: 'Aggregate Function, group by, having', en: 'Aggregate Functions, group by, having' },
      body: {
        bn: `<p>Aggregate function একটা column-এর অনেক মান নিয়ে <mark>একটা মান ফেরত দেয়</mark>: <b>avg, min, max, sum, count</b>।</p>
<pre class="code"><code>select avg(salary) from instructor where dept_name = 'Comp. Sci.';
select count(distinct ID) from teaches where semester = 'Spring' and year = 2010;
select count(*) from course;</code></pre>
<p><b>group by</b>: প্রতি দলের জন্য আলাদা aggregate:</p>
<pre class="code"><code>select dept_name, avg(salary) as avg_salary
from instructor
group by dept_name;</code></pre>
<p class="warn">⚠️ <mark>select-এ aggregate-এর বাইরের attribute অবশ্যই group by তালিকায় থাকতে হবে</mark>। এটা ভুল:<br><code>select dept_name, ID, avg(salary) from instructor group by dept_name;</code></p>
<p><b>having</b>: দল তৈরির <b>পরে</b> দলের উপর শর্ত:</p>
<pre class="code"><code>select dept_name, avg(salary)
from instructor
group by dept_name
having avg(salary) > 42000;</code></pre>
<p class="tip">⭐ <b>where vs having</b>: <mark>where group তৈরির আগে row ছাঁকে; having group তৈরির পরে group ছাঁকে</mark>।</p>`,
        en: `<p>Aggregate functions take the values of a column and <mark>return a single value</mark>: <b>avg, min, max, sum, count</b>.</p>
<pre class="code"><code>select avg(salary) from instructor where dept_name = 'Comp. Sci.';
select count(distinct ID) from teaches where semester = 'Spring' and year = 2010;
select count(*) from course;</code></pre>
<p><b>group by</b> computes an aggregate per group:</p>
<pre class="code"><code>select dept_name, avg(salary) as avg_salary
from instructor
group by dept_name;</code></pre>
<p class="warn">⚠️ <mark>Attributes in select outside aggregate functions must appear in the group by list.</mark> This is wrong:<br><code>select dept_name, ID, avg(salary) from instructor group by dept_name;</code></p>
<p><b>having</b> filters groups <b>after</b> they are formed:</p>
<pre class="code"><code>select dept_name, avg(salary)
from instructor
group by dept_name
having avg(salary) > 42000;</code></pre>
<p class="tip">⭐ <b>where vs having</b>: <mark>where predicates apply before groups are formed; having predicates apply after</mark>.</p>`
      },
      example: {
        bn: `<p>Cricket stats: প্রতিটা দেশের (<b>group by country</b>) খেলোয়াড়দের গড় রান (<b>avg</b>), তারপর শুধু যেসব দেশের গড় ৩০-এর বেশি (<b>having</b>)। কিন্তু শুধু ২০২৪-এর ম্যাচ ধরলে সেটা আগে <b>where</b>-এ।</p>`,
        en: `<p>Cricket stats: average runs (<b>avg</b>) per country (<b>group by country</b>), then only countries averaging over 30 (<b>having</b>). Counting only 2024 matches is filtered earlier with <b>where</b>.</p>`
      },
      exam: [
        'Aggregate functions: <b>avg</b>, <b>min</b>, <b>max</b>, <b>sum</b>, <b>count</b>; they operate on a column’s multiset of values and return a value.',
        '<b>group by</b>: select dept_name, avg(salary) as avg_salary from instructor group by dept_name. Attributes in select outside aggregates must appear in the group by list.',
        '<b>having</b>: predicates applied after the formation of groups; <b>where</b> predicates are applied before forming groups.'
      ]
    },
    {
      id: 'subquery', stars: 3, visual: 'someAll',
      title: { bn: 'Nested Subquery: in, not in, some, all', en: 'Nested Subqueries: in, not in, some, all' },
      body: {
        bn: `<p><b>Subquery</b> হলো <mark>অন্য query-র ভিতরে বসানো select-from-where</mark>। where-এ subquery দিয়ে test করা হয়: <b>set membership</b>, <b>set comparison</b>, <b>set cardinality</b>।</p>
<p><b>Set membership (in / not in):</b></p>
<pre class="code"><code>select distinct course_id
from section
where semester = 'Fall' and year = 2009 and
      course_id in (select course_id
                    from section
                    where semester = 'Spring' and year = 2010);</code></pre>
<p>Fall 2009-এ কিন্তু Spring 2010-এ না → <code>not in</code>।</p>
<p><b>some</b>: <mark>অন্তত একটার চেয়ে</mark>। Biology-র অন্তত একজনের চেয়ে বেশি বেতন:</p>
<pre class="code"><code>select name from instructor
where salary > some (select salary from instructor
                     where dept_name = 'Biology');</code></pre>
<p><b>all</b>: <mark>সবগুলোর চেয়ে</mark>। Biology-র সবার চেয়ে বেশি: <code>&gt; all (...)</code></p>
<p>সর্বোচ্চ average salary-র department:</p>
<pre class="code"><code>select dept_name from instructor
group by dept_name
having avg(salary) >= all (select avg(salary)
                           from instructor
                           group by dept_name);</code></pre>
<p class="tip">⭐ মুখস্থ: <code>= some ≡ in</code>, কিন্তু <code>≠ some ≢ not in</code>। আর <code>≠ all ≡ not in</code>, কিন্তু <code>= all ≢ in</code>।</p>`,
        en: `<p>A <b>subquery</b> is <mark>a select-from-where expression nested within another query</mark>. Subqueries in where test <b>set membership</b>, <b>set comparison</b> and <b>set cardinality</b>.</p>
<p><b>Set membership (in / not in):</b></p>
<pre class="code"><code>select distinct course_id
from section
where semester = 'Fall' and year = 2009 and
      course_id in (select course_id
                    from section
                    where semester = 'Spring' and year = 2010);</code></pre>
<p>Fall 2009 but not Spring 2010 → <code>not in</code>.</p>
<p><b>some</b>: <mark>than at least one</mark>. Salary greater than some Biology instructor:</p>
<pre class="code"><code>select name from instructor
where salary > some (select salary from instructor
                     where dept_name = 'Biology');</code></pre>
<p><b>all</b>: <mark>than every one</mark>. Greater than all Biology instructors: <code>&gt; all (...)</code></p>
<p>Departments with the highest average salary:</p>
<pre class="code"><code>select dept_name from instructor
group by dept_name
having avg(salary) >= all (select avg(salary)
                           from instructor
                           group by dept_name);</code></pre>
<p class="tip">⭐ Memorise: <code>= some ≡ in</code>, but <code>≠ some ≢ not in</code>; <code>≠ all ≡ not in</code>, but <code>= all ≢ in</code>.</p>`
      },
      example: {
        bn: `<p>“আমার ক্লাসে <b>কারো না কারো</b> চেয়ে আমার নম্বর বেশি” = <code>&gt; some</code> (সহজ)। “ক্লাসের <b>সবার</b> চেয়ে বেশি” = <code>&gt; all</code> (মানে তুমি first!)।</p>`,
        en: `<p>“I scored higher than <b>someone</b> in class” = <code>&gt; some</code> (easy). “Higher than <b>everyone</b>” = <code>&gt; all</code> (you topped the class!).</p>`
      },
      exam: [
        'A <b>subquery</b> is a select-from-where expression nested within another query; used to test set membership, set comparisons and set cardinality.',
        '<b>in / not in</b>: set membership. <b>F &lt;comp&gt; some r</b> ⇔ ∃ t ∈ r such that F &lt;comp&gt; t. <b>F &lt;comp&gt; all r</b> ⇔ ∀ t ∈ r (F &lt;comp&gt; t).',
        '(= some) ≡ in, but (≠ some) ≢ not in; (≠ all) ≡ not in, but (= all) ≢ in.'
      ]
    },
    {
      id: 'sql-play', stars: 1, visual: 'sqlPlay',
      title: { bn: 'SQL Practice Runner', en: 'SQL Practice Runner' },
      body: {
        bn: `<p>এই অধ্যায়ের সব ধরনের query এক জায়গায়। প্রতিটা চাপো, query পড়ো, তারপর <mark>ফলাফল দেখার আগে নিজে অনুমান করো</mark> কয়টা row আসবে। এভাবে practice করলে exam-এ SQL লেখা সহজ হবে।</p>
<p>ব্যবহৃত table:</p>
<div class="vslot" data-v="instrTable"></div>`,
        en: `<p>All the query types of this chapter in one place. Tap each, read the query, and <mark>predict how many rows you’ll get before looking</mark>. Practising like this makes writing SQL in the exam much easier.</p>
<p>Tables used:</p>
<div class="vslot" data-v="instrTable"></div>`
      },
      example: {
        bn: `<p>Exam-এ সাধারণত instructor/teaches/section table দিয়েই প্রশ্ন আসে। এই table গুলো চোখ বন্ধ করে মনে রাখো!</p>`,
        en: `<p>Exam questions usually use these instructor/teaches/section tables. Know them by heart!</p>`
      },
      exam: [
        'Practice: names of instructors in Comp. Sci. with salary &gt; 80000; average salary per department; departments with avg salary &gt; 42000; courses in Fall 2009 and Spring 2010.'
      ]
    }
  ],
  written: [
    { q: 'Write SQL to create the instructor table with ID as primary key and dept_name as a foreign key.', a: ['create table instructor (ID char(5), name varchar(20) not null, dept_name varchar(20), salary int, primary key (ID), foreign key (dept_name) references department);'] },
    { q: 'Find the names of all instructors in the Comp. Sci. department with salary > 80000.', a: ["select name from instructor where dept_name = 'Comp. Sci.' and salary > 80000;"] },
    { q: 'Find the average salary of instructors in each department, showing only departments whose average salary is greater than 42000.', a: ['select dept_name, avg(salary) from instructor group by dept_name having avg(salary) > 42000;', 'Explain where vs having.'] },
    { q: 'Find the names of all instructors whose name includes the substring “dar”.', a: ["select name from instructor where name like '%dar%';", '% = any substring, _ = one character.'] },
    { q: 'Find courses that ran in Fall 2009 and in Spring 2010 using (a) intersect (b) a nested subquery.', a: ["(select course_id from section where sem='Fall' and year=2009) intersect (select course_id from section where sem='Spring' and year=2010);", "select distinct course_id from section where semester='Fall' and year=2009 and course_id in (select course_id from section where semester='Spring' and year=2010);"] },
    { q: 'Increase salaries over 100000 by 3% and all others by 5%. Why does the order matter?', a: ['Two update statements (>100000 first, then <=100000) or one update with case.', 'If reversed, an instructor near 100000 could receive both raises.'] }
  ],
  quiz: [
    { q: { bn: 'Variable length string-এর জন্য কোন type?', en: 'Which type is a variable-length string?' }, o: ['char(n)', 'varchar(n)', 'int', 'date'], a: 1, why: { bn: 'varchar(n) = variable length।', en: 'varchar(n) = variable length.' } },
    { q: { bn: 'GRANT ও REVOKE কোন ভাগে?', en: 'GRANT and REVOKE belong to…' }, o: ['DDL', 'DML', 'DCL', 'TCL'], a: 2, why: { bn: 'অনুমতি = Data Control Language।', en: 'Permissions = Data Control Language.' } },
    { q: { bn: 'Primary key declare করলে attribute নিজে থেকে…', en: 'Declaring a primary key automatically makes the attribute…' }, o: ['not null', 'foreign key', 'varchar', 'derived'], a: 0, why: { bn: 'Primary key automatically ensures not null।', en: 'A primary key automatically ensures not null.' } },
    { q: { bn: 'Table রেখে সব row মুছতে…', en: 'To remove all rows but keep the table…' }, o: ['drop table student', 'delete from student', 'alter table student', 'remove student'], a: 1, why: { bn: 'delete row মোছে, drop table মোছে।', en: 'delete removes rows; drop removes the table.' } },
    { q: { bn: 'SQL-এর from clause relational algebra-র কোনটার মতো?', en: 'SQL’s from clause corresponds to…' }, o: ['σ', 'π', '×', 'ρ'], a: 2, why: { bn: 'from = Cartesian product।', en: 'from = Cartesian product.' } },
    { q: { bn: 'SQL-এর select clause relational algebra-র…', en: 'SQL’s select clause corresponds to…' }, o: [{ bn: 'Selection σ', en: 'Selection σ' }, { bn: 'Projection π', en: 'Projection π' }, { bn: 'Union ∪', en: 'Union ∪' }, { bn: 'Rename ρ', en: 'Rename ρ' }], a: 1, why: { bn: 'select clause column বাছে = projection।', en: 'The select clause picks columns = projection.' } },
    { q: { bn: "'___%' কোন string-এর সাথে মেলে?", en: "'___%' matches strings that are…" }, o: [{ bn: 'ঠিক ৩ অক্ষর', en: 'Exactly 3 characters' }, { bn: 'অন্তত ৩ অক্ষর', en: 'At least 3 characters' }, { bn: 'সর্বোচ্চ ৩ অক্ষর', en: 'At most 3 characters' }, { bn: '% দিয়ে শেষ', en: 'Ending with %' }], a: 1, why: { bn: '৩টা _ + % = অন্তত ৩।', en: 'Three _ plus % = at least three.' } },
    { q: { bn: '5 + null = ?', en: '5 + null = ?' }, o: ['5', '0', 'null', 'error'], a: 2, why: { bn: 'Null-যুক্ত arithmetic-এর ফল null।', en: 'Arithmetic with null returns null.' } },
    { q: { bn: 'Group তৈরির পরে শর্ত দিতে…', en: 'To apply a condition after groups are formed…' }, o: ['where', 'having', 'order by', 'distinct'], a: 1, why: { bn: 'having group-এর পরে, where আগে।', en: 'having applies after grouping; where before.' } },
    { q: { bn: '“select dept_name, ID, avg(salary) from instructor group by dept_name” কেন ভুল?', en: 'Why is “select dept_name, ID, avg(salary) … group by dept_name” wrong?' }, o: [{ bn: 'ID group by-তে নেই', en: 'ID is not in the group by list' }, { bn: 'avg ভুল function', en: 'avg is not a function' }, { bn: 'from নেই', en: 'Missing from' }, { bn: 'কোনো ভুল নেই', en: 'Nothing is wrong' }], a: 0, why: { bn: 'Aggregate-এর বাইরের attribute group by-তে থাকতে হবে।', en: 'Non-aggregated attributes must appear in group by.' } },
    { q: { bn: '“= some” কোনটার সমান?', en: '“= some” is equivalent to…' }, o: ['not in', 'in', '= all', 'exists'], a: 1, why: { bn: '(= some) ≡ in।', en: '(= some) ≡ in.' } },
    { q: { bn: 'union, intersect, except নিজে থেকে…', en: 'union, intersect and except automatically…' }, o: [{ bn: 'Duplicate বাদ দেয়', en: 'Eliminate duplicates' }, { bn: 'Duplicate রাখে', en: 'Keep duplicates' }, { bn: 'Sort উল্টায়', en: 'Reverse sort order' }, { bn: 'Null বাদ দেয়', en: 'Remove nulls' }], a: 0, why: { bn: 'রাখতে চাইলে union all ইত্যাদি।', en: 'Use union all etc. to keep them.' } }
  ]
});

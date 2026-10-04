window.CQ = window.CQ || {};

CQ.ch4 = [
  {
    m: 2,
    q: { en: 'What is relational algebra? List its basic operators.', bn: 'Relational algebra কী? এর মৌলিক operator গুলো লেখো।' },
    ans: `<p><b>Relational algebra</b> is a procedural query language consisting of a set of operations that take one or two relations as input and produce a new relation as their result.</p>
<p><b>Six basic operators:</b> select (σ), project (π), union (∪), set difference (−), Cartesian product (×), rename (ρ).</p>`,
    rub: [['Definition (procedural; relations in, relation out)', 1], ['Six operators with symbols', 1]]
  },
  {
    m: 2,
    q: { en: 'Differentiate between the select (σ) and project (π) operations.', bn: 'Select (σ) ও project (π) operation-এর পার্থক্য লেখো।' },
    ans: `<div class="tscroll"><table><thead><tr><th>Select (σ)</th><th>Project (π)</th></tr></thead><tbody>
<tr><td>Selects <b>rows (tuples)</b> that satisfy a predicate.</td><td>Selects <b>columns (attributes)</b>; other columns are eliminated.</td></tr>
<tr><td>Notation: σ<sub>p</sub>(r)</td><td>Notation: π<sub>A1,…,Ak</sub>(r)</td></tr>
<tr><td>Number of columns unchanged.</td><td>Duplicate rows are removed (relations are sets).</td></tr>
<tr><td>σ<sub>dept_name="Physics"</sub>(instructor)</td><td>π<sub>ID, name, salary</sub>(instructor)</td></tr></tbody></table></div>`,
    rub: [['σ: picks rows by predicate + notation/example', 1], ['π: picks columns, removes duplicates + notation/example', 1]]
  },
  {
    m: 3,
    q: { en: 'Using instructor(ID, name, dept_name, salary), write relational algebra to find: (a) instructors in Physics with salary > 90000 (b) names of all instructors in Physics (c) ID, name and salary of all instructors.', bn: 'instructor(ID, name, dept_name, salary) ব্যবহার করে relational algebra লেখো: (a) Physics-এ salary > 90000 এমন instructor (b) Physics-এর সব instructor-এর নাম (c) সবার ID, name, salary।' },
    ans: `<p>(a) σ<sub>dept_name = "Physics" ∧ salary &gt; 90000</sub> (instructor)</p>
<p>(b) π<sub>name</sub> ( σ<sub>dept_name = "Physics"</sub> (instructor) )<br><small>The inner select finds Physics rows; the outer project keeps only name (composition).</small></p>
<p>(c) π<sub>ID, name, salary</sub> (instructor)</p>`,
    rub: [['(a) correct σ with ∧', 1], ['(b) correct composition π(σ)', 1], ['(c) correct π', 1]]
  },
  {
    m: 3,
    q: { en: 'Explain union, set intersection and set difference with examples.', bn: 'উদাহরণসহ union, set intersection ও set difference ব্যাখ্যা করো।' },
    ans: `<p>Let F = π<sub>course_id</sub>(σ<sub>semester="Fall" ∧ year=2017</sub>(section)) and S = π<sub>course_id</sub>(σ<sub>semester="Spring" ∧ year=2018</sub>(section)). Both relations must be union-compatible (same number of attributes, compatible domains).</p>
<ol><li><b>Union (r ∪ s):</b> tuples in either relation. F ∪ S = courses taught in Fall 2017 <i>or</i> Spring 2018.</li>
<li><b>Set intersection (r ∩ s):</b> tuples in both relations. F ∩ S = courses taught in <i>both</i> Fall 2017 and Spring 2018.</li>
<li><b>Set difference (r − s):</b> tuples in r but not in s. F − S = courses taught in Fall 2017 but <i>not</i> in Spring 2018.</li></ol>
<div class="vslot" data-v="setVenn"></div>`,
    rub: [['Union + example', 1], ['Intersection + example', 1], ['Set difference + example', 1]]
  },
  {
    m: 5,
    q: { en: 'Explain the Cartesian product and join operations with example tables.', bn: 'উদাহরণ table দিয়ে Cartesian product ও join operation ব্যাখ্যা করো।' },
    ans: `<p><b>Cartesian product (×):</b> combines each row of one relation with each row of the other (cross product). If r has m tuples and s has n tuples, r × s has m × n tuples. Common attribute names are prefixed with the relation name (instructor.ID, teaches.ID).</p>
<div class="vslot" data-v="raProduct"></div>
<p><b>Join:</b> most tuples of instructor × teaches pair instructors with courses they did not teach. To keep only meaningful tuples, a selection is applied on the product:</p>
<p style="text-align:center"><b>σ<sub>instructor.ID = teaches.ID</sub> (instructor × teaches)</b></p>
<p>The result contains only the yellow rows above: each instructor with the courses they actually taught. Thus <b>join = Cartesian product + selection</b>.</p>`,
    rub: [['Cartesian product definition (m × n, prefixing)', 1], ['Product example table', 1.5], ['Join definition', 1], ['Join expression σ(instructor × teaches)', 1], ['Join result shown', 0.5]]
  },
  {
    m: 5,
    q: { en: 'Given instructor(ID, name, dept_name, salary), teaches(ID, course_id, sec_id, semester, year) and section(course_id, sec_id, semester, year, …), write relational algebra for: (a) names of instructors who taught a course, with course_id (b) courses taught in Fall 2017 or Spring 2018 (c) courses taught in both (d) courses taught in Fall 2017 but not Spring 2018 (e) rename instructor as teacher.', bn: 'প্রদত্ত relation থেকে (a)–(e) এর relational algebra লেখো।' },
    ans: `<p>(a) π<sub>name, course_id</sub> ( σ<sub>instructor.ID = teaches.ID</sub> (instructor × teaches) )</p>
<p>(b) π<sub>course_id</sub>(σ<sub>semester="Fall" ∧ year=2017</sub>(section)) <b>∪</b> π<sub>course_id</sub>(σ<sub>semester="Spring" ∧ year=2018</sub>(section))</p>
<p>(c) π<sub>course_id</sub>(σ<sub>semester="Fall" ∧ year=2017</sub>(section)) <b>∩</b> π<sub>course_id</sub>(σ<sub>semester="Spring" ∧ year=2018</sub>(section))</p>
<p>(d) π<sub>course_id</sub>(σ<sub>semester="Fall" ∧ year=2017</sub>(section)) <b>−</b> π<sub>course_id</sub>(σ<sub>semester="Spring" ∧ year=2018</sub>(section))</p>
<p>(e) ρ<sub>teacher</sub>(instructor) &nbsp;or&nbsp; ρ(teacher, instructor)</p>`,
    rub: [['(a) join + project', 1], ['(b) union', 1], ['(c) intersection', 1], ['(d) set difference', 1], ['(e) rename', 1]]
  }
];

CQ.ch5 = [
  {
    m: 2,
    q: { en: 'Differentiate between delete and drop in SQL.', bn: 'SQL-এ delete ও drop-এর পার্থক্য লেখো।' },
    ans: `<div class="tscroll"><table><thead><tr><th>delete</th><th>drop</th></tr></thead><tbody>
<tr><td>DML command; removes tuples (rows).</td><td>DDL command; removes the whole relation.</td></tr>
<tr><td>The table structure remains (empty if no where clause).</td><td>Structure and data are both removed.</td></tr>
<tr><td>Can use where: <code>delete from instructor where dept_name = 'Finance';</code></td><td>No where: <code>drop table instructor;</code></td></tr></tbody></table></div>`,
    rub: [['delete: removes rows, table remains (+ example)', 1], ['drop: removes the table itself (+ example)', 1]]
  },
  {
    m: 2,
    q: { en: 'Differentiate between char(n) and varchar(n).', bn: 'char(n) ও varchar(n)-এর পার্থক্য লেখো।' },
    ans: `<div class="tscroll"><table><thead><tr><th>char(n)</th><th>varchar(n)</th></tr></thead><tbody>
<tr><td>Fixed-length character string of length n.</td><td>Variable-length character string with maximum length n.</td></tr>
<tr><td>Shorter values are padded with spaces; always uses n characters.</td><td>Uses only as much space as the value needs.</td></tr>
<tr><td>n from 0 to 255.</td><td>n from 0 to 65535.</td></tr>
<tr><td>Good for fixed codes, e.g. ID char(5).</td><td>Good for names, e.g. name varchar(20).</td></tr></tbody></table></div>`,
    rub: [['char: fixed length (padding)', 1], ['varchar: variable length up to n', 1]]
  },
  {
    m: 3,
    q: { en: 'Classify SQL commands with examples.', bn: 'উদাহরণসহ SQL command-এর শ্রেণিবিভাগ করো।' },
    ans: `<ol><li><b>DDL (Data Definition Language):</b> defines or changes structure: CREATE, ALTER, DROP, TRUNCATE.</li>
<li><b>DQL (Data Query Language):</b> retrieves data: SELECT.</li>
<li><b>DML (Data Manipulation Language):</b> changes data: INSERT, UPDATE, DELETE.</li>
<li><b>DCL (Data Control Language):</b> controls access: GRANT, REVOKE.</li>
<li><b>TCL (Transaction Control Language):</b> manages transactions: COMMIT, ROLLBACK, SAVEPOINT.</li></ol>
<pre class="code"><code>create table course (course_id varchar(8), title varchar(50));   -- DDL
insert into course values ('CS-437', 'Database Systems');          -- DML
select title from course;                                          -- DQL</code></pre>`,
    rub: [['Five categories named', 1], ['Correct commands under each', 1.5], ['Example statement(s)', 0.5]]
  },
  {
    m: 3,
    q: { en: 'Differentiate between the where and having clauses with an example.', bn: 'উদাহরণসহ where ও having clause-এর পার্থক্য লেখো।' },
    ans: `<ul><li><b>where</b> filters individual <b>rows</b> before groups are formed; it cannot use aggregate functions.</li>
<li><b>having</b> filters <b>groups</b> after group by is applied; it usually uses aggregate functions.</li></ul>
<pre class="code"><code>select dept_name, avg(salary)
from instructor
where salary > 30000          -- applied to rows, before grouping
group by dept_name
having avg(salary) > 42000;   -- applied to groups, after grouping</code></pre>
<p>This finds departments whose average salary (counting only instructors earning above 30000) exceeds 42000.</p>`,
    rub: [['where: before grouping, on rows', 1], ['having: after grouping, on groups/aggregates', 1], ['Correct SQL example', 1]]
  },
  {
    m: 3,
    q: { en: 'Increase salaries of instructors earning over 100000 by 3% and all others by 5%. Why is the order of the statements important? Rewrite using case.', bn: '100000-এর বেশি salary 3% আর বাকিদের 5% বাড়াও। Statement-এর ক্রম কেন গুরুত্বপূর্ণ? case দিয়ে লেখো।' },
    ans: `<pre class="code"><code>update instructor set salary = salary * 1.03 where salary > 100000;
update instructor set salary = salary * 1.05 where salary <= 100000;</code></pre>
<p><b>Order matters:</b> if the 5% update ran first, an instructor earning e.g. 98000 would become 102900 (> 100000) and then also receive the 3% raise, getting two raises.</p>
<pre class="code"><code>update instructor
set salary = case
               when salary <= 100000 then salary * 1.05
               else salary * 1.03
             end;</code></pre>`,
    rub: [['Two correct update statements', 1], ['Explanation of why order matters', 1], ['Correct case statement', 1]]
  },
  {
    m: 5,
    q: { en: 'Write SQL to create department(dept_name, building, budget) and instructor(ID, name, dept_name, salary) with suitable primary key, foreign key and not null constraints, then insert one tuple into each.', bn: 'উপযুক্ত primary key, foreign key ও not null সহ department ও instructor table তৈরির SQL লেখো, তারপর প্রতিটিতে একটি tuple insert করো।' },
    ans: `<pre class="code"><code>create table department (
    dept_name varchar(20),
    building  varchar(15),
    budget    float(12,2),
    primary key (dept_name));

create table instructor (
    ID        char(5),
    name      varchar(20) not null,
    dept_name varchar(20),
    salary    float(8,2),
    primary key (ID),
    foreign key (dept_name) references department);

insert into department values ('Comp. Sci.', 'Taylor', 100000);
insert into instructor values ('10101', 'Srinivasan', 'Comp. Sci.', 65000);</code></pre>
<p><b>Explanation:</b> primary key ensures uniqueness and automatically not null; <code>name … not null</code> forbids empty names; the foreign key ensures every instructor’s dept_name exists in department, so department must be inserted first.</p>`,
    rub: [['create table department with PK', 1], ['create table instructor with PK and not null', 1], ['foreign key ... references department', 1], ['Two correct insert statements (parent first)', 1], ['Explanation of constraints', 1]]
  },
  {
    m: 5,
    q: { en: 'Using instructor(ID, name, dept_name, salary), write SQL to find: (a) names of Comp. Sci. instructors with salary > 80000 (b) distinct department names (c) names containing “dar” (d) average salary of each department whose average is greater than 42000 (e) names of instructors earning more than all instructors in Biology.', bn: 'instructor table থেকে (a)–(e) এর SQL লেখো।' },
    ans: `<pre class="code"><code>-- (a)
select name from instructor
where dept_name = 'Comp. Sci.' and salary > 80000;

-- (b)
select distinct dept_name from instructor;

-- (c)
select name from instructor where name like '%dar%';

-- (d)
select dept_name, avg(salary) as avg_salary
from instructor
group by dept_name
having avg(salary) > 42000;

-- (e)
select name from instructor
where salary > all (select salary from instructor
                    where dept_name = 'Biology');</code></pre>`,
    rub: [['(a) where with and', 1], ['(b) distinct', 1], ['(c) like with %', 1], ['(d) group by + having', 1], ['(e) > all subquery', 1]]
  }
];

CQ.ch6 = [
  {
    m: 2,
    q: { en: 'Define entity and entity set with examples.', bn: 'উদাহরণসহ entity ও entity set-এর সংজ্ঞা দাও।' },
    ans: `<p><b>Entity:</b> an object that exists and is distinguishable from other objects, e.g. a specific person, company, event or plant (instructor Einstein, ID 22222).</p>
<p><b>Entity set:</b> a set of entities of the same type that share the same properties, e.g. the set of all instructors: instructor = (ID, name, street, city, salary).</p>`,
    rub: [['Entity definition + example', 1], ['Entity set definition + example', 1]]
  },
  {
    m: 2,
    q: { en: 'What is a weak entity set? How is it shown in an ER diagram?', bn: 'Weak entity set কী? ER diagram-এ কীভাবে দেখানো হয়?' },
    ans: `<p>A <b>weak entity set</b> is one whose existence depends on another entity, its identifying entity. It has no primary key of its own; it is identified by the identifying entity’s primary key plus a <b>discriminator</b>. e.g. section, identified by course_id + sec_id + semester + year.</p>
<p><b>Notation:</b> double rectangle for the weak entity set, discriminator underlined with a dashed line, and a double diamond for the identifying relationship.</p>`,
    rub: [['Definition with identifying entity + discriminator', 1], ['Notation: double rectangle, dashed underline, double diamond', 1]]
  },
  {
    m: 3,
    q: { en: 'Explain mapping cardinalities with examples.', bn: 'উদাহরণসহ mapping cardinality ব্যাখ্যা করো।' },
    ans: `<p><b>Mapping cardinality</b> expresses the number of entities to which another entity can be associated via a relationship set. For a binary relationship it is one of:</p>
<ol><li><b>One to one:</b> an entity in A is associated with at most one in B and vice versa (citizen–NID card).</li>
<li><b>One to many:</b> an entity in A is associated with any number in B; an entity in B with at most one in A (department–students).</li>
<li><b>Many to one:</b> an entity in A is associated with at most one in B; an entity in B with any number in A (students–advisor).</li>
<li><b>Many to many:</b> any number on both sides (students–courses).</li></ol>
<p>In ER diagrams, a directed line (→) signifies “one” and an undirected line (—) signifies “many”.</p>`,
    rub: [['Definition', 0.5], ['1:1 and 1:N with examples', 1], ['N:1 and M:N with examples', 1], ['ER notation (arrow vs line)', 0.5]]
  },
  {
    m: 3,
    q: { en: 'Differentiate between total and partial participation. What does the l..h notation mean?', bn: 'Total ও partial participation-এর পার্থক্য লেখো। l..h notation কী বোঝায়?' },
    ans: `<p><b>Total participation</b> (double line): every entity in the entity set participates in at least one relationship in the relationship set, e.g. every student must have an advisor.</p>
<p><b>Partial participation</b> (single line): some entities may not participate in any relationship, e.g. not every instructor advises a student.</p>
<p><b>l..h notation:</b> a line may carry minimum (l) and maximum (h) cardinality. Minimum 1 indicates total participation; maximum 1 means at most one relationship; * means no limit. e.g. instructor 0..* — advisor — 1..1 student.</p>
<div class="vslot" data-v="participation"></div>`,
    rub: [['Total participation + notation + example', 1], ['Partial participation + example', 1], ['l..h meaning', 1]]
  },
  {
    m: 5,
    q: { en: 'Draw an ER diagram for a university with entity sets instructor, student, course and department. Show the relationships, mapping cardinalities and participation constraints.', bn: 'instructor, student, course ও department নিয়ে একটি university-র ER diagram আঁকো; relationship, cardinality ও participation দেখাও।' },
    ans: `<div class="vslot" data-v="uniER"></div>
<p><b>Entity sets (primary key underlined):</b> instructor(<u>ID</u>, name, salary), student(<u>ID</u>, name, tot_cred), course(<u>course_id</u>, title, credits), department(<u>dept_name</u>, building, budget).</p>
<p><b>Relationship sets:</b></p>
<ul><li><b>advisor</b> (instructor–student): one-to-many; an instructor advises many students, a student has one advisor (arrow to instructor). Student participation is total (double line).</li>
<li><b>takes</b> (student–course): many-to-many, with descriptive attribute grade.</li>
<li><b>inst_dept</b> (instructor–department): many-to-one; total participation of instructor.</li>
<li><b>stud_dept</b> (student–department): many-to-one; total participation of student.</li></ul>
<p>dept_name is not repeated inside instructor/student because the relationship sets carry it (no redundant attributes).</p>`,
    rub: [['Four entity sets with attributes and underlined PKs', 1], ['Relationship sets as diamonds', 1], ['Correct cardinality notation (arrows/lines)', 1.5], ['Participation constraints (double lines)', 1], ['Explanation / no redundant attributes', 0.5]]
  },
  {
    m: 5,
    q: { en: 'Explain how an ER diagram is reduced to relation schemas (strong entity, weak entity, many-to-many relationship, composite and multivalued attributes).', bn: 'ER diagram কীভাবে relation schema-তে রূপান্তর হয় ব্যাখ্যা করো।' },
    ans: `<ol><li><b>Strong entity set:</b> becomes a schema with the same attributes: <code>student(ID, name, tot_cred)</code>.</li>
<li><b>Weak entity set:</b> becomes a table that includes the primary key of the identifying strong entity set: <code>section(course_id, sec_id, sem, year)</code>.</li>
<li><b>Many-to-many relationship set:</b> a schema with the primary keys of both participating entity sets plus its descriptive attributes: <code>advisor(s_id, i_id)</code>, <code>takes(ID, course_id, sec_id, semester, year, grade)</code>.</li>
<li><b>Composite attribute:</b> flattened into separate attributes: name → first_name, last_name.</li>
<li><b>Multivalued attribute</b> M of E: a separate schema EM with E’s primary key and M: <code>inst_phone(ID, phone_number)</code>; each value becomes a separate tuple, e.g. (22222, 456-7890), (22222, 123-4567).</li></ol>
<p><b>Redundancy:</b> a many-to-one relationship that is total on the many side needs no table; add the “one” side’s primary key to the “many” side (dept_name in instructor).</p>`,
    rub: [['Strong entity', 1], ['Weak entity', 1], ['Many-to-many relationship', 1], ['Composite attribute', 1], ['Multivalued attribute (+ redundancy note)', 1]]
  },
  {
    m: 5,
    q: { en: 'Explain specialization and generalization with an ER diagram. Describe two methods of representing specialization as schemas.', bn: 'ER diagram-সহ specialization ও generalization ব্যাখ্যা করো। Specialization-কে schema-তে প্রকাশের দুটি পদ্ধতি লেখো।' },
    ans: `<p><b>Specialization</b> is a top-down process: sub-groupings within an entity set (person → employee, student) become lower-level entity sets with their own attributes. It is drawn with an <b>ISA</b> triangle, and lower-level sets inherit all attributes and relationships of the higher level (attribute inheritance). It may be overlapping (a person can be both employee and student) or disjoint (instructor or secretary).</p>
<p><b>Generalization</b> is the bottom-up process of combining entity sets that share features into a higher-level entity set. The two are inversions and drawn the same way.</p>
<div class="vslot" data-v="isa"></div>
<p><b>Method 1:</b> a schema for the higher-level entity, and for each lower-level set a schema with the higher-level primary key plus local attributes: person(ID, name, street, city), student(ID, tot_cred), employee(ID, salary). <i>Drawback:</i> accessing an employee needs two relations.</p>
<p><b>Method 2:</b> a schema for each entity set with all local and inherited attributes: student(ID, name, street, city, tot_cred), employee(ID, name, street, city, salary). <i>Drawback:</i> name, street, city stored redundantly for people who are both.</p>`,
    rub: [['Specialization: top-down, ISA, inheritance', 1.5], ['Generalization: bottom-up', 1], ['Diagram', 0.5], ['Method 1 + drawback', 1], ['Method 2 + drawback', 1]]
  }
];

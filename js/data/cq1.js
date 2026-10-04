/* CQ (written) questions: m = marks, q = question, ans = model answer (exam English),
 * rub = marking rubric [point, marks] used for self-grading. */
window.CQ = window.CQ || {};

CQ.ch1 = [
  {
    m: 2,
    q: { en: 'Define data and information with an example.', bn: 'উদাহরণসহ data ও information-এর সংজ্ঞা দাও।' },
    ans: `<p><b>Data:</b> Data are raw, unorganized facts that need to be processed. Alone they may seem random and meaningless.<br><i>Example:</i> each student’s test score (78, 65, 92, 54, 88) is a piece of data.</p>
<p><b>Information:</b> When data is processed, organized, structured or presented in a given context so as to make it useful, it is called information.<br><i>Example:</i> the average score of the class (75.4), derived from those scores, is information.</p>`,
    rub: [['Correct definition of data + example', 1], ['Correct definition of information + example', 1]]
  },
  {
    m: 2,
    q: { en: 'What is a DBMS? Give four examples.', bn: 'DBMS কী? চারটি উদাহরণ দাও।' },
    ans: `<p>A <b>Database Management System (DBMS)</b> is the software that controls the information in a database. It allows users to store, update, retrieve, organise and protect their data, while providing security, backup and concurrent access.</p>
<p><b>Examples:</b> Oracle, MySQL, PostgreSQL, MS SQL Server (also IBM DB2, MS Access, Ingres).</p>`,
    rub: [['Definition: software that controls/manages a database', 1], ['Any four correct examples', 1]]
  },
  {
    m: 3,
    q: { en: 'Who are the users of a database system? Describe each briefly.', bn: 'Database system-এর user কারা? সংক্ষেপে বর্ণনা করো।' },
    ans: `<ol><li><b>End users:</b> use the database system to achieve some goal, e.g. a customer sending money through a mobile banking app.</li>
<li><b>Application developers:</b> write software that allows end users to interface with the database system.</li>
<li><b>Database Administrator (DBA):</b> designs and manages the database system: schema, security, backup and recovery, access permissions.</li>
<li><b>Database systems programmer:</b> writes the database software (the DBMS) itself.</li></ol>`,
    rub: [['End users explained', 0.75], ['Application developers explained', 0.75], ['DBA explained', 0.75], ['Database systems programmer explained', 0.75]]
  },
  {
    m: 3,
    q: { en: 'Write three disadvantages of the file processing system.', bn: 'File processing system-এর তিনটি অসুবিধা লেখো।' },
    ans: `<p>A file processing system is a collection of application programs where each program defines and manages its own data. Its disadvantages:</p>
<ol><li><b>Program-data dependence:</b> the file structure is defined in the program code, and every program maintains metadata for each file it uses. Changing a file’s structure forces changes to all programs using it.</li>
<li><b>Duplication of data (data redundancy):</b> different programs hold separate copies of the same data (e.g. Reg_Number and Name in Registration, Examination and Library files). This wastes space and may give different values or formats for the same item (inconsistency).</li>
<li><b>Limited data sharing:</b> there is no centralized control of data, and programs written in different languages cannot easily access each other’s files.</li></ol>`,
    rub: [['Program-data dependence explained', 1], ['Data redundancy + inconsistency explained', 1], ['Limited data sharing explained', 1]]
  },
  {
    m: 5,
    q: { en: 'What are DBMS and RDBMS? List four significant differences between a file processing system and a DBMS.', bn: 'DBMS ও RDBMS কী? File processing system ও DBMS-এর মধ্যে চারটি গুরুত্বপূর্ণ পার্থক্য লেখো।' },
    ans: `<p><b>DBMS:</b> A Database Management System is the software that controls the information in a database, letting users store, update, retrieve, organise and protect data. Examples: Oracle, MS Access, MySQL.</p>
<p><b>RDBMS:</b> A Relational DBMS is a DBMS based on the relational model, where data is stored in tables (relations) of rows and columns, relationships between tables are maintained using primary and foreign keys, and data is queried with SQL. Examples: MySQL, PostgreSQL, Oracle.</p>
<p><b>Differences between file processing system and DBMS:</b></p>
<div class="tscroll"><table><thead><tr><th>File processing system</th><th>DBMS</th></tr></thead><tbody>
<tr><td>High data redundancy: the same data is stored in many files.</td><td>Controlled redundancy: data is stored centrally once.</td></tr>
<tr><td>Program-data dependence: file structure is coded in programs.</td><td>Data independence: structure can change without changing programs.</td></tr>
<tr><td>Limited data sharing; no central control.</td><td>Easy data sharing among all applications.</td></tr>
<tr><td>Weak integrity and security.</td><td>Integrity constraints and authorization are enforced.</td></tr>
<tr><td>No concurrency control or automatic recovery.</td><td>Concurrency control, backup and recovery are built in.</td></tr></tbody></table></div>`,
    rub: [['DBMS definition (+ example)', 1], ['RDBMS definition: tables, keys, SQL', 1], ['Difference 1', 0.75], ['Difference 2', 0.75], ['Difference 3', 0.75], ['Difference 4', 0.75]]
  },
  {
    m: 5,
    q: { en: 'Discuss the advantages of the database approach over the file processing approach with a suitable example.', bn: 'উপযুক্ত উদাহরণসহ file processing-এর তুলনায় database approach-এর সুবিধাগুলো আলোচনা করো।' },
    ans: `<p>In the <b>file processing approach</b>, each department of a university (Registration, Examination, Library) keeps its own files, so Reg_Number, Name and Address are stored three times. In the <b>database approach</b>, all applications use one University Students Database through a single DBMS.</p>
<div class="vslot" data-v="fileVsDb"></div>
<p><b>Advantages:</b></p>
<ol><li><b>Data sharing:</b> all applications (Registration, Examination, Library) share the same centrally stored data.</li>
<li><b>Data independence:</b> data structures are described in the DBMS, not in program code, so structure can change without rewriting programs.</li>
<li><b>Controlled redundancy:</b> a student’s name and address are stored once, saving space and avoiding inconsistent values.</li>
<li><b>Better data integrity:</b> constraints (primary key, not null, foreign key) stop invalid data from entering.</li></ol>
<p><b>Conclusion:</b> the database approach removes the duplication and isolation of file systems, giving consistent, shareable and secure data.</p>`,
    rub: [['Example / comparison of the two approaches (diagram)', 1], ['Data sharing', 1], ['Data independence', 1], ['Controlled redundancy', 1], ['Better data integrity', 1]]
  }
];

CQ.ch2 = [
  {
    m: 2,
    q: { en: 'Differentiate between schema and instance.', bn: 'Schema ও instance-এর মধ্যে পার্থক্য করো।' },
    ans: `<div class="tscroll"><table><thead><tr><th>Schema</th><th>Instance</th></tr></thead><tbody>
<tr><td>The overall design of the database.</td><td>The collection of information stored in the database at a particular moment.</td></tr>
<tr><td>Changes rarely.</td><td>Changes frequently, whenever data is inserted, deleted or updated.</td></tr>
<tr><td>e.g. student(ID, name, dept_name)</td><td>e.g. the rows (101, Rahim, CSE), (102, Nusrat, EEE) present today.</td></tr></tbody></table></div>`,
    rub: [['Schema = overall design (rarely changes)', 1], ['Instance = data at a particular moment (changes often)', 1]]
  },
  {
    m: 2,
    q: { en: 'What is a data model? Name its types.', bn: 'Data model কী? এর প্রকারভেদ লেখো।' },
    ans: `<p>A <b>data model</b> is a collection of tools for describing data, data relationships, data semantics and data constraints.</p>
<p><b>Types:</b> Relational model; Entity-Relationship (ER) model (mainly for database design); Object-based models (object-oriented and object-relational); Semi-structured data model (XML); older models: Network model and Hierarchical model.</p>`,
    rub: [['Definition (data, relationships, semantics, constraints)', 1], ['Types listed', 1]]
  },
  {
    m: 3,
    q: { en: 'Explain the three levels of data abstraction.', bn: 'Data abstraction-এর তিনটি level ব্যাখ্যা করো।' },
    ans: `<ol><li><b>Physical level:</b> the lowest level; describes how a record (e.g. instructor) is actually stored: blocks, files, indexes.</li>
<li><b>Logical level:</b> describes what data is stored in the database and the relationships among the data, e.g.<br><code>type instructor = record ID: string; name: string; dept_name: string; salary: integer; end;</code></li>
<li><b>View level:</b> the highest level; application programs hide details of data types. Views can also hide information (such as an employee’s salary) for security purposes.</li></ol>
<div class="vslot" data-v="abstraction"></div>`,
    rub: [['Physical level', 1], ['Logical level (+ example)', 1], ['View level (+ security)', 1]]
  },
  {
    m: 3,
    q: { en: 'Write the advantages and disadvantages of the relational model.', bn: 'Relational model-এর সুবিধা ও অসুবিধা লেখো।' },
    ans: `<p>The relational model uses a collection of tables to represent both data and the relationships among those data.</p>
<p><b>Advantages:</b></p>
<ol><li><b>Simplicity:</b> simpler than hierarchical and network models; designers concentrate on the logical view, not physical storage.</li>
<li><b>Structural independence:</b> it does not depend on navigational data access; changes in structure do not affect data access.</li>
<li>Ease of design, implementation, maintenance and use.</li>
<li>Flexible and powerful query capability (SQL).</li></ol>
<p><b>Disadvantages:</b></p>
<ol><li><b>Hardware overheads:</b> needs more powerful hardware and storage devices.</li>
<li><b>Easy design can lead to bad design.</b></li></ol>`,
    rub: [['At least 3 advantages', 2], ['Two disadvantages', 1]]
  },
  {
    m: 3,
    q: { en: 'Describe the client/server database system with its advantages and disadvantages.', bn: 'Client/server database system সুবিধা ও অসুবিধাসহ বর্ণনা করো।' },
    ans: `<p>A <b>client/server</b> database system has two logical components. Applications and tools run on <b>clients</b> (PCs/workstations, the <b>front-end</b>), while the DBMS software resides on the <b>server</b> (the <b>back-end</b>). They are connected by a network; clients request services from the DBMS.</p>
<p><b>Advantages:</b> more flexible than centralized systems; one database can be shared by many clients; better DBMS performance; less expensive platforms.</p>
<p><b>Disadvantages:</b> high labor/programming cost, especially initially; lack of management tools for performance monitoring, tuning and security control.</p>`,
    rub: [['Architecture: client front-end, server back-end, network', 1], ['Advantages', 1], ['Disadvantages', 1]]
  },
  {
    m: 5,
    q: { en: 'Explain the three-schema architecture (physical, conceptual and external schema) with a diagram.', bn: 'চিত্রসহ three-schema architecture (physical, conceptual ও external schema) ব্যাখ্যা করো।' },
    ans: `<div class="vslot" data-v="threeSchema"></div>
<p><b>1. Physical (internal) schema:</b> describes the physical storage structure of the database. The internal level is concerned with storage space allocation, record descriptions with stored sizes, record placement, and data compression and encryption techniques.</p>
<p><b>2. Conceptual (logical) schema:</b> describes the structure of the whole database for a community of users: entities, data types, relationships, user operations and constraints, while hiding physical storage details. It includes all entities and attributes, constraints, semantic information, security information and checks for consistency and integrity.</p>
<p><b>3. External schema:</b> each external schema describes the part of the database that a particular user group is interested in and hides the rest. For example, a student’s view shows grades while an accounts view shows fees.</p>
<p><b>Benefit:</b> the separation gives logical and physical data independence.</p>`,
    rub: [['Correct labelled diagram', 1], ['Physical/internal schema + activities', 1.5], ['Conceptual/logical schema + activities', 1.5], ['External schema', 1]]
  },
  {
    m: 5,
    q: { en: 'What is a parallel database system? Describe its architectures and differentiate it from a distributed database system.', bn: 'Parallel database system কী? এর architecture বর্ণনা করো এবং distributed database-এর সাথে পার্থক্য দেখাও।' },
    ans: `<p>A <b>parallel database system</b> uses multiple CPUs and data storage disks in parallel to improve processing and I/O speeds. It is used for querying extremely large databases or processing very many transactions per second.</p>
<p><b>Architectures:</b></p>
<ol><li><b>Shared memory:</b> all processors share a common memory.</li>
<li><b>Shared disk:</b> all processors share a common set of disks (clusters).</li>
<li><b>Independent resources (shared nothing):</b> processors share neither memory nor disk.</li>
<li><b>Hierarchical:</b> a hybrid of the three.</li></ol>
<div class="vslot" data-v="parVsDist"></div>`,
    rub: [['Definition of parallel DB', 1], ['Four architectures', 2], ['At least 3 differences from distributed DB', 2]]
  }
];

CQ.ch3 = [
  {
    m: 2,
    q: { en: 'Define relation, tuple and attribute with an example.', bn: 'উদাহরণসহ relation, tuple ও attribute-এর সংজ্ঞা দাও।' },
    ans: `<p>In the relational model, a <b>relation</b> refers to a table, a <b>tuple</b> refers to a row, and an <b>attribute</b> refers to a column of a table.</p>
<p><i>Example:</i> the relation <code>instructor(ID, name, dept_name, salary)</code> has four attributes; the row (22222, Einstein, Physics, 95000) is one tuple.</p>`,
    rub: [['Relation, tuple, attribute defined', 1.5], ['Example', 0.5]]
  },
  {
    m: 2,
    q: { en: 'What is a foreign key? Give an example.', bn: 'Foreign key কী? উদাহরণ দাও।' },
    ans: `<p>A <b>foreign key</b> is a combination of columns whose values are based on the primary key values of another table. The foreign key (referential integrity) constraint requires that its values correspond to actual primary key values in the referenced table.</p>
<p><i>Example:</i> in <code>BOOKSHELF(Title, Publisher, CategoryName)</code>, CategoryName is a foreign key referring to the primary key CategoryName of <code>CATEGORY</code>.</p>`,
    rub: [['Definition + referential integrity', 1], ['Correct example', 1]]
  },
  {
    m: 3,
    q: { en: 'Describe the different types of attributes with examples.', bn: 'উদাহরণসহ attribute-এর প্রকারভেদ বর্ণনা করো।' },
    ans: `<ol><li><b>Simple attribute:</b> atomic value that cannot be divided further, e.g. a student’s phone number.</li>
<li><b>Composite attribute:</b> made of more than one simple attribute, e.g. name = first_name + last_name.</li>
<li><b>Derived attribute:</b> not stored in the database but derived from other attributes, e.g. age from date_of_birth; average_salary of a department.</li>
<li><b>Single-valued attribute:</b> holds a single value, e.g. Social_Security_Number.</li>
<li><b>Multi-valued attribute:</b> may hold more than one value, e.g. phone numbers, email addresses of a person.</li></ol>`,
    rub: [['Simple & composite with examples', 1], ['Derived with example', 1], ['Single- & multi-valued with examples', 1]]
  },
  {
    m: 3,
    q: { en: '“Candidate key is the minimal of super key.” Justify with examples.', bn: '“Candidate key is the minimal of super key” উদাহরণসহ যৌক্তিকতা দেখাও।' },
    ans: `<p>A <b>super key</b> is a set of one or more attributes that uniquely identifies each tuple. A <b>candidate key</b> is a super key with no redundant attribute.</p>
<p>Consider <code>Student(ID, name, dept_name)</code>. Its super keys are: {ID}, {ID, name}, {ID, dept_name}, {name, dept_name} (if name + department is unique), {ID, name, dept_name}.</p>
<ul><li>{ID} is a candidate key: removing ID leaves nothing, so it is minimal.</li>
<li>{name, dept_name} is also a candidate key: neither name nor dept_name alone is unique.</li>
<li>{ID, name} is a super key but <b>not</b> a candidate key, because its subset {ID} is already a key; name is redundant.</li></ul>
<p>Hence every candidate key is a super key from which no attribute can be removed, i.e. <b>a candidate key is a minimal super key</b>.</p>`,
    rub: [['Definitions of super key and candidate key', 1], ['List of super keys for an example relation', 1], ['Shows why {ID, name} is not candidate (minimality)', 1]]
  },
  {
    m: 5,
    q: { en: 'Briefly describe the different types of keys with examples.', bn: 'উদাহরণসহ বিভিন্ন ধরনের key সংক্ষেপে বর্ণনা করো।' },
    ans: `<p>Keys identify each record uniquely and establish relationships between tables. Consider <code>Student(Roll_no, Registration_no, Name, Dept)</code>.</p>
<ol><li><b>Super key:</b> a set of one or more attributes that collectively identify each tuple uniquely. e.g. {Roll_no}, {Registration_no}, {Roll_no, Name}, {Roll_no, Registration_no, Name}.</li>
<li><b>Candidate key:</b> a minimal super key (no redundant attribute). e.g. {Roll_no}, {Registration_no}.</li>
<li><b>Primary key:</b> the candidate key chosen by the database designer to identify tuples; its values never or rarely change, must be unique and not null. e.g. Roll_no.</li>
<li><b>Alternate key:</b> a candidate key not chosen as primary key, e.g. Registration_no.</li>
<li><b>Foreign key:</b> attribute(s) whose values refer to the primary key of another table, enforcing referential integrity. e.g. Dept in Student referring to Department(Dept).</li></ol>
<div class="vslot" data-v="keyNest"></div>`,
    rub: [['Super key + example', 1], ['Candidate key + example', 1], ['Primary key + properties', 1], ['Foreign key + example', 1], ['Common example relation / alternate key / diagram', 1]]
  },
  {
    m: 5,
    q: { en: 'Explain referential integrity with an SQL example. What does “on delete cascade” do?', bn: 'SQL উদাহরণসহ referential integrity ব্যাখ্যা করো। “on delete cascade” কী করে?' },
    ans: `<p>A <b>foreign key</b> is a set of columns whose values are based on the primary key of another table. The <b>referential integrity constraint</b> states that every foreign key value must match an existing primary key value in the referenced (parent) table, so no “orphan” rows exist.</p>
<pre class="code"><code>create table CATEGORY(
  CategoryName   varchar(12) primary key,
  ParentCategory varchar(8));

create table BOOKSHELF(
  Title        varchar(100) primary key,
  Publisher    varchar(20),
  CategoryName varchar(12),
  constraint CATFK foreign key (CategoryName)
    references CATEGORY(CategoryName) on delete cascade);</code></pre>
<p>Here BOOKSHELF.CategoryName must exist in CATEGORY. Inserting a book with a category that is not in CATEGORY is rejected.</p>
<p><b>on delete cascade:</b> when a row in the parent table (CATEGORY) is deleted, the dependent rows in the child table (BOOKSHELF) are deleted automatically, maintaining referential integrity. (Alternatively, the foreign key can be set to null.)</p>`,
    rub: [['Foreign key definition', 1], ['Referential integrity rule explained', 1], ['Correct create table SQL with foreign key', 2], ['on delete cascade explained', 1]]
  }
];

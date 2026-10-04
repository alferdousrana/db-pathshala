window.CHAPTERS = window.CHAPTERS || [];
CHAPTERS.push({
  id: 'ch6', num: 6, color: '#15803D', icon: '◇', source: '5_ER_Diagram',
  title: { bn: 'Entity-Relationship (ER) Model', en: 'Entity-Relationship (ER) Model' },
  blurb: { bn: 'Entity, relationship, cardinality, weak entity, ISA, aggregation, ER থেকে table', en: 'Entities, relationships, cardinality, weak entities, ISA, aggregation, ER to tables' },
  topics: [
    {
      id: 'design', stars: 1, visual: 'designPhases',
      title: { bn: 'Design Phase ও Design Approach', en: 'Design Phases and Approaches' },
      body: {
        bn: `<p><b>Design phases:</b></p>
<ul><li>প্রথম ধাপ: ভবিষ্যৎ user-দের <mark>data চাহিদা পুরোপুরি বোঝা</mark>।</li>
<li>তারপর designer একটা data model বেছে নিয়ে চাহিদাগুলোকে <b>conceptual schema</b>-তে রূপান্তর করে।</li>
<li>পূর্ণ conceptual schema enterprise-এর functional requirement-ও দেখায়: “specification of functional requirements”-এ user বলে data-র উপর কী কী operation (transaction) হবে।</li></ul>
<p><b>Design approaches:</b></p>
<ul><li><b>Entity Relationship Model</b> (এই অধ্যায়): enterprise-কে entity ও relationship-এর সংগ্রহ হিসেবে model করে; ER diagram দিয়ে আঁকা হয়।</li>
<li><b>Normalization Theory</b> (Chapter 8): কোন design খারাপ তা formal-ভাবে ঠিক করা ও test করা।</li></ul>`,
        en: `<p><b>Design phases:</b></p>
<ul><li>The initial phase is to <mark>characterize fully the data needs</mark> of the prospective users.</li>
<li>Next, the designer chooses a data model and translates these requirements into a <b>conceptual schema</b>.</li>
<li>A fully developed conceptual schema also indicates functional requirements: in a “specification of functional requirements”, users describe the operations (transactions) to be performed on the data.</li></ul>
<p><b>Design approaches:</b></p>
<ul><li><b>Entity Relationship Model</b> (this chapter): models an enterprise as a collection of entities and relationships, drawn as an ER diagram.</li>
<li><b>Normalization Theory</b> (Chapter 8): formalizes which designs are bad and tests for them.</li></ul>`
      },
      example: {
        bn: `<p>বাড়ি বানানোর আগে মালিকের সাথে কথা (কয়টা রুম লাগবে = data needs), তারপর নকশা (ER = conceptual schema), তারপর ইট-বালু (table = physical)। Database design-ও ঠিক তাই।</p>`,
        en: `<p>Before building a house you talk to the owner (how many rooms = data needs), then draw a plan (ER = conceptual schema), then lay bricks (tables = physical). Database design follows the same path.</p>`
      },
      exam: [
        'Design phases: characterize data needs → choose a data model and translate requirements into a <b>conceptual schema</b> → specification of functional requirements (operations/transactions).',
        'Design approaches: <b>ER model</b> (enterprise as entities and relationships) and <b>normalization theory</b> (formalize and test bad designs).'
      ]
    },
    {
      id: 'entity-rel', stars: 3, visual: 'erBasic',
      title: { bn: 'Entity, Entity Set, Relationship, Relationship Set', en: 'Entity, Entity Set, Relationship, Relationship Set' },
      body: {
        bn: `<p>ER model-এর ৩টা মৌলিক ধারণা: <mark>entity sets, relationship sets, attributes</mark>।</p>
<ul><li><b>Entity</b>: এমন একটা object যা <mark>অস্তিত্বশীল এবং অন্যদের থেকে আলাদা করা যায়</mark>। যেমন নির্দিষ্ট একজন মানুষ, company, event, গাছ।</li>
<li><b>Entity set</b>: <mark>একই ধরনের, একই property-যুক্ত entity-র set</mark>। যেমন সব মানুষ, সব company, সব ছুটির দিন।</li>
<li>Entity-কে attribute দিয়ে প্রকাশ করা হয়: <code>instructor = (ID, name, street, city, salary)</code>, <code>course = (course_id, title, credits)</code>। Attribute-এর একটা subset <b>primary key</b>।</li>
<li><b>Relationship</b>: <mark>কয়েকটা entity-র মধ্যে সম্পর্ক (association)</mark>। যেমন 44553 (Peltier) — advisor — 22222 (Einstein)।</li>
<li><b>Relationship set</b>: n ≥ 2 entity set থেকে নেওয়া entity-র গাণিতিক relation: {(e1, e2, … en) | e1 ∈ E1, e2 ∈ E2, …, en ∈ En}। যেমন (44553, 22222) ∈ advisor।</li></ul>
<p>Relationship set-এরও attribute থাকতে পারে: advisor-এর <code>date</code> (কবে থেকে advisor)।</p>`,
        en: `<p>The ER model uses three basic concepts: <mark>entity sets, relationship sets and attributes</mark>.</p>
<ul><li><b>Entity</b>: an object that <mark>exists and is distinguishable from other objects</mark>, e.g. a specific person, company, event, plant.</li>
<li><b>Entity set</b>: <mark>a set of entities of the same type that share the same properties</mark>, e.g. all persons, companies, trees, holidays.</li>
<li>Entities are described by attributes: <code>instructor = (ID, name, street, city, salary)</code>, <code>course = (course_id, title, credits)</code>. A subset of the attributes forms the <b>primary key</b>.</li>
<li><b>Relationship</b>: <mark>an association among several entities</mark>, e.g. 44553 (Peltier) — advisor — 22222 (Einstein).</li>
<li><b>Relationship set</b>: a mathematical relation among n ≥ 2 entities from entity sets: {(e1, e2, … en) | e1 ∈ E1, e2 ∈ E2, …, en ∈ En}, e.g. (44553, 22222) ∈ advisor.</li></ul>
<p>A relationship set can also have attributes, e.g. <code>date</code> on advisor (when advising began).</p>`
      },
      example: {
        bn: `<p>“তুমি” একটা entity, “GUB-এর সব ছাত্র” entity set। “তুমি Database course-এ enrolled”: একটা relationship; সব ছাত্রের সব enrollment মিলে relationship set <code>takes</code>। Enroll-এর তারিখ ও grade হলো relationship-এর attribute।</p>`,
        en: `<p>“You” are an entity; “all university students” is an entity set. “You are enrolled in Database” is a relationship; all enrollments together form the relationship set <code>takes</code>. The enrollment date and grade are relationship attributes.</p>`
      },
      exam: [
        '<b>Entity</b>: an object that exists and is distinguishable from other objects. <b>Entity set</b>: a set of entities of the same type sharing the same properties.',
        '<b>Relationship</b>: an association among several entities. <b>Relationship set</b>: a mathematical relation among n ≥ 2 entities, {(e1,…,en) | e1 ∈ E1, …, en ∈ En}.',
        'An attribute can be associated with a relationship set (e.g. date on advisor).'
      ]
    },
    {
      id: 'degree-roles', stars: 2, visual: 'degreeRoles',
      title: { bn: 'Relationship-এর Degree ও Roles', en: 'Degree of a Relationship Set and Roles' },
      body: {
        bn: `<p><b>Degree</b> = relationship-এ কয়টা entity set জড়িত।</p>
<ul><li><b>Binary relationship</b>: দুইটা entity set (degree 2)। <mark>বেশিরভাগ relationship binary</mark>।</li>
<li>দুইয়ের বেশি entity set-এর relationship বিরল। উদাহরণ: student instructor-এর তত্ত্বাবধানে project-এ কাজ করে: <code>proj_guide</code> হলো instructor, student, project-এর <b>ternary</b> relationship।</li></ul>
<p><b>Roles</b>: relationship-এর entity set গুলো আলাদা হতে হবে এমন না। <mark>একই entity set দুইবার আসলে প্রতিবার একটা “role” পালন করে</mark>। যেমন course-prereq: “course_id” ও “prereq_id” label দুটো হলো role।</p>`,
        en: `<p><b>Degree</b> = the number of entity sets in a relationship.</p>
<ul><li><b>Binary relationship</b>: involves two entity sets (degree two). <mark>Most relationship sets are binary.</mark></li>
<li>Relationships among more than two entity sets are rare. Example: students work on research projects under an instructor: <code>proj_guide</code> is a <b>ternary</b> relationship between instructor, student and project.</li></ul>
<p><b>Roles</b>: entity sets of a relationship need not be distinct. <mark>When one entity set appears twice, each occurrence plays a “role”</mark>. In course–prereq, the labels “course_id” and “prereq_id” are roles.</p>`
      },
      example: {
        bn: `<p>Facebook-এ “follows”: একই <b>user</b> entity set দুইবার, একজন follower, একজন followed: দুইটা role। আর “ডাক্তার রোগীকে ওষুধ লিখেন” = doctor, patient, medicine: ternary।</p>`,
        en: `<p>On Facebook, “follows” uses the same <b>user</b> entity set twice: one as follower, one as followed: two roles. “A doctor prescribes medicine to a patient” links doctor, patient and medicine: ternary.</p>`
      },
      exam: [
        '<b>Binary relationship</b>: involves two entity sets (degree two); most relationship sets are binary. Example of <b>ternary</b>: proj_guide between instructor, student and project.',
        '<b>Roles</b>: entity sets of a relationship need not be distinct; each occurrence plays a role (course_id and prereq_id in prereq).'
      ]
    },
    {
      id: 'cardinality', stars: 3, visual: 'cardinality',
      title: { bn: 'Mapping Cardinality: 1:1, 1:N, N:1, M:N', en: 'Mapping Cardinality: 1:1, 1:N, N:1, M:N' },
      body: {
        bn: `<p><b>Mapping cardinality</b> বলে <mark>relationship set-এর মাধ্যমে একটা entity অন্য কয়টা entity-র সাথে যুক্ত হতে পারে</mark>। Binary relationship বর্ণনায় সবচেয়ে কাজের। ৪ ধরন:</p>
<ul><li><b>One to one</b></li><li><b>One to many</b></li><li><b>Many to one</b></li><li><b>Many to many</b></li></ul>
<p class="tip">মনে রাখো: A ও B-এর কিছু element অন্য set-এর কারও সাথে যুক্ত <b>না-ও</b> থাকতে পারে।</p>
<p><b>ER diagram-এ দেখানো</b>: <mark>directed line (→) মানে “one”, undirected line (—) মানে “many”</mark>, relationship set আর entity set-এর মাঝে।</p>
<ul><li><b>One-to-one</b> (instructor–student via advisor): student-এর সর্বোচ্চ একজন instructor, instructor-এর সর্বোচ্চ একজন student।</li>
<li><b>One-to-many</b>: একজন instructor অনেক (০ সহ) student-এর advisor; student-এর সর্বোচ্চ একজন instructor।</li>
<li><b>Many-to-one</b>: instructor সর্বোচ্চ একজন student-এর সাথে; student অনেক (০ সহ) instructor-এর সাথে।</li>
<li><b>Many-to-many</b>: দুই দিকেই অনেক (০ সহ)।</li></ul>`,
        en: `<p><b>Mapping cardinality</b> expresses <mark>the number of entities to which another entity can be associated via a relationship set</mark>. Most useful for binary relationships. Four types:</p>
<ul><li><b>One to one</b></li><li><b>One to many</b></li><li><b>Many to one</b></li><li><b>Many to many</b></li></ul>
<p class="tip">Note: some elements in A and B may not be mapped to any element of the other set.</p>
<p><b>In ER diagrams</b>: <mark>a directed line (→) signifies “one”, an undirected line (—) signifies “many”</mark>, drawn between the relationship set and the entity set.</p>
<ul><li><b>One-to-one</b> (instructor–student via advisor): a student has at most one instructor, and vice versa.</li>
<li><b>One-to-many</b>: an instructor advises several (including 0) students; a student has at most one instructor.</li>
<li><b>Many-to-one</b>: an instructor is associated with at most one student; a student with several (including 0) instructors.</li>
<li><b>Many-to-many</b>: several (possibly 0) on both sides.</li></ul>`
      },
      example: {
        bn: `<p>উপরের diagram-এ tab বদলে দেখো। বাস্তবে: নাগরিক–NID (1:1), Department–Student (1:N), Student–Advisor (N:1), Student–Course (M:N)।</p>`,
        en: `<p>Switch tabs in the diagram above. Real life: citizen–NID (1:1), department–students (1:N), students–advisor (N:1), students–courses (M:N).</p>`
      },
      exam: [
        '<b>Mapping cardinality</b>: the number of entities to which another entity can be associated via a relationship set; types: one to one, one to many, many to one, many to many.',
        'In ER diagrams: a <b>directed line (→)</b> signifies “one” and an <b>undirected line (—)</b> signifies “many” between the relationship set and the entity set.',
        'One-to-many: an instructor is associated with several (including 0) students; a student with at most one instructor via advisor.'
      ]
    },
    {
      id: 'participation', stars: 3, visual: 'participation',
      title: { bn: 'Total ও Partial Participation, l..h', en: 'Total and Partial Participation, l..h' },
      body: {
        bn: `<p><b>Total participation</b> (<mark>double line</mark>): entity set-এর <mark>প্রতিটা entity relationship-এ অন্তত একবার</mark> অংশ নেয়। যেমন advisor-এ student-এর participation total: প্রতিটা student-এর অবশ্যই একজন instructor আছে।</p>
<p><b>Partial participation</b> (single line): কিছু entity কোনো relationship-এ না-ও থাকতে পারে। যেমন advisor-এ instructor-এর participation partial।</p>
<p><b>l..h notation</b>: line-এ minimum ও maximum cardinality, l = minimum, h = maximum।</p>
<ul><li><mark>Minimum 1 = total participation</mark></li><li>Maximum 1 = সর্বোচ্চ একটা relationship</li><li>Maximum * = কোনো সীমা নেই</li></ul>
<p>ছবিতে: instructor <code>0..*</code> student-কে advise করতে পারেন; student-এর <code>1..1</code>: অবশ্যই একজন, একাধিক না।</p>`,
        en: `<p><b>Total participation</b> (<mark>double line</mark>): <mark>every entity in the entity set participates in at least one relationship</mark>. Student’s participation in advisor is total: every student must have an instructor.</p>
<p><b>Partial participation</b> (single line): some entities may not participate in any relationship. Instructor’s participation in advisor is partial.</p>
<p><b>l..h notation</b>: a line may carry minimum (l) and maximum (h) cardinality.</p>
<ul><li><mark>Minimum 1 indicates total participation</mark></li><li>Maximum 1: participates in at most one relationship</li><li>Maximum *: no limit</li></ul>
<p>In the picture: an instructor can advise <code>0..*</code> students; a student has <code>1..1</code>: exactly one advisor.</p>`
      },
      example: {
        bn: `<p>প্রতিটা <b>গাড়ির</b> অবশ্যই একটা registration number (total), কিন্তু প্রতিটা <b>মানুষের</b> গাড়ি নেই (partial)। প্রতিটা bKash account-এর অবশ্যই একটা NID (1..1)।</p>`,
        en: `<p>Every <b>car</b> must have a registration (total), but not every <b>person</b> owns a car (partial). Every bKash account must have exactly one NID (1..1).</p>`
      },
      exam: [
        '<b>Total participation</b> (double line): every entity in the entity set participates in at least one relationship (every student must have an advisor).',
        '<b>Partial participation</b>: some entities may not participate in any relationship (instructor in advisor).',
        '<b>l..h</b>: minimum 1 = total participation; maximum 1 = at most one relationship; * = no limit.'
      ]
    },
    {
      id: 'er-attributes', stars: 2, visual: 'attrTypes',
      title: { bn: 'Complex Attribute ও Redundant Attribute', en: 'Complex and Redundant Attributes' },
      body: {
        bn: `<p>Attribute-এর ধরন (Chapter 3-এর সাথে মিলাও):</p>
<ul><li><b>Simple</b> ও <b>composite</b></li><li><b>Single-valued</b> ও <b>multivalued</b> (যেমন phone_numbers)</li><li><b>Derived</b>: অন্য attribute থেকে হিসাব (date_of_birth থেকে age)</li><li><b>Domain</b>: প্রতিটা attribute-এর অনুমোদিত মানের set</li></ul>
<p><b>Redundant attribute:</b> instructor(ID, name, dept_name, salary) আর department(dept_name, building, budget), সাথে relationship <code>inst_dept</code>। <mark>dept_name দুই entity set-এই আছে</mark>। এটা department-এর primary key এবং relationship-ই এই তথ্য বহন করে, তাই <mark>instructor-এ dept_name redundant, ER diagram থেকে বাদ দিতে হবে</mark>।</p>
<p class="tip">তবে table-এ রূপান্তরের সময় কখনো কখনো এটা আবার ফিরে আসে (পরের টপিকে দেখবে)।</p>`,
        en: `<p>Attribute types (link with Chapter 3):</p>
<ul><li><b>Simple</b> and <b>composite</b></li><li><b>Single-valued</b> and <b>multivalued</b> (e.g. phone_numbers)</li><li><b>Derived</b>: computed from other attributes (age from date_of_birth)</li><li><b>Domain</b>: the set of permitted values for each attribute</li></ul>
<p><b>Redundant attributes:</b> instructor(ID, name, dept_name, salary) and department(dept_name, building, budget), linked by relationship <code>inst_dept</code>. <mark>dept_name appears in both entity sets.</mark> Since it is department’s primary key and the relationship already carries this fact, <mark>dept_name is redundant in instructor and must be removed</mark> from the ER design.</p>
<p class="tip">When converting back to tables, it sometimes gets reintroduced (see the next topics).</p>`
      },
      example: {
        bn: `<p>তোমার ফোনের contact-এ “অফিসের ঠিকানা” প্রতিটা সহকর্মীর ঘরে আলাদা লিখে রাখা redundant। “অফিস” একটা entity বানিয়ে সবাইকে যুক্ত করলেই হয়।</p>`,
        en: `<p>Writing the office address into every colleague’s contact card is redundant. Make “Office” one entity and link everyone to it.</p>`
      },
      exam: [
        'Attribute types: simple and composite; single-valued and multivalued (phone_numbers); derived (age from date_of_birth). <b>Domain</b>: set of permitted values.',
        '<b>Redundant attribute</b>: dept_name in instructor replicates information present in the relationship inst_dept (it is department’s primary key), so it is redundant and removed from instructor in the ER model.'
      ]
    },
    {
      id: 'weak-entity', stars: 3, visual: 'weakEntity',
      title: { bn: 'Weak Entity Set', en: 'Weak Entity Sets' },
      body: {
        bn: `<p><b>Weak entity set</b>: <mark>যার অস্তিত্ব অন্য entity (identifying entity)-র উপর নির্ভরশীল</mark>। নিজের primary key থাকে না; বরং <b>identifying entity-র primary key + discriminator</b> (কিছু বাড়তি attribute) দিয়ে চেনা হয়। যে entity set weak না তাকে বলে <b>strong entity set</b>।</p>
<p>উদাহরণ: <code>section</code>-এর attribute sec_id, semester, year। Course ছাড়া section-এর অর্থ নেই। Section চেনা যায় <code>course_id + sec_id + semester + year</code> দিয়ে।</p>
<p><b>ER diagram-এ:</b></p>
<ul><li>Weak entity set = <mark>double rectangle</mark></li><li>Discriminator = <mark>dashed underline</mark></li><li>Weak ও identifying strong entity-কে যুক্ত করা relationship = <mark>double diamond</mark></li></ul>
<p>Primary key for section: <code>(course_id, sec_id, semester, year)</code></p>`,
        en: `<p>A <b>weak entity set</b> is one <mark>whose existence depends on another entity, its identifying entity</mark>. Instead of its own primary key, it is identified by <b>the identifying entity’s primary key plus a discriminator</b> (extra attributes). A non-weak entity set is a <b>strong entity set</b>.</p>
<p>Example: <code>section</code> has sec_id, semester, year. A section means nothing without its course, so it is identified by <code>course_id + sec_id + semester + year</code>.</p>
<p><b>In ER diagrams:</b></p>
<ul><li>Weak entity set = <mark>double rectangle</mark></li><li>Discriminator = <mark>dashed underline</mark></li><li>Relationship linking weak to identifying strong entity = <mark>double diamond</mark></li></ul>
<p>Primary key for section: <code>(course_id, sec_id, semester, year)</code></p>`
      },
      example: {
        bn: `<p>বাড়ির ফ্ল্যাট: “Flat 3B” বললে কিছু বোঝা যায় না, কোন বাড়ির? “Road 7, House 12 এর Flat 3B” বললে তবে চেনা যায়। Flat হলো weak entity, House হলো identifying entity, “3B” হলো discriminator।</p>`,
        en: `<p>Apartments: “Flat 3B” alone means nothing (which building?). “Flat 3B of House 12, Road 7” is identifiable. The flat is a weak entity, the house is its identifying entity, “3B” is the discriminator.</p>`
      },
      exam: [
        '<b>Weak entity set</b>: one whose existence depends on another entity (its identifying entity); identified by the identifying entity’s primary key plus a <b>discriminator</b>. Otherwise it is a strong entity set.',
        'ER notation: <b>double rectangle</b> for the weak entity set; discriminator underlined with a <b>dashed line</b>; identifying relationship drawn as a <b>double diamond</b>.',
        'Primary key of section = (course_id, sec_id, semester, year).'
      ]
    },
    {
      id: 'reduction', stars: 3, visual: 'erToTable',
      title: { bn: 'ER থেকে Relation Schema (Table)-এ রূপান্তর', en: 'Reduction of ER to Relation Schemas' },
      body: {
        bn: `<p>Entity set ও relationship set উভয়কে relation schema হিসেবে প্রকাশ করা যায়। প্রতিটার জন্য একটা unique schema, যার নাম entity/relationship set-এর নামে।</p>
<ul><li><b>Strong entity set</b> → একই attribute সহ schema: <code>student(ID, name, tot_cred)</code></li>
<li><b>Weak entity set</b> → <mark>identifying strong entity-র primary key column যোগ করে</mark>: <code>section(course_id, sec_id, sem, year)</code></li>
<li><b>Many-to-many relationship</b> → <mark>দুই entity set-এর primary key + নিজের descriptive attribute</mark>: <code>advisor(s_id, i_id)</code></li>
<li><b>Composite attribute</b> → ভেঙে আলাদা attribute: name → <code>first_name, last_name</code> (দ্ব্যর্থ না থাকলে prefix বাদ)</li>
<li><b>Multivalued attribute</b> M → <mark>আলাদা schema EM</mark>: <code>inst_phone(ID, phone_number)</code>। ID 22222-এর দুইটা phone → দুইটা tuple: (22222, 456-7890), (22222, 123-4567)</li></ul>
<p><b>Redundancy of schemas:</b></p>
<ul><li><mark>Many-to-one / one-to-many যা “many” দিকে total</mark>: আলাদা table না বানিয়ে many দিকে “one” দিকের primary key যোগ করো। inst_dept-এর table না, instructor-এ dept_name।</li>
<li>One-to-one-এ যেকোনো দিককে “many” ধরা যায়।</li>
<li>Many দিকে participation partial হলে এভাবে করলে <b>null</b> মান আসতে পারে।</li>
<li>Weak entity-কে identifying entity-র সাথে যুক্ত করা relationship-এর schema redundant (sec_course লাগে না)।</li></ul>`,
        en: `<p>Entity sets and relationship sets can be expressed uniformly as relation schemas: one unique schema each, named after the entity or relationship set.</p>
<ul><li><b>Strong entity set</b> → schema with the same attributes: <code>student(ID, name, tot_cred)</code></li>
<li><b>Weak entity set</b> → <mark>includes a column for the primary key of the identifying strong entity set</mark>: <code>section(course_id, sec_id, sem, year)</code></li>
<li><b>Many-to-many relationship</b> → <mark>primary keys of both entity sets + descriptive attributes</mark>: <code>advisor(s_id, i_id)</code></li>
<li><b>Composite attribute</b> → flattened: name → <code>first_name, last_name</code> (prefix omitted if unambiguous)</li>
<li><b>Multivalued attribute</b> M → <mark>separate schema EM</mark>: <code>inst_phone(ID, phone_number)</code>. ID 22222 with two phones → tuples (22222, 456-7890) and (22222, 123-4567)</li></ul>
<p><b>Redundancy of schemas:</b></p>
<ul><li><mark>Many-to-one / one-to-many sets total on the many side</mark>: add the “one” side’s primary key to the “many” side instead of a new schema. No inst_dept table; add dept_name to instructor.</li>
<li>For one-to-one, either side can act as the “many” side.</li>
<li>If participation on the many side is partial, this may produce <b>null</b> values.</li>
<li>The schema for the relationship linking a weak entity to its identifying entity is redundant (no sec_course table).</li></ul>`
      },
      example: {
        bn: `<p>একজন ছাত্রের তিনটা ফোন নম্বর student table-এর এক ঘরে কমা দিয়ে লেখা যায় না (atomic না)। তাই আলাদা table <code>student_phone(ID, phone)</code>: প্রতিটা নম্বর এক লাইনে।</p>`,
        en: `<p>A student’s three phone numbers can’t go comma-separated into one cell (not atomic). So we create <code>student_phone(ID, phone)</code>, one number per row.</p>`
      },
      exam: [
        'Strong entity set → schema with the same attributes; weak entity set → schema including the primary key of the identifying strong entity set.',
        'Many-to-many relationship set → schema with primary keys of the participating entity sets plus descriptive attributes, e.g. advisor(s_id, i_id).',
        'Composite attributes are flattened; a multivalued attribute M of E becomes a separate schema EM(primary key of E, M), e.g. inst_phone(ID, phone_number).',
        'Many-to-one sets total on the many side: add the one side’s PK to the many side (no extra schema); schema for a weak entity’s identifying relationship is redundant.'
      ]
    },
    {
      id: 'specialization', stars: 3, visual: 'isa',
      title: { bn: 'Specialization ও Generalization (ISA)', en: 'Specialization and Generalization (ISA)' },
      body: {
        bn: `<p><b>Specialization</b>: <mark>top-down design</mark>। একটা entity set-এর ভিতরে আলাদা বৈশিষ্ট্যের sub-group চিহ্নিত করা। এগুলো lower-level entity set হয়, যাদের এমন attribute/relationship থাকে যা higher-level-এর সবার নেই।</p>
<ul><li>দেখানো হয় <b>ISA</b> লেখা triangle দিয়ে (instructor “is a” person)।</li>
<li><b>Attribute inheritance</b>: <mark>lower-level entity set higher-level-এর সব attribute ও relationship participation পায়</mark>।</li>
<li><b>Overlapping</b>: একজন একসাথে দুইটাতেই থাকতে পারে (employee ও student)। <b>Disjoint</b>: একটাতেই (instructor বা secretary)।</li></ul>
<p><b>Generalization</b>: <mark>bottom-up design</mark>। একই বৈশিষ্ট্যের কয়েকটা entity set মিলিয়ে একটা higher-level entity set। <mark>Specialization ও generalization একে অপরের উল্টো</mark>, ER diagram-এ একইভাবে আঁকা হয়।</p>
<p><b>Completeness constraint</b>: higher-level-এর entity-কে কি অন্তত একটা lower-level-এ থাকতেই হবে?</p>
<ul><li><b>Total</b>: থাকতেই হবে (student হয় graduate নয় undergraduate)।</li><li><b>Partial</b>: না-ও থাকতে পারে (default)।</li></ul>
<p><b>Schema-তে রূপান্তর:</b></p>
<ul><li><b>Method 1</b>: higher-level-এর schema; প্রতিটা lower-level-এর schema-তে higher-level-এর PK + নিজের attribute। <code>person(ID, name, street, city)</code>, <code>student(ID, tot_cred)</code>, <code>employee(ID, salary)</code>। অসুবিধা: <mark>employee-র তথ্য পেতে দুইটা relation access করতে হয়</mark>।</li>
<li><b>Method 2</b>: প্রতিটা entity set-এর schema-তে সব local ও inherited attribute। <code>student(ID, name, street, city, tot_cred)</code>। অসুবিধা: <mark>যে একসাথে student ও employee, তার name, street, city দুইবার জমা</mark>।</li></ul>`,
        en: `<p><b>Specialization</b>: a <mark>top-down design process</mark>. We designate sub-groupings within an entity set that are distinctive from other entities. They become lower-level entity sets with attributes or relationships that don’t apply to the higher-level set.</p>
<ul><li>Depicted by a triangle labelled <b>ISA</b> (instructor “is a” person).</li>
<li><b>Attribute inheritance</b>: <mark>a lower-level entity set inherits all attributes and relationship participation of its higher-level entity set</mark>.</li>
<li><b>Overlapping</b>: an entity may belong to several (employee and student). <b>Disjoint</b>: at most one (instructor or secretary).</li></ul>
<p><b>Generalization</b>: a <mark>bottom-up design process</mark>, combining entity sets sharing features into a higher-level entity set. <mark>Specialization and generalization are simple inversions</mark> and drawn the same way.</p>
<p><b>Completeness constraint</b>: must a higher-level entity belong to at least one lower-level set?</p>
<ul><li><b>Total</b>: it must (every student is graduate or undergraduate).</li><li><b>Partial</b>: it need not (the default).</li></ul>
<p><b>Representing as schemas:</b></p>
<ul><li><b>Method 1</b>: a schema for the higher level; each lower-level schema has the higher-level PK plus local attributes: <code>person(ID, name, street, city)</code>, <code>student(ID, tot_cred)</code>, <code>employee(ID, salary)</code>. Drawback: <mark>getting an employee’s information requires accessing two relations</mark>.</li>
<li><b>Method 2</b>: each schema holds all local and inherited attributes: <code>student(ID, name, street, city, tot_cred)</code>. Drawback: <mark>name, street, city may be stored redundantly for people who are both students and employees</mark>.</li></ul>`
      },
      example: {
        bn: `<p>“মানুষ” (person) থেকে ভেঙে “ছাত্র” ও “কর্মচারী” = specialization (উপর থেকে নিচে)। আবার “গাড়ি”, “বাস”, “ট্রাক” মিলিয়ে “যানবাহন” বানানো = generalization (নিচ থেকে উপরে)। একজন TA একসাথে ছাত্র ও কর্মচারী: overlapping।</p>`,
        en: `<p>Splitting “person” into “student” and “employee” is specialization (top-down). Combining “car”, “bus”, “truck” into “vehicle” is generalization (bottom-up). A TA is both student and employee: overlapping.</p>`
      },
      exam: [
        '<b>Specialization</b>: top-down process designating sub-groupings within an entity set; shown by an <b>ISA</b> triangle; lower-level sets inherit all attributes and relationships (<b>attribute inheritance</b>). Overlapping vs disjoint.',
        '<b>Generalization</b>: bottom-up process combining entity sets with shared features into a higher-level set; the inverse of specialization.',
        '<b>Completeness constraint</b>: total (must belong to a lower-level set) vs partial (default).',
        'Schema method 1: higher-level PK + local attributes (drawback: two relations to access). Method 2: all local + inherited attributes (drawback: redundancy for overlapping entities).'
      ]
    },
    {
      id: 'aggregation', stars: 2, visual: 'aggregation',
      title: { bn: 'Aggregation', en: 'Aggregation' },
      body: {
        bn: `<p>ধরো ternary relationship <code>proj_guide</code> (instructor, student, project) আছে। এখন project-এ guide-এর দেওয়া student-এর <b>evaluation</b> রাখতে চাই।</p>
<ul><li><code>eval_for</code> আর <code>proj_guide</code> একই তথ্য আংশিক বহন করে: <mark>প্রতিটা eval_for একটা proj_guide-এর সাথে মেলে</mark>।</li>
<li>কিন্তু কিছু proj_guide-এর কোনো eval_for না-ও থাকতে পারে, তাই proj_guide বাদ দেওয়া যায় না।</li></ul>
<p><b>Aggregation</b> দিয়ে redundancy দূর করি: <mark>relationship-কে একটা abstract entity হিসেবে ধরা</mark>, যাতে relationship-এর সাথে relationship হতে পারে।</p>
<p><b>Schema</b>: aggregated relationship-এর primary key + associated entity set-এর primary key + descriptive attribute:</p>
<p><code>eval_for(s_ID, project_id, i_ID, evaluation_id)</code>; <code>proj_guide</code> schema তখন redundant।</p>`,
        en: `<p>Take the ternary relationship <code>proj_guide</code> (instructor, student, project). Now we want to record a guide’s <b>evaluation</b> of a student on a project.</p>
<ul><li><code>eval_for</code> and <code>proj_guide</code> overlap: <mark>every eval_for relationship corresponds to a proj_guide relationship</mark>.</li>
<li>But some proj_guide relationships may have no eval_for, so we can’t discard proj_guide.</li></ul>
<p><b>Aggregation</b> removes the redundancy: <mark>treat the relationship as an abstract entity</mark>, allowing relationships between relationships.</p>
<p><b>Schema</b>: primary key of the aggregated relationship + primary key of the associated entity set + descriptive attributes:</p>
<p><code>eval_for(s_ID, project_id, i_ID, evaluation_id)</code>; the <code>proj_guide</code> schema becomes redundant.</p>`
      },
      example: {
        bn: `<p>Final year project: “ছাত্র X, শিক্ষক Y-এর তত্ত্বাবধানে, project Z করছে”: এই পুরো ব্যবস্থাটার একটা <b>মূল্যায়ন (grade)</b> হয়। Grade কোনো একক entity-র না, পুরো জোড়ার। তাই জোড়াটাকে একটা box বানিয়ে তার সাথে evaluation যুক্ত।</p>`,
        en: `<p>Final-year project: “student X, supervised by teacher Y, on project Z” gets an <b>evaluation</b>. The grade belongs to the whole arrangement, not any single entity, so we box the arrangement and attach the evaluation to it.</p>`
      },
      exam: [
        '<b>Aggregation</b>: treats a relationship set as an abstract entity, allowing relationships between relationships; eliminates redundancy between eval_for and proj_guide.',
        'Schema: primary key of the aggregated relationship + primary key of the associated entity set + descriptive attributes: eval_for(s_ID, project_id, i_ID, evaluation_id).'
      ]
    }
  ],
  written: [
    { q: 'Define entity, entity set, relationship and relationship set with examples.', a: ['Entity: distinguishable object (a specific person).', 'Entity set: entities of same type sharing properties (all instructors).', 'Relationship: association (44553 Peltier advisor 22222 Einstein).', 'Relationship set: {(e1,…,en) | ei ∈ Ei}.'] },
    { q: 'Explain mapping cardinalities with diagrams.', a: ['One to one, one to many, many to one, many to many (draw dot diagrams).', 'ER notation: arrow = one, line = many.', 'Note: some elements may not be mapped.'] },
    { q: 'What is a weak entity set? How is it represented in an ER diagram and converted to a schema?', a: ['Depends on identifying entity; identified by owner PK + discriminator.', 'Double rectangle, dashed underline, double diamond.', 'section(course_id, sec_id, semester, year).'] },
    { q: 'Explain specialization and generalization. Describe two methods to represent specialization as schemas.', a: ['Top-down vs bottom-up; ISA; attribute inheritance; overlapping/disjoint; total/partial.', 'Method 1 + drawback; method 2 + drawback.'] },
    { q: 'Explain the reduction of an ER diagram to relation schemas (strong, weak, M:N, composite, multivalued).', a: ['student(ID, name, tot_cred); section(course_id, sec_id, sem, year); advisor(s_id, i_id).', 'Flatten composite; inst_phone(ID, phone_number) for multivalued.', 'Redundancy: many-to-one total → add FK on many side.'] },
    { q: 'What is aggregation? Why is it needed?', a: ['proj_guide/eval_for redundancy explained.', 'Treat relationship as abstract entity.', 'eval_for(s_ID, project_id, i_ID, evaluation_id).'] }
  ],
  quiz: [
    { q: { bn: 'অন্যদের থেকে আলাদা করা যায় এমন object-কে বলে…', en: 'An object that exists and is distinguishable from others is an…' }, o: ['Entity', 'Attribute', 'Relationship', 'Domain'], a: 0, why: { bn: 'Entity-র সংজ্ঞা।', en: 'Definition of an entity.' } },
    { q: { bn: 'proj_guide (instructor, student, project) কোন ধরনের relationship?', en: 'proj_guide (instructor, student, project) is a…' }, o: ['Unary', 'Binary', 'Ternary', 'Weak'], a: 2, why: { bn: '৩টা entity set = ternary।', en: 'Three entity sets = ternary.' } },
    { q: { bn: 'Student ও Course-এর সম্পর্ক সাধারণত…', en: 'Students and courses usually have which cardinality?' }, o: ['1 : 1', '1 : N', 'N : 1', 'M : N'], a: 3, why: { bn: 'একজন অনেক course, একটা course-এ অনেকজন।', en: 'Many students per course, many courses per student.' } },
    { q: { bn: 'ER diagram-এ directed line (→) মানে…', en: 'A directed line (→) in an ER diagram means…' }, o: ['Many', 'One', 'Total', 'Derived'], a: 1, why: { bn: '→ = one, — = many।', en: '→ = one, — = many.' } },
    { q: { bn: 'Double line কী বোঝায়?', en: 'A double line indicates…' }, o: ['Partial participation', 'Total participation', 'Weak entity', 'Multivalued attribute'], a: 1, why: { bn: 'Double line = total participation।', en: 'Double line = total participation.' } },
    { q: { bn: 'l..h-এ minimum 1 মানে…', en: 'In l..h, a minimum of 1 indicates…' }, o: ['Partial participation', 'Total participation', { bn: 'সীমা নেই', en: 'No limit' }, 'Many to many'], a: 1, why: { bn: 'Minimum 1 = total participation।', en: 'Minimum 1 = total participation.' } },
    { q: { bn: 'Weak entity set-এর identifying relationship আঁকা হয়…', en: 'The identifying relationship of a weak entity set is drawn as a…' }, o: ['Double rectangle', 'Double diamond', 'Dashed ellipse', 'Triangle'], a: 1, why: { bn: 'Double diamond; weak entity নিজে double rectangle।', en: 'Double diamond; the weak entity itself is a double rectangle.' } },
    { q: { bn: 'Multivalued attribute phone_number table-এ কী হয়?', en: 'A multivalued attribute phone_number becomes…' }, o: [{ bn: 'একই table-এ কমা দিয়ে', en: 'Comma-separated in the same table' }, { bn: 'আলাদা schema: inst_phone(ID, phone_number)', en: 'A separate schema: inst_phone(ID, phone_number)' }, { bn: 'বাদ দেওয়া হয়', en: 'It is dropped' }, { bn: 'Primary key হয়', en: 'It becomes the primary key' }], a: 1, why: { bn: 'Multivalued M → আলাদা schema EM।', en: 'Multivalued M → separate schema EM.' } },
    { q: { bn: 'Specialization কোন ধরনের design process?', en: 'Specialization is which kind of design process?' }, o: ['Bottom-up', 'Top-down', 'Random', 'Physical'], a: 1, why: { bn: 'Specialization top-down, generalization bottom-up।', en: 'Specialization is top-down; generalization bottom-up.' } },
    { q: { bn: 'Relationship-কে abstract entity হিসেবে ধরা হয় কোন ধারণায়?', en: 'Treating a relationship as an abstract entity is called…' }, o: ['Aggregation', 'Specialization', 'Normalization', 'Rename'], a: 0, why: { bn: 'Aggregation relationship-এর সাথে relationship হতে দেয়।', en: 'Aggregation allows relationships between relationships.' } }
  ]
});

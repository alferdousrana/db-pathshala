window.CHAPTERS = window.CHAPTERS || [];
CHAPTERS.push({
  id: 'ch2', num: 2, color: '#0E8A7E', icon: '🏛️', source: 'Lecture_2',
  title: { bn: 'Abstraction, Schema, Data Model ও Architecture', en: 'Abstraction, Schemas, Data Models & Architectures' },
  blurb: { bn: '৩ level, schema vs instance, ER/Relational model, Centralized থেকে Client/Server', en: '3 levels, schema vs instance, ER/relational model, centralized to client/server' },
  topics: [
    {
      id: 'abstraction', stars: 3, visual: 'abstraction',
      title: { bn: 'Levels of Abstraction (৩টা স্তর)', en: 'Levels of Abstraction' },
      body: {
        bn: `<p>সাধারণ user-কে জটিলতা থেকে বাঁচাতে database-কে ৩টা স্তরে দেখা হয়:</p>
<ul><li><b>Physical level</b>: <mark>একটা record (যেমন instructor) কীভাবে store হয়</mark>: block, file, index। সবচেয়ে নিচের স্তর।</li>
<li><b>Logical level</b>: <mark>database-এ কী data আছে আর data-র মধ্যে সম্পর্ক কী</mark>। যেমন:
<pre class="code"><code>type instructor = record
    ID : string;
    name : string;
    dept_name : string;
    salary : integer;
end;</code></pre></li>
<li><b>View level</b>: application program data type-এর খুঁটিনাটি লুকায়। View দিয়ে <mark>নিরাপত্তার জন্য তথ্য লুকানো যায়</mark> (যেমন employee-র salary)।</li></ul>`,
        en: `<p>To hide complexity from users, a database is described at three levels:</p>
<ul><li><b>Physical level</b>: describes <mark>how a record (e.g. instructor) is stored</mark>: blocks, files, indexes. The lowest level.</li>
<li><b>Logical level</b>: describes <mark>what data is stored and the relationships among the data</mark>. For example:
<pre class="code"><code>type instructor = record
    ID : string;
    name : string;
    dept_name : string;
    salary : integer;
end;</code></pre></li>
<li><b>View level</b>: application programs hide details of data types. Views can also <mark>hide information for security</mark> (such as an employee’s salary).</li></ul>`
      },
      example: {
        bn: `<p>Facebook profile খুললে তুমি দেখো নাম, ছবি, পোস্ট (<b>view level</b>)। Facebook-এর engineer জানে এগুলো user, post, friendship table-এ (<b>logical level</b>)। আর data center-এর SSD-তে এগুলো আসলে byte-এর block (<b>physical level</b>)। তোমার বন্ধু তোমার phone number দেখে না, কারণ view তা লুকিয়ে রেখেছে।</p>`,
        en: `<p>Opening a Facebook profile you see a name, photo and posts (<b>view level</b>). Engineers know these live in user, post and friendship tables (<b>logical level</b>). On the data-center SSDs they are just blocks of bytes (<b>physical level</b>). Your friend can’t see your phone number because the view hides it.</p>`
      },
      exam: [
        '<b>Physical level</b>: describes how a record (e.g. instructor) is stored.',
        '<b>Logical level</b>: describes the data stored in the database and the relationships among the data.',
        '<b>View level</b>: application programs hide details of data types; views can also hide information (such as an employee’s salary) for security purposes.'
      ]
    },
    {
      id: 'schema-instance', stars: 3, visual: 'schemaInstance',
      title: { bn: 'Instance ও Schema', en: 'Instances and Schemas' },
      body: {
        bn: `<p><b>Instance</b>: <mark>কোনো একটা নির্দিষ্ট মুহূর্তে database-এ জমা থাকা তথ্যের সংগ্রহ</mark>। Data বদলালেই instance বদলায়।</p>
<p><b>Schema</b>: <mark>database-এর সামগ্রিক নকশা (overall design)</mark>। এটা খুব কম বদলায়।</p>
<p class="tip">🧠 Programming-এর সাথে মিলাও: <code>int x;</code> হলো schema (type/design), আর এই মুহূর্তে <code>x = 5</code> হলো instance (value)।</p>`,
        en: `<p><b>Instance</b>: <mark>the collection of information stored in the database at a particular moment</mark>. It changes whenever data changes.</p>
<p><b>Schema</b>: <mark>the overall design of the database</mark>. It rarely changes.</p>
<p class="tip">🧠 Programming analogy: <code>int x;</code> is the schema (the type/design); <code>x = 5</code> right now is the instance (the value).</p>`
      },
      example: {
        bn: `<p>ক্লাসের হাজিরা খাতার কলামের শিরোনাম (Roll, Name, তারিখ) হলো <b>schema</b>। আজকের দিনে খাতায় যা লেখা আছে সেটা <b>instance</b>। কাল নতুন হাজিরা দিলে instance বদলাবে, কলামের শিরোনাম একই থাকবে।</p>`,
        en: `<p>The column headings of an attendance register (Roll, Name, Date) are the <b>schema</b>. What’s written in it today is the <b>instance</b>. Tomorrow’s entries change the instance; the headings stay the same.</p>`
      },
      exam: [
        '<b>Instance</b>: the collection of information stored in the database at a particular moment.',
        '<b>Schema</b>: the overall design of the database. Schema changes rarely; instance changes frequently.'
      ]
    },
    {
      id: 'three-schema', stars: 2, visual: 'threeSchema',
      title: { bn: 'Physical, Conceptual ও External Schema', en: 'Physical, Conceptual and External Schemas' },
      body: {
        bn: `<p><b>Physical (Internal) schema</b>: database-এর physical storage structure বর্ণনা করে। Internal level-এর কাজ:</p>
<ul><li>Data-র জন্য storage space allocation</li><li>Stored size সহ record description</li><li>Record placement</li><li><mark>Data compression ও data encryption</mark> কৌশল</li></ul>
<p><b>Conceptual (Logical) schema</b>: সব user-এর জন্য <mark>পুরো database-এর structure</mark>: entity, data type, relationship, user operation ও constraint; physical storage-এর খুঁটিনাটি লুকায়। কাজ:</p>
<ul><li>সব entity, attribute ও relationship</li><li>Data-র উপর constraint</li><li>Semantic information</li><li>Security information</li><li>Consistency ও integrity রক্ষার check</li></ul>
<p><b>External schema</b>: <mark>একটা নির্দিষ্ট user group যে অংশ দেখতে চায় শুধু সেটুকু</mark> দেখায়, বাকি লুকিয়ে রাখে।</p>`,
        en: `<p><b>Physical (internal) schema</b>: describes the physical storage structure of the database. The internal level handles:</p>
<ul><li>Storage space allocation for data</li><li>Record descriptions with stored sizes</li><li>Record placement</li><li><mark>Data compression and encryption</mark> techniques</li></ul>
<p><b>Conceptual (logical) schema</b>: describes <mark>the structure of the whole database</mark> for a community of users: entities, data types, relationships, user operations and constraints, hiding physical storage details. It covers:</p>
<ul><li>All entities, attributes and relationships</li><li>Constraints on the data</li><li>Semantic information</li><li>Security information</li><li>Checks to retain consistency and integrity</li></ul>
<p><b>External schema</b>: describes <mark>the part of the database a particular user group is interested in</mark> and hides the rest.</p>`
      },
      example: {
        bn: `<p>হাসপাতালের database: ডাক্তারের external view-এ রোগীর রোগের ইতিহাস; cashier-এর view-এ শুধু bill। Conceptual schema-তে আছে patient, doctor, bill সব table আর সম্পর্ক। Internal schema ঠিক করে কোন data encrypt হবে, কোন disk-এ যাবে।</p>`,
        en: `<p>Hospital database: a doctor’s external view shows medical history; the cashier’s view shows only bills. The conceptual schema has every table (patient, doctor, bill) and their relationships. The internal schema decides what is encrypted and which disk it sits on.</p>`
      },
      exam: [
        '<b>Physical/internal schema</b>: describes the physical storage structure — storage allocation, record descriptions, record placement, data compression and encryption.',
        '<b>Conceptual/logical schema</b>: describes the structure of the whole database for a community of users — entities, data types, relationships, operations and constraints — hiding physical storage details.',
        '<b>External schema</b>: describes the part of the database a particular user group is interested in and hides the rest.'
      ]
    },
    {
      id: 'data-models', stars: 2, visual: 'dataModels',
      title: { bn: 'Data Models', en: 'Data Models' },
      body: {
        bn: `<p><b>Data model</b> হলো কিছু tool-এর সংগ্রহ যা দিয়ে বর্ণনা করা হয়: <mark>Data, Data relationships, Data semantics, Data constraints</mark>।</p>
<p>ধরনগুলো:</p>
<ul><li><b>Relational model</b></li><li><b>Entity-Relationship (ER) model</b>: মূলত database design-এর জন্য</li><li><b>Object-based model</b>: Object-oriented ও Object-relational</li><li><b>Semi-structured model</b> (XML)</li><li>পুরনো model: <b>Network</b>, <b>Hierarchical</b></li></ul>`,
        en: `<p>A <b>data model</b> is a collection of tools for describing <mark>data, data relationships, data semantics and data constraints</mark>.</p>
<p>Kinds:</p>
<ul><li><b>Relational model</b></li><li><b>Entity-Relationship (ER) model</b>: mainly for database design</li><li><b>Object-based models</b>: object-oriented and object-relational</li><li><b>Semi-structured model</b> (XML)</li><li>Older models: <b>network</b> and <b>hierarchical</b></li></ul>`
      },
      example: {
        bn: `<p>বাড়ি বানাতে যেমন আগে নকশার ধরন ঠিক করো (ঢালাই ছাদ নাকি টিনের), database বানাতেও আগে data model ঠিক করতে হয়। আজকের প্রায় সব app (bKash, Daraz) relational model ব্যবহার করে।</p>`,
        en: `<p>Just as you choose a building style before construction, you choose a data model before building a database. Almost every app today (bKash, Daraz) uses the relational model.</p>`
      },
      exam: [
        '<b>Data model</b>: a collection of tools for describing data, data relationships, data semantics and data constraints.',
        'Types: <b>relational</b>, <b>entity-relationship</b> (mainly for design), <b>object-based</b> (object-oriented and object-relational), <b>semi-structured</b> (XML); older: <b>network</b> and <b>hierarchical</b>.'
      ]
    },
    {
      id: 'er-intro', stars: 3, visual: 'erNotation',
      title: { bn: 'ER Model ও এর চিহ্ন', en: 'The ER Model and its Symbols' },
      body: {
        bn: `<p><b>E-R data model</b> বাস্তব জগৎকে দেখে <mark>কিছু মৌলিক object (entity) আর তাদের মধ্যকার সম্পর্ক (relationship)</mark> হিসেবে। Database-এর পুরো logical structure ছবিতে আঁকা যায় E-R diagram দিয়ে।</p>
<p><b>E-R diagram-এর উপাদান</b> (⭐ পরীক্ষায় আঁকতে বলে):</p>
<ul><li><b>Rectangle</b>: entity set</li><li><b>Ellipse</b>: attribute</li><li><b>Diamond</b>: relationship set</li><li><b>Line</b>: attribute-কে entity-র সাথে আর entity-কে relationship-এর সাথে যুক্ত করে</li><li><b>Double ellipse</b>: multivalued attribute</li><li><b>Dashed ellipse</b>: derived attribute</li><li><b>Double line</b>: relationship-এ entity-র total participation</li><li><b>Double rectangle</b>: weak entity set</li></ul>`,
        en: `<p>The <b>E-R data model</b> sees the real world as <mark>a collection of basic objects (entities) and relationships among them</mark>. The overall logical structure can be drawn as an E-R diagram.</p>
<p><b>Components of an E-R diagram</b> (⭐ often asked to draw):</p>
<ul><li><b>Rectangle</b>: entity sets</li><li><b>Ellipse</b>: attributes</li><li><b>Diamond</b>: relationship sets</li><li><b>Lines</b>: link attributes to entity sets and entity sets to relationships</li><li><b>Double ellipse</b>: multivalued attributes</li><li><b>Dashed ellipse</b>: derived attributes</li><li><b>Double lines</b>: total participation of an entity in a relationship set</li><li><b>Double rectangle</b>: weak entity sets</li></ul>`
      },
      example: {
        bn: `<p>“ছাত্র course নেয়”: <b>student</b> ও <b>course</b> হলো rectangle, <b>takes</b> হলো diamond, ছাত্রের <b>name</b> একটা ellipse, একাধিক <b>phone</b> হলে double ellipse, আর <b>age</b> জন্মতারিখ থেকে হিসাব হয় বলে dashed ellipse। Chapter 6-এ বিস্তারিত।</p>`,
        en: `<p>“Students take courses”: <b>student</b> and <b>course</b> are rectangles, <b>takes</b> is a diamond, <b>name</b> is an ellipse, several <b>phone</b> numbers make a double ellipse, and <b>age</b>, computed from date of birth, is a dashed ellipse. More in Chapter 6.</p>`
      },
      exam: [
        'The <b>E-R model</b> is based on a perception of the real world as a collection of basic objects called <b>entities</b> and <b>relationships</b> among them.',
        'Rectangle = entity set; Ellipse = attribute; Diamond = relationship set; Lines = links; Double ellipse = multivalued; Dashed ellipse = derived; Double lines = total participation; Double rectangle = weak entity set.'
      ]
    },
    {
      id: 'relational-model', stars: 3, visual: 'relationAnatomy',
      title: { bn: 'Relational Model: সুবিধা ও অসুবিধা', en: 'Relational Model: Advantages and Disadvantages' },
      body: {
        bn: `<p><b>Relational model</b> <mark>table-এর সংগ্রহ দিয়ে data ও data-র মধ্যকার সম্পর্ক</mark> দুটোই প্রকাশ করে। Table হলো row ও column; প্রতিটা column-এর নাম unique।</p>
<p>Relational model-এ: <mark>row = <b>tuple</b>, column header = <b>attribute</b>, table = <b>relation</b></mark>।</p>
<p><b>সুবিধা:</b></p>
<ul><li><b>Simplicity</b>: hierarchical ও network model-এর চেয়েও সহজ; designer physical storage নিয়ে না ভেবে logical view-তে মন দিতে পারে।</li>
<li><b>Structural independence</b>: navigational data access-এর উপর নির্ভর করে না; structure বদলালেও data access প্রভাবিত হয় না।</li>
<li>Design, implementation, maintenance ও ব্যবহার সহজ।</li>
<li>Flexible ও শক্তিশালী query capability।</li></ul>
<p><b>অসুবিধা:</b></p>
<ul><li><b>Hardware overhead</b>: বেশি শক্তিশালী hardware ও storage লাগে।</li>
<li><mark>Design করা সহজ বলে খারাপ design</mark> হয়ে যেতে পারে।</li></ul>`,
        en: `<p>The <b>relational model</b> uses <mark>a collection of tables to represent both data and the relationships among those data</mark>. A table has rows and columns; each column has a unique name.</p>
<p>In relational terms: <mark>a row is a <b>tuple</b>, a column header is an <b>attribute</b>, and the table is a <b>relation</b></mark>.</p>
<p><b>Advantages:</b></p>
<ul><li><b>Simplicity</b>: simpler than hierarchical and network models; designers focus on the logical view instead of physical storage.</li>
<li><b>Structural independence</b>: does not depend on navigational access; changes in structure do not affect data access.</li>
<li>Ease of design, implementation, maintenance and use.</li>
<li>Flexible and powerful query capability.</li></ul>
<p><b>Disadvantages:</b></p>
<ul><li><b>Hardware overheads</b>: needs more powerful hardware and storage.</li>
<li><mark>Easy-to-design capability can lead to bad design.</mark></li></ul>`
      },
      example: {
        bn: `<p>Excel sheet-এর মতো ভাবো: sheet = relation, প্রতিটা লাইন = tuple, উপরের শিরোনাম = attribute। তবে Excel-এর মতো যেকোনো ঘরে যা খুশি লেখা যায় না, প্রতিটা column-এর নির্দিষ্ট domain থাকে।</p>`,
        en: `<p>Think of an Excel sheet: the sheet is a relation, each line a tuple, each heading an attribute. Unlike Excel, though, each column has a fixed domain, so you can’t type anything anywhere.</p>`
      },
      exam: [
        'The <b>relational model</b> uses a collection of tables to represent both data and the relationships among those data. Row = <b>tuple</b>, column header = <b>attribute</b>, table = <b>relation</b>.',
        'Advantages: <b>simplicity</b>, <b>structural independence</b>, ease of design/implementation/maintenance, flexible and powerful query capability.',
        'Disadvantages: <b>hardware overheads</b>; easy design capability can lead to <b>bad design</b>.'
      ]
    },
    {
      id: 'db-types', stars: 2, visual: 'dbTypes',
      title: { bn: 'Database System-এর ধরন ও Centralized DB', en: 'Types of Database Systems; Centralized DB' },
      body: {
        bn: `<p>DBMS-কে ভাগ করা যায়:</p>
<ul><li><b>User সংখ্যা অনুযায়ী</b>: Single-user DBMS, Multi-user DBMS</li>
<li><b>Site location অনুযায়ী</b>: Centralized, Distributed, Parallel, Client/Server DBMS</li></ul>
<p><b>Centralized database system</b>: একটা processor ও তার storage device নিয়ে, <mark>একটাই জায়গায় (single location)</mark> অবস্থিত। System ও data একটা central site থেকে নিয়ন্ত্রিত।</p>
<p class="tip">একটা centralized DBMS <b>অনেক user</b> support করতে পারে, কিন্তু DBMS আর database দুটোই <b>একটাই computer site</b>-এ থাকে।</p>`,
        en: `<p>DBMSs can be classified:</p>
<ul><li><b>By number of users</b>: single-user DBMS, multi-user DBMS</li>
<li><b>By site location</b>: centralized, distributed, parallel, client/server DBMS</li></ul>
<p><b>Centralized database system</b>: a single processor with its storage devices, <mark>physically confined to a single location</mark>. The system and its data are controlled from one central site.</p>
<p class="tip">A centralized DBMS can support <b>multiple users</b>, but the DBMS and the database reside totally at <b>a single computer site</b>.</p>`
      },
      example: {
        bn: `<p>পাড়ার একটা ফার্মেসি: দোকানের একটা কম্পিউটারে সব ওষুধের stock, তিনটা কাউন্টার থেকে তিনজন সেলসম্যান ওই একটা কম্পিউটারের data ব্যবহার করে। এটাই centralized।</p>`,
        en: `<p>A neighbourhood pharmacy: one computer in the shop holds all the stock, and three salespeople at three counters all use that one computer’s data. That’s centralized.</p>`
      },
      exam: [
        'Classification: by number of users (<b>single-user</b>, <b>multi-user</b>); by site location (<b>centralized</b>, <b>distributed</b>, <b>parallel</b>, <b>client/server</b>).',
        '<b>Centralized DBMS</b>: data stored at a single computer site; may support multiple users, but the DBMS and database reside totally at one site, controlled centrally.'
      ]
    },
    {
      id: 'distributed', stars: 3, visual: 'distributed',
      title: { bn: 'Distributed Database System', en: 'Distributed Database System' },
      body: {
        bn: `<p><b>Distributed database</b> হলো <mark>computer network-এ ছড়িয়ে থাকা, যৌক্তিকভাবে সম্পর্কিত একাধিক database-এর সংগ্রহ</mark>।</p>
<p><b>Distributed DBMS</b> এমন software যা distributed database manage করে এবং <mark>distribution-কে user-এর কাছে transparent (অদৃশ্য) রাখে</mark>। User বুঝতেই পারে না data কোথায়।</p>
<p>Data বিভিন্ন database-এ, বিভিন্ন DBMS software দিয়ে, বিভিন্ন machine ও operating system-এ চলে; machine গুলো ভৌগোলিকভাবে ছড়ানো এবং বিভিন্ন network দিয়ে যুক্ত। একটা application ভিন্ন ভিন্ন জায়গার data নিয়ে একসাথে কাজ করতে পারে।</p>`,
        en: `<p>A <b>distributed database</b> is <mark>a collection of multiple logically interrelated databases distributed over a computer network</mark>.</p>
<p>A <b>distributed DBMS</b> is the software that manages it <mark>while making the distribution transparent to the user</mark>: the user doesn’t notice where the data lives.</p>
<p>Data may sit in different databases, managed by different DBMS software on different machines and operating systems, geographically spread and connected by various networks. One application can operate on data spread across these machines.</p>`
      },
      example: {
        bn: `<p>একটা ব্যাংকের ঢাকা, চট্টগ্রাম, সিলেট শাখার আলাদা server আছে। চট্টগ্রামের account থেকে তুমি ঢাকার ATM-এ টাকা তুলছ, কিন্তু তোমার কাছে মনে হচ্ছে একটাই ব্যাংক database। এটাই transparency।</p>`,
        en: `<p>A bank has separate servers in its Dhaka, Chattogram and Sylhet branches. You withdraw cash in Dhaka from a Chattogram account, yet it feels like one bank database. That is transparency.</p>`
      },
      exam: [
        '<b>Distributed database</b>: a collection of multiple logically interrelated databases distributed over a computer network.',
        '<b>Distributed DBMS</b>: software that manages a distributed database while making the distribution <b>transparent</b> to the user.',
        'Data may be managed by different DBMSs on different machines and operating systems, geographically distributed and connected by networks.'
      ]
    },
    {
      id: 'parallel', stars: 3, visual: 'parallel',
      title: { bn: 'Parallel Database System', en: 'Parallel Database System' },
      body: {
        bn: `<p><b>Parallel database system</b>-এ <mark>একাধিক CPU ও disk parallel-এ</mark> কাজ করে, তাই processing ও I/O speed বাড়ে। খুব বড় database-এ query বা প্রতি সেকেন্ডে বিপুল সংখ্যক transaction লাগে এমন জায়গায় ব্যবহার হয়।</p>
<p><b>Architecture ৪ ধরনের:</b></p>
<ul><li><b>Shared memory</b>: সব processor একটা common memory share করে।</li>
<li><b>Shared disk</b>: সব processor একই disk share করে। একে <b>cluster</b>-ও বলে।</li>
<li><b>Independent resources (shared nothing)</b>: memory বা disk কিছুই share করে না।</li>
<li><b>Hierarchical</b>: আগের তিনটার <mark>hybrid</mark>।</li></ul>
<p class="tip">⭐ Parallel vs Distributed-এর পার্থক্য নিচের টেবিলে, পরীক্ষায় খুব common।</p>
<div class="vslot" data-v="parVsDist"></div>`,
        en: `<p>A <b>parallel database system</b> uses <mark>multiple CPUs and disks in parallel</mark>, improving processing and I/O speed. It suits applications that query extremely large databases or process a huge number of transactions per second.</p>
<p><b>Four architectures:</b></p>
<ul><li><b>Shared memory</b>: all processors share a common memory.</li>
<li><b>Shared disk</b>: all processors share a common set of disks; also called <b>clusters</b>.</li>
<li><b>Independent resources (shared nothing)</b>: processors share neither memory nor disk.</li>
<li><b>Hierarchical</b>: a <mark>hybrid</mark> of the three.</li></ul>
<p class="tip">⭐ Parallel vs distributed differences are a very common question; see the table.</p>
<div class="vslot" data-v="parVsDist"></div>`
      },
      example: {
        bn: `<p>১১.১১ sale-এ Daraz-এ প্রতি সেকেন্ডে হাজার হাজার order। একটা CPU দিয়ে সম্ভব না, তাই একই server room-এ অনেক machine একসাথে order process করে। এটা parallel। আর বিভিন্ন দেশে ছড়ানো data হলে সেটা distributed।</p>`,
        en: `<p>During an 11.11 sale Daraz gets thousands of orders per second. One CPU can’t cope, so many machines in the same server room process them together: parallel. Data spread across countries would be distributed.</p>`
      },
      exam: [
        '<b>Parallel database system</b>: multiple CPUs and disks in parallel, improving processing and I/O speed; used for very large databases and very high transaction rates.',
        'Architectures: <b>shared memory</b>, <b>shared disk</b> (clusters), <b>independent resources / shared nothing</b>, <b>hierarchical</b> (hybrid).',
        'Parallel vs distributed: machines close vs far apart; dedicated high-speed LAN vs public network (Internet); small vs non-negligible communication cost; any architecture vs usually shared-nothing.'
      ]
    },
    {
      id: 'client-server', stars: 2, visual: 'clientServer',
      title: { bn: 'Client/Server Database System', en: 'Client/Server Database System' },
      body: {
        bn: `<p>Client/Server architecture-এর দুটো logical অংশ: <b>client</b> ও <b>server</b>। Client সাধারণত PC/workstation; server বড় workstation।</p>
<p>DBMS-এর application ও tool চলে client-এ, আর DBMS software থাকে server-এ। <mark>Server = <b>back-end</b>, client = <b>front-end</b></mark>। দুটো network দিয়ে যুক্ত; client DBMS-এর কাছে service চায়।</p>
<p><b>সুবিধা:</b></p>
<ul><li>বেশি productive কাজ, existing data-র ভালো ব্যবহার</li><li>Centralized system-এর চেয়ে বেশি flexible</li><li>Server-এর একটা database অনেক client share করতে পারে</li><li>ভালো DBMS performance</li><li>Mainframe-এর কাজ কম খরচের platform-এ</li></ul>
<p><b>অসুবিধা:</b></p>
<ul><li><mark>Labor/programming খরচ বেশি</mark>, বিশেষ করে শুরুতে</li><li>Performance monitoring, tuning ও security control-এর management tool-এর অভাব</li></ul>`,
        en: `<p>Client/server architecture has two logical components: <b>client</b> and <b>server</b>. Clients are usually PCs or workstations; the server is a large workstation.</p>
<p>Applications and tools run on clients; the DBMS software resides on the server. <mark>The server is the <b>back-end</b>, the client the <b>front-end</b></mark>. They are connected by a network, and clients request services from the DBMS.</p>
<p><b>Advantages:</b></p>
<ul><li>More productive work and better use of existing data</li><li>More flexible than a centralized system</li><li>One database on the server shared by many client applications</li><li>Better DBMS performance</li><li>Less expensive platforms for work that once needed mainframes</li></ul>
<p><b>Disadvantages:</b></p>
<ul><li><mark>High labor/programming cost</mark>, especially initially</li><li>Lack of management tools for performance monitoring, tuning and security control</li></ul>`
      },
      example: {
        bn: `<p>এই মুহূর্তে তুমি যে app চালাচ্ছ সেটাও client/server! তোমার ফোন (client, front-end) Firebase server-এ (back-end) progress পাঠায়। ফোন, ল্যাপটপ সব client একই server database share করে।</p>`,
        en: `<p>This very app is client/server! Your phone (client, front-end) sends progress to the Firebase server (back-end), and your phone and laptop both share the same server database.</p>`
      },
      exam: [
        '<b>Client/server DBMS</b>: two logical components; applications and tools run on clients (<b>front-end</b>) and the DBMS resides on the server (<b>back-end</b>), connected via a network.',
        'Advantages: more productive work, more flexible than centralized, one database shared by many clients, better performance, cheaper platforms.',
        'Disadvantages: high labor/programming cost initially; lack of management tools for performance monitoring, tuning and security.'
      ]
    }
  ],
  written: [
    { q: 'Explain the three levels of data abstraction with an example.', a: ['Physical level: how a record is stored.', 'Logical level: what data is stored and relationships (give the instructor record type).', 'View level: hides details; views hide information like salary for security.', 'Draw the three-level diagram.'] },
    { q: 'Differentiate between schema and instance.', a: ['Schema: overall design of the database; changes rarely.', 'Instance: information stored at a particular moment; changes frequently.', 'Example: student(ID, name, dept_name) vs the rows present today.'] },
    { q: 'What is a data model? Write the advantages and disadvantages of the relational model.', a: ['Data model: tools for describing data, relationships, semantics, constraints.', 'Advantages: simplicity, structural independence, ease of design/maintenance, powerful queries.', 'Disadvantages: hardware overheads, easy design may lead to bad design.'] },
    { q: 'Differentiate between parallel and distributed database systems.', a: ['Location: close (same room) vs far (different continents).', 'Network: dedicated high-speed LAN vs public Internet.', 'Communication cost: small vs cannot be ignored.', 'Architecture: shared-memory/disk/nothing vs usually shared-nothing.'] },
    { q: 'Describe the client/server database architecture with its advantages and disadvantages.', a: ['Client = front-end running apps; server = back-end running the DBMS; connected by a network.', 'Advantages: flexibility, sharing, performance, cheaper platforms.', 'Disadvantages: high initial programming cost, lack of management tools.'] }
  ],
  quiz: [
    { q: { bn: 'কোন level বলে data “কীভাবে” store হয়?', en: 'Which level describes HOW data is stored?' }, o: ['View level', 'Logical level', 'Physical level', 'External level'], a: 2, why: { bn: 'Physical level = record কীভাবে store হয়।', en: 'Physical level = how a record is stored.' } },
    { q: { bn: 'নিরাপত্তার জন্য salary লুকাতে পারে কোন level?', en: 'Which level can hide salary for security?' }, o: ['View level', 'Physical level', 'Internal level', 'Storage level'], a: 0, why: { bn: 'View level তথ্য লুকাতে পারে।', en: 'The view level can hide information.' } },
    { q: { bn: 'একটা নির্দিষ্ট মুহূর্তে database-এর data হলো…', en: 'The data in a database at a particular moment is the…' }, o: ['Schema', 'Instance', 'Data model', 'Catalog'], a: 1, why: { bn: 'মুহূর্তের data = instance।', en: 'Data at a moment = instance.' } },
    { q: { bn: 'Data compression ও encryption কোন schema-র কাজ?', en: 'Data compression and encryption belong to which schema?' }, o: ['External', 'Conceptual', 'Internal / physical', 'View'], a: 2, why: { bn: 'Internal level storage, compression, encryption সামলায়।', en: 'The internal level handles storage, compression and encryption.' } },
    { q: { bn: 'ER diagram-এ diamond মানে…', en: 'In an ER diagram, a diamond represents…' }, o: ['Entity set', 'Attribute', 'Relationship set', 'Weak entity'], a: 2, why: { bn: 'Diamond = relationship set।', en: 'Diamond = relationship set.' } },
    { q: { bn: 'Dashed ellipse কোন attribute বোঝায়?', en: 'A dashed ellipse shows which attribute?' }, o: ['Multivalued', 'Derived', 'Composite', 'Key'], a: 1, why: { bn: 'Dashed ellipse = derived (যেমন age)।', en: 'Dashed ellipse = derived (e.g. age).' } },
    { q: { bn: 'Relational model-এ row-কে বলে…', en: 'In the relational model, a row is called a…' }, o: ['Attribute', 'Tuple', 'Relation', 'Domain'], a: 1, why: { bn: 'Row = tuple, column = attribute, table = relation।', en: 'Row = tuple, column = attribute, table = relation.' } },
    { q: { bn: 'Relational model-এর একটা অসুবিধা…', en: 'A disadvantage of the relational model is…' }, o: ['Simplicity', 'Structural independence', 'Hardware overheads', 'Powerful queries'], a: 2, why: { bn: 'বেশি শক্তিশালী hardware লাগে।', en: 'It needs more powerful hardware.' } },
    { q: { bn: '“Distribution user-এর কাছে transparent” কোন system-এর বৈশিষ্ট্য?', en: '“Distribution is transparent to the user” describes…' }, o: ['Centralized DBMS', 'Distributed DBMS', 'Single-user DBMS', 'File system'], a: 1, why: { bn: 'Distributed DBMS distribution লুকিয়ে রাখে।', en: 'A distributed DBMS hides the distribution.' } },
    { q: { bn: 'Shared disk architecture-কে আর কী বলে?', en: 'Shared-disk systems are also called…' }, o: ['Clusters', 'Mainframes', 'Clients', 'Views'], a: 0, why: { bn: 'স্লাইড: shared disk systems are sometimes called clusters।', en: 'Slide: shared disk systems are sometimes called clusters.' } },
    { q: { bn: 'Client/Server-এ server-কে বলে…', en: 'In client/server, the server is called the…' }, o: ['Front-end', 'Back-end', 'View', 'Terminal'], a: 1, why: { bn: 'Server = back-end, client = front-end।', en: 'Server = back-end, client = front-end.' } }
  ]
});

// ===============================
// COMPANIES
// ===============================

MERGE (t:Company {
    id: "COMP001",
    name: "TechNova"
})

MERGE (f:Company {
    id: "COMP002",
    name: "FinTech Labs"
})

MERGE (c:Company {
    id: "COMP003",
    name: "CloudSphere"
})

MERGE (i:Company {
    id: "COMP004",
    name: "InnoSoft"
})


// ===============================
// DEVELOPER
// ===============================

MERGE (d:Developer {
    id: "C001"
})
SET
    d.name = "Gitanjali",
    d.email = "gitanjali@example.com",
    d.location = "Bangalore",
    d.experience = 0;


// ===============================
// SKILLS
// ===============================

MERGE (java:Skill {id: "S001"})
SET java.name = "Java", java.category = "Programming";

MERGE (js:Skill {id: "S004"})
SET js.name = "JavaScript", js.category = "Programming";

MERGE (sql:Skill {id: "S005"})
SET sql.name = "SQL", sql.category = "Database";

MERGE (react:Skill {id: "S003"})
SET react.name = "React", react.category = "Frontend";

MERGE (git:Skill {id: "S012"})
SET git.name = "Git", git.category = "Tools";

MERGE (rest:Skill {id: "S013"})
SET rest.name = "REST API", rest.category = "Backend";

MERGE (spring:Skill {id: "S006"})
SET spring.name = "Spring Boot", spring.category = "Backend";

MERGE (docker:Skill {id: "S007"})
SET docker.name = "Docker", docker.category = "Tools";

MERGE (kafka:Skill {id: "S008"})
SET kafka.name = "Kafka", kafka.category = "Backend";

MERGE (aws:Skill {id: "S009"})
SET aws.name = "AWS", aws.category = "Cloud";

MERGE (kubernetes:Skill {id: "S010"})
SET kubernetes.name = "Kubernetes", kubernetes.category = "Cloud";


// ===============================
// DEVELOPER → SKILLS
// ===============================

MATCH (d:Developer {id: "C001"})
MATCH (java:Skill {id: "S001"})
MATCH (js:Skill {id: "S004"})
MATCH (sql:Skill {id: "S005"})
MATCH (react:Skill {id: "S003"})
MATCH (git:Skill {id: "S012"})
MATCH (rest:Skill {id: "S013"})
MATCH (spring:Skill {id: "S006"})
MERGE (d)-[:HAS_SKILL]->(java)
MERGE (d)-[:HAS_SKILL]->(js)
MERGE (d)-[:HAS_SKILL]->(sql)
MERGE (d)-[:HAS_SKILL]->(react)
MERGE (d)-[:HAS_SKILL]->(git)
MERGE (d)-[:HAS_SKILL]->(rest)
MERGE (d)-[:HAS_SKILL]->(spring);


// ===============================
// PROJECTS
// ===============================

MERGE (p1:Project {
    id: "P001",
    name: "CareerGraph Platform",
    description: "Graph based career intelligence application"
})

MERGE (p2:Project {
    id: "P002",
    name: "Food Donation System",
    description: "Spring Boot food donation management system"
})

MERGE (p3:Project {
    id: "P003",
    name: "News Application",
    description: "Android application consuming news APIs"
})

MERGE (p4:Project {
    id: "P004",
    name: "Student Record System",
    description: "Java based student record management system"
})

MERGE (p5:Project {
    id: "P005",
    name: "Plant Disease Detection",
    description: "Java application for plant disease detection"
})

MERGE (p6:Project {
    id: "P006",
    name: "REST API Service",
    description: "Backend REST API using Spring Boot"
})

MERGE (p7:Project {
    id: "P007",
    name: "Portfolio Application",
    description: "React portfolio application"
})

MERGE (p8:Project {
    id: "P008",
    name: "Data Analytics Dashboard",
    description: "SQL based data analysis dashboard"
});


// ===============================
// DEVELOPER → PROJECTS
// ===============================

MATCH (d:Developer {id: "C001"})
MATCH (p1:Project {id: "P001"})
MATCH (p2:Project {id: "P002"})
MATCH (p3:Project {id: "P003"})
MATCH (p4:Project {id: "P004"})
MATCH (p5:Project {id: "P005"})
MATCH (p6:Project {id: "P006"})
MATCH (p7:Project {id: "P007"})
MATCH (p8:Project {id: "P008"})

MERGE (d)-[:BUILT]->(p1)
MERGE (d)-[:BUILT]->(p2)
MERGE (d)-[:BUILT]->(p3)
MERGE (d)-[:BUILT]->(p4)
MERGE (d)-[:BUILT]->(p5)
MERGE (d)-[:BUILT]->(p6)
MERGE (d)-[:BUILT]->(p7)
MERGE (d)-[:BUILT]->(p8);


// ===============================
// PROJECT → SKILLS
// ===============================

MATCH (p1:Project {id: "P001"}), (java:Skill {id: "S001"})
MATCH (spring:Skill {id: "S006"}), (react:Skill {id: "S003"})
MATCH (sql:Skill {id: "S005"}), (git:Skill {id: "S012"})
MATCH (rest:Skill {id: "S013"})

MERGE (p1)-[:USES]->(java)
MERGE (p1)-[:USES]->(spring)
MERGE (p1)-[:USES]->(react)
MERGE (p1)-[:USES]->(sql)
MERGE (p1)-[:USES]->(git)
MERGE (p1)-[:USES]->(rest);


MATCH (p2:Project {id: "P002"}), (java:Skill {id: "S001"})
MATCH (spring:Skill {id: "S006"}), (sql:Skill {id: "S005"})

MERGE (p2)-[:USES]->(java)
MERGE (p2)-[:USES]->(spring)
MERGE (p2)-[:USES]->(sql);


MATCH (p3:Project {id: "P003"}), (java:Skill {id: "S001"})
MATCH (js:Skill {id: "S004"})

MERGE (p3)-[:USES]->(java)
MERGE (p3)-[:USES]->(js);


MATCH (p4:Project {id: "P004"}), (java:Skill {id: "S001"})
MATCH (sql:Skill {id: "S005"})

MERGE (p4)-[:USES]->(java)
MERGE (p4)-[:USES]->(sql);


MATCH (p5:Project {id: "P005"}), (java:Skill {id: "S001"})

MERGE (p5)-[:USES]->(java);


MATCH (p6:Project {id: "P006"}), (java:Skill {id: "S001"})
MATCH (spring:Skill {id: "S006"}), (rest:Skill {id: "S013"})

MERGE (p6)-[:USES]->(java)
MERGE (p6)-[:USES]->(spring)
MERGE (p6)-[:USES]->(rest);


MATCH (p7:Project {id: "P007"}), (js:Skill {id: "S004"})
MATCH (react:Skill {id: "S003"}), (git:Skill {id: "S012"})

MERGE (p7)-[:USES]->(js)
MERGE (p7)-[:USES]->(react)
MERGE (p7)-[:USES]->(git);


MATCH (p8:Project {id: "P008"}), (sql:Skill {id: "S005"})

MERGE (p8)-[:USES]->(sql);


// ===============================
// CAREER ROLES
// ===============================

MERGE (r1:Role {
    id: "R001",
    title: "Java Developer",
    experience: "0 years",
    salary: "3-5 LPA"
})

MERGE (r2:Role {
    id: "R002",
    title: "Spring Boot Developer",
    experience: "1 years",
    salary: "4-6 LPA"
})

MERGE (r3:Role {
    id: "R003",
    title: "Backend Developer",
    experience: "1 years",
    salary: "4-7 LPA"
})

MERGE (r4:Role {
    id: "R004",
    title: "Full Stack Developer",
    experience: "0 years",
    salary: "4-6 LPA"
})

MERGE (r5:Role {
    id: "R005",
    title: "React Developer",
    experience: "0 years",
    salary: "3-5 LPA"
})

MERGE (r6:Role {
    id: "R006",
    title: "Frontend Developer",
    experience: "0 years",
    salary: "3-5 LPA"
})

MERGE (r7:Role {
    id: "R007",
    title: "Cloud Backend Engineer",
    experience: "1 years",
    salary: "5-8 LPA"
});


// ===============================
// ROLE → COMPANY
// ===============================

MATCH (r1:Role {id: "R001"}), (t:Company {id: "COMP001"})
MATCH (r2:Role {id: "R002"})
MATCH (r3:Role {id: "R003"})
MATCH (r4:Role {id: "R004"}), (f:Company {id: "COMP002"})
MATCH (r5:Role {id: "R005"}), (c:Company {id: "COMP003"})
MATCH (r6:Role {id: "R006"}), (i:Company {id: "COMP004"})

MERGE (r1)-[:OPENED_BY]->(t)
MERGE (r2)-[:OPENED_BY]->(t)
MERGE (r3)-[:OPENED_BY]->(t)
MERGE (r4)-[:OPENED_BY]->(f)
MERGE (r5)-[:OPENED_BY]->(c)
MERGE (r6)-[:OPENED_BY]->(i);


// ===============================
// ROLE → REQUIRED SKILLS
// ===============================

MATCH (r1:Role {id: "R001"}), (java:Skill {id: "S001"})
MATCH (spring:Skill {id: "S006"}), (git:Skill {id: "S012"})

MERGE (r1)-[:REQUIRES]->(java)
MERGE (r1)-[:REQUIRES]->(spring)
MERGE (r1)-[:REQUIRES]->(git);


MATCH (r2:Role {id: "R002"}), (java:Skill {id: "S001"})
MATCH (spring:Skill {id: "S006"}), (rest:Skill {id: "S013"})
MATCH (sql:Skill {id: "S005"})

MERGE (r2)-[:REQUIRES]->(java)
MERGE (r2)-[:REQUIRES]->(spring)
MERGE (r2)-[:REQUIRES]->(rest)
MERGE (r2)-[:REQUIRES]->(sql);


MATCH (r3:Role {id: "R003"}), (java:Skill {id: "S001"})
MATCH (spring:Skill {id: "S006"}), (sql:Skill {id: "S005"})
MATCH (rest:Skill {id: "S013"})
MATCH (docker:Skill {id: "S007"})

MERGE (r3)-[:REQUIRES]->(java)
MERGE (r3)-[:REQUIRES]->(spring)
MERGE (r3)-[:REQUIRES]->(sql)
MERGE (r3)-[:REQUIRES]->(rest)
MERGE (r3)-[:REQUIRES]->(docker);


MATCH (r4:Role {id: "R004"}), (java:Skill {id: "S001"})
MATCH (react:Skill {id: "S003"}), (spring:Skill {id: "S006"})
MATCH (sql:Skill {id: "S005"})

MERGE (r4)-[:REQUIRES]->(java)
MERGE (r4)-[:REQUIRES]->(react)
MERGE (r4)-[:REQUIRES]->(spring)
MERGE (r4)-[:REQUIRES]->(sql);


MATCH (r5:Role {id: "R005"}), (react:Skill {id: "S003"})
MATCH (js:Skill {id: "S004"})

MERGE (r5)-[:REQUIRES]->(react)
MERGE (r5)-[:REQUIRES]->(js);


MATCH (r6:Role {id: "R006"}), (react:Skill {id: "S003"})
MATCH (js:Skill {id: "S004"})
MATCH (git:Skill {id: "S012"})

MERGE (r6)-[:REQUIRES]->(react)
MERGE (r6)-[:REQUIRES]->(js)
MERGE (r6)-[:REQUIRES]->(git);


MATCH (r7:Role {id: "R007"}), (java:Skill {id: "S001"})
MATCH (spring:Skill {id: "S006"}), (docker:Skill {id: "S007"})
MATCH (aws:Skill {id: "S009"}), (kubernetes:Skill {id: "S010"})
MATCH (kafka:Skill {id: "S008"})

MERGE (r7)-[:REQUIRES]->(java)
MERGE (r7)-[:REQUIRES]->(spring)
MERGE (r7)-[:REQUIRES]->(docker)
MERGE (r7)-[:REQUIRES]->(aws)
MERGE (r7)-[:REQUIRES]->(kubernetes)
MERGE (r7)-[:REQUIRES]->(kafka);
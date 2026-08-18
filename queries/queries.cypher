// 1. Get all candidates
MATCH (c:Candidate)
RETURN c
ORDER BY c.name;


// 2. Get all jobs with their companies
MATCH (j:Job)-[:POSTED_BY]->(company:Company)
RETURN j.title AS job, company.name AS company, j.location AS location;


// 3. Candidate skills
MATCH (c:Candidate {id: $candidateId})-[:HAS_SKILL]->(s:Skill)
RETURN c.name AS candidate, collect(s.name) AS skills;


// 4. Jobs matching a candidate's skills
MATCH (c:Candidate {id: $candidateId})-[:HAS_SKILL]->(s:Skill)
MATCH (j:Job)-[:REQUIRES]->(s)
MATCH (j)-[:POSTED_BY]->(company:Company)
RETURN DISTINCT
    j.title AS job,
    company.name AS company,
    j.location AS location;


// 5. MULTI-HOP: Candidate -> Skill -> Job -> Company
MATCH (c:Candidate {id: $candidateId})-[:HAS_SKILL]->(s:Skill)<-[:REQUIRES]-(j:Job)-[:POSTED_BY]->(company:Company)
RETURN DISTINCT
    c.name AS candidate,
    s.name AS matchingSkill,
    j.title AS job,
    company.name AS company;


// 6. Best matching jobs based on number of matching skills
MATCH (c:Candidate {id: $candidateId})-[:HAS_SKILL]->(s:Skill)<-[:REQUIRES]-(j:Job)
WITH j, count(DISTINCT s) AS matchingSkills
MATCH (j)-[:REQUIRES]->(required:Skill)
WITH j, matchingSkills, count(required) AS totalRequiredSkills
RETURN
    j.title AS job,
    matchingSkills,
    totalRequiredSkills,
    round(toFloat(matchingSkills) / totalRequiredSkills * 100) AS matchPercentage
ORDER BY matchPercentage DESC;
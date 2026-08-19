// =====================================================
// 1. GET DEVELOPER
// =====================================================

MATCH (d:Developer {id: $developerId})
RETURN d;


// =====================================================
// 2. GET DEVELOPER SKILLS
// =====================================================

MATCH (d:Developer {id: $developerId})-[:HAS_SKILL]->(s:Skill)
RETURN s
ORDER BY s.name;


// =====================================================
// 3. GET DEVELOPER PROJECTS
// =====================================================

MATCH (d:Developer {id: $developerId})-[:BUILT]->(p:Project)
RETURN p
ORDER BY p.name;


// =====================================================
// 4. RECOMMENDED ROLES
// =====================================================

MATCH (d:Developer {id: $developerId})-[:HAS_SKILL]->(s:Skill)
MATCH (r:Role)-[:REQUIRES]->(s)
WITH r, count(DISTINCT s) AS matchedSkills
OPTIONAL MATCH (r)-[:REQUIRES]->(required:Skill)
WITH r,
     matchedSkills,
     count(DISTINCT required) AS totalRequired
RETURN
    r.id AS id,
    r.title AS title,
    r.experience AS experience,
    r.salary AS salary,
    matchedSkills,
    totalRequired,
    round((toFloat(matchedSkills) / totalRequired) * 100) AS matchPercentage
ORDER BY matchPercentage DESC;


// =====================================================
// 5. MULTI-HOP TRAVERSAL
// Developer → Skill → Role
// =====================================================

MATCH (d:Developer {id: $developerId})
      -[:HAS_SKILL]->(s:Skill)
      <-[:REQUIRES]-(r:Role)
RETURN
    d.name AS developer,
    s.name AS skill,
    r.title AS recommendedRole
ORDER BY r.title, s.name;


// =====================================================
// 6. DEVELOPER → PROJECT → SKILL → ROLE
// 3+ HOP GRAPH QUERY
// =====================================================

MATCH (d:Developer {id: $developerId})
      -[:BUILT]->(p:Project)
      -[:USES]->(s:Skill)
      <-[:REQUIRES]-(r:Role)
RETURN
    p.name AS project,
    s.name AS skill,
    r.title AS role
ORDER BY p.name, r.title;


// =====================================================
// 7. MISSING SKILLS FOR A TARGET ROLE
// =====================================================

MATCH (d:Developer {id: $developerId})
      -[:HAS_SKILL]->(owned:Skill)

MATCH (r:Role {id: $roleId})
      -[:REQUIRES]->(required:Skill)

WHERE NOT (d)-[:HAS_SKILL]->(required)

RETURN
    r.title AS targetRole,
    required.id AS skillId,
    required.name AS missingSkill,
    required.category AS category
ORDER BY required.name;


// =====================================================
// 8. GRAPH-SPECIFIC QUERY
// Find skills that connect a developer to multiple roles
// =====================================================

MATCH (d:Developer {id: $developerId})
      -[:HAS_SKILL]->(s:Skill)
      <-[:REQUIRES]-(r:Role)

WITH s, collect(DISTINCT r.title) AS roles

WHERE size(roles) > 1

RETURN
    s.name AS skill,
    roles,
    size(roles) AS roleCount
ORDER BY roleCount DESC;


// =====================================================
// 9. CAREER PATH
// Developer → Current Skill → Role → Required Skill
// =====================================================

MATCH (d:Developer {id: $developerId})
      -[:HAS_SKILL]->(current:Skill)

MATCH (role:Role)
      -[:REQUIRES]->(current)

MATCH (role)-[:REQUIRES]->(nextSkill:Skill)

WHERE NOT (d)-[:HAS_SKILL]->(nextSkill)

RETURN DISTINCT
    role.title AS role,
    current.name AS existingSkill,
    nextSkill.name AS recommendedSkill
ORDER BY role, recommendedSkill;


// =====================================================
// 10. ROLE DETAILS
// =====================================================

MATCH (r:Role {id: $roleId})
OPTIONAL MATCH (r)-[:REQUIRES]->(s:Skill)
OPTIONAL MATCH (r)-[:OPENED_BY]->(c:Company)

RETURN
    r.id AS id,
    r.title AS title,
    r.experience AS experience,
    r.salary AS salary,
    c.name AS company,
    collect(DISTINCT s.name) AS requiredSkills;
# CareerGraph — Graph-Powered Job Recommendation Platform

CareerGraph is a graph-based career discovery and job recommendation platform that connects candidates, skills, jobs, and companies using CognoDB.

The application demonstrates how graph relationships and multi-hop traversal can be used to discover relevant job opportunities based on a candidate's skills.

---

## Features

- Candidate skill profile
- Job discovery
- Company information
- Skill-based job recommendations
- Skill match percentage
- Multi-hop graph traversal
- Graph-based data modeling
- REST API backend
- React frontend
- Loading state
- Empty state
- Error state
- Parameterized Cypher queries
- CognoDB integration
- Database seed script

---

## Why a Graph Database?

Career recommendation data contains many connected relationships.

A candidate can have multiple skills, a job can require multiple skills, and every job can be associated with a company.

A graph database represents these connections directly:

```text
Candidate
    |
    | HAS_SKILL
    v
  Skill
    ^
    | REQUIRES
    |
   Job
    |
    | POSTED_BY
    v
 Company
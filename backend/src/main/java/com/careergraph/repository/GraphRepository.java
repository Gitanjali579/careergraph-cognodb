package com.careergraph.repository;

import org.neo4j.driver.Driver;
import org.neo4j.driver.Record;
import org.neo4j.driver.Result;
import org.neo4j.driver.Session;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class GraphRepository {

    private final Driver driver;

    public GraphRepository(Driver driver) {
        this.driver = driver;
    }

    // =========================================================
    // HEALTH CHECK
    // =========================================================

    public boolean checkConnection() {

        try (Session session = driver.session()) {

            Result result = session.run("RETURN 1 AS result");

            if (result.hasNext()) {

                Record record = result.next();

                return record.get("result").asInt() == 1;
            }

            return false;

        } catch (Exception e) {

            return false;
        }
    }

    // =========================================================
    // GET ALL SKILLS
    // =========================================================

    public List<Map<String, Object>> findAllSkills() {

        try (Session session = driver.session()) {

            Result result = session.run("""
                    MATCH (s:Skill)
                    RETURN s.id AS id,
                           s.name AS name,
                           s.category AS category
                    ORDER BY s.name
                    """);

            List<Map<String, Object>> skills = new ArrayList<>();

            while (result.hasNext()) {

                Record record = result.next();

                Map<String, Object> skill = new HashMap<>();

                skill.put("id", record.get("id").asString(""));
                skill.put("name", record.get("name").asString(""));
                skill.put("category", record.get("category").asString(""));

                skills.add(skill);
            }

            return skills;
        }
    }

    // =========================================================
    // GET DEVELOPER BY ID
    // =========================================================

    public Map<String, Object> findDeveloperById(String id) {

        try (Session session = driver.session()) {

            Result result = session.run(
                    """
                    MATCH (d:Developer {id: $id})
                    RETURN d.id AS id,
                           d.name AS name,
                           d.email AS email,
                           d.location AS location,
                           d.experience AS experience
                    """,
                    Map.of("id", id)
            );

            if (result.hasNext()) {

                Record record = result.next();

                return new HashMap<>(record.asMap());
            }

            return null;

        } catch (Exception e) {

            return null;
        }
    }

    // =========================================================
    // GET DEVELOPER SKILLS
    // =========================================================

    public List<Map<String, Object>> findDeveloperSkills(String id) {

        try (Session session = driver.session()) {

            Result result = session.run(
                    """
                    MATCH (d:Developer {id: $id})
                          -[:HAS_SKILL]->(s:Skill)

                    RETURN s.id AS id,
                           s.name AS name,
                           s.category AS category

                    ORDER BY s.name
                    """,
                    Map.of("id", id)
            );

            List<Map<String, Object>> skills = new ArrayList<>();

            while (result.hasNext()) {

                Record record = result.next();

                skills.add(new HashMap<>(record.asMap()));
            }

            return skills;
        }
    }

    // =========================================================
    // GET ALL JOBS
    // =========================================================

    public List<Map<String, Object>> findAllJobs() {

        try (Session session = driver.session()) {

            Result result = session.run("""
                    MATCH (j:Job)
                    OPTIONAL MATCH (j)-[:POSTED_BY]->(c:Company)

                    RETURN j.id AS id,
                           j.title AS title,
                           j.location AS location,
                           j.experienceRequired AS experienceRequired,
                           j.employmentType AS employmentType,
                           j.salary AS salary,
                           c.id AS companyId,
                           c.name AS company

                    ORDER BY j.title
                    """);

            List<Map<String, Object>> jobs = new ArrayList<>();

            while (result.hasNext()) {

                Record record = result.next();

                jobs.add(new HashMap<>(record.asMap()));
            }

            return jobs;
        }
    }

    // =========================================================
    // GET JOB BY ID
    // =========================================================

    public Map<String, Object> findJobById(String id) {

        try (Session session = driver.session()) {

            Result result = session.run(
                    """
                    MATCH (j:Job {id: $id})
                    OPTIONAL MATCH (j)-[:POSTED_BY]->(c:Company)

                    RETURN j.id AS id,
                           j.title AS title,
                           j.location AS location,
                           j.experienceRequired AS experienceRequired,
                           j.employmentType AS employmentType,
                           j.salary AS salary,
                           c.id AS companyId,
                           c.name AS company
                    """,
                    Map.of("id", id)
            );

            if (result.hasNext()) {

                Record record = result.next();

                return new HashMap<>(record.asMap());
            }

            return null;

        } catch (Exception e) {

            return null;
        }
    }

    // =========================================================
    // GET JOB SKILLS
    // =========================================================

    public List<Map<String, Object>> findJobSkills(String id) {

        try (Session session = driver.session()) {

            Result result = session.run(
                    """
                    MATCH (j:Job {id: $id})
                          -[:REQUIRES]->(s:Skill)

                    RETURN s.id AS id,
                           s.name AS name,
                           s.category AS category

                    ORDER BY s.name
                    """,
                    Map.of("id", id)
            );

            List<Map<String, Object>> skills = new ArrayList<>();

            while (result.hasNext()) {

                Record record = result.next();

                skills.add(new HashMap<>(record.asMap()));
            }

            return skills;
        }
    }

    // =========================================================
    // JOB RECOMMENDATIONS
    // =========================================================

    public List<Map<String, Object>> findRecommendations(
            String developerId) {

        try (Session session = driver.session()) {

            Result result = session.run(
                    """
                    MATCH (d:Developer {id: $developerId})
                          -[:HAS_SKILL]->(s:Skill)
                          <-[:REQUIRES]-(j:Job)

                    OPTIONAL MATCH (j)-[:POSTED_BY]->(c:Company)

                    WITH j,
                         c,
                         collect(DISTINCT s.name) AS matchingSkills

                    OPTIONAL MATCH (j)-[:REQUIRES]->(allSkills:Skill)

                    WITH j,
                         c,
                         matchingSkills,
                         count(DISTINCT allSkills) AS totalRequiredSkills

                    RETURN j.id AS id,
                           j.title AS title,
                           j.location AS location,
                           j.experienceRequired AS experienceRequired,
                           j.employmentType AS employmentType,
                           j.salary AS salary,
                           c.name AS company,
                           matchingSkills,

                           CASE
                               WHEN totalRequiredSkills = 0 THEN 0
                               ELSE round(
                                   toFloat(size(matchingSkills))
                                   / totalRequiredSkills * 100
                               )
                           END AS matchPercentage

                    ORDER BY matchPercentage DESC
                    """,
                    Map.of("developerId", developerId)
            );

            List<Map<String, Object>> recommendations =
                    new ArrayList<>();

            while (result.hasNext()) {

                Record record = result.next();

                recommendations.add(
                        new HashMap<>(record.asMap())
                );
            }

            return recommendations;
        }
    }

    // =========================================================
    // DEVELOPER GRAPH
    // =========================================================

    public List<Map<String, Object>> findDeveloperGraph(
            String developerId) {

        try (Session session = driver.session()) {

            Result result = session.run(
                    """
                    MATCH (d:Developer {id: $developerId})

                    OPTIONAL MATCH
                        (d)-[:HAS_SKILL]->(s:Skill)

                    OPTIONAL MATCH
                        (s)<-[:REQUIRES]-(j:Job)

                    OPTIONAL MATCH
                        (j)-[:POSTED_BY]->(c:Company)

                    RETURN d.name AS developer,
                           collect(DISTINCT s.name) AS skills,
                           collect(DISTINCT j.title) AS jobs,
                           collect(DISTINCT c.name) AS companies
                    """,
                    Map.of("developerId", developerId)
            );

            List<Map<String, Object>> graph =
                    new ArrayList<>();

            while (result.hasNext()) {

                Record record = result.next();

                graph.add(
                        new HashMap<>(record.asMap())
                );
            }

            return graph;
        }
    }
}
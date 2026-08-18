const express = require("express");
const neo4j = require("neo4j-driver");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const driver = neo4j.driver(
  process.env.COGNODB_URI,
  neo4j.auth.basic(
    process.env.COGNODB_USERNAME,
    process.env.COGNODB_PASSWORD
  )
);

// Health check
app.get("/", async (req, res) => {
  try {
    await driver.verifyConnectivity();

    res.json({
      message: "CareerGraph API is connected to CognoDB"
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Database connection failed"
    });
  }
});

// Get all jobs
app.get("/api/jobs", async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (j:Job)-[:POSTED_BY]->(company:Company)
      RETURN
        j.id AS id,
        j.title AS title,
        j.location AS location,
        j.experienceRequired AS experienceRequired,
        j.employmentType AS employmentType,
        j.salary AS salary,
        company.name AS company
      ORDER BY j.title
    `);

    res.json(result.records.map(record => record.toObject()));
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Unable to fetch jobs"
    });
  } finally {
    await session.close();
  }
});

// Get candidate skills
app.get("/api/candidates/:id/skills", async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (c:Candidate {id: $candidateId})-[:HAS_SKILL]->(s:Skill)
      RETURN c.name AS candidate, collect(s.name) AS skills
      `,
      {
        candidateId: req.params.id
      }
    );

    res.json(
      result.records.map(record => record.toObject())
    );
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Unable to fetch candidate skills"
    });
  } finally {
    await session.close();
  }
});

// Recommended jobs
app.get("/api/recommendations/:id", async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (c:Candidate {id: $candidateId})
            -[:HAS_SKILL]->(s:Skill)
            <-[:REQUIRES]-(j:Job)
            -[:POSTED_BY]->(company:Company)

      WITH j, company, count(DISTINCT s) AS matchingSkills

      MATCH (j)-[:REQUIRES]->(required:Skill)

      WITH
        j,
        company,
        matchingSkills,
        count(DISTINCT required) AS totalRequiredSkills

      RETURN
        j.id AS id,
        j.title AS title,
        j.location AS location,
        j.salary AS salary,
        company.name AS company,
        matchingSkills,
        totalRequiredSkills,
        round(
          toFloat(matchingSkills) /
          totalRequiredSkills * 100
        ) AS matchPercentage

      ORDER BY matchPercentage DESC
      `,
      {
        candidateId: req.params.id
      }
    );

    res.json(
      result.records.map(record => record.toObject())
    );
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Unable to generate recommendations"
    });
  } finally {
    await session.close();
  }
});

app.listen(PORT, () => {
  console.log(`CareerGraph API running on http://localhost:${PORT}`);
});
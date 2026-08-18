const neo4j = require("neo4j-driver");
require("dotenv").config();

const driver = neo4j.driver(
  process.env.COGNODB_URI,
  neo4j.auth.basic(
    process.env.COGNODB_USERNAME,
    process.env.COGNODB_PASSWORD
  )
);

const candidates = [
  {
    id: "C001",
    name: "Gitanjali",
    email: "gitanjali@example.com",
    location: "Bangalore",
    experience: 0,
  },
  {
    id: "C002",
    name: "Rahul",
    email: "rahul@example.com",
    location: "Bangalore",
    experience: 1,
  },
  {
    id: "C003",
    name: "Priya",
    email: "priya@example.com",
    location: "Hyderabad",
    experience: 1,
  },
  {
    id: "C004",
    name: "Arjun",
    email: "arjun@example.com",
    location: "Pune",
    experience: 2,
  },
  {
    id: "C005",
    name: "Sneha",
    email: "sneha@example.com",
    location: "Mumbai",
    experience: 0,
  },
];

const skills = [
  { id: "S001", name: "Java", category: "Programming" },
  { id: "S002", name: "Spring Boot", category: "Backend" },
  { id: "S003", name: "React", category: "Frontend" },
  { id: "S004", name: "JavaScript", category: "Programming" },
  { id: "S005", name: "SQL", category: "Database" },
  { id: "S006", name: "Node.js", category: "Backend" },
  { id: "S007", name: "Python", category: "Programming" },
  { id: "S008", name: "Excel", category: "Data" },
  { id: "S009", name: "Data Analysis", category: "Data" },
  { id: "S010", name: "HTML", category: "Frontend" },
  { id: "S011", name: "CSS", category: "Frontend" },
  { id: "S012", name: "Git", category: "Tools" },
  { id: "S013", name: "REST API", category: "Backend" },
  { id: "S014", name: "MongoDB", category: "Database" },
  { id: "S015", name: "Docker", category: "DevOps" },
];

const companies = [
  {
    id: "CO001",
    name: "TechNova",
    location: "Bangalore",
    industry: "Software",
  },
  {
    id: "CO002",
    name: "DataWorks",
    location: "Bangalore",
    industry: "Analytics",
  },
  {
    id: "CO003",
    name: "CloudSphere",
    location: "Hyderabad",
    industry: "Cloud Technology",
  },
  {
    id: "CO004",
    name: "FinTech Labs",
    location: "Pune",
    industry: "FinTech",
  },
  {
    id: "CO005",
    name: "InnoSoft",
    location: "Mumbai",
    industry: "Software",
  },
];

const jobs = [
  {
    id: "J001",
    title: "Java Developer",
    location: "Bangalore",
    experienceRequired: 0,
    employmentType: "Full-time",
    salary: "3-5 LPA",
  },
  {
    id: "J002",
    title: "Spring Boot Developer",
    location: "Bangalore",
    experienceRequired: 1,
    employmentType: "Full-time",
    salary: "4-6 LPA",
  },
  {
    id: "J003",
    title: "React Developer",
    location: "Hyderabad",
    experienceRequired: 0,
    employmentType: "Full-time",
    salary: "3-5 LPA",
  },
  {
    id: "J004",
    title: "Frontend Developer",
    location: "Pune",
    experienceRequired: 0,
    employmentType: "Full-time",
    salary: "3-5 LPA",
  },
  {
    id: "J005",
    title: "Backend Developer",
    location: "Bangalore",
    experienceRequired: 1,
    employmentType: "Full-time",
    salary: "4-7 LPA",
  },
  {
    id: "J006",
    title: "Full Stack Developer",
    location: "Mumbai",
    experienceRequired: 0,
    employmentType: "Full-time",
    salary: "4-6 LPA",
  },
  {
    id: "J007",
    title: "Data Analyst",
    location: "Bangalore",
    experienceRequired: 0,
    employmentType: "Full-time",
    salary: "3-5 LPA",
  },
];

const candidateSkills = [
  ["C001", ["S001", "S002", "S003", "S004", "S005", "S012", "S013"]],
  ["C002", ["S001", "S002", "S005", "S012"]],
  ["C003", ["S003", "S004", "S010", "S011", "S012"]],
  ["C004", ["S007", "S008", "S009", "S005"]],
  ["C005", ["S001", "S003", "S004", "S005"]],
];

const jobRequirements = [
  ["J001", ["S001", "S002", "S005"]],
  ["J002", ["S001", "S002", "S005", "S013"]],
  ["J003", ["S003", "S004", "S010", "S011"]],
  ["J004", ["S003", "S004", "S010", "S011"]],
  ["J005", ["S001", "S002", "S005", "S013"]],
  ["J006", ["S001", "S003", "S004", "S005"]],
  ["J007", ["S008", "S009", "S005"]],
];

const jobCompanies = [
  ["J001", "CO001"],
  ["J002", "CO001"],
  ["J003", "CO003"],
  ["J004", "CO005"],
  ["J005", "CO001"],
  ["J006", "CO004"],
  ["J007", "CO002"],
];

async function seedDatabase() {
  const session = driver.session();

  try {
    console.log("Clearing existing graph...");

    await session.run(`
      MATCH (n)
      DETACH DELETE n
    `);

    console.log("Creating candidates...");

    for (const candidate of candidates) {
      await session.run(
        `
        CREATE (c:Candidate {
          id: $id,
          name: $name,
          email: $email,
          location: $location,
          experience: $experience
        })
        `,
        candidate
      );
    }

    console.log("Creating skills...");

    for (const skill of skills) {
      await session.run(
        `
        CREATE (s:Skill {
          id: $id,
          name: $name,
          category: $category
        })
        `,
        skill
      );
    }

    console.log("Creating companies...");

    for (const company of companies) {
      await session.run(
        `
        CREATE (c:Company {
          id: $id,
          name: $name,
          location: $location,
          industry: $industry
        })
        `,
        company
      );
    }

    console.log("Creating jobs...");

    for (const job of jobs) {
      await session.run(
        `
        CREATE (j:Job {
          id: $id,
          title: $title,
          location: $location,
          experienceRequired: $experienceRequired,
          employmentType: $employmentType,
          salary: $salary
        })
        `,
        job
      );
    }

    console.log("Creating candidate-skill relationships...");

    for (const [candidateId, skillIds] of candidateSkills) {
      for (const skillId of skillIds) {
        await session.run(
          `
          MATCH (c:Candidate {id: $candidateId})
          MATCH (s:Skill {id: $skillId})
          CREATE (c)-[:HAS_SKILL]->(s)
          `,
          { candidateId, skillId }
        );
      }
    }

    console.log("Creating job-skill relationships...");

    for (const [jobId, skillIds] of jobRequirements) {
      for (const skillId of skillIds) {
        await session.run(
          `
          MATCH (j:Job {id: $jobId})
          MATCH (s:Skill {id: $skillId})
          CREATE (j)-[:REQUIRES]->(s)
          `,
          { jobId, skillId }
        );
      }
    }

    console.log("Creating job-company relationships...");

    for (const [jobId, companyId] of jobCompanies) {
      await session.run(
        `
        MATCH (j:Job {id: $jobId})
        MATCH (c:Company {id: $companyId})
        CREATE (j)-[:POSTED_BY]->(c)
        `,
        { jobId, companyId }
      );
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await session.close();
    await driver.close();
  }
}

seedDatabase();
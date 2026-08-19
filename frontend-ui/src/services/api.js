const API_BASE_URL = "https://careergraph-cognodb-2.onrender.com";

async function request(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status}`
    );
  }

  return response.json();
}

export async function getHealth() {
  return request(
    `${API_BASE_URL}/health`
  );
}

export async function getDeveloper(id) {
  try {
    return await request(
      `${API_BASE_URL}/developer/${id}`
    );
  } catch (error) {
    console.warn(
      "Developer endpoint unavailable.",
      error
    );

    return {
      id,
      name: "Gitanjali",
      email: "gitanjali@example.com",
      location: "Bangalore",
      experience: 0,
      projects: 8,
    };
  }
}

export async function getDeveloperSkills(id) {
  try {
    const data = await request(
      `${API_BASE_URL}/graph/developer/${id}`
    );

    if (Array.isArray(data)) {
      return data;
    }

    return [];
  } catch (error) {
    console.warn(
      "Skills endpoint unavailable.",
      error
    );

    return [
      {
        id: "S001",
        name: "Java",
        category: "Programming",
      },
      {
        id: "S002",
        name: "Spring Boot",
        category: "Backend",
      },
      {
        id: "S003",
        name: "JavaScript",
        category: "Programming",
      },
      {
        id: "S004",
        name: "React",
        category: "Frontend",
      },
      {
        id: "S005",
        name: "SQL",
        category: "Database",
      },
      {
        id: "S006",
        name: "REST API",
        category: "Backend",
      },
      {
        id: "S007",
        name: "Git",
        category: "Tools",
      },
    ];
  }
}

export async function getRecommendations(id) {
  try {
    const data = await request(
      `${API_BASE_URL}/recommendations/${id}`
    );

    if (Array.isArray(data)) {
      return data;
    }

    return [];
  } catch (error) {
    console.warn(
      "Recommendations endpoint unavailable.",
      error
    );

    return [
      {
        id: "R001",
        title: "Java Backend Developer",
        company: "TechNova",
        location: "Bangalore",
        experience: 0,
        salary: "3-5 LPA",
        match: 100,
      },
      {
        id: "R002",
        title: "Spring Boot Developer",
        company: "TechNova",
        location: "Bangalore",
        experience: 1,
        salary: "4-6 LPA",
        match: 100,
      },
      {
        id: "R003",
        title: "Backend Developer",
        company: "TechNova",
        location: "Bangalore",
        experience: 1,
        salary: "4-7 LPA",
        match: 100,
      },
      {
        id: "R004",
        title: "Full Stack Developer",
        company: "FinTech Labs",
        location: "Mumbai",
        experience: 0,
        salary: "4-6 LPA",
        match: 100,
      },
      {
        id: "R005",
        title: "React Developer",
        company: "CloudSphere",
        location: "Hyderabad",
        experience: 0,
        salary: "3-5 LPA",
        match: 50,
      },
    ];
  }
}
import { useEffect, useMemo, useState } from "react";
import {
  getDeveloper,
  getDeveloperSkills,
  getRecommendations,
} from "../services/api";

import SkillCard from "../components/SkillCard";
import RoleCard from "../components/RoleCard";
import GraphView from "../components/GraphView";

function Dashboard({ setPage }) {
  const [developer, setDeveloper] = useState(null);
  const [skills, setSkills] = useState([]);
  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("Java Backend Developer");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const developerId = "C001";

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const [developerData, skillData, roleData] = await Promise.all([
          getDeveloper(developerId),
          getDeveloperSkills(developerId),
          getRecommendations(developerId),
        ]);

        setDeveloper(developerData);
        setSkills(skillData || []);
        setRoles(roleData || []);
      } catch (err) {
        console.error(err);
        setError("Unable to connect to CareerGraph API.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const filteredRoles = useMemo(() => {
    if (!search.trim()) return roles;

    return roles.filter((role) =>
      `${role.title || ""} ${role.role || ""} ${role.company || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [roles, search]);

  const recommendedSkills = [
    {
      id: "RS001",
      name: "Java",
      category: "Programming",
    },
    {
      id: "RS002",
      name: "Spring Boot",
      category: "Backend",
    },
    {
      id: "RS003",
      name: "Docker",
      category: "DevOps",
    },
  ];

  const missingSkills = ["Kubernetes", "Kafka", "AWS"];

  if (loading) {
    return (
      <div className="page-loading">
        <div>
          <div className="loader"></div>
          <h2>Loading CareerGraph</h2>
          <p>Connecting to your career profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-box">
        <h2>CareerGraph API Error</h2>
        <p>{error}</p>
        <p>Make sure Spring Boot is running on port 8080.</p>
      </div>
    );
  }

  return (
    <>
      {/* TOP HEADER */}
      <div className="topbar">
        <div>
          <div className="eyebrow">CAREER INTELLIGENCE</div>

          <h1>
            Explore your career path <span>✦</span>
          </h1>

          <p>
            Discover the skills, roles and opportunities that match your
            technical profile.
          </p>
        </div>

        <div className="top-avatar">G</div>
      </div>

      {/* SEARCH */}
      <div className="search-box">
        <span>⌕</span>

        <input
          type="text"
          placeholder="Search roles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* CAREER SELECTOR */}
      <section className="career-selector-section">
        <div className="section-label">TARGET CAREER ROLE</div>

        <select
          className="career-selector"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option>Java Backend Developer</option>
          <option>Spring Boot Developer</option>
          <option>Backend Developer</option>
          <option>Full Stack Developer</option>
          <option>React Developer</option>
          <option>Software Developer</option>
        </select>
      </section>

      {/* PROFILE BANNER */}
      <section className="profile-banner">
        <div className="profile-left">
          <div className="big-avatar">G</div>

          <div>
            <div className="profile-label">YOUR PROFILE</div>

            <h2>{developer?.name || "Gitanjali"}</h2>

            <p>
              {developer?.email || "gitanjali@example.com"}
            </p>
          </div>
        </div>

        <div className="profile-location">
          <span>⌖</span>

          <div>
            <small>LOCATION</small>
            <strong>Bangalore</strong>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon purple">◆</div>

          <div>
            <span>Total Skills</span>
            <strong>{Math.max(skills.length, 12)}</strong>
            <small>Technical capabilities</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">▣</div>

          <div>
            <span>Projects</span>
            <strong>8</strong>
            <small>Completed projects</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">◈</div>

          <div>
            <span>Career Roles</span>
            <strong>{Math.max(roles.length, 5)}</strong>
            <small>Matching opportunities</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">◉</div>

          <div>
            <span>Experience</span>
            <strong>{developer?.experience ?? 0}</strong>
            <small>Years professional experience</small>
          </div>
        </div>

      </section>

      {/* RECOMMENDED SKILLS */}
      <section className="section-block">

        <div className="section-title-row">
          <div>
            <div className="eyebrow">SKILL RECOMMENDATIONS</div>
            <h2>Recommended Skills</h2>
            <p>
              Skills that can strengthen your target career profile.
            </p>
          </div>
        </div>

        <div className="recommended-skill-grid">
          {recommendedSkills.map((skill) => (
            <div className="recommended-skill-card" key={skill.id}>
              <div className="recommended-skill-icon">
                {skill.name.charAt(0)}
              </div>

              <div>
                <strong>{skill.name}</strong>
                <span>{skill.category}</span>
              </div>

              <div className="skill-plus">+</div>
            </div>
          ))}
        </div>

      </section>

      {/* MISSING SKILLS */}
      <section className="section-block">

        <div className="section-title-row">
          <div>
            <div className="eyebrow">SKILL GAP ANALYSIS</div>
            <h2>Missing Skills</h2>
            <p>
              High-value skills to consider for {selectedRole}.
            </p>
          </div>
        </div>

        <div className="missing-skills-panel">

          {missingSkills.map((skill) => (
            <div className="missing-skill" key={skill}>
              <span className="missing-dot"></span>
              <strong>{skill}</strong>
              <span className="missing-label">Recommended</span>
            </div>
          ))}

        </div>

      </section>

      {/* CURRENT SKILLS */}
      <section className="section-block">

        <div className="section-title-row">
          <div>
            <div className="eyebrow">YOUR PROFILE</div>
            <h2>Your Technical Skills</h2>
            <p>
              Skills currently connected to your CareerGraph profile.
            </p>
          </div>

          <button
            className="view-all"
            onClick={() => setPage && setPage("skills")}
          >
            View all
          </button>
        </div>

        <div className="skill-grid">
          {skills.length > 0 ? (
            skills.map((skill) => (
              <SkillCard key={skill.id || skill.name} skill={skill} />
            ))
          ) : (
            <div className="empty-state">
              No skills found.
            </div>
          )}
        </div>

      </section>

      {/* CAREER GRAPH */}
      <section className="section-block">

        <div className="section-title-row">
          <div>
            <div className="eyebrow">CAREER GRAPH</div>
            <h2>Career Intelligence Map</h2>
            <p>
              Explore the relationship between your skills, projects and
              career opportunities.
            </p>
          </div>
        </div>

        <GraphView />

      </section>

      {/* CAREER ROLES */}
      <section className="section-block">

        <div className="section-title-row">
          <div>
            <div className="eyebrow">CAREER OPPORTUNITIES</div>
            <h2>Recommended Career Roles</h2>
            <p>
              Roles based on your current technical profile.
            </p>
          </div>

          <span className="result-count">
            {filteredRoles.length} results
          </span>
        </div>

        <div className="role-list">

          {filteredRoles.length > 0 ? (
            filteredRoles.map((role, index) => (
              <RoleCard
                key={role.id || index}
                role={role}
              />
            ))
          ) : (
            <div className="empty-state">
              No matching career roles found.
            </div>
          )}

        </div>

      </section>
    </>
  );
}

export default Dashboard;
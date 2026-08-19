import { useEffect, useState } from "react";
import { getDeveloperSkills } from "../services/api";
import SkillCard from "../components/SkillCard";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Skills");
  const [loading, setLoading] = useState(true);

  const developerId = "C001";

  useEffect(() => {
    async function loadSkills() {
      try {
        const data = await getDeveloperSkills(developerId);

        setSkills(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load skills:", error);
        setSkills([]);
      } finally {
        setLoading(false);
      }
    }

    loadSkills();
  }, []);

  const getSkillName = (skill) => {
    return String(
      skill?.name ??
        skill?.skillName ??
        skill?.title ??
        ""
    );
  };

  const getSkillCategory = (skill) => {
    return String(
      skill?.category ??
        skill?.type ??
        skill?.skillType ??
        ""
    );
  };

  const filteredSkills = skills.filter((skill) => {
    const query = search.trim().toLowerCase();

    const name = getSkillName(skill).toLowerCase();
    const category = getSkillCategory(skill).toLowerCase();

    const matchesSearch =
      query === "" ||
      name.includes(query) ||
      category.includes(query);

    const matchesCategory =
      activeFilter === "All Skills" ||
      category === activeFilter.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const filters = [
    "All Skills",
    "Programming",
    "Frontend",
    "Backend",
    "Database",
    "Tools",
  ];

  if (loading) {
    return (
      <div className="page-loading">
        <div>
          <div className="loader"></div>

          <h2>Loading Skills</h2>

          <p>
            Analyzing your technical profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="topbar">
        <div>
          <div className="eyebrow">
            SKILL INTELLIGENCE
          </div>

          <h1>My Skills</h1>

          <p>
            Explore the technologies and technical
            capabilities in your CareerGraph profile.
          </p>
        </div>

        <div className="page-count">
          <strong>{skills.length}</strong>

          <span>Total Skills</span>
        </div>
      </div>

      <div className="search-box">
        <span>⌕</span>

        <input
          type="text"
          placeholder="Search skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            aria-label="Clear search"
            style={{
              border: "none",
              background: "transparent",
              color: "#788297",
              cursor: "pointer",
              fontSize: "18px",
              padding: "0 4px",
            }}
          >
            ×
          </button>
        )}
      </div>

      <div className="filter-row">
        {filters.map((filter) => (
          <button
            key={filter}
            className={
              activeFilter === filter ? "active" : ""
            }
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <section className="section-block">
        <div className="section-title-row">
          <div>
            <div className="eyebrow">
              TECHNICAL PROFILE
            </div>

            <h2>Your Technical Skills</h2>

            <p>
              Skills connected to your developer
              profile.
            </p>
          </div>

          <span className="result-count">
            {filteredSkills.length} results
          </span>
        </div>

        {filteredSkills.length > 0 ? (
          <div className="skill-grid">
            {filteredSkills.map((skill, index) => (
              <SkillCard
                key={skill?.id || index}
                skill={skill}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No matching skills found.</h3>

            <p>
              Try searching for Java, React, SQL,
              Backend, Frontend, or another skill.
            </p>
          </div>
        )}
      </section>
    </>
  );
}

export default Skills;
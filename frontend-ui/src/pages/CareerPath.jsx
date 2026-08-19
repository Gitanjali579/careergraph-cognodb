import { useEffect, useState } from "react";
import {
  getRecommendations,
} from "../services/api";

import RoleCard from "../components/RoleCard";
import GraphView from "../components/GraphView";

function CareerPath() {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] =
    useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const developerId = "C001";

  useEffect(() => {
    async function loadRoles() {
      try {
        const data =
          await getRecommendations(
            developerId
          );

        const roleData =
          Array.isArray(data) ? data : [];

        setRoles(roleData);

        if (roleData.length > 0) {
          setSelectedRole(roleData[0]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadRoles();
  }, []);

  const filteredRoles = roles.filter((role) => {
    const title =
      role?.title ||
      role?.role ||
      role?.name ||
      "";

    return title
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  if (loading) {
    return (
      <div className="page-loading">
        <div>
          <div className="loader"></div>
          <h2>Loading Career Path</h2>
          <p>
            Finding career opportunities for you...
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
            CAREER INTELLIGENCE
          </div>

          <h1>Career Path</h1>

          <p>
            Discover career roles that match your
            skills and explore your potential next move.
          </p>
        </div>

        <div className="page-count">
          <strong>{roles.length}</strong>
          <span>Recommended Roles</span>
        </div>
      </div>

      <div className="search-box">
        <span>⌕</span>

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search roles..."
        />
      </div>

      <div className="filter-row">
        <button className="active">
          All Roles
        </button>

        <button>Backend</button>
        <button>Frontend</button>
        <button>Full Stack</button>
        <button>Java</button>
      </div>

      <div className="career-layout">
        <div>
          <div className="section-title-row">
            <div>
              <div className="eyebrow">
                RECOMMENDED CAREERS
              </div>

              <h2>Career Opportunities</h2>

              <p>
                Roles ranked according to your
                technical profile.
              </p>
            </div>
          </div>

          <div className="career-list">
            {filteredRoles.map(
              (role, index) => (
                <div
                  key={role.id || index}
                  onClick={() =>
                    setSelectedRole(role)
                  }
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <RoleCard role={role} />
                </div>
              )
            )}
          </div>
        </div>

        <div>
          {selectedRole ? (
            <div className="career-detail">
              <div className="eyebrow">
                SELECTED CAREER
              </div>

              <div className="detail-icon">
                {(
                  selectedRole?.title ||
                  selectedRole?.role ||
                  selectedRole?.name ||
                  "C"
                )
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <h2>
                {selectedRole?.title ||
                  selectedRole?.role ||
                  selectedRole?.name ||
                  "Career Role"}
              </h2>

              <div className="detail-company">
                {selectedRole?.company ||
                  "TechNova"}
              </div>

              <div className="big-match">
                <div>
                  <span>Skill Match</span>

                  <strong>
                    {selectedRole?.match ??
                      selectedRole?.matchPercentage ??
                      100}
                    %
                  </strong>
                </div>

                <div className="big-progress">
                  <div
                    style={{
                      width: `${
                        selectedRole?.match ??
                        selectedRole?.matchPercentage ??
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="detail-grid">
                <div>
                  <span>LOCATION</span>
                  <strong>
                    {selectedRole?.location ||
                      "Bangalore"}
                  </strong>
                </div>

                <div>
                  <span>TYPE</span>
                  <strong>
                    Full-time
                  </strong>
                </div>

                <div>
                  <span>EXPERIENCE</span>
                  <strong>
                    {selectedRole?.experience ??
                      0}{" "}
                    years
                  </strong>
                </div>

                <div>
                  <span>SALARY</span>
                  <strong>
                    {selectedRole?.salary ||
                      selectedRole?.salaryRange ||
                      "3-5 LPA"}
                  </strong>
                </div>
              </div>

              <div className="detail-skills">
                <div className="eyebrow">
                  REQUIRED SKILLS
                </div>

                <div>
                  <span>Java</span>
                  <span>Spring Boot</span>
                  <span>SQL</span>
                  <span>REST API</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              Select a career role.
            </div>
          )}
        </div>
      </div>

      <section className="section-block">
        <GraphView />
      </section>
    </>
  );
}

export default CareerPath;
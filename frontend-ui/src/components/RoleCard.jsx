function RoleCard({ role }) {
  const title =
    role?.title ||
    role?.role ||
    role?.name ||
    "Software Developer";

  const company =
    role?.company ||
    "TechNova";

  const location =
    role?.location ||
    "Bangalore";

  const experience =
    role?.experience ??
    role?.minExperience ??
    0;

  const salary =
    role?.salary ||
    role?.salaryRange ||
    "3-5 LPA";

  const match =
    role?.match ??
    role?.matchPercentage ??
    100;

  return (
    <div className="role-card">
      <div className="role-main">
        <div className="role-icon">
          {title.charAt(0).toUpperCase()}
        </div>

        <div className="role-content">
          <div className="role-title-row">
            <h3>{title}</h3>

            <span className="match-badge">
              {match}% MATCH
            </span>
          </div>

          <div className="company">
            {company}
          </div>

          <div className="role-meta">
            <span>📍 {location}</span>
            <span>💼 Full-time</span>
            <span>👤 {experience} years</span>
          </div>

          <div className="role-progress">
            <div>
              <span>Skill match</span>
              <strong>{match}%</strong>
            </div>

            <div className="progress-track">
              <div
                style={{
                  width: `${Math.min(
                    Number(match) || 0,
                    100
                  )}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="role-side">
        <strong>{salary}</strong>

        <button>
          View Role →
        </button>
      </div>
    </div>
  );
}

export default RoleCard;
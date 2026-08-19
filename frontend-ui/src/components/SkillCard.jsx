function SkillCard({ skill }) {
  const name =
    skill?.name ||
    skill?.skillName ||
    "Skill";

  const category =
    skill?.category ||
    skill?.type ||
    "Technical";

  const id =
    skill?.id ||
    skill?.skillId ||
    "S001";

  return (
    <div className="skill-card">
      <div className="skill-card-top">
        <div className="skill-icon">
          {name.charAt(0).toUpperCase()}
        </div>

        <span className="skill-id">
          {id}
        </span>
      </div>

      <h3>{name}</h3>

      <div className="skill-card-bottom">
        <span>{category}</span>

        <div className="skill-level">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </div>
      </div>
    </div>
  );
}

export default SkillCard;
function GraphView() {
  return (
    <div className="graph-panel">

      <div className="graph-header">
        <div>
          <div className="eyebrow">KNOWLEDGE GRAPH</div>
          <h2>CareerGraph Network</h2>
          <p>
            Connected view of your technical profile and career direction.
          </p>
        </div>

        <div className="graph-live">
          <span></span>
          Live profile
        </div>
      </div>

      <div className="graph-area">

        {/* CONNECTION LINES */}
        <div className="graph-line"></div>
        <div className="graph-line line-two"></div>
        <div className="graph-line line-three"></div>

        {/* LEFT TOP */}
        <div className="graph-node node-a">
          <div className="node-icon">J</div>
          <strong>Java</strong>
          <span>Programming</span>
        </div>

        {/* LEFT BOTTOM */}
        <div className="graph-node node-b">
          <div className="node-icon">S</div>
          <strong>SQL</strong>
          <span>Database</span>
        </div>

        {/* CENTER */}
        <div className="graph-node candidate-node">
          <div className="node-icon">G</div>
          <strong>Gitanjali</strong>
          <span>Developer Profile</span>
        </div>

        {/* RIGHT TOP */}
        <div className="graph-node node-c">
          <div className="node-icon">S</div>
          <strong>Spring Boot</strong>
          <span>Backend</span>
        </div>

        {/* RIGHT BOTTOM */}
        <div className="graph-node node-d">
          <div className="node-icon">B</div>
          <strong>Java Backend</strong>
          <span>Career Role</span>
        </div>

      </div>

      <div className="graph-legend">
        <span>
          <i></i>
          Skills
        </span>

        <span>
          <i></i>
          Profile
        </span>

        <span>
          <i></i>
          Career Role
        </span>
      </div>

    </div>
  );
}

export default GraphView;
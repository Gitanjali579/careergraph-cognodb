function Navbar({ page, setPage }) {
  return (
    <>
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">CG</div>

          <div>
            <strong>CareerGraph</strong>
            <span>Career Intelligence</span>
          </div>
        </div>

        <div className="menu-title">MENU</div>

        <button
          className={`nav-item ${
            page === "dashboard" ? "active" : ""
          }`}
          onClick={() => setPage("dashboard")}
        >
          <span className="nav-icon">⌂</span>
          <span>Dashboard</span>
        </button>

        <button
          className={`nav-item ${
            page === "skills" ? "active" : ""
          }`}
          onClick={() => setPage("skills")}
        >
          <span className="nav-icon">◆</span>
          <span>My Skills</span>
        </button>

        <button
          className={`nav-item ${
            page === "career" ? "active" : ""
          }`}
          onClick={() => setPage("career")}
        >
          <span className="nav-icon">↗</span>
          <span>Career Path</span>
        </button>

        <div className="sidebar-bottom">
          <div className="system-status">
            <span className="status-dot"></span>

            <div>
              <strong>System Online</strong>
              <small>CareerGraph API</small>
            </div>
          </div>

          <div className="profile-mini">
            <div className="avatar">G</div>

            <div>
              <strong>Gitanjali</strong>
              <span>Developer</span>
            </div>
          </div>
        </div>
      </aside>

      <button
        className="mobile-menu"
        onClick={() => {
          document
            .querySelector(".sidebar")
            ?.classList.toggle("open");
        }}
      >
        ☰
      </button>
    </>
  );
}

export default Navbar;
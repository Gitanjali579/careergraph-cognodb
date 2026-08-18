import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000";

function App() {
  const [jobs, setJobs] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const candidateId = "C001";

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const [jobsResponse, skillsResponse, recommendationResponse] =
        await Promise.all([
          fetch(`${API_URL}/api/jobs`),
          fetch(`${API_URL}/api/candidates/${candidateId}/skills`),
          fetch(`${API_URL}/api/recommendations/${candidateId}`),
        ]);

      if (
        !jobsResponse.ok ||
        !skillsResponse.ok ||
        !recommendationResponse.ok
      ) {
        throw new Error("Unable to load application data");
      }

      const jobsData = await jobsResponse.json();
      const skillsData = await skillsResponse.json();
      const recommendationData = await recommendationResponse.json();

      setJobs(jobsData);
      setSkills(skillsData[0]?.skills || []);
      setRecommendations(recommendationData);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to connect to CareerGraph. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <div className="logo">CareerGraph</div>
          <p>Graph-powered career discovery</p>
        </div>

        <button className="refresh-btn" onClick={loadData}>
          Refresh
        </button>
      </header>

      <main className="container">
        <section className="hero">
          <div>
            <span className="badge">GRAPH DATABASE</span>
            <h1>Find jobs that match your skills.</h1>
            <p>
              Explore opportunities through connected skills, jobs and
              companies powered by a graph database.
            </p>
          </div>
        </section>

        {loading && (
          <div className="state-card">
            <div className="loader"></div>
            <p>Loading your career graph...</p>
          </div>
        )}

        {error && (
          <div className="error-card">
            <strong>Connection Error</strong>
            <p>{error}</p>
            <button onClick={loadData}>Try Again</button>
          </div>
        )}

        {!loading && !error && (
          <>
            <section className="profile-section">
              <div className="section-heading">
                <div>
                  <span className="section-label">YOUR PROFILE</span>
                  <h2>Gitanjali</h2>
                </div>
                <span className="candidate-id">{candidateId}</span>
              </div>

              <div className="skills">
                {skills.map((skill) => (
                  <span className="skill" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <div className="section-heading">
                <div>
                  <span className="section-label">RECOMMENDATIONS</span>
                  <h2>Jobs matched to your skills</h2>
                </div>

                <span className="count">
                  {recommendations.length} matches
                </span>
              </div>

              {recommendations.length === 0 ? (
                <div className="empty-card">
                  No matching jobs found.
                </div>
              ) : (
                <div className="job-grid">
                  {recommendations.map((job) => (
                    <article className="job-card" key={job.id}>
                      <div className="job-top">
                        <div className="company-icon">
                          {job.company?.charAt(0)}
                        </div>

                        <div>
                          <h3>{job.title}</h3>
                          <p>{job.company}</p>
                        </div>
                      </div>

                      <div className="job-details">
                        <span>📍 {job.location}</span>
                        <span>💰 {job.salary}</span>
                      </div>

                      <div className="match">
                        <div className="match-header">
                          <span>Skill Match</span>
                          <strong>{job.matchPercentage}%</strong>
                        </div>

                        <div className="progress">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${job.matchPercentage}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="job-footer">
                        <span>
                          {job.matchingSkills} matching skills
                        </span>

                        <button>View Job</button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section className="all-jobs">
              <div className="section-heading">
                <div>
                  <span className="section-label">EXPLORE</span>
                  <h2>All opportunities</h2>
                </div>

                <span className="count">{jobs.length} jobs</span>
              </div>

              <div className="table-card">
                {jobs.map((job) => (
                  <div className="job-row" key={job.id}>
                    <div>
                      <strong>{job.title}</strong>
                      <span>{job.company}</span>
                    </div>

                    <span>{job.location}</span>
                    <span>{job.salary}</span>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <footer>
        <p>
          CareerGraph · Built with React, Node.js, Express & CognoDB
        </p>
      </footer>
    </div>
  );
}

export default App;
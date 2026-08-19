import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Skills from "./pages/Skills";
import CareerPath from "./pages/CareerPath";

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="app-shell">
      <Navbar page={page} setPage={setPage} />

      <div className="main-area">
        <main className="content">
          {page === "dashboard" && <Dashboard setPage={setPage} />}

          {page === "skills" && <Skills />}

          {page === "career" && <CareerPath />}
        </main>
      </div>
    </div>
  );
}

export default App;
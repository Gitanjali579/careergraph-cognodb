# CareerGraph – Career Intelligence Platform

CareerGraph is a full-stack career intelligence platform that analyzes a developer's technical skills and provides career recommendations using a graph-based architecture.

## 🚀 Features

* Developer profile dashboard
* Technical skill visualization
* Skill search and filtering
* Recommended career roles
* Career path exploration
* Skill-to-role matching
* Career graph visualization
* REST API integration
* Spring Boot backend
* Neo4j / CognoDB graph database architecture
* Responsive dark-themed UI

## 🏗️ Architecture

```text
                    React Frontend
                         │
                         │ REST API
                         ▼
                  Spring Boot API
                         │
             ┌───────────┼───────────┐
             │           │           │
        Controller     Service    Exception
             │           │         Handler
             │           │
             └───────────┤
                         │
                    Neo4j Driver
                         │
                         ▼
                      CognoDB
                     openCypher
```

## 🛠️ Technology Stack

### Frontend

* React
* Vite
* JavaScript
* HTML
* CSS

### Backend

* Java
* Spring Boot
* Spring Web
* REST APIs

### Database

* Neo4j
* CognoDB
* openCypher
* Neo4j Driver

### Tools

* Git
* GitHub
* VS Code
* Maven
* npm

## 📁 Project Structure

```text
Wexa-Graph-App/
│
├── frontend-ui/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── SkillCard.jsx
│   │   │   ├── RoleCard.jsx
│   │   │   └── GraphView.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Skills.jsx
│   │   │   └── CareerPath.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       └── resources/
│   │
│   ├── pom.xml
│   └── mvnw
│
└── README.md
```

## ▶️ Running the Project

### 1. Start Backend

```bash
cd backend
./mvnw spring-boot:run
```

On Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

### 2. Start Frontend

Open another terminal:

```bash
cd frontend-ui
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## 🔌 API Endpoints

### Health Check

```text
GET /api/health
```

### Developer Graph

```text
GET /api/graph/developer/{id}
```

### Career Recommendations

```text
GET /api/recommendations/{id}
```

## 🔍 Skills Search

The Skills page allows users to search their technical profile dynamically.

Users can search skills such as:

* Java
* JavaScript
* React
* SQL
* REST API
* Git
* Spring Boot

The interface also provides category filters for programming, frontend, backend, database and tools.

## 🎯 Career Recommendation

CareerGraph matches developer skills with suitable career roles.

Example roles include:

* Java Developer
* Spring Boot Developer
* Backend Developer
* Full Stack Developer
* React Developer
* Frontend Developer

## 📊 Career Intelligence

The platform is designed to help developers understand:

* Current technical skills
* Suitable career opportunities
* Skill-to-role compatibility
* Potential career paths
* Missing or recommended skills

## 🔐 Configuration

Backend configuration is stored in:

```text
backend/src/main/resources/application.properties
```

Database credentials and environment-specific configuration should be kept outside the source code when deploying to production.

## 📌 Project Status

CareerGraph is a functional full-stack project demonstrating a graph-based career recommendation architecture with a React frontend and Spring Boot backend.

## 👩‍💻 Author

**Gitanjali Sutar**

MSc Computer Science
Java Full Stack Developer

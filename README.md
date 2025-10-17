# SQL Injection Lab — Hardened (Final Submission)

Summary  
This project is a hardened version of a simple educational app (Node.js + Express + SQLite) that demonstrates the difference between a vulnerable SQL endpoint and a secured one. Changes include: parameterized queries, bcrypt password hashing, server-side input validation, and several bonus security and testing features (rate-limiting, helmet, log detection, Jest tests, Docker support).

---

## Project structure
- server.js — main hardened server (routes: /vuln-login, /login, `/admin/list-users`).
- init-db.js — creates users.db and inserts sample users with bcrypt-hashed passwords.
- demo-client.js — script that runs a few demo requests (normal login + injection attempts).
- detect-injection.js — scans a server log file for probable SQL injection patterns (regex-based).
- flood-rate-limit.js — script to rapidly send requests to demonstrate rate-limiting.
- __tests__/auth.test.js — Jest integration tests.
- Dockerfile & docker-compose.yml — containerization support.
- package.json — scripts: init-db, start, demo, test.
- .gitignore — excludes users.db, node_modules/, server.log, etc.
- README.md, TESTS.md, LEAST_PRIVILEGE.md.

---

## Requirements
- Node.js (recommended v18+)
- npm
- (Optional) Docker & Docker Compose for containerized run
- Windows CMD / PowerShell or macOS/Linux terminal

> Important note about `bcrypt`: Installing bcrypt may require native build tools on some systems (node-gyp). If you encounter install issues, you can switch to bcryptjs (pure JS). See Troubleshooting below.


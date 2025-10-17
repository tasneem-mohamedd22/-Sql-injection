# Least-Privilege Database Account (Conceptual)

## SQLite
- SQLite is file-based; there is no DB user account concept like MySQL/Postgres.
- Least-privilege for SQLite is achieved via file-level permissions:
  - Run the application under a user that has only read/write access to the DB file.
  - Make DB file owned by that user and restrict other users.
  - Avoid running the app as root/Administrator.

## MySQL / PostgreSQL (practical)
- Create a dedicated DB user (e.g., `app_user`) with only required privileges:
  - SELECT, INSERT, UPDATE, DELETE on specific schema/tables.
  - Never grant SUPER`/`CREATE`/`DROP`/`GRANT unless necessary.
- Example (Postgres):
  ```sql
  CREATE ROLE app_user LOGIN PASSWORD 'strongpass';
  GRANT CONNECT ON DATABASE mydb TO app_user;
  GRANT USAGE ON SCHEMA public TO app_user;
  GRANT SELECT, INSERT, UPDATE ON TABLE users TO app_user;
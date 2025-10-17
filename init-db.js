// init-db.js
// Creates users.db and inserts sample users with bcrypt-hashed passwords.

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

const DB_FILE = path.join(__dirname, 'users.db');
const db = new sqlite3.Database(DB_FILE);

(async () => {
  try {
    // Helper to run SQL with Promise
    const runAsync = (sql, params = []) => new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve(this);
      });
    });

    // Helper to hash password
    const hashPassword = (plain, rounds = 10) => new Promise((resolve, reject) => {
      bcrypt.hash(plain, rounds, (err, hash) => {
        if (err) reject(err);
        else resolve(hash);
      });
    });

    // Clean start
    await runAsync("DROP TABLE IF EXISTS users;");
    await runAsync(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `);

    // Sample accounts (plaintext shown here only in code; not logged)
    const users = [
      { username: 'admin', password: 'admin123' },
      { username: 'alice', password: 'alicepass' },
      { username: 'bob', password: 'bobpass' }
    ];

    const insertStmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");

    for (const u of users) {
      const hashed = await hashPassword(u.password, 10);
      insertStmt.run(u.username, hashed);
    }

    insertStmt.finalize();

    console.log("✅ Database initialized with sample users (passwords stored as bcrypt hashes).");
    console.log("   NOTE: plaintext passwords are NOT printed to logs for security.");
    db.close();
  } catch (err) {
    console.error("Init DB error:", err);
    db.close();
    process.exit(1);
  }
})();
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'umkm.db');
const db = new Database(dbPath);

// Create admins table
db.exec(`
  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  )
`);

// Insert default admin
const passwordHash = bcrypt.hashSync('admin123', 10);
const insertAdmin = db.prepare('INSERT OR IGNORE INTO admins (username, password_hash) VALUES (?, ?)');
insertAdmin.run('admin', passwordHash);

console.log('Admins table created and default admin (admin/admin123) seeded.');

const mysql = require("mysql2/promise");

let pool;

async function initDb() {
  const bootstrap = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  await bootstrap.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  );
  await bootstrap.end();

  pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
  });

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id            INT AUTO_INCREMENT PRIMARY KEY,
      email         VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      role          ENUM('user', 'admin') NOT NULL DEFAULT 'user',
      created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS tickets (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      name        VARCHAR(255) NOT NULL,
      description TEXT,
      price       DECIMAL(10, 2) NOT NULL,
      available   BOOLEAN NOT NULL DEFAULT TRUE,
      created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    INSERT IGNORE INTO tickets (id, name, description, price) VALUES
      (1, 'Erwachsene',     'Eintritt für Personen ab 16 Jahren',           22.00),
      (2, 'Kinder (6–15)',  'Eintritt für Kinder von 6 bis 15 Jahren',       12.00),
      (3, 'Kleinkinder',    'Kinder unter 6 Jahren haben freien Eintritt',    0.00),
      (4, 'Familienticket', '2 Erwachsene + bis zu 3 Kinder',               55.00),
      (5, 'Senioren',       'Personen ab 65 Jahren mit Ausweis',             18.00),
      (6, 'Jahreskarte',    'Unbegrenzter Eintritt für 12 Monate',           89.00)
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS reviews (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      user_id     INT NOT NULL,
      stars       TINYINT NOT NULL,
      comment     TEXT NOT NULL,
      created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT chk_reviews_stars CHECK (stars BETWEEN 1 AND 5),
      CONSTRAINT fk_reviews_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
}

function getPool() {
  return pool;
}

module.exports = { initDb, getPool };

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getPool } = require("../config/db");
const db = { query: (...args) => getPool().query(...args) };

async function register(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const [existing] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
  if (existing.length > 0) {
    return res.status(409).json({ message: "Email already in use" });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const [result] = await db.query(
    "INSERT INTO users (email, password_hash) VALUES (?, ?)",
    [email, passwordHash]
  );

  const token = signToken(result.insertId, email);
  res.status(201).json({ token, user: { id: result.insertId, email } });
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  if (rows.length === 0) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken(user.id, user.email, user.role);
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
}

async function me(req, res) {
  const [rows] = await db.query(
    "SELECT id, email, role, created_at FROM users WHERE id = ?",
    [req.user.id]
  );
  if (rows.length === 0) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(rows[0]);
}

function signToken(id, email, role = "user") {
  return jwt.sign(
    { id, email, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}

module.exports = { register, login, me };

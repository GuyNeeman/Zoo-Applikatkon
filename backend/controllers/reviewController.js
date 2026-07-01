const { getPool } = require("../config/db");

async function listReviews(req, res) {
  const db = getPool();
  const [reviews] = await db.query(
    `SELECT r.id, r.stars, r.comment, r.created_at, u.email
     FROM reviews r
     INNER JOIN users u ON u.id = r.user_id
     ORDER BY r.created_at DESC`
  );

  const summary = await getSummary(db);
  res.json({ reviews, ...summary });
}

async function createReview(req, res) {
  const db = getPool();
  const { stars, comment } = req.body;

  const numericStars = Number(stars);
  const normalizedComment = typeof comment === "string" ? comment.trim() : "";

  if (!Number.isInteger(numericStars) || numericStars < 1 || numericStars > 5) {
    return res.status(400).json({ message: "Sterne muessen als Zahl von 1 bis 5 angegeben werden" });
  }

  if (!normalizedComment) {
    return res.status(400).json({ message: "Bitte gib einen Bewertungstext ein" });
  }

  const [result] = await db.query(
    "INSERT INTO reviews (user_id, stars, comment) VALUES (?, ?, ?)",
    [req.user.id, numericStars, normalizedComment]
  );

  const [rows] = await db.query(
    `SELECT r.id, r.stars, r.comment, r.created_at, u.email
     FROM reviews r
     INNER JOIN users u ON u.id = r.user_id
     WHERE r.id = ?`,
    [result.insertId]
  );

  const summary = await getSummary(db);
  res.status(201).json({
    message: "Bewertung gespeichert",
    review: rows[0],
    ...summary,
  });
}

async function getSummary(db) {
  const [summaryRows] = await db.query(
    "SELECT COUNT(*) AS reviewCount, AVG(stars) AS averageRating FROM reviews"
  );

  const rawAverage = summaryRows[0].averageRating;

  return {
    reviewCount: Number(summaryRows[0].reviewCount),
    averageRating: rawAverage == null ? 0 : Number(rawAverage),
  };
}

module.exports = { listReviews, createReview };

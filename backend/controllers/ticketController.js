const { getPool } = require("../config/db");

async function getAllTickets(req, res) {
  const db = getPool();
  const [rows] = await db.query(
    "SELECT * FROM tickets WHERE available = 1 ORDER BY price ASC"
  );
  res.json(rows);
}

async function getTicketById(req, res) {
  const db = getPool();
  const [rows] = await db.query("SELECT * FROM tickets WHERE id = ?", [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ message: "Ticket nicht gefunden" });
  res.json(rows[0]);
}

async function createTicket(req, res) {
  const db = getPool();
  const { name, description, price } = req.body;
  if (!name || price == null) {
    return res.status(400).json({ message: "Name und Preis sind erforderlich" });
  }
  const [result] = await db.query(
    "INSERT INTO tickets (name, description, price) VALUES (?, ?, ?)",
    [name, description ?? null, price]
  );
  res.status(201).json({ id: result.insertId, name, description, price, available: true });
}

async function updateTicket(req, res) {
  const db = getPool();
  const { name, description, price, available } = req.body;
  const [result] = await db.query(
    `UPDATE tickets
     SET name = COALESCE(?, name),
         description = COALESCE(?, description),
         price = COALESCE(?, price),
         available = COALESCE(?, available)
     WHERE id = ?`,
    [name, description, price, available, req.params.id]
  );
  if (result.affectedRows === 0) return res.status(404).json({ message: "Ticket nicht gefunden" });
  res.json({ message: "Ticket aktualisiert" });
}

async function deleteTicket(req, res) {
  const db = getPool();
  const [result] = await db.query("DELETE FROM tickets WHERE id = ?", [req.params.id]);
  if (result.affectedRows === 0) return res.status(404).json({ message: "Ticket nicht gefunden" });
  res.json({ message: "Ticket gelöscht" });
}

module.exports = { getAllTickets, getTicketById, createTicket, updateTicket, deleteTicket };

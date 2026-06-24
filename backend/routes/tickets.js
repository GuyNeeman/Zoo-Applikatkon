const express = require("express");
const router = express.Router();
const {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticketController");
const { authenticateToken, requireAdmin } = require("../middleware/auth");

const wrap = (fn) => (req, res, next) => fn(req, res, next).catch(next);

router.get("/", wrap(getAllTickets));
router.get("/:id", wrap(getTicketById));

router.post("/", authenticateToken, requireAdmin, wrap(createTicket));
router.put("/:id", authenticateToken, requireAdmin, wrap(updateTicket));
router.delete("/:id", authenticateToken, requireAdmin, wrap(deleteTicket));

module.exports = router;

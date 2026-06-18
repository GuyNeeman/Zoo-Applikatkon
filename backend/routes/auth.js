const express = require("express");
const router = express.Router();
const { register, login, me } = require("../controllers/authController");
const { authenticateToken } = require("../middleware/auth");

const wrap = (fn) => (req, res, next) => fn(req, res, next).catch(next);

router.post("/register", wrap(register));
router.post("/login", wrap(login));
router.get("/me", authenticateToken, wrap(me));

module.exports = router;

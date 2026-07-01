const express = require("express");
const router = express.Router();
const { listReviews, createReview } = require("../controllers/reviewController");
const { authenticateToken } = require("../middleware/auth");

const wrap = (fn) => (req, res, next) => fn(req, res, next).catch(next);

router.get("/", wrap(listReviews));
router.post("/", authenticateToken, wrap(createReview));

module.exports = router;

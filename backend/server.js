require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { initDb } = require("./config/db");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors({
  origin: /^http:\/\/localhost(:\d+)?$/,
  credentials: true,
}));
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 3001;

initDb()
  .then(() => {
    app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("DB init failed:", err.message);
    process.exit(1);
  });

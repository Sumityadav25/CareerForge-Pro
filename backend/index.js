require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());

// ⚠ Stripe webhook must come BEFORE express.json()
app.use("/api/webhook", require("./routes/webhookRoute"));

// JSON parser for other routes
app.use(express.json({ limit: "10mb" }));

// ================= ROUTES =================
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/resume", require("./routes/resumeRoute"));
app.use("/api/ai", require("./routes/aiRoute"));
app.use("/api/match", require("./routes/matchRoute"));
app.use("/api/pdf", require("./routes/pdfRoute"));
app.use("/api/payment", require("./routes/paymentRoute"));

// ================= SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

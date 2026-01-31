const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
connectDB();

const pdfRoute = require("./routes/pdfRoute");
const paymentRoute = require("./routes/paymentRoute");
const webhookRoute = require("./routes/webhookRoute");

const app = express();   // ⭐ PEHLE APP BANATE HAIN

app.use(cors());
app.use("/api", webhookRoute);
app.use(express.json({ limit: "10mb" }));

// ROUTES BAAD ME USE HONGE
app.use("/api/pdf", pdfRoute);
app.use("/api/payment", paymentRoute);

app.listen(5000, () => console.log("Server running on port 5000"));

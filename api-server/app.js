// app.js
const express = require("express");
const userRoutes = require("./routes/userRoute");

const app = express();

app.use(express.json());
app.use("/api", userRoutes);

module.exports = app; // ✅ Required for testing with Supertest

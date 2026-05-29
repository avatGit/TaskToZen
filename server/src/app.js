const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/authRoutes");
const taskRoute = require("./routes/taskRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/task", taskRoute);

app.get("/", (req, res) => {
  res.send("Welcome to TaskPilot API");
});

module.exports = app;

const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/authRoutes");
const taskRoute = require("./routes/taskRoutes");
const cookieParser= require('cookie-parser')

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/task", taskRoute);

app.get("/", (req, res) => {
  res.send("Welcome to TaskToZen API");
});

module.exports = app;

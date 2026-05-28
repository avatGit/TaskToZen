const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/authRoutes");
const app = express();

app.use(cors());
app.use(express.json());

module.exports = app;

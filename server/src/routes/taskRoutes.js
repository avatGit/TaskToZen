const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const { authentificate } = require("../middleware/authMiddleware");

router.post("/add", authentificate, taskController.addTask);

module.exports = router;

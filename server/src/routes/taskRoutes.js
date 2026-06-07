const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const { authenticate } = require("../middleware/authMiddleware");

console.log("Middleware:", typeof authenticate);

router.post("/add", authenticate, taskController.addTask);

module.exports = router;

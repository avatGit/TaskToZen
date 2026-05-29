const express = require("express");
const authController = require("../controllers/authController");
const taskRouter = express.Router();

taskRouter.post("/login", authController.login);

taskRouter.post("/register", authController.register);

taskRouter.get("/users", authController.getAllUsers);

module.exports = taskRouter;

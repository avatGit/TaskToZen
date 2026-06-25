const express = require("express");
const authController = require("../controllers/authController");
const taskRouter = express.Router();
const {authenticate} = require('../middleware/authMiddleware')

taskRouter.post("/login", authController.login);

taskRouter.post("/register", authController.register);

taskRouter.get('/me', authenticate, (req,res) =>{
    res.status(200).json({user: req.user})
})

taskRouter.get("/users", authController.getAllUsers);

module.exports = taskRouter;

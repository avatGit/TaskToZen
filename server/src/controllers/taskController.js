const taskService = require("../services/taskService");
const Task = require("../models/Task");

exports.addTask = async (req, res) => {
  try {
    const data = req.body;
    const userid = req.user._id;

    const newTask = await taskService.createTask(data, userid);

    res.status(200).json({
      message: "Task created Succesfully. Task id: " + newTask._id,
      task: newTask,
    });
  } catch (err) {
    console.error("Error in addTask: ", err);
    res.status(500).json({ message: "Server error while creating task." });
  }
};

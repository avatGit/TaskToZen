const Task = require("../models/Task");

exports.createTask = async (data, userid) => {
  try {
    const task = await Task.create({
      ...data,
      created_by: userid,
      updated_by: userid,
    });
    return task;
  } catch (err) {
    console.log("Erreur Server", err);
  }
};

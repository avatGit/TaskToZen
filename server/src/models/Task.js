const mongoose = require("mongoose");
const User = require("./User");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      allownull: true,
    },
    priority: {
      type: String,
      enum: {
        values: ["low", "medium", "high"],
        message: "{VALUE] n\'est pas une priorite valide.",
      },
      default: "medium",
    },
    completed: {
      type: Boolean,
      default: false,
    },

    // ---- Duration of the task -----
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: [
        true,
        "Une date de fin est obligatoire pour planifier une tache",
      ],
      validate: {
        validator: function (value) {
          return value >= this.startDate;
        },
        message:
          "La date de fin doit etre egale ou posterieur a la date de debut",
      },
    },
    //----------------------------------
    created_by: {
      type: DataTypes.UUID,
      allownull: false,
    },
    updated_by: {
      type: DataTypes.UUID,
      allownull: true,
    },
  },
  { timeStamps: true },
);

console.log("Task model loaded Successfully");

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

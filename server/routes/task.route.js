import express from "express";
import {
  getTasksByEmployee,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const taskRouter = express.Router();

// Route to get all tasks for a specific employee
taskRouter.get("/employee/:employeeId", getTasksByEmployee);

// Route to create a new task
taskRouter.post("/", createTask);

// Route to update a task by ID
taskRouter.put("/:id", updateTask);

// Route to delete a task by ID
taskRouter.delete("/:id", deleteTask);

export { taskRouter };

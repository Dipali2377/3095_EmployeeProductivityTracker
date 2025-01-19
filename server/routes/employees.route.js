import express from "express";
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

const employeeRouter = express.Router();

// Route to get all employees
employeeRouter.get("/", getAllEmployees);

// Route to get a specific employee by ID
employeeRouter.get("/:id", getEmployeeById);

// Route to create a new employee
employeeRouter.post("/", createEmployee);

// Route to update an employee by ID
employeeRouter.put("/:id", updateEmployee);

// Route to delete an employee by ID
employeeRouter.delete("/:id", deleteEmployee);

export { employeeRouter };

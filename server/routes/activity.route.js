import express from "express";
import {
  getActivitiesByEmployee,
  logActivity,
} from "../controllers/activityController.js";

const activityRouter = express.Router();

// Route to get all activities for a specific employee
activityRouter.get("/:employeeId", getActivitiesByEmployee);
activityRouter.post("/activity", logActivity);
export { activityRouter };

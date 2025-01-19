import express from "express";
import {
  generateReport,
  getAllReports,
  createReport,
} from "../controllers/reportController.js";

const reportRouter = express.Router();
reportRouter.post("/generate", generateReport);

// Route to get all reports (GET request)
reportRouter.get("/", getAllReports);

// Route to create a new report (POST request)
reportRouter.post("/", createReport);
export { reportRouter };

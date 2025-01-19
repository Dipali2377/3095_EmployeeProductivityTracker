import Report from "../models/reportModel.js";

// Generate a report for an employee
export const generateReport = async (req, res) => {
  try {
    const { employeeId } = req.params; // Get employeeId from the URL parameter
    const { startDate, endDate } = req.body; // Get startDate and endDate from the request body

    // Filtering reports based on employeeId and date range
    const reportData = await Report.find({
      employeeId,
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });
    res.status(200).json(reportData);
  } catch (error) {
    res.status(500).json({ message: "Error generating report", error });
  }
};
// Get all reports
export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports", error });
  }
};

export const createReport = async (req, res) => {
  try {
    const { employeeId, tasks, startDate, endDate } = req.body;
    const newReport = new Report({
      employeeId,
      tasks,
      startDate,
      endDate,
      date: new Date(),
    });
    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (error) {
    res.status(500).json({ message: "Error creating report", error });
  }
};

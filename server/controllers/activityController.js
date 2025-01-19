import Activity from "../models/activityModel.js";

// Log an activity for an employee
export const logActivity = async (req, res) => {
  try {
    const { employeeId, activityType, description, timestamp } = req.body;
    const newActivity = new Activity({
      employeeId,
      activityType,
      description,
      timestamp,
    });
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ message: "Error logging activity", error });
  }
};

// Get activities by employee
export const getActivitiesByEmployee = async (req, res) => {
  try {
    const activities = await Activity.find({
      employeeId: req.params.employeeId,
    });
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching activities", error });
  }
};

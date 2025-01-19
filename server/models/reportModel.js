import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    reportDate: {
      type: Date,
      default: Date.now,
    },
    tasksCompleted: {
      type: Number,
      default: 0,
    },
    totalHoursWorked: {
      type: Number,
      default: 0,
    },
    performanceRating: {
      type: Number,
      min: 1,
      max: 5,
      default: 3,
    },
    summary: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;

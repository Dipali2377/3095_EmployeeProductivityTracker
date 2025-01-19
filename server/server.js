import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

import { employeeRouter } from "./routes/employees.route.js";
import { taskRouter } from "./routes/task.route.js";
import { activityRouter } from "./routes/activity.route.js";
import { reportRouter } from "./routes/report.route.js";
import { authRoutes } from "./routes/auth.js";
import { userRoutes } from "./routes/user.route.js";
const app = express();

// Connect to DB
connectDB();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 2008;

app.use("/employees", employeeRouter);
app.use("/tasks", taskRouter);
app.use("/activities", activityRouter);
app.use("/reports", reportRouter);

app.use("/api/auth", authRoutes);

app.use("/api", userRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

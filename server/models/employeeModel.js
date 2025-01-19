import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "Employee" },
  productivity: { type: Number, default: 75 },
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;

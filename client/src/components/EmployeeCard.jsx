// import axios from "axios";

// const API_URL = "http://localhost:2004";

// export const fetchEmployees = async () => {
//   return axios.get(`${API_URL}/employees`);
// };

// export const fetchEmployeeTasks = async (employeeId) => {
//   return axios.get(`${API_URL}/tasks/employee/${employeeId}`);
// };

// src/components/styles/EmployeeCard.jsx
// src/components/styles/EmployeeCard.jsx
import React from "react";

const EmployeeCard = ({ employee, onEdit, onDelete }) => {
  return (
    <div className="employee-card">
      <h3>{employee.name}</h3>
      <p>Username: {employee.username}</p>
      <p>Role: {employee.role}</p>
      <p>Productivity: {employee.productivity}%</p>
      <button onClick={() => onEdit(employee)}>Edit</button>
      <button onClick={() => onDelete(employee._id)}>Delete</button>
    </div>
  );
};

export default EmployeeCard;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../components/styles/EmployeeDashboard.css";

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL; // Use environment variable

  useEffect(() => {
    axios
      .get(`${apiUrl}/employees`)
      .then((response) => setEmployees(response.data))
      .catch((error) => console.log("Error fetching employees:", error));
  }, [apiUrl]);

  return (
    <div>
      <h1>Employee Dashboard</h1>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            <Link to={`/tasks/${employee._id}`}>{employee.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeDashboard;

// src/components/styles/EmployeeForm.jsx
import React, { useState, useEffect } from "react";

const EmployeeForm = ({ onSubmit, employee }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    role: "Employee",
    productivity: 75,
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        username: employee.username,
        password: "", // Leave empty for security purposes
        role: employee.role,
        productivity: employee.productivity,
      });
    } else {
      setFormData({
        name: "",
        username: "",
        password: "",
        role: "Employee",
        productivity: 75,
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (employee && !formData.password) {
      delete formData.password; // Skip password update if not provided
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      {!employee && (
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required={!employee}
        />
      )}
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="Employee">Employee</option>
        <option value="Manager">Manager</option>
        <option value="Admin">Admin</option>
      </select>
      <input
        type="number"
        name="productivity"
        placeholder="Productivity"
        value={formData.productivity}
        onChange={handleChange}
        min="0"
        max="100"
      />
      <button type="submit">{employee ? "Update" : "Add"} Employee</button>
    </form>
  );
};

export default EmployeeForm;

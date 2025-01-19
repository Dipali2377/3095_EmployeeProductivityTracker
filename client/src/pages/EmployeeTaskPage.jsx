import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import "../components/styles/EmployeeTaskPage.css";
const EmployeeTaskPage = () => {
  const { employeeId } = useParams(); // Get employeeId from URL
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    status: "In Progress",
    priority: "Medium",
  });

  const apiUrl = import.meta.env.VITE_API_URL; // Use environment variable

  // Fetch tasks for the specific employee
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/tasks/employee/${employeeId}`
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [employeeId, apiUrl]);

  // Handle input changes for the task form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle adding a new task
  const handleAddTask = async () => {
    if (!newTask.name.trim() || !newTask.description.trim()) {
      alert("Task name and description are required!");
      return;
    }
    try {
      const response = await axios.post(`${apiUrl}/tasks`, {
        ...newTask,
        assignedTo: employeeId, // Assign task to the employee
      });
      setTasks((prevTasks) => [...prevTasks, response.data]); // Add new task to the list
      setNewTask({
        name: "",
        description: "",
        status: "In Progress",
        priority: "Medium",
      }); // Reset form
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Function to get the status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "green";
      case "Pending":
        return "yellow";
      case "In Progress":
        return "blue";
      default:
        return "gray";
    }
  };

  return (
    <div className="employee-task-container">
      <h1 className="employee-task-heading">Employee Tasks</h1>

      {/* Form to add a new task */}
      <div className="task-form">
        <input
          type="text"
          name="name"
          placeholder="Task name"
          value={newTask.name}
          onChange={handleInputChange}
          className="task-input"
        />
        <textarea
          name="description"
          placeholder="Task description"
          value={newTask.description}
          onChange={handleInputChange}
          className="task-textarea"
        />
        <select
          name="status"
          value={newTask.status}
          onChange={handleInputChange}
          className="task-select"
        >
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>

        <select
          name="priority"
          value={newTask.priority}
          onChange={handleInputChange}
          className="task-select"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button onClick={handleAddTask} className="task-btn">
          Add Task
        </button>
      </div>

      {/* List of tasks */}
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <h3>{task.name}</h3>
            <p>Description: {task.description}</p>
            <p>
              Status:{" "}
              <span className={`status ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
            </p>
            <p>
              Assigned To:{" "}
              {task.assignedTo ? task.assignedTo.name : "Not Available"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeTaskPage;

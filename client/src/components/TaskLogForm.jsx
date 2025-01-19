import { useState } from "react";
import axios from "axios";

const TaskLogForm = ({ employeeId }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    timeSpent: 0,
    priority: "Medium",
    category: "BAU",
    reference: "",
    attachments: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setTask({ ...task, attachments: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", task.title);
      formData.append("description", task.description);
      formData.append("timeSpent", task.timeSpent);
      formData.append("priority", task.priority);
      formData.append("category", task.category);
      formData.append("reference", task.reference);
      formData.append("employeeId", employeeId);
      task.attachments.forEach((file) => formData.append("attachments", file));

      const response = await axios.post(
        "http://localhost:2007/api/tasks",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Task logged successfully!");
    } catch (error) {
      console.error("Error logging task:", error);
      alert("Error logging task!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Task Title"
        required
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Task Description"
        required
      />
      <input
        type="number"
        name="timeSpent"
        value={task.timeSpent}
        onChange={handleChange}
        placeholder="Time Spent (hours)"
        required
      />
      <select name="priority" value={task.priority} onChange={handleChange}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <select name="category" value={task.category} onChange={handleChange}>
        <option value="BAU">BAU</option>
        <option value="Ad Hoc">Ad Hoc</option>
        <option value="Project-Based">Project-Based</option>
      </select>
      <input
        type="text"
        name="reference"
        value={task.reference}
        onChange={handleChange}
        placeholder="Reference (e.g., manager)"
      />
      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit">Log Task</button>
    </form>
  );
};

export default TaskLogForm;

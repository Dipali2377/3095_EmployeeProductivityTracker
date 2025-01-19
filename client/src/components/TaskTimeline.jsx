import { useEffect, useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const TaskTimeline = ({ employeeId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/tasks/${employeeId}`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [employeeId]);

  return (
    <div>
      <h2>Task Timeline</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>
              <strong>Time Spent:</strong> {task.timeSpent} hours
            </p>
            <p>
              <strong>Priority:</strong> {task.priority}
            </p>
            <p>
              <strong>Category:</strong> {task.category}
            </p>
            {task.attachments.length > 0 && (
              <div>
                <strong>Attachments:</strong>
                <ul>
                  {task.attachments.map((attachment, index) => (
                    <li key={index}>
                      <a
                        href={attachment}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p>
              <strong>Assigned by:</strong> {task.reference}
            </p>
            <p>
              <strong>Created at:</strong>{" "}
              {new Date(task.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskTimeline;

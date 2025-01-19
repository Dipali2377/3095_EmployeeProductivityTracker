import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "../components/styles/Login.css";
import "react-toastify/dist/ReactToastify.css";
const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(""); // For displaying error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/login`,
        credentials
      );
      if (response.status === 200) {
        toast.success("Login successful!");

        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.log("Login failed", error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}{" "}
        {/* Show error message if login fails */}
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;

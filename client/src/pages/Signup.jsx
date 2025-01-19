import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../components/styles/Signup.css";
const apiUrl = import.meta.env.VITE_API_URL;

const Signup = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState(""); // For displaying error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      // Check if the user already exists
      const existingUser = await axios.get(
        `${apiUrl}/api/check-user/${userData.username}`
      );

      if (existingUser.data.exists) {
        alert("User already exists, please login!");
        navigate("/login");
      } else {
        await axios.post(`${apiUrl}/api/signup`, userData);
        navigate("/login");
      }
    } catch (error) {
      setError("Signup failed. Please try again.");
      console.log("Signup failed", error);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <input
          type="text"
          name="username"
          placeholder="Enter your email"
          value={userData.username}
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <button type="submit">Signup</button>
        {error && <p className="error">{error}</p>}{" "}
        {/* Show error message if signup fails */}
      </form>
    </div>
  );
};

export default Signup;

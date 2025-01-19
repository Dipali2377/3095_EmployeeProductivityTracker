import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeeTaskPage from "./pages/EmployeeTaskPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<EmployeeDashboard />} />
        <Route path="/tasks/:employeeId" element={<EmployeeTaskPage />} />

        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;

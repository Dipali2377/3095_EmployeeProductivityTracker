import { Link } from "react-router-dom";
import "../components/styles/Navbar.css";
import logo from "../assets/softweb-logo.svg"; // Import the logo image

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" /> {/* Corrected syntax to use the logo */}
        </Link>
      </div>
      <ul>
        {/* <li>
          <Link to="/" className="active">
            Dashboard
          </Link>
        </li> */}
        <li>
          <Link to="/login" className="login">
            Login
          </Link>{" "}
          {/* Added 'login' class */}
        </li>
        <li>
          <Link to="/signup" className="signup">
            Signup
          </Link>{" "}
          {/* Added 'signup' class */}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

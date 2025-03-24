import { useContext, useState } from "react";
import "./navbar.css";
import { context } from "../main";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { BaseUrl } from "../utils/api";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons

const Navbar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(context);

  const handleLogOut = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/user/patient/logout`, {
        withCredentials: true,
      });

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setIsAuthenticated(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <nav className="nav_container">
      <div className="logo">HealthCare</div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={() => setShow(!show)}>
        {show ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      <div className={show ? "navLinks showMenu" : "navLinks"}>
        <div className="links">
          <Link className="link" to={"/"} onClick={() => setShow(false)}>
            HOME
          </Link>
          <Link className="link" to={"/appointment"} onClick={() => setShow(false)}>
            APPOINTMENT
          </Link>
          <Link className="link" target="_blank" to={"https://hospital-managment-ealj.vercel.app"} onClick={() => setShow(false)}>
            ADMIN
          </Link>
        </div>

        {isAuthenticated ? (
          <button className="nav_btn" onClick={handleLogOut}>LOGOUT</button>
        ) : (
          <button className="nav_btn" onClick={() => navigate("/login")}>LOGIN</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

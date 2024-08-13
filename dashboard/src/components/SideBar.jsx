import { useContext, useEffect, useState } from 'react';
import "./sidebar.css"
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { BaseUrl } from "../utils/baseurl";
import toast from "react-hot-toast";
import { IoHomeOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosLogOut } from "react-icons/io";
import { FaUserDoctor } from "react-icons/fa6";
import { TiMessages } from "react-icons/ti";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";
import dashboardImg from "../assets/dashboard.png";
import { context } from '../main';


const SideBar = () => {

  const navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(context);
  const [show, setShow] = useState(false);


  useEffect(() => {
    const checkAuthentication = () => {
      if (!isAuthenticated) {
        navigate("/login");
      }
    }
    checkAuthentication();
  }, []);

  const handleLogOut = async () => {
    try {

      const response = await axios.get(`${BaseUrl}/user/admin/logout`, { withCredentials: true });

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setIsAuthenticated(false);
        navigate("/")
      }

    } catch (error) {
      console.log(error.message);
      toast.error(error.respose.data.message);
    }
  };


  const handleGoHome = () => {
    navigate("/");
  };

  const handleGetDoctor = async () => {
    navigate("/doctors");
  };


  const handleAddNewDoctor = async () => {
    navigate("/doctor/addNew");
  };

  const handleAddNewAdmin = async () => {
    navigate("/admin/addNew");
  };

  const handleGetMessages = async () => {
    navigate("/messages");
  };

  return (
    <>

      <div className='admin_nav_container'>

        <div style={!isAuthenticated ? { display: "none" } : { display: "flex", alignItems: 'center', justifyContent: "space-between", padding: "15px" }} className='admin_wrapper'>
          <img src={dashboardImg} title='Admin_Dashboard' alt="dashboard" style={{ width: "40px", height: "40px" }} />
          <GiHamburgerMenu style={{ width: "30px", height: "35px", cursor: "pointer", color: "grey" }} onClick={() => setShow(!show)} />
        </div>

        {
          show && (

            <nav
              style={!isAuthenticated ? { display: "none" } : { position: "absolute", top: "0", width: "150px", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", backgroundColor: "red" }}
              className={show ? "show_admin_sidebar" : "admin_sidebar"}
            >

              <div className="dashboard_links">
                <IoHomeOutline title='Home' className='dashboard_icon' onClick={handleGoHome} />
                <FaUserDoctor title='Doctors' className='dashboard_icon' onClick={handleGetDoctor} />
                <TiMessages title='Messages' className='dashboard_icon' onClick={handleGetMessages} />
                <MdOutlineAdminPanelSettings title='Add Admin' className='dashboard_icon' onClick={handleAddNewAdmin} />
                <IoPersonAdd title='Add Doctor' className='dashboard_icon' onClick={handleAddNewDoctor} />
                <IoIosLogOut title='Logout' className='dashboard_icon' onClick={handleLogOut} />
              </div>

            </nav>
          )
        }

      </div>

    </>

  )
}

export default SideBar;
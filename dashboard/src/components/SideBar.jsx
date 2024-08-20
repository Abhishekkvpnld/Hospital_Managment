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

  const { isAdminAuthenticated, setIsAdminAuthenticated, setUser } = useContext(context);
  const [show, setShow] = useState(false);


  useEffect(() => {
    const checkAuthentication = () => {
      if (!isAdminAuthenticated) {
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
        setIsAdminAuthenticated(false);
        navigate("/login")
      }

    } catch (error) {
      console.log(error.message);
      toast.error(error.respose.data.message);
    }
  };


  const handleGoHome = () => {
    navigate("/");
    setShow(false);
  };

  const handleGetDoctor = async () => {
    navigate("/doctors");
    setShow(false);
  };


  const handleAddNewDoctor = async () => {
    navigate("/doctor/addNew");
    setShow(false);
  };

  const handleAddNewAdmin = async () => {
    navigate("/admin/addNew");
    setShow(false);
  };

  const handleGetMessages = async () => {
    navigate("/messages");
    setShow(false);
  };

  return (
    <>

      <div className='admin_nav_container'>

        <div style={!isAdminAuthenticated ? { display: "none" } : { display: "flex", alignItems: 'center', justifyContent: "space-between", padding: "15px" }} className='admin_wrapper'>
          <img src={dashboardImg} title='Admin_Dashboard' alt="dashboard" style={{ width: "40px", height: "40px" }} />
          
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"35px"}}>
          <IoHomeOutline title='Home' className='home_btn_icon'  onClick={handleGoHome} />
          <GiHamburgerMenu className='menu_icon' style={{ width: "30px", height: "35px", cursor: "pointer", color: "black" }} onClick={() => setShow(!show)} />
          </div>

           </div>

        {
          show && (

            <nav
              style={!isAdminAuthenticated ? { display: "none" } : { position: "absolute", top: "0", left: "0", width: "150px", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", backgroundColor: "red" }}
              className={show ? "show_admin_sidebar" : "admin_sidebar"}
            >

              <div className="dashboard_links">
                <h1 style={{ color: "white" }}>Admin</h1>
                <IoHomeOutline title='Home' className='dashboard_icon' onClick={handleGoHome} />
                <FaUserDoctor title='Doctors' className='dashboard_icon' onClick={handleGetDoctor} />
                <TiMessages title='Messages' className='dashboard_icon' onClick={handleGetMessages} />
                <MdOutlineAdminPanelSettings title='Add Admin' className='dashboard_icon' onClick={handleAddNewAdmin} />
                <IoPersonAdd title='Add Doctor' className='dashboard_icon' onClick={handleAddNewDoctor} />
                <IoIosLogOut title='Logout' className='dashboard_icon-logout' onClick={handleLogOut} />
              </div>

            </nav>
          )
        }

      </div>

    </>

  )
}

export default SideBar;
import { useContext, useState } from "react";
import "./navbar.css";
import { context } from "../main"
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { BaseUrl } from "../utils/api";


const Navbar = () => {

    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const { isAuthenticated, setIsAuthenticated } = useContext(context);

    const handleLogOut = async () => {
        try {

            const response = await axios.get(`${BaseUrl}/user/patient/logout`, { withCredentials: true });

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

    return (
        <nav className="nav_container">

            <div className="logo">HealthCare</div>

            <div className={show ? "navLinks showMenu" : 'navLinks'}>

                <div className="links">
                    <Link className="link" to={"/"}>HOME</Link>
                    <Link className="link" to={"/appointment"}>APPOINTMENT</Link>
                    <Link className="link" to={"/"}>ABOUT US</Link>
                </div>

                {isAuthenticated ? (<button className="nav_btn" onClick={handleLogOut}>LOGOUT</button>) : (<button className="nav_btn" onClick={() => navigate("/login")}>LOGIN</button>)}

            </div>
        </nav>
    )
}

export default Navbar;
import { useContext, useState } from "react";
import "./login.css";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { context } from "../main";
import { BaseUrl } from "../utils/baseurl";

const Login = () => {

  const navigate = useNavigate();
  const { isAdminAuthenticated, setIsAdminAuthenticated } = useContext(context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BaseUrl}/user/login`, { email, password, confirmPassword, role: "Admin" }, { withCredentials: true });

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setIsAdminAuthenticated(true);
        navigate("/");
      }

    } catch (error) {
      console.log(error?.message);
      toast.error(error?.response?.data?.message);
    }

  }

  if (isAdminAuthenticated) {
    return <Navigate to={"/"} />
  }

  return (
    <div className="admin_login_container">

      <h1 className="admin_admin_login_title">SIGN IN</h1>
      <p style={{ color: "red" }}>Only Admin Are Allowed To Access These Resources *</p>

      <form className="admin_login_form" onSubmit={handleLogin} >

        <div className="inp_div">
          <label htmlFor="email">Email</label>
          <input
            className="admin_login_inp"
            type="email"
            placeholder="Enter Email..."
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="inp_div">
          <label htmlFor="password">Password</label>
          <input
            className="admin_login_inp"
            type="password"
            placeholder="Enter Password..."
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="inp_div">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="admin_login_inp"
            type="password"
            placeholder="Enter Confirm Password..."
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="button_div" style={{ width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <button type="submit" className="admin_login_btn" >LOGIN</button>
        </div>

      </form>

    </div>
  )
}

export default Login;
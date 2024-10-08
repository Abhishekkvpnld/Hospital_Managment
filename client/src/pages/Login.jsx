import { useContext, useState } from "react";
import "./login.css";
import { context } from "../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../utils/api";
import toast from "react-hot-toast";

const Login = () => {

  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BaseUrl}/user/login`, { email, password, confirmPassword, role: "Patient" }, { withCredentials: true });

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setIsAuthenticated(true);
        navigate("/");
      }

    } catch (error) {
      console.log(error?.message);
      toast.error(error?.response?.data?.message);
    }

  }

  if (isAuthenticated) {
    return navigate("/")
  }

  return (
    <div className="login_container">

      <h1 className="login_title">SIGN IN</h1>

      <form className="login_form" onSubmit={handleLogin} >

        <div className="inp_div">
          <label htmlFor="email">Email</label>
          <input
            className="login_inp"
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
            className="login_inp"
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
            className="login_inp"
            type="password"
            placeholder="Enter Confirm Password..."
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="button_div" style={{ width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <button type="submit" className="login_btn" >LOGIN</button>
        </div>

        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <p>Not registered?</p>
          <Link to={"/register"} style={{ textDecoration: "none", margin: "5px" }} className="signup_nav">Sign Up</Link>
        </div>

      </form>

    </div>
  )
}

export default Login;
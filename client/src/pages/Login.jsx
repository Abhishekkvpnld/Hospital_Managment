import { useContext, useEffect, useState } from "react";
import "./login.css";
import { context } from "../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../utils/api";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {

  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(context);

  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("User@123");
  const [show, setShow] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BaseUrl}/user/login`, { email, password, role: "Patient" }, { withCredentials: true });

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

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);


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
          <div className="password_div">
            <input
              className="login_inp"
              type={`${show ? "text" : "password"}`}
              placeholder="Enter Password..."
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {show ? <FaEye className="showPassword" onClick={() => setShow(!show)} /> : <FaEyeSlash onClick={() => setShow(!show)} className="showPassword" />}
          </div>
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
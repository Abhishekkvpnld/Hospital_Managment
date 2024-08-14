import { useContext, useState } from 'react';
import "./addNewAdmin.css";
import { Navigate, useNavigate } from 'react-router-dom';
import { context } from '../main';
import { BaseUrl } from '../utils/baseurl';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddNewAdmin = () => {
  const navigate = useNavigate();
  const { isAdminAuthenticated, setIsAdminAuthenticated } = useContext(context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(`${BaseUrl}/user/admin/addNew`, { firstName, lastName, email, phone, dob, gender, password, confirmPassword }, { withCredentials: true });

      if (response?.data?.success) {
        toast.success(response?.data.message);
        setIsAdminAuthenticated(true);
        navigate("/");
      }

    } catch (error) {
      console.log(error.message);
      toast.error(error?.response?.data?.message);
    }
  }

  if (!isAdminAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="signup_container">

      <h1 className="signup_title">REGISTER NEW ADMIN</h1>

      <form className="signup_form" onSubmit={handleRegister} >

        <div className='signup_div_category'>

          <div className="signup_inp_div">
            <label htmlFor="firstName">First Name</label>
            <input
              className="signup_inp"
              type="text"
              placeholder="Enter First Name..."
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="signup_inp_div">
            <label htmlFor="lastName">Last Name</label>
            <input
              className="signup_inp"
              type="text"
              placeholder="Enter Last Name..."
              name="lastName"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

        </div>

        <div className='signup_div_category'>

          <div className="signup_inp_div">
            <label htmlFor="email">Email</label>
            <input
              className="signup_inp"
              type="email"
              placeholder="Enter Email..."
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="signup_inp_div">
            <label htmlFor="phone">Phone</label>
            <input
              className="signup_inp"
              type="number"
              placeholder="Enter Phone Number..."
              name="phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

        </div>

        <div className='signup_div_category'>

          <div className="signup_inp_div">
            <label htmlFor="DOB">DOB</label>
            <input
              className="signup_inp signup_dob"
              type="date"
              placeholder="Enter Date of Birth..."
              name="dob"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          <div className="signup_inp_div">
            <label htmlFor="gender">Gender</label>
            <select className='signup_inp signup_section' name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

        </div>

        <div className='signup_div_category'>
          <div className="signup_inp_div">
            <label htmlFor="password">Password</label>
            <input
              className="signup_inp signup_password"
              type="password"
              placeholder="Enter Password..."
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="signup_inp_div">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="signup_inp"
              type="password"
              placeholder="Enter Confirm Password..."
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="button_div" style={{ width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <button type="submit" className="signup_btn" >ADD NEW ADMIN</button>
        </div>

      </form>

    </div>
  )
}

export default AddNewAdmin;
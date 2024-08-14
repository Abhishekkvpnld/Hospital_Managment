import { useContext, useState } from 'react';
import "./addNewDoctor.css";
import { Navigate, useNavigate } from 'react-router-dom';
import { context } from '../main';
import { BaseUrl } from '../utils/baseurl';
import axios from 'axios';
import toast from 'react-hot-toast';


const AddNewDoctor = () => {
  const navigate = useNavigate();
  const { isAdminAuthenticated } = useContext(context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");


  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT"
  ];

  const handleAvatar = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("password", password);
      formData.append("doctorDepartment", doctorDepartment);
      formData.append("docAvatar", docAvatar);

      const response = await axios.post(`${BaseUrl}/user/doctor/addNew`, formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response?.data?.success) {
        toast.success(response?.data?.message);
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
    <div className="add_doctor_container">

      <h1 className="add_doctor_title">REGISTER NEW DOCTOR</h1>

      <form className="add_doctor_form" onSubmit={handleRegister} >


        <div className="add_doctor_inp_div" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
          <label htmlFor="docAvatar">
            <img src={docAvatarPreview ? docAvatarPreview : "/docAvatar.jpg"} alt="doctor Img" width={"70px"} height={"70px"} style={{ border: "1px solid black", borderRadius: "50%", textAlign: "center" }} />
          </label>
          <input
            className="add_doctor_inp"
            type="file"
            placeholder="Select Doctor image..."
            name="docAvatar"
            id="docAvatar"
            onChange={handleAvatar}
          />
        </div>


        <div className='add_doctor_div_category'>

          <div className="add_doctor_inp_div">
            <label htmlFor="firstName">First Name</label>
            <input
              className="add_doctor_inp"
              type="text"
              placeholder="Enter First Name..."
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="add_doctor_inp_div">
            <label htmlFor="lastName">Last Name</label>
            <input
              className="add_doctor_inp"
              type="text"
              placeholder="Enter Last Name..."
              name="lastName"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

        </div>

        <div className='add_doctor_div_category'>

          <div className="add_doctor_inp_div">
            <label htmlFor="email">Email</label>
            <input
              className="add_doctor_inp"
              type="email"
              placeholder="Enter Email..."
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="add_doctor_inp_div">
            <label htmlFor="phone">Phone</label>
            <input
              className="add_doctor_inp"
              type="number"
              placeholder="Enter Phone Number..."
              name="phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

        </div>

        <div className='add_doctor_div_category'>

          <div className="add_doctor_inp_div">
            <label htmlFor="DOB">DOB</label>
            <input
              className="add_doctor_inp add_doctor_dob"
              type="date"
              placeholder="Enter Date of Birth..."
              name="dob"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          <div className="add_doctor_inp_div">
            <label htmlFor="gender">Gender</label>
            <select className='add_doctor_inp add_doctor_section' name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

        </div>

        <div className='add_doctor_div_category'>
          <div className="add_doctor_inp_div">
            <label htmlFor="password">Password</label>
            <input
              className="add_doctor_inp add_doctor_password"
              type="password"
              placeholder="Enter Password..."
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="add_doctor_inp_div">
            <label htmlFor="doctorDepartment">Doctor Department</label>
            <select
              className='add_doctor_inp add_doctor_section'
              name="doctorDepartment"
              id="doctorDepartment"
              value={doctorDepartment}
              onChange={(e) => setDoctorDepartment(e.target.value)}
            >
              <option value="">Select</option>
              {
                departmentsArray.map((department, index) => {
                  return (
                    <option key={index} value={department}>{department}</option>
                  )
                })
              }
            </select>
          </div>
        </div>

        <div className="button_div" style={{ width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <button type="submit" className="add_doctor_btn" >ADD NEW DOCTOR</button>
        </div>

      </form>

    </div>
  )
}

export default AddNewDoctor;
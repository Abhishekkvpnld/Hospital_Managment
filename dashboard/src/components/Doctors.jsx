import { useContext, useEffect, useState } from "react";
import "./doctors.css";
import { context } from "../main";
import toast from "react-hot-toast";
import axios from "axios";
import { BaseUrl } from "../utils/baseurl";
import { Navigate } from "react-router-dom";


const Doctors = () => {

  const [doctors, setDoctors] = useState([]);
  const { isAdminAuthenticated } = useContext(context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/user/doctors`, { withCredentials: true });
        if (response?.data?.success) {
          setDoctors(response?.data?.doctors);
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
      }
    }

    fetchData();
  }, []);


  if (!isAdminAuthenticated) {
    return <Navigate to={"/login"} />
  }

  console.log(doctors)

  return (
    <section className="doctor_page_details">
      <h1>DOCTORS</h1>
      <div className="banner">

        {
          doctors && doctors.length > 0 ? (

            doctors.map((doc, index) => {
              return (
                <div className="card" key={index}>
                  <div className="doc_profile">
                    <img src={doc?.docAvatar && doc.docAvatar.url} alt="img" className="doc_img" />
                    <h3>{doc?.firstName} {doc?.lastName}</h3>
                  </div>

                  <div className="doc_details">
                    <p> <span style={{fontWeight:"bold"}}>Email :</span> {doc?.email}</p>
                    <p> <span style={{fontWeight:"bold"}}>Phone :</span> {doc?.phone}</p>
                    <p> <span style={{fontWeight:"bold"}}>DOB :</span> {doc?.dob.substring(0,10)}</p>
                    <p style={{ textDecoration: "underline", color: "blue"}}> <span style={{fontWeight:"bold"}}>Department :</span> {doc?.doctorDepartment}</p>
                    <p style={{fontWeight:"bold"}}><span>Gender : </span>{doc?.gender}</p>
                  </div>
                </div>
              )
            })
          ) : (
            <h1>No Registered Doctor Available</h1>
          )
        }

      </div>

    </section >
  )
}

export default Doctors;
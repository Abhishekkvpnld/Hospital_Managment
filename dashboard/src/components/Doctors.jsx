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

  return (
    <div>Doctors</div>
  )
}

export default Doctors;
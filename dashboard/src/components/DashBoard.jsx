import { useContext, useEffect, useState } from "react";
import "./dashboard.css";
import { context } from "../main";
import axios from "axios";
import { BaseUrl } from "../utils/baseurl";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { SiTicktick } from "react-icons/si";
import { IoCloseCircleOutline } from "react-icons/io5";


const DashBoard = () => {

  const { isAdminAuthenticated, user } = useContext(context);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/appointment/all-appointments`, { withCredentials: true });
        if (response?.data?.success) {
          setAppointments(response?.data?.data);
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message)
      }
    }

    fetchAppointments();
  }, []);


  const handleChangeStatus = async (appointmentId, statusValue) => {
    try {
      const response = await axios.put(`${BaseUrl}/appointment/update-status/${appointmentId}`, { status: statusValue }, { withCredentials: true });
      if (response?.data?.success) {
        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment._id === appointmentId ?
              { ...appointment, status: statusValue } : appointment
          )
        )
        toast.success(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  if (!isAdminAuthenticated) {
    return <Navigate to={"/login"} />
  }

  return (
    <section className="dashboard">
      <div className="dashboard_banner">

        <div className="first_box">
          <img src={"./doctor-icon.avif"} alt="docImg" />
          <div className="content">
            <div className="dashboard_user">
              <h3>Hello,</h3>
              <h3>{user && `${user?.firstName} ${user?.lastName}`}</h3>
            </div>
            <p className="dashboard_description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae quos saepe praesentium nobis aliquid soluta corrupti magni. Autem dolore laborum, eius ex et vel eum
            </p>
          </div>
        </div>

        <div className="boxes">
          <div className="second_box">
            <h2>Total Appointments</h2>
            <div><span>{appointments?.length}</span></div>
          </div>

          <div className="second_box">
            <h2>Registered Doctors</h2>
            <div><span>20</span></div>
          </div>
        </div>
      </div>


      <div className="dashboard_table">
        <h3>Appointments</h3>

        <table className="table">

          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Status</th>
              <th>Visited</th>
            </tr>
          </thead>

          <tbody className="table-body">
            {
              appointments && appointments.length > 0 ? (
                appointments?.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                    <td>{appointment.appointment_date}</td>
                    <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                    <td>{appointment.department}</td>


                    <td>
                      <select
                        name="status" id="status"
                        value={appointment.status}
                        className={
                          appointment.status === "Pending" ?
                            "value-pending" : appointment.status === "Rejected" ?
                              "value-rejected" : "value-accepted"
                        }
                        onChange={(e) => handleChangeStatus(appointment._id, e.target.value)}
                      >
                        <option value="Pending" className="value-pending">Pending</option>
                        <option value="Rejected" className="value-rejected">Rejected</option>
                        <option value="Accepted" className="value-accepted">Accepted</option>

                      </select>
                    </td>

                    <td>{appointment.hasVisited === true ? <SiTicktick color="green" /> : <IoCloseCircleOutline color="red" />}</td>
                  </tr>
                ))
              ) : (

                <tr>
                  <td> <h2>No Appointment Available</h2></td>
                </tr>

              )
            }
          </tbody>


        </table>
      </div>

    </section >
  )
}

export default DashBoard;
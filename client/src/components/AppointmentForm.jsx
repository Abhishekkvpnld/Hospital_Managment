import { useEffect, useState } from "react";
import "./appointment.css"
import axios from "axios";
import { BaseUrl } from "../utils/api";
import { Link } from "react-router-dom";


const AppointmentForm = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [department, setDepartment] = useState("");
    const [doctorFirstName, setDoctorFirstName] = useState("");
    const [doctorLastName, setDoctorLastName] = useState("");
    const [address, setAddress] = useState("");
    const [hasVisited, setHasVisited] = useState("");

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

    const [doctors, setDoctors] = useState([]);

    useEffect(() => {

        const fetchDoctors = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/user/doctors`, { withCredentials: true });
                setDoctors(response?.data?.doctors);
            } catch (error) {
                console.log(error.message)
            }
        };

        fetchDoctors();

    }, []);


    const handleAppointments = async (e) => {
        e.preventDefault();

    };

    return (
        <>
            <form className="appointment_form" onSubmit={handleAppointments} >

                <div className='appointment_div_category'>

                    <div className="appointment_inp_div">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            className="appointment_inp"
                            type="text"
                            placeholder="Enter First Name..."
                            name="firstName"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div className="appointment_inp_div">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            className="appointment_inp"
                            type="text"
                            placeholder="Enter Last Name..."
                            name="lastName"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                </div>

                <div className='appointment_div_category'>

                    <div className="appointment_inp_div">
                        <label htmlFor="email">Email</label>
                        <input
                            className="appointment_inp"
                            type="email"
                            placeholder="Enter Email..."
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="appointment_inp_div">
                        <label htmlFor="phone">Phone</label>
                        <input
                            className="appointment_inp"
                            type="number"
                            placeholder="Enter Phone Number..."
                            name="phone"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                </div>

                <div className='appointment_div_category'>

                    <div className="appointment_inp_div">
                        <label htmlFor="DOB">DOB</label>
                        <input
                            className="appointment_inp appointment_dob"
                            type="date"
                            placeholder="Enter Date of Birth..."
                            name="dob"
                            id="dob"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                    </div>

                    <div className="appointment_inp_div">
                        <label htmlFor="gender">Gender</label>
                        <select className='appointment_inp appointment_section' name="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                </div>

                {/* <div className='appointment_div_category'>
                    <div className="appointment_inp_div">
                        <label htmlFor="doctor_firstName">Doctor First Name</label>
                        <input
                            className="appointment_inp"
                            type="text"
                            placeholder="Enter Doctor First Name..."
                            name="doctor_firstName"
                            id="doctor_firstName"
                            value={doctorFirstName}
                            onChange={(e) => setDoctorFirstName(e.target.value)}
                        />
                    </div>

                    <div className="appointment_inp_div">
                        <label htmlFor="doctor_lastName">Doctor Last Name</label>
                        <input
                            className="appointment_inp"
                            type="text"
                            placeholder="Enter Doctor Last Name..."
                            name="doctor_lastName"
                            id="doctor_lastName"
                            value={doctorLastName}
                            onChange={(e) => setDoctorLastName(e.target.value)}
                        />
                    </div>
                </div> */}

                <div className='appointment_div_category'>
                    <div className="appointment_inp_div">
                        <label htmlFor="appointment_date">Appointment Date</label>
                        <input
                            className="appointment_inp"
                            type="date"
                            placeholder="Enter Appointment Date..."
                            name="appointment_date"
                            id="appointment_date"
                            value={appointmentDate}
                            onChange={(e) => setAppointmentDate(e.target.value)}
                        />
                    </div>

                    <div className="appointment_inp_div">
                        <label htmlFor="department">Department</label>
                        <select className='appointment_inp appointment_section' name="department" id="department" value={department} onChange={(e) => setDepartment(e.target.value)} >
                            <option value="">Select</option>
                            {
                                departmentsArray.map((department, index) => {
                                    return (
                                        <option key={department + index} value={department}>{department}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>

                <div className="appointment_inp_div">
                    <label htmlFor="doctors">Doctors</label>
                    <select className='appointment_inp appointment_section' name="doctors" id="doctors" value={} onChange={(e) => setDepartment(e.target.value)} >
                        <option value="">Select</option>
                        {
                            departmentsArray.map((department, index) => {
                                return (
                                    <option key={department + index} value={department}>{department}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className="appointment_address_inp_div">
                    <label htmlFor="address">Adress</label>
                    <textarea
                        className="appointment_address_inp"
                        type="text"
                        placeholder="Enter Address..."
                        name="address"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className="button_div" style={{ width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                    <button type="submit" className="appointment_btn" >SUBMIT</button>
                </div>

            </form>
        </>
    )
}

export default AppointmentForm;
import { useEffect, useState } from "react";
import "./appointment.css"
import axios from "axios";
import { BaseUrl } from "../utils/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const AppointmentForm = () => {

    const navigate = useNavigate();

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

        try {
            const hasVisitedBoolean = Boolean(hasVisited);

            const response = await axios.post(`${BaseUrl}/appointment/post-appointment`,
                {
                    firstName,
                    lastName,
                    email,
                    phone,
                    dob,
                    gender,
                    appointment_date: appointmentDate,
                    department,
                    doctor_firstName: doctorFirstName,
                    doctor_lastName: doctorLastName,
                    hasVisited: hasVisitedBoolean,
                    address,
                },
                {
                    withCredentials: true
                }
            );

            if (response.data.success) {
                toast.success(response?.data?.message);
                navigate("/");
            }

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
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
                        <label htmlFor="DOB">Date of Birth</label>
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
                        <select
                            className='appointment_inp appointment_section'
                            name="department"
                            id="department"
                            value={department}
                            onChange={(e) => {
                                setDepartment(e.target.value);
                                setDoctorFirstName("");
                                setDoctorLastName("");
                            }
                            } >
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

                <div className="appointment_inp_div">
                    <label htmlFor="doctors">Select Doctors</label>
                    <select
                        className='appointment_inp appointment_section'
                        name="doctors"
                        id="doctors"
                        value={`${doctorFirstName} ${doctorLastName}`}
                        onChange={(e) => {
                            const [firstName, lastName] = e.target.value.split(".");

                            setDoctorFirstName(firstName);
                            setDoctorLastName(lastName)
                        }}
                        disabled={!department}
                    >
                        <option value="">Select Doctor</option>
                        {
                            doctors.filter((doctor) => doctor.doctorDepartment === department)
                                .map((doctor, index) => {
                                    console.log(doctor.firstName, doctor.lastName)
                                    const doctorFullName = `${doctor.firstName} ${doctor.lastName}`;
                                    const doctorValue = `${doctor.firstName}.${doctor.lastName}`;

                                    return (
                                        <option key={index} value={doctorValue}>
                                            {doctorFullName}
                                        </option>
                                    )
                                })
                        }
                    </select>
                </div>

                <div className="appointment_address_inp_div">
                    <label htmlFor="address" style={{ fontWeight: "500" }}>Adress</label>
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

                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", width: "100%" }}>
                    <p>Have You Visited Before?</p>
                    <input type="checkbox" checked={hasVisited} name="hasVisited" id="hasVisited" onChange={(e) => setHasVisited(e.target.checked)} />
                </div>

                <div className="button_div" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <button type="submit" className="appointment_btn" >GET APPOINTMENT</button>
                </div>

            </form>
        </>
    )
}

export default AppointmentForm;
import "./appointment.css"
import AppointmentForm from '../components/AppointmentForm';


const Appointment = () => {

  return (
    <div className="appointment_container">
      <h1>Schedule Your Appointment !</h1>
      <AppointmentForm />
    </div>
  )
}

export default Appointment;
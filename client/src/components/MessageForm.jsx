import { useState } from "react";
import "./messageForm.css";
import axios from "axios";
import { BaseUrl } from "../utils/api";
import toast from "react-hot-toast";


const MessageForm = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${BaseUrl}/message/send-message`, {
                firstName, lastName, email, phone, message
            },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

            if (response?.data?.success) {
                toast.success(response.data.message);

                setFirstName("");
                setLastName("");
                setEmail("");
                setMessage("");
                setPhone("")
            }

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }

    return (
        <div className='messgae_container message_form'>
            <h1 className="message_title">Send Us A Message</h1>

            <form className='message_form' onSubmit={handleSubmit}>

                <div className='message_input'>
                    <input
                        className="input"
                        type="text"
                        placeholder='Enter First Name...'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        className="input"
                        type="text"
                        placeholder='Enter Last Name...'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>

                <div className='message_input'>
                    <input
                        className="input"
                        type="email"
                        placeholder='Enter Email...'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="input"
                        type="number"
                        placeholder='Enter Phone Number...'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <textarea
                    className="message_text"
                    rows={7}
                    placeholder='Type Message Here...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <div className='message_btn'>
                    <button className="btn" type='submit'>Send</button>
                </div>

            </form>
        </div>
    )
}

export default MessageForm;
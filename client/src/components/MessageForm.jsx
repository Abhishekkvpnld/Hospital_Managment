import React, { useState } from 'react'

const MessageForm = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className='messgae_container message_form'>
            <h2>Send Us A Message</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" placeholder='Enter First Name...' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input type="text" placeholder='Enter Last Name...' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <input type="email" placeholder='Enter Email...' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="number" placeholder='Enter Phone Number...' value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <input type="text" placeholder='Type Message Here...' value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>
            </form>
        </div>
    )
}

export default MessageForm;
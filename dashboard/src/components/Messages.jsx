import axios from 'axios';
import "./messages.css"
import { useContext, useState } from 'react';
import toast from "react-hot-toast";
import { BaseUrl } from '../utils/baseurl';
import { Navigate } from 'react-router-dom';
import { context } from '../main';

const Messages = () => {

  const { isAdminAuthenticated } = useContext(context);
  const [messages, setMessages] = useState([]);

  useState(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(`${BaseUrl}/message/allMessages`, { withCredentials: true });

        if (response?.data?.success) {
          setMessages(response?.data?.data);
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
    <section className='message_section'>
      <h1>Messages</h1>

      {
        messages && messages.length > 0 ? (

          <div className="message_card">
            {
              messages.map((message, index) => (

                <div className="message_details" key={index}>
                  <p>First Name : <span>{message?.firstName}</span></p>
                  <p>Last Name : <span>{message?.lastName}</span></p>
                  <p>Email : <span>{message?.email}</span></p>
                  <p>Phone : <span>{message?.phone}</span></p>
                  <p>Message :</p>
                  <div className='message_area'>
                    <span >{message?.message}</span>
                  </div>
                </div>
              ))
            }
          </div>

        ) : (
          <h1>No Messages</h1>
        )
      }

    </section>
  )
}

export default Messages;
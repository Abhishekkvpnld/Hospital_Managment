import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';
import { useContext } from 'react';
import { context } from './main';
import { useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from './utils/api';


function App() {

  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(context);

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/user/patient/me`, { withCredentials: true });
        if (response?.data?.success) {
          setIsAuthenticated(true);
          setUser(response?.data?.data);
        }
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser({});
      }
    }

    fetchUser();

  }, [isAuthenticated]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/about' element={<About />} />
          <Route path='/appointment' element={<Appointment />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  )
}

export default App

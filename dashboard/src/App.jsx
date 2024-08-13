import './App.css';
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoard from './components/DashBoard';
import Login from './components/Login';
import Messages from './components/Messages';
import Doctors from './components/Doctors';
import AddNewAdmin from './components/AddNewAdmin';
import AddNewDoctor from './components/AddNewDoctor';
import { useContext, useEffect } from 'react';
import { BaseUrl } from './utils/baseurl';
import SideBar from './components/SideBar';
import { context } from './main';


function App() {

  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(context);

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/user/admin/me`, { withCredentials: true });
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
        <SideBar />
        <Routes>
          <Route path='/' element={<DashBoard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/messages' element={<Messages />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/admin/addNew' element={<AddNewAdmin />} />
          <Route path='/doctor/addNew' element={<AddNewDoctor />} />
        </Routes>
        <Toaster position='top-center' />
      </Router>
    </>
  )
}

export default App;

import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

export const context = createContext({ isAdminAuthenticated: false });

const AppWrapper = () => {

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  return (
    <context.Provider value={{isAdminAuthenticated,setIsAdminAuthenticated,user,setUser}}>
      <App />
    </context.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
)

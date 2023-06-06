import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
const [userLoggedIn, setUserLoggedIn] = useState(false);
const navigate = useNavigate();

const login = async ({ password, username }) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      };
  
      const response = await fetch('http://localhost:8080/admin/login', requestOptions);
  
      if (response.ok) {
        console.log('Login exitoso');
      }
    } catch (error) {
      console.error('Error en el login', error);
    }
  
    setUserLoggedIn(true);
  };
  

const logout = () => {
    setUserLoggedIn(false);
    navigate('/login');
};

return (
    <AuthContext.Provider value={{ userLoggedIn, login, logout }}>
        {children}
    </AuthContext.Provider>
);
};

export default AuthProvider;

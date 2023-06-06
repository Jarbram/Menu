import React from 'react'
import {BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx'
import Admin from './pages/Admin/Admin.jsx';
import Login from './pages/Login/Login.jsx';
import AuthProvider from './components/AuthContext/AuthContext.jsx';

export const App = () => {
  return (
    <Router>
    <AuthProvider>
      <Routes>
        <Route path='/' exact   element={<Home/>} />
        <Route path='/login' exact   element={<Login/>} />
        <Route path='/admin' exact   element={<Admin/>} />
      </Routes>
    </AuthProvider>
    </Router>
  )
}

export default App
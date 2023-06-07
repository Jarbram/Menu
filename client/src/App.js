import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Admin from './pages/Admin/Admin.jsx';
import Login from './pages/Login/Login.jsx';
import { AuthContext } from './components/AuthContext/AuthContext.jsx';

export const App = () => {

  const { userLoggedIn } = useContext(AuthContext);
  return (
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/admin" element={userLoggedIn ? <Admin /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
  );
};

export default App;

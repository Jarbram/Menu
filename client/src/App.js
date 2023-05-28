import React from 'react'
import {BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx'
import Admin from './pages/Admin/Admin.jsx';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' exact   element={<Home/>} />
        <Route path='/admin' exact   element={<Admin/>} />
      </Routes>
    </Router>
  )
}

export default App
import React from 'react'
import {BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx'

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' exact   element={<Home/>} />
      </Routes>
    </Router>
  )
}

export default App
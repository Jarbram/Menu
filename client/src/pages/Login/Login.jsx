import React, { useState,useContext } from 'react';
import { AuthContext } from '../../components/AuthContext/AuthContext';
import  {useNavigate} from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  const { login } = useContext(AuthContext);
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await login({ username, password });
    navigate('/admin');
  };

  return (
    <div className='login-container'>
      <form onSubmit={handleLogin}>
      <h2>WELCOME</h2>
        <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} required />
        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

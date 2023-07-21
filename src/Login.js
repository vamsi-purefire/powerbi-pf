import React, { useEffect } from 'react';
import { AuthenticationContext } from 'react-adal';
import { authContext } from './adalConfig'; // Create this file in the n
import "./login.css";
const Login = () => {
  const handleLogin = () => {
    authContext.login();
  };

  return (<div class="Main-cont">
  <h1>Login to Access your reports</h1>
  <p>Click the button below to log in with Microsoft:</p>
  <button onClick={handleLogin}>Login with Microsoft</button>

  
  </div>
    
  );
};

export default Login;
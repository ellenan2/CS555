import React, { useState } from 'react';
import '../App.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Do something with the username and password values

    setUsername('');
    setPassword('');
  }

  return (
    <div className = 'content'>
      <br />
      <div className = 'container'>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username: </label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
    
  );
}


export default Login;

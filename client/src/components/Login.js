import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import { doSignInWithEmailAndPassword } from '../firebase/FirebaseFunctions';
import '../App.css';

function Login() {
  const {currentUser} = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let {email, password} = event.target.elements;
    try {
      await doSignInWithEmailAndPassword(email.value, password.value);
    } catch (e) {
      alert(e);
    }
  };

  if (currentUser) {
    return <Navigate to='/' />;
  }
  return (
    <div className = 'content'>
      <br />
      <div className = 'container'>
        <h1>Login</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email: </label>
            <input 
              className='form-control'
              type="email" 
              id="email" 
              placeholder='Email'
              required
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input 
              className='form-control'
              type="password" 
              id="password" 
              placeholder='Password'
              required
            />
          </div>
          <button className="btn btn-outline-success" type="submit">Log In</button>
        </form>
      </div>
    </div>
    
  );
}


export default Login;

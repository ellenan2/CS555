import React, {useContext, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {doCreateUserWithEmailAndPassword} from '../firebase/FirebaseFunctions';
import {AuthContext} from '../firebase/Auth';
import "../App.css";

function SignUp() {
const {currentUser} = useContext(AuthContext);
const [match, setMatch] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {firstName, lastName, email, password, confirm} = event.target.elements;
    if (password.value !== confirm.value) {
      setMatch('Password fields must match!');
      return false;
    }

    try {
      await doCreateUserWithEmailAndPassword(
        email.value,
        password.value,
        firstName.value,
        lastName.value
      );
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
        <h1>Sign Up</h1>
        <br />
        {match && <h4 className='error'>{match}</h4>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name: </label>
            <input
              className='form-control'
              type='text'
              id='firstName'
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name: </label>
            <input
              className='form-control'
              type='text'
              id='lastName'
              required
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input
              className='form-control'
              type="email"
              id="email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              className='form-control'
              type="password"
              id="password"
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password: </label>
            <input
              className='form-control'
              type="password"
              id="confirm"
              required
            />
          </div>
          <button className="btn btn-outline-success" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

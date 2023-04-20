import React, {useContext, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {doCreateUserWithEmailAndPassword} from '../firebase/FirebaseFunctions';
import {AuthContext} from '../firebase/Auth';
import "../App.css";

function SignUp() {
const {currentUser} = useContext(AuthContext);
const [match, setMatch] = useState('');
const [userCode, setUserCode] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {firstName, lastName, phone, email, password, confirm, userType} = event.target.elements;
    if (password.value !== confirm.value) {
      setMatch('Password fields must match!');
      return false;
    }
    try {
      if (userType.value === 'Customer') {
        setUserCode('0');
      } else if (userType.value === 'SalesRep') {
        setUserCode('1');
      } else if (userType.value === 'Manager') {
        setUserCode('2');
      } else {
        setUserCode('3');
      }
      console.log(userType.value);
      await doCreateUserWithEmailAndPassword(
        email.value,
        phone.value,
        password.value,
        firstName.value,
        lastName.value,
        userCode
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
            <label>Phone: </label>
            <input
              className='form-control'
              type="phone"
              id="phone"
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
          <div className="form-group">
            <label>Type: </label>
            <select
              className='form-control'
              type='text'
              id='userType'
              required
            >
              <option value="Customer">Customer</option>
              <option value="SalesRep">Sales Representative</option>
              <option value="Manager">Manager</option>
              <option value="Crew">Crew</option>
            </select>
          </div>
          <button className="btn btn-outline-success" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

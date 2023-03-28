import React from "react";
import "../App.css";
import {Link} from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

function UserProfile(props) {
  return (
    <div className="user-profile">
      <img src={props.profilePicture} alt="User Profile" />
      <h2>{props.name}</h2>
      <h2>{props.email}</h2>
      <p>{props.phoneNumber}</p>
    </div>
  );
}

export default UserProfile;

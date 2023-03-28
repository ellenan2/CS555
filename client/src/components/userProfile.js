import React from "react";

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

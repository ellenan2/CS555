import React from "react";
import ReactDOM from "react-dom";
import UserProfile from "./UserProfile";
import "./UserProfile.css";

const user = {
  email: "john@example.com",
  phoneNumber: "555-1234",
  profilePicture: "https://example.com/profile.jpg",
  name: "John Doe",
};

ReactDOM.render(
  <UserProfile
    email={user.email}
    phoneNumber={user.phoneNumber}
    profilePicture={user.profilePicture}
    name={user.name}
  />,
  document.getElementById("root")
);

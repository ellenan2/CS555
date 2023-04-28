import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import { AuthContext } from "../firebase/Auth";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function UserProfile(props) {
  const { currentUser, userCode } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    console.log('Auth search useEffect');
    async function fetchData() {
      try {
        console.log(userCode);
        if (currentUser !== null) {
          setLoading(false);
        } else {
          setLoading(true);
        }
        if (userCode === 0) {
          setUserType("Customer");
        } else if (userCode === 1) {
          setUserType("Sales Representative");
        } else if (userCode === 2) {
          setUserType("Manager");
        } else {
          setUserType("Crew");
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [currentUser]);

  
  if (loading) {
    return (
      <div>Loading. . . .</div>
    )
  }
  return (
    <div className = 'container'>
      <Card>
        <Card.Header>User Profile</Card.Header>
          <Card.Body>
            <Card.Title>{currentUser.displayName}</Card.Title>
            <Card.Subtitle>{userType}</Card.Subtitle>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Phone: ###-###-####</ListGroup.Item>
              <ListGroup.Item>Email: {currentUser.email}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
      </Card>
    </div>
  );
}

export default UserProfile;

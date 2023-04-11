import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import { AuthContext } from "../firebase/Auth";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function UserProfile(props) {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Auth search useEffect');
    async function fetchData() {
      try {
        if (currentUser !== null) {
          setLoading(false);
        } else {
          setLoading(true);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);
  
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
            <Card.Subtitle>Customer</Card.Subtitle>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Phone: 123-123-1234</ListGroup.Item>
              <ListGroup.Item>{currentUser.email}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
      </Card>
    </div>
  );
}

export default UserProfile;

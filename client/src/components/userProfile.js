import React from "react";
import "../App.css";
import {Link} from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function UserProfile(props) {
  return (
    <div className = 'container'>
      <Card>
        <Card.Header>User Profile</Card.Header>
          <Card.Body>
            <Card.Title>Jon Snow</Card.Title>
            <Card.Subtitle>Customer</Card.Subtitle>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Phone: 123-123-1234</ListGroup.Item>
              <ListGroup.Item>Email: kinginthenorth@gmail.com</ListGroup.Item>
            </ListGroup>
          </Card.Body>
      </Card>
    </div>
  );
}

export default UserProfile;

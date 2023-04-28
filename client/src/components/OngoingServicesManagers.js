import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { getSessionToken } from '../firebase/FirebaseFunctions';
import "../App.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function OngoingServicesManagers() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [serviceData, setServiceData] = useState(undefined);
    const [status, setStatus] = useState("");
    let list = null;

    const email = firebase.auth().currentUser.email;
    const accessToken = getSessionToken();
    const headers = {
        headers: {
            email: email,
            accesstoken: accessToken,
            'Access-Control-Allow-Origin': '*'
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const { data } = await axios.get(
                    `http://localhost:3001/services`,
                    headers
                );
                setServiceData(data);
                setLoading(false);
            } catch (e) {
                setError(true);
                setLoading(false);
                console.log(e);
            }
        };
        console.log("Load services useEffect");
        fetchData();
    }, []);

    

    const buildCard = (service) => {
        const handleStatusChange = async (e) => {
            try {
                const { value } = e.target;
                setStatus(value);
                await axios.patch(
                    `http://localhost:3001/services/${service.id}`,
                    { status: value },
                    headers
                );
            } catch (e) {
                console.log(e);
            }
        };
        return (
            <Card key={service.id}>
                <Card.Body>
                    <Card.Title>{service.title}</Card.Title>
                    <Card.Subtitle>{service.desc}</Card.Subtitle>
                    <Card.Text>{service.fromDate}</Card.Text>
                    <Card.Text>${service.cost}</Card.Text>
                    <select value={status} onChange={handleStatusChange}>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <Link to={`/services/${service._id}`}>
                        <Card.Text>Go To</Card.Text>
                    </Link>
                </Card.Body>
            </Card>
        )
    }

    list =
        serviceData
        && serviceData.map((service) => {
            return buildCard(service);
        });

    if (loading) {
        console.log("Loading...");
        return (
            <div>
                <h2>Loading . . . .</h2>
            </div>
        )
    } else if (error) {
        console.log(error);
        return (
            <div>
                <h2>404 Page Not Found</h2>
            </div>
        );
    } else {
        return (
            <div className="content">
                <br />
                <div className="container">
                    <h2>Ongoing Services</h2>
                    <div id="offers-list">
                        {list}
                    </div>
                </div>
            </div>
        );
    }
}

export default OngoingServicesManagers;

import React, { useState } from 'react';
import "../App.css";
import {Link} from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function OngoingServices() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [serviceData, setServiceData] = useState(undefined);
    let list = null;

    async function fetchData() {
        try {
            setLoading(true);
            const { data : services } = await axios.get(
                `http://localhost:3001/services`
            )
        } catch (e) {
            setError(true);
            setLoading(false);
            console.log(e);
        }
    };

    useEffect(() => {
        console.log("Load services useEffect");
        fetchData
    }, []);

    const buildCard = (service) => {
        return (
            <Card key={service.id}>
                <Card.Body>
                    <Card.Title>{service.title}</Card.Title>
                    <Link to = {`/services/${service._id}`}>
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
                <h1>Ongoing Services</h1>
                <br />
                <div className="container">
                    <div id="offers-list">
                        {list}
                    </div>
                </div>
            </div>
        ); 
    }
}

export default OngoingServices;
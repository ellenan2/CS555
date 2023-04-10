import React, { useState, useEffect } from 'react';
import "../App.css";
import {Link} from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function CurrentOffers() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [offerData, setOfferData] = useState(undefined);
    let list = null;

    async function fetchData() {
        try {
            setLoading(true); 
            const { data } = await axios.get(
                `http://localhost:3001/offers/`
            )
            setOfferData(data);
            setLoading(false);
        } catch (e) {
            setError(true);
            setLoading(false);
            console.log(e);
        }
    };

    useEffect(() => {
        console.log("Load offers useEffect");
        fetchData();
    }, []);

    const buildCard = (offer) => {
        return (
            <Card key={offer.id}>
                <Card.Body>
                    <Card.Title>{offer.title}</Card.Title>
                    <Card.Subtitle>{offer.description}</Card.Subtitle>
                    <Card.Text>{offer.fromDate}</Card.Text>
                    <Card.Text>${offer.price}</Card.Text>
                    <Link to={`/offers/${offer._id}`}>
                        <Card.Text>Go To</Card.Text>
                    </Link>
                </Card.Body>
            </Card>
        )
    }

    list = 
        offerData
        && offerData.map((offer) => {
            return buildCard(offer);
        });
    
    if (loading) {
        console.log("Loading...");
        return (
            <div>
                <h2>Loading . . . .</h2>
            </div>
        );
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
                <div className="container">
                    <br />
                    <h2>Current Offers</h2>
                    <div id="offers-list">
                        {list}
                    </div>
                </div>
            </div>
        ); 
    }
}

export default CurrentOffers;
import React, { useState } from 'react';
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
            const { data : offers } = await axios.get(
                `http://localhost:3001/offers/`
            )
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
            <br />
            <h1>Current Offers</h1>
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

export default CurrentOffers;
import React, { useState } from 'react';
import axios from 'axios';
import '../../App.css';
import { useParams } from 'react-router-dom'

function RequestForm() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        setName("");
        setPhone("");
    };

    return (
        <div className='content'>
            <div className='container'>
                <div id='work-service-request-form'>
                    <h2 id='form-heading'>Work Service Request Form</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="name">Name: </label>
                            <input 
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="phone">Phone: </label>
                            <input 
                                type="text"
                                id="phone"
                                value={name}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
    );
}

export default RequestForm;
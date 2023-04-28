import React, { useState } from "react";
import axios from "axios";
import "../../App.css";
import { useParams } from "react-router-dom";

function NewOfferForm() {
  const [customerId, setCustomerId] = useState("");
  const [salesRepId, setSalesRepId] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cost, setCost] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/offers", {
        customerId: customerId,
        salesRepId: salesRepId,
        title: title,
        desc: desc,
        cost: cost,
      });
    } catch (error) {
      console.error(error);
    }

    setCustomerId("");
    setSalesRepId("");
    setTitle("");
    setDesc("");
    setCost("");
  };

  return (
    <div className="content">
      <div className="container">
        <div id="new-offer-form">
          <h2 id="form-heading">Offer Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="customerId">Customer ID: </label>
              <input
                className="form-control"
                type="text"
                id="customerId"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Title: </label>
              <input
                className="form-control"
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="desc">Description: </label>
              <textarea
                className="form-control"
                id="desc"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="cost">Offer: </label>
              <input
                className="form-control"
                type="text"
                id="cost"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewOfferForm;
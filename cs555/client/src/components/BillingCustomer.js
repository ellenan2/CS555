import React, { useState, useEffect } from "react";
import "../App.css";

const BillingCustomer = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      const response = await fetch("/api/bills"); //ask about db connection (for bills)
      const data = await response.json();
      setBills(data);
    };

    fetchBills();
  }, []);

  return (
    <div>
      <h1>Billing Information</h1>
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Description</th>
            <th>Date of Purchase</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill, index) => (
            <tr key={index}>
              <td>{bill.service}</td>
              <td>{bill.description}</td>
              <td>{bill.date}</td>
              <td>${bill.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillingCustomer;

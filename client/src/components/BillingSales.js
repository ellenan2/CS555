import React, { useState, useEffect } from "react";
import axios from 'axios';

const SalesRepBillingPage = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    try{
      setLoading(true);
    const fetchSales = async () => {
      const { data } = await axios.get(`http://localhost:3001/users/billing/`)
      setSales(data);
      setLoading(false);
        
  }
  fetchSales();
} catch(e){
  setError(true);
  setLoading(false);
  console.log(e);
  }

  }, []);


  return (
    <div>
      <h1>Sales Information</h1>
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Description</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, index) => (
            <tr key={index}>
              <td>{bill.service}</td>
              <td>{bill.description}</td>
              <td>{sale.date}</td>
              <td>{sale.customer}</td>
              <td>{sale.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default SalesRepBillingPage;



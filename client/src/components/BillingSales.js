import React, { useState, useEffect } from "react";


const SalesRepBillingPage = () => {
  const [sales, setSales] = useState([]);


  useEffect(() => {
    const fetchSales = async () => {
      const response = await fetch("/api/sales"); //ask about db connection (for sales)
      const data = await response.json();
      setSales(data);
    };


    fetchSales();
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



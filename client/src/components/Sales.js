// import React, {useState, useEffect} from 'react';
import React from 'react';

import {Link} from 'react-router-dom';
//import axios from 'axios';

const Sales = () => {
    return (
        <div className='container'>
            <br />
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
                        <th scope="col">ID</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">04/11/2023</th>
                        <td>Jon Snow</td>
                        <td>###-###-####</td>
                        <td>kinginthenorth@gmail.com</td>
                        <td><Link>642359156e45edf1e3a2a88b</Link></td>
                    </tr>
                    <tr>
                        <th scope="row">04/11/2023</th>
                        <td>Ron Doe</td>
                        <td>###-###-####</td>
                        <td>rondoe@gmail.com</td>
                        <td><Link>64232efcc2af78f9f44b6694</Link></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Sales;
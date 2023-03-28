import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navigation from './Navigation';
import Landing from "./Landing";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import UserProfile from "./UserProfile";

function App() {
  return (
    <Router>
      <div className = 'App'>
        <header className = 'App-header'>
          <Navigation />
        </header>
      </div>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<UserProfile />} />
        {/* <Route path='/offers/:offerId' element={<Offer />} />
        <Route path='/services/:serviceId' element={<Service />} /> */}
      </Routes>
    </Router>
  )
};

export default App;
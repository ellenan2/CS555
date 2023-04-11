import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {AuthProvider} from '../firebase/Auth';
import Private from './Private';
import Navigation from './Navigation';
import Landing from "./Landing";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import UserProfile from "./userProfile";
import RequestForm from './Forms/RequestForm';

function App() {
  return (
    <AuthProvider>
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
          <Route path='/home' element={<Private />}>
            <Route path='/home' element={<Home />} />
          </Route>
          <Route path='/profile' element={<Private />}>
            <Route path='/profile' element={<UserProfile />} />
          </Route>
          <Route path='/request' element={<Private />}>
            <Route path='/request' element={<RequestForm />} />
          </Route>

          
          {/* <Route path='/offers/:offerId' element={<Offer />} />
          <Route path='/services/:serviceId' element={<Service />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
    
  )
};

export default App;
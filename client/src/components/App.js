import { render, screen } from "@testing-library/react";
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navigation from './Navigation';
import Landing from "./Landing";
import Login from "./Login";
import SignUp from "./SignUp";

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
      </Routes>
    </Router>
  )
};

export default App;
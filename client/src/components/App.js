import React from 'react';
import '../App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Account from './Account';
import Home from './Home';
import Landing from './Landing';
import Schedules from './Schedules';
import Schedule from './Schedule';
import AddSchedule from './AddSchedule';
import Navigation from './Navigation';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Calendar from './Calendar';
import Event from './Event';
import CreateEvent from './CreateEvent';
import EditEvent from './EditEvent';
import {AuthProvider} from '../firebase/Auth';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='App'>
          <header className='App-header'>
            <Navigation />
          </header>
        </div>

      </Router>
    </AuthProvider>
  );
}

export default App;

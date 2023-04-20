import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import {doSignOut} from '../firebase/FirebaseFunctions';

const Navigation = () => {
  const {currentUser} = useContext(AuthContext);
  return <div>{currentUser ? <Auth /> : <NonAuth />}</div>;
}

const NonAuth = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">Solaris Webportal</a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle Navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown">
                <a 
                className="nav-link dropdown-toggle" 
                href="#" 
                id="navbarDropdown" 
                role="button" 
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                  Account
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <NavLink className="dropdown-item" to='/signup'>Sign-up</NavLink>
                <NavLink className="dropdown-item" to='/login'>Sign-In</NavLink>
              </div>
              </li>
            </ul>
          </div>
        </nav>
      );
}

const Auth = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">Solaris Webportal</a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle Navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <NavLink className="nav-link" to='/sales'>Dashboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to='/profile'>Account</NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown">
                <a 
                className="nav-link dropdown-toggle" 
                href="#" 
                id="navbarDropdown" 
                role="button" 
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                  Account
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <NavLink className="btn btn-sm btn-outline-secondary" to='/login' onClick={doSignOut}>Logout</NavLink>
                </div>
              </li>
            </ul>
          </div>
        </nav>
  )
}
export default Navigation;
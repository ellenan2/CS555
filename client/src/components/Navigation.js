import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Solar Webportal</a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle Navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item-active">
                <NavLink className="nav-link" to='/'>Landing</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to='/signup'>Sign-up</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to='/login'>Sign-In</NavLink>
              </li>
            </ul>
          </div>
        </nav>
      );
}

export default Navigation;
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <nav className="navbar navbar-dark fixed-top" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
    <div className="container">
      <Link to="/" className="navbar-brand">FORENT</Link>
        <div className="navbar-collapse collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="#" className="nav-link" >Login</Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link" >Signup</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

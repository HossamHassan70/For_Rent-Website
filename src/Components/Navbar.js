import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="container">
        <Link to="/popertieslist" className="navbar-brand">
          FORENT
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Signup
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

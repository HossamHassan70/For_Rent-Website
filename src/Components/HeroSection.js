import React from 'react';

import backgroundImage from '../images/image1.jpeg';

const HeroSection = () => {
  return (
    <div className="hero-section" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh'}}>
      <div className="container d-flex align-items-center h-100">
        <div className="row justify-content-center w-100">
          <div className="col-md-6">
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Enter City, state or Zip" aria-label="Search" style={{borderRadius: '0'}}/>
            <button className="btn" type="submit" style={{ backgroundColor: '#206B65', color: 'white', borderRadius: '0' }}>
                SEARCH
            </button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

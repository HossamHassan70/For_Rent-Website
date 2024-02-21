import React from "react";

import backgroundImage from "../images/image.png";

const HeroSection = () => {
  return (
    <div
      className="hero-section"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        marginTop: "-50px",
      }}
    >
      <div className="container d-flex align-items-center h-100">
        <div className="row justify-content-center w-100">
          <div class="col-md-3 m-0 p-0 border border-light border-5 border-opacity-50">
            <select class="form-select " aria-label="Default select example">
              <option selected> Select Type</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>

          <div className="col-md-6 m-0 p-0 border border-light border-5 border-opacity-50">
            <form className="d-flex " style={{}}>
              <input
                className="
            form-control me-0 "
                type="search"
                placeholder="Enter City, state or Zip"
                aria-label="Search"
                style={{ borderRadius: "0" }}
              />
              <button
                className="btn "
                type="submit"
                style={{
                  backgroundColor: "#008f97",
                  color: "white",
                  borderRadius: "0",
                }}
              >
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

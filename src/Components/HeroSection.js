import React from "react";
import backgroundImage from "../images/image4.jpg";
import Search from "./SearchComponent";

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
          {/* <div className="col-md-3 m-0 p-0 border border-light border-5 border-opacity-50">
            <select
              className="form-select "
              aria-label="Default select example"
              defaultValue="0"
            >
              <option value="0"> Select Type</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div> */}
          <Search />
        </div>
      </div>
    </div>
  );
};
// }

export default HeroSection;

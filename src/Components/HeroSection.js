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
          <Search />
        </div>
      </div>
    </div>
  );
};
// }

export default HeroSection;

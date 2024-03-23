import React, { useEffect } from "react";
import PropertiesList from "./propertiesList";
import HeroSection from "./../Components/HeroSection";
import BuildingDesign from "./../Components/BuildingDesign";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const useSel = useSelector((state) => state.authReducer.isLoggedIn);
  const token = useSelector((state) => state.authReducer.refreshToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (useSel) {
      let decodedToken = jwtDecode(token);
      const isValid = decodedToken.user.validation_states;
      if (!isValid) {
        navigate("/verify");
      } else {
        navigate("/");
      }
    }
  }, [useSel, navigate, token]);

  return (
    <>
      <HeroSection />
      <PropertiesList />
      <BuildingDesign />
    </>
  );
};

export default HomePage;

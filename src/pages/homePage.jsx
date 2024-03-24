import React, { useEffect } from "react";
import PropertiesList from "./propertiesList";
import HeroSection from "./../Components/HeroSection";
import BuildingDesign from "./../Components/BuildingDesign";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { updateEmailVerification } from "../MyStore/actions/authAction";
const HomePage = () => {
  const useSel = useSelector((state) => state.authReducer.isLoggedIn);
  const token = useSelector((state) => state.authReducer.refreshToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleVerificationSuccess = async (userState) => {
    dispatch(updateEmailVerification(userState));
  }

  useEffect(() => {
    if (useSel) {
      let decodedToken = jwtDecode(token);
      const isValid = decodedToken.user.validation_states;
      if (!isValid) {
        navigate("/verify");
      } else {
        handleVerificationSuccess(isValid)
        navigate("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

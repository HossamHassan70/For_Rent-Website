import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { logout, updateEmailVerification } from "../MyStore/actions/authAction";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const VerifyEmailPage = () => {
  const refreshToken = useSelector((state) => state.authReducer.refreshToken);
  const accessToken = useSelector((state) => state.authReducer.accessToken);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleVerificationSuccess = () => {
    const decodedToken = jwtDecode(refreshToken);
    const isEmailVerified = decodedToken.user.validation_states;
    console.log(isEmailVerified)
    dispatch(updateEmailVerification(isEmailVerified));
  };

  useEffect(() => {
    const verifyEmailAction = async () => {
      try {
        await axios.post(
          "http://localhost:8000/verify/",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`,
            },
          }
        );
        handleVerificationSuccess();
      } catch (error) {
        console.error("Error verifying email:", error);
      }
    };

    if (refreshToken) {
      verifyEmailAction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, refreshToken, accessToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8000/verify/",
        {
          code: inputValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      handleVerificationSuccess();

      //   alert("Email verified successfully");
      dispatch(logout());
      navigate("/login");
      setInputValue("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Form
        className="vh-100 d-flex justify-content-center align-items-center flex-column gap-2"
        onSubmit={handleSubmit}
      >
        <Form.Group controlId="formInput">
          <Form.Label>Enter Verification Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Verification code...."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default VerifyEmailPage;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { logout } from "../MyStore/actions/authAction";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { updateEmailVerification } from './../MyStore/actions/verifyAction';

const VerifyEmailPage = () => {
  const refreshToken = useSelector((state) => state.authReducer.refreshToken);
  const accessToken = useSelector((state) => state.authReducer.accessToken);
  const isEmailVerified = useSelector((state) => state.isVerified.isEmailVerified);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleVerificationSuccess = async () => {
    try {
      const decodedToken = jwtDecode(refreshToken);
      const isVerified = decodedToken.user?.validation_states;
      dispatch(updateEmailVerification(isVerified));
    } catch (error) {
      console.error("Error decoding token:", error);
    }
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

      dispatch(logout());
      navigate("/login");
      setInputValue("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Debugging: Log isEmailVerified
  console.log("isEmailVerified:", isEmailVerified);

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

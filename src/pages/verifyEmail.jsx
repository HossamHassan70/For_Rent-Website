import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import { Button, Modal } from "react-bootstrap"; // Import Modal here
import { logout } from "../MyStore/actions/authAction";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmailPage = () => {
  const refreshToken = useSelector((state) => state.authReducer.refreshToken);
  const accessToken = useSelector((state) => state.authReducer.accessToken);
  const [inputValue, setInputValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmailAction = async () => {
      try {
        await axios.post(
          "http://localhost:8000/verify/",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      } catch (error) {
        console.error("Error verifying email:", error);
      }
    };

    if (refreshToken) {
      verifyEmailAction();
    }
  }, [dispatch, refreshToken, accessToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
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

      setModalMessage("Email verified successfully! Please login Again");
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        dispatch(logout());
        navigate("/login");
        setInputValue("");
      }, 4000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setModalMessage(
        "error verifying email. Please check your spam or trash email"
      );
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
      }, 3000);
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Email Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
      </Modal>
    </>
  );
};

export default VerifyEmailPage;

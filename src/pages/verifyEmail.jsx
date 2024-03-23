import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

const VerifyEmailPage = () => {
  const refreshToken = useSelector((state) => state.authReducer.refreshToken);
  const accessToken = useSelector((state) => state.authReducer.accessToken);
  const [inputValue, setInputValue] = useState(""); // Corrected line
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyEmailAction = async () => {
      try {
      } catch (error) {
        console.error("Error verifying email:", error);
      }
    };

    if (refreshToken) {
      verifyEmailAction();
    } else {
    }
  }, [dispatch, refreshToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming inputValue is the data you want to send and accessToken is your token
    try {
      const response = await fetch("http://localhost:8000/verify/", {
        // Replace with your actual endpoint URL
        method: "POST", // or 'PUT' if you are updating data
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          code: inputValue, // Adjust this according to the expected payload structure of your endpoint
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Server response:", data);
      setInputValue(""); // Clear the input value on successful submission
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

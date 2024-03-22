import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import "../pages/css/pay.css";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const history = useNavigate();
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [, setPropertyInfo] = useState({
    rooms: "3",
    bathrooms: "2",
    owner: "John Doe",
    availability: true,
  });
  // Function to show the modal
  const handleShowModal = () => setShowModal(true);

  // Function to hide the modal
  const handleCloseModal = () => {
    setShowModal(false);
    history("/");
  };
  const handlePaymentSuccess = () => {
    handleShowModal();
    // Update the availability status to "Not Available"
    setPropertyInfo((prevState) => ({
      ...prevState,
      availability: false,
    }));
    // history("/");
  };

  return (
    <>
      <div className="Pay-Page">
        <div className="container my-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <h3 className="text-center">Pay With PayPal</h3>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "ATthFd3bb8Sdh2LHawQGvfhMMCTcaVUOHP4X_mphtuMGojuMpUC5tbMY9hl4qxvQlicZLDQe-qnENIRT",
                }}
              >
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{ amount: { value: "10.00" } }],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      handleShowModal();
                      handlePaymentSuccess();
                    });
                  }}
                  onError={(err) => {
                    console.error("PayPal Payment Error", err);
                    alert(
                      "There was an error processing your payment with PayPal. Please try again or choose another payment method."
                    );
                  }}
                />
              </PayPalScriptProvider>
              <div
                className={`modal ${showModal ? "show" : ""}`}
                tabIndex="-1"
                style={{ display: showModal ? "block" : "none" }}
                role="dialog"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Payment Successful</h5>
                    </div>
                    <div className="modal-body">
                      <p>Your transaction has been completed successfully.</p>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-bs-dismiss="modal"
                        onClick={handleCloseModal}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;

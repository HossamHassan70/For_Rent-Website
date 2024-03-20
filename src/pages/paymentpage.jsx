import React from "react";
import { useFormik } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import ValidSchema from "../schemas/paymentpage";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "../pages/css/pay.css";

const PaymentPage = () => {
  const { errors, touched } = useFormik({
    initialValues: {
      cardName: "",
      cardNumber: "",
      expDate: "",
      cvv: "",
    },
    validationSchema: ValidSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  console.log(errors);
  console.log(touched);

  return (
    <>
      <div className="Pay-Page">
        <div className="container my-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              {/* <h2>Payment Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="cardName" className="form-label">
                  Cardholder's Name
                </label>
                <input
                  value={values.cardName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  placeholder="Cardholder's Name..."
                  id="cardName"
                  className={
                    errors.cardName && touched.cardName
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                />
                {errors.cardName && touched.cardName && (
                  <div className="invalid-feedback">{errors.cardName}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="cardNumber" className="form-label">
                  Card Number
                </label>
                <input
                  onChange={handleCardNumberChange}
                  onBlur={handleBlur}
                  value={values.cardNumber}
                  type="text"
                  placeholder="Card Number..."
                  id="cardNumber"
                  className={
                    errors.cardNumber && touched.cardNumber
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                />
                <small className="form-text text-muted">
                  Card Type: {getCardType(values.cardNumber)}
                </small>
                {errors.cardNumber && touched.cardNumber && (
                  <div className="invalid-feedback">{errors.cardNumber}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="expDate" className="form-label">
                  Expiration Date (MM/YY)
                </label>
                <input
                  onChange={handleExpDateChange}
                  onBlur={handleBlur}
                  value={values.expDate}
                  type="text"
                  placeholder="MM/YY..."
                  id="expDate"
                  maxLength="5"
                  className={
                    errors.expDate && touched.expDate
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                />
                {errors.expDate && touched.expDate && (
                  <div className="invalid-feedback">{errors.expDate}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="cvv" className="form-label">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.cvv}
                  className={`form-control ${
                    errors.cvv && touched.cvv ? "is-invalid" : ""
                  }`}
                  placeholder="CVV..."
                  maxLength="3"
                />
                {errors.cvv && touched.cvv && (
                  <div className="invalid-feedback">{errors.cvv}</div>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={
                  !values.cardName ||
                  !values.cardNumber ||
                  !values.expDate ||
                  !values.cvv
                }
              >
                Submit
              </button>
            </form> */}
              <div>
                <h3 className="text-center">Pay With PayPal</h3>
                <div>
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
                          purchase_units: [
                            {
                              amount: {
                                value: "10.00",
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order.capture().then((details) => {
                          alert(
                            `Transaction completed by ${details.payer.name.given_name}`
                          );

                          // Send the order ID to your backend for verification
                          fetch("http://localhost:8000/verify-payment/", {
                            // Make sure to use the correct URL
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              orderID: data.orderID,
                            }),
                          })
                            .then((response) => response.json())
                            .then((data) => {
                              // Handle response from your backend
                              if (data.status === "success") {
                                console.log(
                                  "Transaction verified successfully:",
                                  data.detail
                                );
                              } else {
                                console.error(
                                  "Transaction verification failed:",
                                  data.detail
                                );
                              }
                            })
                            .catch((error) => {
                              console.error("Error:", error);
                            });
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

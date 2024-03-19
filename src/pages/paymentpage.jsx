import React from "react";
import { useFormik } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";

const PaymentPage = () => {

  const getCardType = (number) => {
    const cardPatterns = {
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
    };

    if (cardPatterns.visa.test(number)) {
      return "Visa";
    } else if (cardPatterns.mastercard.test(number)) {
      return "MasterCard";
    } else {
      return "";
    }
  };


  const formik = useFormik({
    initialValues: {
      cardName: "",
      cardNumber: "",
      expDate: "",
      cvv: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2>Payment Information</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="cardName" className="form-label">
                Cardholder's Name
              </label>
              <input
                type="text"
                className="form-control"
                id="cardName"
                name="cardName"
                onChange={formik.handleChange}
                value={formik.values.cardName}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cardNumber" className="form-label">
                Card Number
              </label>
              <input
                type="text"
                className="form-control"
                id="cardNumber"
                name="cardNumber"
                onChange={formik.handleChange}
                value={formik.values.cardNumber}
                onBlur={(e) =>
                  formik.setFieldValue("cardType", getCardType(e.target.value))
                }
              />
              <small className="form-text text-muted">
                Card Type: {getCardType(formik.values.cardNumber)}
              </small>
            </div>
            <div className="mb-3">
              <label htmlFor="expDate" className="form-label">
                Expiration Date (MM/YY)
              </label>
              <input
                type="text"
                className="form-control"
                id="expDate"
                name="expDate"
                onChange={formik.handleChange}
                value={formik.values.expDate}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cvv" className="form-label">
                CVV
              </label>
              <input
                type="text"
                className="form-control"
                id="cvv"
                name="cvv"
                onChange={formik.handleChange}
                value={formik.values.cvv}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

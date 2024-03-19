import React from "react";
import { useFormik } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";

const PaymentPage = () => {
  const getCardType = (number) => {
    const cardPatterns = {
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
    };

    if (cardPatterns.visa.test(number.replace(/\s+/g, ""))) {
      return "Visa";
    } else if (cardPatterns.mastercard.test(number.replace(/\s+/g, ""))) {
      return "MasterCard";
    } else {
      return "Unkown";
    }
  };

  const handleCardNumberChange = (e) => {
    let { value } = e.target;
    value = value
      .replace(/\s+/g, "")
      .slice(0, 16) 
      .replace(/(\d{4})(?=\d)/g, "$1 ") 
      .trim();
    formik.setFieldValue("cardNumber", value);
  };

  const handleExpDateChange = (e) => {
    let { value } = e.target;
    value = value
      .replace(/^([1-9]\/|[2-9])$/g, "0$1/")
      .replace(/^(0[1-9]|1[0-2])$/g, "$1/")
      .replace(/^([0-1])([3-9])$/g, "0$1/$2")
      .replace(/^(0?[1-9]|1[0-2])([0-9]{2})$/g, "$1/$2")
      .replace(/^([0]+)\/|[0]+$/g, "0")
      .replace(/[^\d\/]|^[\/]*$/g, "")
      .replace(/\/\//g, "/");
    formik.setFieldValue("expDate", value);
  };

  const handleCardNameChange = (e) => {
    let { value } = e.target;
    formik.setFieldValue("cardName", value);
  };

  const handleCVVChange = (e) => {
    let { value } = e.target;
    value = value.replace(/\D/g, "").slice(0, 3); 
    formik.setFieldValue("cvv", value);
  };

  const formik = useFormik({
    initialValues: {
      cardName: "",
      cardNumber: "",
      expDate: "",
      cvv: "",
    },
    validate: (values) => {
      const errors = {};
      if (
        !values.cardName ||
        !values.cardNumber ||
        !values.expDate ||
        !values.cvv
      ) {
        errors.submit = "All fields must be filled";
      }
      return errors;
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const allFieldsFilled =
    formik.values.cardName &&
    formik.values.cardNumber &&
    formik.values.expDate &&
    formik.values.cvv;

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
                onChange={handleCardNameChange}
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
                onChange={handleCardNumberChange}
                value={formik.values.cardNumber}
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
                maxLength="5"
                onChange={handleExpDateChange}
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
                maxLength="3"
                onChange={handleCVVChange}
                value={formik.values.cvv}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!allFieldsFilled}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

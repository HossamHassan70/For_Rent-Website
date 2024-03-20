import React from "react";
import { useFormik } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import ValidSchema from "../schemas/paymentpage";

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
      return "Unknown";
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
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

  const handleCardNumberChange = (e) => {
    let { value } = e.target;
    value = value
      .replace(/\s+/g, "")
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, "$1 ")
      .trim();
    setFieldValue("cardNumber", value);
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
    setFieldValue("expDate", value);
  };

  console.log(errors);
  console.log(touched);

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2>Payment Information</h2>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

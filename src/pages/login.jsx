import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAsync } from "../MyStore/actions/authAction";
import AlertCom from "../Components/alert";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import "../pages/css/errors.css";
import loginSignUp from "../images/login-signup.jpeg";
import BtnsCo from "../Components/Btns";
import { Alert } from "react-bootstrap";

const loginValidationSchema = Yup.object().shape({
  uName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginPre() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const useSel = useSelector((state) => state.authReducer.isLoggedIn);
  const [isSuccess, setIsSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      uName: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    // onSubmit: (values) => {
    //   dispatch(loginAsync(values.uName, values.password))
    //     .then(() => {
    //       if (useSel) {
    //         navigate("/");
    //       } else {
    //         setIsSuccess(true);
    //         console.log("error");
    //         console.log(isSuccess);
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
    onSubmit: (values) => {
      dispatch(loginAsync(values.uName, values.password))
        .then(() => {
          // Assuming `useSel` (or a similar condition) is correctly set up outside this scope
          if (useSel) {
            navigate("/");
          } else {
            setIsSuccess(true);
            setTimeout(() => {
              setIsSuccess(false);
            }, 4000);
            console.log("Login failed or condition not met.");
          }
        })
        .catch((error) => {
          console.error("Login error:", error);
          setIsSuccess(true);

          setTimeout(() => {
            setIsSuccess(false);
          }, 4000);
        });
    },
  });

  return (
    <div className="d-flex justify-content-between align-items-center flex-wrap">
      <Col xs={12} lg={6}>
        <Image
          src={loginSignUp}
          className="m-0 img-fluid position-relative w-100 h-auto h-lg-100"
          alt="Login Illustration"
          style={{ maxWidth: "auto", maxHeight: "900px" }}
        />
        <div className="cs-posti position-absolute">
          <h3 className="text-white">For Rent</h3>
          <p className="text-white">
            Welcome to ForRent Website Where Renting buying and Selling is
            Easier
          </p>
        </div>
      </Col>
      <Col xs={12} lg={6}>
        {isSuccess && (
          <>
            <div>
              <Alert variant="danger" onClose={() => setIsSuccess(false)}>
                <Alert.Heading>Wrong Email Or Password</Alert.Heading>
                <p>Please Check email and Password</p>
              </Alert>
            </div>
          </>
        )}
        <div className="container d-flex flex-column gap-3 pt-3">
          <div className="d-flex flex-column">
            <h2 className="m-0 align-self-start">Login to ForRent</h2>
            <p className="m-0 align-self-start">Enter Your Details Below</p>
            {formik.errors.server && (
              <AlertCom errorType="danger" errorMsg={formik.errors.server} />
            )}
          </div>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                id="uName"
                name="uName"
                type="text"
                placeholder="Username"
                value={formik.values.uName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.uName && formik.touched.uName}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.uName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={!!formik.errors.password && formik.touched.password}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="container d-flex justify-content-center align-content-center gap-3">
              <BtnsCo
                btnType="submit"
                btnCo="primary"
                btnCs={{ backgroundColor: "#008f97" }}
                btnText="Login"
              />
              <Link
                to="/forgot-password"
                className="btn btn-primary"
                style={{ backgroundColor: "#008f97" }}
              >
                Forget Your password?
              </Link>
            </div>
            <p className="pt-3">
              Didn't Register Yet? <Link to="/register">Signup</Link>
            </p>
          </Form>
        </div>
      </Col>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import BtnsCo from "../Components/Btns";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
// import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import LoginSchema from "../schemas/login";
import AlertCom from "../Components/alert";
import "../pages/errors.css";

export default function LoginPre() {
  let locally = JSON.parse(localStorage.getItem("Account Storage") || "[]");
  let sessionLogin = JSON.parse(sessionStorage.getItem("login") || "[]");
  const [isError, setIsError] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const { handleSubmit, values, errors, handleBlur, touched, handleChange } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginSchema,

      onSubmit: (event) => {
        if (findAccount(values.email, values.password)) {
          console.log("Found");
          sessionLogin.push(values);
          sessionStorage.setItem("login", JSON.stringify(sessionLogin));
          setIsError(false);
          handleRefresh();
        } else {
          console.log("ERROR");
          setIsError(true);
        }
      },
    });

  useEffect(() => {
    let showUserPanel = () => {
      if (sessionLogin.length > 0) {
        setIsLoggedin(true);
        setShowForm(false);
      } else {
        setIsLoggedin(false);
        setShowForm(true);
      }
    };

    showUserPanel();
  }, []);

  let findAccount = (email, password) => {
    let found = locally.find(
      (item) => item.email === email && item.password === password
    );
    return found ? true : false;
  };

  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
    let showUserPanel = () => {
      if (sessionLogin.length > 0) {
        setIsLoggedin(true);
        setShowForm(false);
      } else {
        setIsLoggedin(false);
        setShowForm(true);
      }
    };

    showUserPanel();
  };
  const logoutFun = () => {
    sessionLogin.pop();
    sessionStorage.setItem("login", JSON.stringify(sessionLogin));
    handleRefresh();
    console.log(sessionLogin);
  };

  return (
    <>
      {showForm && (
        <Container className="d-flex justify-content-center align-items-center vh-100">
          <Row className="d-flex justify-content-center align-items-center vh-100">
            <Col xs={12} lg={6}>
              <Image
                src="https://www.rjtravelagency.com/wp-content/uploads/2023/07/Cairo-Egypt.jpg"
                rounded
                className="col img-fluid"
              />
            </Col>

            {isError && (
              <>
                <div className="container">
                  <AlertCom
                    errorType="danger"
                    errorHead="Can't Find Your Account"
                    errorMsg="Whoops! Looks like there's a little hiccup. Check your username and password combo, and let's try that again. If you're still having trouble, hit the 'Forgot Password?' link or reach out to our support superheroes—they're ready to rescue your login."
                  />
                </div>
              </>
            )}

            <Col xs={12} lg={6}>
              <div className="container d-flex flex-column  gap-3 pt-3">
                <div className="d-flex flex-column">
                  <h2 className="m-0 align-self-start"> Login to ForRent </h2>
                  <p className="m-0 align-self-start">
                    Enter Your Details Below
                  </p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className={
                        errors.email && touched.email ? "input-error" : ""
                      }
                    />
                    {errors.email && touched.email && (
                      <p className="error">{errors.email}</p>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                    <Form.Control
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="password"
                      id="password"
                      aria-describedby="passwordHelpBlock"
                      className={
                        errors.password && touched.password ? "input-error" : ""
                      }
                    />
                    {errors.password && touched.password && (
                      <p className="error">{errors.password}</p>
                    )}
                    <Form.Text id="passwordHelpBlock" muted>
                      Your password must be 8-20 characters long, contain
                      letters and numbers, and must not contain spaces, special
                      characters, or emoji.
                    </Form.Text>
                  </Form.Group>

                  <div className="container d-flex justify-content-center align-content-center gap-3">
                    <BtnsCo
                      btnType="submit"
                      btnCo="primary"
                      btnCs={{ backgroundColor: "#008f97" }}
                      btnText="Login"
                    />
                    <BtnsCo
                      btnCo="primary"
                      btnText="Forget Your password"
                      btnCs={{ backgroundColor: "#008f97" }}
                      btnStyle=""
                    />
                  </div>

                  <p className="pt-3">
                    Didn't Register Yet? <Link to="/register">Signup</Link>
                  </p>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      )}

      {isLoggedin && (
        <>
          <div className="pt-3">
            <p>Welome {sessionLogin[0].email}</p>
            <BtnsCo btnAct={logoutFun} btnCo="danger" btnText="logout" />
          </div>
        </>
      )}
    </>
  );
}

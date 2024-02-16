import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import BtnsCo from "../Components/Btns";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import ValidSchema from "../schemas/reg";
import "../pages/errors.css";
import AlertCom from "../Components/alert";
import "../pages/register.css";

export default function SignUp() {
  let accounts = JSON.parse(localStorage.getItem("Account Storage") || "[]");

  const [isSucess, setIsSucess] = useState(false);
  let history = useNavigate();
  const { values, errors, handleChange, handleSubmit, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        fullname: "",
        username: "",
        password: "",
        repeatPassword: "",
      },
      validationSchema: ValidSchema,

      onSubmit: (values, { resetForm }) => {
        if (isValidEmail(values.email)) {
          accounts.push(values);
          localStorage.setItem("Account Storage", JSON.stringify(accounts));
          resetForm(); // h3ml reset ll form l ana 3mltha ashan afdeha
          // bas mesh htban ashan hyn2lo

          history.push("/signin");
        } else {
          setIsSucess(true);
        }
      },
    });

  // hnshghl l function bas enha tdini error bdl mt3ml push

  const isValidEmail = (email) => {
    const found = accounts.find((item) => item.email === email);
    return !found;
  };

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center  pt-4">
        <Row className="d-flex justify-content-center align-items-center ">
          <Col xs={12} lg={6}>
            <Image
              src="https://images.pexels.com/photos/4915533/pexels-photo-4915533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              rounded
              className="img-fluid position-relative object-fit-cover"
              style={{ maxWidth: "auto", height: "auto" }}
            />
            {/* <div className="cs-posti position-absolute">
              <p className="text-white">Hello </p>
              <p>Slogan Here</p>
            </div> */}
          </Col>

          <Col xs={12} lg={6}>
            <div className="container pt-3">
              <h1> Create Your Account </h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label> Username</Form.Label>

                  <Form.Control
                    value={values.username}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Username..."
                    id="username"
                    onChange={handleChange}
                    className={
                      errors.username && touched.username ? "input-error" : ""
                    }
                  />
                  {errors.username && touched.username && (
                    <p className="error">{errors.username}</p>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>FullName</Form.Label>
                  <Form.Control
                    value={values.fullname}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    placeholder="Fullname ex:Amr Hussien..."
                    id="fullname"
                    className={
                      errors.fullname && touched.fullname ? "input-error" : ""
                    }
                  />
                  {errors.fullname && touched.fullname && (
                    <p className="error">{errors.fullname}</p>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    placeholder="name@example.com"
                    id="email"
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
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    id="password"
                    aria-describedby="passwordHelpBlock"
                    className={
                      errors.password && touched.password ? "input-error" : ""
                    }
                  />
                  {errors.password && touched.password && (
                    <p className="error"> {errors.password} </p>
                  )}
                  <Form.Text id="passwordHelpBlock" muted>
                    Your password must be 8-20 characters long, contain letters
                    and numbers, and must not contain spaces, special
                    characters, or emoji.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="repeatPassword">
                    Repeat-Password
                  </Form.Label>
                  <Form.Control
                    value={values.repeatPassword}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    id="repeatPassword"
                    aria-describedby="passwordHelpBlock"
                    className={
                      errors.repeatPassword && touched.repeatPassword
                        ? "input-error"
                        : ""
                    }
                  />
                  {errors.repeatPassword && touched.repeatPassword && (
                    <p className="error"> {errors.repeatPassword} </p>
                  )}
                </Form.Group>
                <div className="container d-flex justify-conent-center flex-column gap-3">
                  <BtnsCo
                    btnType="submit"
                    btnCs={{ backgroundColor: "#008f97" }}
                    btnCo="primary"
                    btnText="SignUp"
                  />
                  <BtnsCo
                    btnCo="secondary"
                    btnLogo="fab fa-google"
                    btnText="SignUp With Google"
                    btnStyle=""
                  />
                  <p>
                    Already Have An Account? <Link to={"/login"}>SignIn</Link>{" "}
                  </p>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      {isSucess && (
        <>
          <div className="container">
            <AlertCom
              errorType="danger"
              errorHead="Account Already Registered"
              errorMsg="              Oops! Looks like you've already claimed this spot. No need to
              double-dip; your account is already up and running. If you're
              having trouble accessing it, hit up our support team—they're
              wizards at sorting things out!"
            />
          </div>
        </>
      )}
    </>
  );
}

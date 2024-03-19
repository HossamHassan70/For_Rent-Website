// import React, { useState } from "react";
// import Form from "react-bootstrap/Form";
// import BtnsCo from "../Components/Btns";
// import Col from "react-bootstrap/Col";
// import Image from "react-bootstrap/Image";
// import { Link, useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import LoginSchema from "../schemas/login";
// import AlertCom from "../Components/alert";
// import "../pages/css/errors.css";
// import loginSignUp from "../images/login-signup.jpeg";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { login } from "../MyStore/actions/authAction";

// export default function LoginPre() {
//   const [isError, setIsError] = useState(false);
//   let history = useNavigate();
//   const dispatch = useDispatch();

//   const { handleSubmit, values, errors, handleBlur, touched, handleChange } =
//     useFormik({
//       initialValues: {
//         uName: "",
//         password: "",
//       },
//       validationSchema: LoginSchema,

//       onSubmit: (event) => {
//         const { uName, password } = values;
//         dataFetch(uName, password);
//       },
//     });

//   const dataFetch = (uName, passWod) => {
//     axios
//       .post("http://127.0.0.1:8000/login/", {
//         username: uName,
//         password: passWod,
//       })
//       .then((response) => {
//         sessionStorage.setItem("refreshToken", response.data.refresh);
//         sessionStorage.setItem("accessToken", response.data.access);
//         history("/");
//         setIsError(false);
//         dispatch(login());
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         console.log("ERROR");
//         setIsError(true);
//       });
//   };

//   return (
//     <>
//       <div className="d-flex justify-content-between align-items-center flex-wrap">
//         {isError && (
//           <>
//             <div className="container">
//               <AlertCom
//                 errorType="danger"
//                 errorHead="Can't Find Your Account"
//                 errorMsg="Whoops! Looks like there's a little hiccup. Check your username and password combo, and let's try that again. If you're still having trouble, hit the 'Forgot Password?' link or reach out to our support superheroes—they're ready to rescue your login."
//               />
//             </div>
//           </>
//         )}
//         <Col xs={12} lg={6}>
//           <Image
//             src={loginSignUp}
//             className="m-0 img-fluid position-relative w-100 h-auto h-lg-100"
//             style={{ maxWidth: "auto", maxHeight: "900px" }}
//           />
//           <div className="cs-posti position-absolute">
//             <h3 className="text-white">For Rent</h3>
//             <p className="text-white">
//               Welcome to ForRent Website Where Renting buying and Selling is
//               Easier
//             </p>
//           </div>
//         </Col>

//         <Col xs={12} lg={6}>
//           <div className="container d-flex flex-column  gap-3 pt-3">
//             <div className="d-flex flex-column">
//               <h2 className="m-0 align-self-start"> Login to ForRent </h2>
//               <p className="m-0 align-self-start">Enter Your Details Below</p>
//             </div>

//             <Form onSubmit={handleSubmit}>
//               <Form.Group className="mb-3">
//                 <Form.Control
//                   onBlur={handleBlur}
//                   onChange={handleChange}
//                   id="uName"
//                   type="text"
//                   placeholder="username.."
//                   className={errors.uName && touched.uName ? "input-error" : ""}
//                 />
//                 {errors.uName && touched.uName && (
//                   <p className="error">{errors.uName}</p>
//                 )}
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Control
//                   value={values.password}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   type="password"
//                   id="password"
//                   placeholder="Password"
//                   aria-describedby="passwordHelpBlock"
//                   className={
//                     errors.password && touched.password ? "input-error" : ""
//                   }
//                 />
//                 {errors.password && touched.password && (
//                   <p className="error">{errors.password}</p>
//                 )}
//                 <Form.Text id="passwordHelpBlock" muted>
//                   Your password must be 8-20 characters long, contain letters
//                   and numbers, and must not contain spaces, special characters,
//                   or emoji.
//                 </Form.Text>
//               </Form.Group>

//               <div className="container d-flex justify-content-center align-content-center gap-3">
//                 <BtnsCo
//                   btnType="submit"
//                   btnCo="primary"
//                   btnCs={{ backgroundColor: "#008f97" }}
//                   btnText="Login"
//                 />
//                 <BtnsCo
//                   btnCo="primary"
//                   btnText="Forget Your password"
//                   btnCs={{ backgroundColor: "#008f97" }}
//                   btnStyle=""
//                 />
//               </div>

//               <p className="pt-3">
//                 Didn't Register Yet? <Link to="/register">Signup</Link>
//               </p>
//             </Form>
//           </div>
//         </Col>
//       </div>
//     </>
//   );
// }
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
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

const loginValidationSchema = Yup.object().shape({
  uName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginPre() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      uName: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      dispatch(loginAsync(values.uName, values.password))
        .then(() => navigate("/"))
        .catch((error) => {
          formik.setErrors({
            server: "Invalid username or password. Please try again.",
          });
        });
    },
  });

  return (
    <div className="d-flex justify-content-between align-items-center flex-wrap">
      <Col xs={12} lg={6}>
        <Image
          src={loginSignUp}
          className="img-fluid"
          alt="Login Illustration"
        />
      </Col>
      <Col xs={12} lg={6}>
        <div className="login-form-container">
          <h2>Login to ForRent</h2>
          <p>Enter Your Details Below</p>
          {formik.errors.server && (
            <AlertCom errorType="danger" errorMsg={formik.errors.server} />
          )}
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

            <div className="d-flex justify-content-between">
              <BtnsCo btnType="submit" btnCo="primary" btnText="Login" />
              <Link to="/forgot-password">Forget Your password?</Link>
            </div>
          </Form>
          <p className="pt-3">
            Didn't Register Yet? <Link to="/register">Signup</Link>
          </p>
        </div>
      </Col>
    </div>
  );
}

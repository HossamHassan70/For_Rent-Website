import * as yup from "yup";

const loginPat = /^[a-zA-Z0-9._]+@[a-z]{1,8}\.(com|eg|gov|edu)$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=])(?=.*[^\w\d\s]).{8,}$/;

const ValidSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please Enter a Valid Email")
    .required("Must Add Email")
    .matches(loginPat, "Email Didn't Meet Requriments should contain @ and ."),
  password: yup
    .string()
    .min(8)
    .max(20)
    .matches(passwordRegex, "Password Requriment Error")
    .required("Password Must Match")
    .required("Must Fill this Field"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password Must Match")
    .required("Must Fill this Field"),
  phoneNumber: yup
    .string()
    .max(14, "Phone Number must be 11")
    .min(14, "Phone Number must be 11")
    .required("Must Fill this Field"),
  username: yup
    .string()
    .min(3, "Must be Minimum 3 letters")
    .max(20, "Maximum 10 Letters")
    .required("Must Fill this Field"),
  fullname: yup
    .string()
    .min(3, "Name must be at Least 3 Letters")
    .max(15, "Name must be Maximum 15 Letters")
    .required("Must Fill this Field"),
  role: yup.string().required("Please select a member type"),
  termsCheckbox: yup
    .boolean()
    .oneOf([true], "Terms and Conditions must be accepted"),
});

export default ValidSchema;

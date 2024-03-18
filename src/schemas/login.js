import * as yup from "yup";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=])(?=.*[^\w\d\s]).{8,}$/;

const LoginSchema = yup.object().shape({
  uName: yup.string().required("Must Add Username"),
  password: yup
    .string()
    .min(6)
    .max(20)
    // .matches(passwordRegex, "Password Requirments Error")
    .required("Must Fill this Field"),
});

export default LoginSchema;

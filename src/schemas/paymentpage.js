import * as yup from "yup";

const ValidSchema = yup.object().shape({
  cardName: yup.string().max(50, "Max Charchter 50").min(2, "Min Charchter 2"),
  cardNumber: yup.string().min(19, "Check you Card Number must be 16 Letters"),
  expDate: yup.string(),
  cvv: yup.string().min(3, "CVV must be 3 Number"),
});

export default ValidSchema;

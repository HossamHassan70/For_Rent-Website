import React from "react";
import ReactDOM from "react-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaymentPage from "../pages/paymentpage";
function App() {
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "ATthFd3bb8Sdh2LHawQGvfhMMCTcaVUOHP4X_mphtuMGojuMpUC5tbMY9hl4qxvQlicZLDQe-qnENIRT",
      }}
    >
      <PaymentPage />
    </PayPalScriptProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { jwtDecode } from "jwt-decode"; // Ensure correct import for jwtDecode

import store, { persistor } from "./MyStore/store";
import NavigationBar from "./Components/Navbar";
import SignUp from "./pages/register";
import LoginPre from "./pages/login";
import Footer from "./Components/Footer";
import HomePage from "./pages/homePage";
import PropertyView from "./pages/ViewProperty";
import UserProfile from "./pages/userProfile";
import OwnerProperties from "./Components/OwnerProperties";
import PageNotFound from "./pages/PageNotFound";
import Requests from "./Components/requests";
import PropertiesPage from "./Components/PropertiesPage";
import AboutUs from "./Components/About";
import PaymentPage from "./pages/paymentpage";
import VerifyEmailPage from "./pages/verifyEmail";

function PrivateRoute({ children }) {
  const accessToken = useSelector((state) => state.authReducer.accessToken);
  const location = useLocation();

  // Assume isLoggedIn is derived from the presence of a valid accessToken
  const isLoggedIn = !!accessToken;

  let isEmailVerified = false;

  // Decode the accessToken to check email verification status, if logged in
  if (isLoggedIn && accessToken) {
    try {
      const decodedToken = jwtDecode(accessToken);
      isEmailVerified = decodedToken.user?.validation_states;
    } catch (error) {
      console.error("Error decoding token:", error);
      // Consider handling token decoding error, such as by logging out
    }
  }

  // Redirect to login page if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Allow access to the verify email page even if the email isn't verified
  if (location.pathname === "/verify") {
    return children;
  }

  // For all other routes, check email verification
  if (!isEmailVerified) {
    return <Navigate to="/verify" replace />;
  }

  return children;
}

function AuthRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  return isLoggedIn ? <Navigate to="/" replace /> : children;
}

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/property/:id" element={<PropertyView />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route
              path="/payment/:id"
              element={
                <PrivateRoute>
                  <PaymentPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/verify"
              element={
                <PrivateRoute>
                  <VerifyEmailPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/requests"
              element={
                <PrivateRoute>
                  <Requests />
                </PrivateRoute>
              }
            />
            <Route
              path="/login"
              element={
                <AuthRoute>
                  <LoginPre />
                </AuthRoute>
              }
            />
            <Route
              path="/register"
              element={
                <AuthRoute>
                  <SignUp />
                </AuthRoute>
              }
            />
            <Route
              path="/user/:userId"
              element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/OwnerProperties"
              element={
                <PrivateRoute>
                  <OwnerProperties />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;

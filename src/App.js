import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
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
import { jwtDecode } from "jwt-decode"; // Ensure this is correctly imported

function PrivateRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  const token = useSelector((state) => state.authReducer.refreshToken);
  const decodedToken = jwtDecode(token);
  const isEmailVerified = decodedToken.user.validation_states;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  } else if (!isEmailVerified) {
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
            <Route path="/verify" element={<VerifyEmailPage />} />
            <Route
              path="/payment/:id"
              element={
                <PrivateRoute>
                  <PaymentPage />
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

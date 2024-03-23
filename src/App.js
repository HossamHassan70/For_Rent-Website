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
import SearchResults from './Components/SearchResults';

function PrivateRoute({ children }) {
  const isEmailVerified = useSelector((state) => state.authReducer.isEmailVerified);
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);

  const location = useLocation();

  if (!isEmailVerified && isLoggedIn && location.pathname !== "/verify") {
    return <Navigate to="/verify" replace />;
  }

  return children;
}

function AuthRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);

  if (isLoggedIn) {
    // If user is already logged in, redirect to home page
    return <Navigate to="/" replace />;
  }

  // Otherwise, allow access to the auth route
  return children;
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
            <Route path="/search-results" element={<SearchResults />} />

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

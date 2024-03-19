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

const AuthRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  return isLoggedIn ? <Navigate to="/" /> : children;
};
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
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
            <Route path="/property/:id" element={<PropertyView />} />
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
function PrivateRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
export default App;

// import NavigationBar from "./Components/Navbar";
// import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import SignUp from "./pages/register";
// import LoginPre from "./pages/login";
// import Footer from "./Components/Footer";
// import HomePage from "./pages/homePage";
// import PropertyView from "./pages/ViewProperty";
// import UserProfile from "./pages/userProfile";
// import OwnerProperties from "./Components/OwnerProperties";
// import PageNotFound from "./pages/PageNotFound";
// import { useSelector } from "react-redux";
// import store, { persistor } from "./MyStore/store";
// import { PersistGate } from 'redux-persist/integration/react';

// // const isAuthenticated = () => {
// //   return sessionStorage.getItem("refreshToken") !== null;
// // };
// // const PrivateRoute = ({ element: Element, ...rest }) => {
// //   return isAuthenticated() ? Element : <Navigate to="/login" replace />;
// // };
// function App() {
//   const PrivateRoute = ({ element: Component, ...rest }) => {
//     const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);

//     return isLoggedIn ? (
//       <Component {...rest} />
//     ) : (
//       <Navigate to="/login" replace />
//     );
//   };
//   return (
//     <>
//       <BrowserRouter>
//         <NavigationBar />
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<LoginPre />} />
//           <Route path="/register" element={<SignUp />} />
//           <Route
//             path="/property/:id"
//             element={<PrivateRoute element={PropertyView} />}
//           />
//           <Route
//             path="/user/:userId"
//             element={<PrivateRoute element={UserProfile} />}
//           />
//           <Route
//             path="/OwnerProperties"
//             element={<PrivateRoute element={OwnerProperties} />}
//           />
//           {/* <Route path="/wishlist" element={<Fave />} /> */}
//           <Route path="*" element={<PageNotFound />} />
//         </Routes>
//         <Footer />
//       </BrowserRouter>
//     </>
//   );
// }
// export default App;

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
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

const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPre />} />
            <Route path="/register" element={<SignUp />} />
            <Route
              path="/property/:id"
              element={
                <ProtectedRoute>
                  <PropertyView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/:userId"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/OwnerProperties"
              element={
                <ProtectedRoute>
                  <OwnerProperties />
                </ProtectedRoute>
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

function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default App;

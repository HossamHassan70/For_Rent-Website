import NavigationBar from "./Components/Navbar";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/register";
import LoginPre from "./pages/login";
import Footer from "./Components/Footer";
import HomePage from "./pages/homePage";
import PropertyView from "./pages/ViewProperty";
import UserProfile from "./pages/userProfile";
import OwnerProperties from "./Components/OwnerProperties";
import PageNotFound from "./pages/PageNotFound";
import { useSelector } from "react-redux";
import PropertiesPage from "./Components/PropertiesPage";

// const isAuthenticated = () => {
//   return sessionStorage.getItem("refreshToken") !== null;
// };
// const PrivateRoute = ({ element: Element, ...rest }) => {
//   return isAuthenticated() ? Element : <Navigate to="/login" replace />;
// };
function App() {
  const PrivateRoute = ({ element: Component, ...rest }) => {
    const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);

    return isLoggedIn ? (
      <Component {...rest} />
    ) : (
      <Navigate to="/login" replace />
    );
  };
  return (
    <>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPre />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/property/:id" element={<PropertyView />} />
          <Route
            path="/user/:userId"
            element={<PrivateRoute element={UserProfile} />}
          />
          <Route
            path="/OwnerProperties"
            element={<PrivateRoute element={OwnerProperties} />}
          />
          {/* <Route path="/wishlist" element={<Fave />} /> */}
          <Route path="*" element={<PageNotFound />} />
          <Route path="/properties" element={<PropertiesPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;

import Navbar from "./Components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/register";
import LoginPre from "./pages/login";
import Footer from "./Components/Footer";
import HomePage from "./pages/homePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPre />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;

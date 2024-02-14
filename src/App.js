import Navbar from "./Components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/register";
import LoginPre from "./pages/login";
import PropertiesList from './pages/propertiesList';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPre />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/popertieslist" element={<PropertiesList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

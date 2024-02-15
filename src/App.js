import Navbar from "./Components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/register";
import LoginPre from "./pages/login";
import PropertiesList from './pages/propertiesList';
import HeroSection from './Components/HeroSection';
import Categories from './Components/Categories';
import Footer from './Components/Footer';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <HeroSection/>

        <Routes>
          <Route path="/login" element={<LoginPre />} />
          <Route path="/register" element={<SignUp />} />
          {/* <Route path="/popertieslist" element={<PropertiesList />} /> */}
        </Routes>
        
        <PropertiesList/>
        <Categories/>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;

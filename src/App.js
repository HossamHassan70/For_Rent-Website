import PropertiesList from './pages/propertiesList';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<PropertiesList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "pages/LoginPage";
import ForgotPasswordPage from "pages/ForgotPassword";
import RegistrationPage from "pages/RegistrationPage";
import GalleryPage from "pages/Gallery";
import EventsPage from "pages/Events";
import AlumniForum from "pages/AluminiForum";
import OfficeBearers from "pages/OfficeBearers";
import Home from "pages/Home";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Admin from "pages/Admin";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/office-bearers" element={<OfficeBearers />} />
          <Route path="/alumni-forum" element={<AlumniForum />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

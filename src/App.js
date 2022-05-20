import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPassword";
import RegistrationPage from "./pages/RegistrationPage";
import GalleryPage from "./pages/Gallery";
import EventsPage from "./pages/Events";
import AluminiForum from "./pages/AluminiForum";
import OfficeBearers from "./pages/OfficeBearers";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/alumini-forum" element={<AluminiForum />} />
          <Route path="/office-bearers" element={<OfficeBearers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import {
  Home,
  Login,
  Admin,
  AlumniForum,
  OfficeBearers,
  Events,
  GalleryPage,
  RegistrationPage,
  ForgotPassword,
} from "pages";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route index path="/" element={<Home />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/events" element={<Events />} />
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

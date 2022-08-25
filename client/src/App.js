import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "components/Layout/Navbar";
import Footer from "components/Layout/Footer";
import {
  Home,
  Login,
  Admin,
  RequestDetails,
  RejectDetails,
  AlumniForum,
  OfficeBearers,
  Events,
  GalleryPage,
  AlumniMeet,
  AllPhotos,
  SeminarSessions,
  RegistrationPageAlumni,
  RegistrationPageStudent,
  RegistrationPageFaculty,
  ForgotPassword,
} from "pages";
import AdminOfficeBearers from "pages/Admin/AdminOfficeBearers";
import PostRequest from "pages/Admin/PostRequest";
import EventRequest from "pages/Admin/EventRequest";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/request-details" element={<RequestDetails />} />
          <Route path="/admin/reject-details" element={<RejectDetails />} />
          <Route path="/admin/post-requests" element={<PostRequest />} />
          <Route path="/admin/event-requests" element={<EventRequest />} />
          <Route
            path="/admin/office-bearers"
            element={<AdminOfficeBearers />}
          />
          <Route element={<Navbar />}>
            <Route path="/alumni-forum" element={<AlumniForum />} />
          </Route>
          <Route element={<WithNavAndFooter />}>
            <Route index path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/register-alumni"
              element={<RegistrationPageAlumni />}
            />
            <Route
              path="/register-student"
              element={<RegistrationPageStudent />}
            />
            <Route
              path="/register-faculty"
              element={<RegistrationPageFaculty />}
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/gallery/alumni-meet" element={<AlumniMeet />} />
            <Route path="/gallery/all-photos" element={<AllPhotos />} />
            <Route
              path="/gallery/seminar-sessions"
              element={<SeminarSessions />}
            />
            <Route path="/office-bearers" element={<OfficeBearers />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

const WithNavAndFooter = () => {
  return (
    <>
      <Navbar />
      <Footer />
    </>
  );
};

export default App;

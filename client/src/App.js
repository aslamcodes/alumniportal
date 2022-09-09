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
import AlumniData from "pages/Admin/AlumniData";
import AdminOfficeBearers from "pages/Admin/AdminOfficeBearers";
import PostRequest from "pages/Admin/PostRequest";
import EventRequest from "pages/Admin/EventRequest";
import Alumni from "pages/Alumni/Alumni";
import AlertContextComponent from "components/UI/Alert";
import { useEffect } from "react";
import { useAlertContext } from "context/alert/alertContext";
import ResetPassword from "pages/ForgotPassword/ResetPassword";
import ForumPost from "pages/AlumniForum/ForumPost";
import Messages from "components/MessageComponents/Messages";

function App() {
  const { errorAlert } = useAlertContext();

  useEffect(() => {
    errorAlert(
      "Alumni-Portal is still on alpha testing, and not stable, expect bugs",
      8000
    );
  }, [errorAlert]);

  return (
    <div className="App">
      <AlertContextComponent />
      <Messages />
      <Router>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/alumni-data" element={<AlumniData />} />
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
            <Route path="/alumni-forum/:postId" element={<ForumPost />} />
          </Route>
          <Route element={<WithNavFooter />}>
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
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/events" element={<Events />} />
            <Route path="/alumni" element={<Alumni />} />
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

const WithNavFooter = () => {
  return (
    <>
      <Navbar />
      <Footer />
    </>
  );
};

export default App;

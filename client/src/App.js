import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "components/Layout/Navbar";
import Footer from "components/Layout/Footer";

import {
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

import Alumni from "pages/Alumni/Alumni";
import AlertContextComponent from "components/UI/Alert";
import { lazy, Suspense, useEffect } from "react";
import { useAlertContext } from "context/alert/alertContext";
import ResetPassword from "pages/ForgotPassword/ResetPassword";
import ForumPost from "pages/AlumniForum/ForumPost";
import Messages from "components/MessageComponents/Messages";
import { useAudio } from "react-use";
import { useAuthContext } from "context/auth/authContext";
import { useSocketContext } from "context/socket/socketContext";
import { ClientSocketEvents } from "lib/enum";
import VerifyEmail from "pages/VerifyEmail/VerifyEmail";
import Spinner from "components/UI/Spinner";

const AdminPageLazy = lazy(() => import("pages/Admin/Admin"));
const HomePageLazy = lazy(() => import("pages/Home/Home"));
const AlumniDataLazy = lazy(() => import("pages/Admin/AlumniData"));
const RequestDetailsLazy = lazy(() => import("pages/Admin/RequestDetails"));
const RejectDetailsLazy = lazy(() => import("pages/Admin/RejectDetails"));
const PostRequestLazy = lazy(() => import("pages/Admin/PostRequest"));
const EventRequestLazy = lazy(() => import("pages/Admin/EventRequest"));

const LoginPageLazy = lazy(() => import("pages/Login/LoginPage"));
const AlumniForumLazy = lazy(() => import("pages/AlumniForum/AlumniForum"));
const OfficeBearersLazy = lazy(() =>
  import("pages/OfficeBearers/OfficeBearers")
);
const EventsLazy = lazy(() => import("pages/Events/Events"));

const SuspenseCallback = ({ children }) => {
  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
};

function App() {
  const { socket } = useSocketContext();
  const { errorAlert } = useAlertContext();
  const [audio, state, controls, ref] = useAudio({
    src: "/audio/b1.mp3",
    autoPlay: true,
  });

  const { user } = useAuthContext();

  useEffect(() => {
    errorAlert(
      "Alumni-Portal is still on alpha testing, and not stable, expect bugs",
      8000
    );
  }, [errorAlert]);

  useEffect(() => {
    if (socket) socket.emit(ClientSocketEvents.CONNECT_USER);
  }, [socket]);

  useEffect(() => {
    controls.play();
  }, [user]);

  return (
    <div className="App">
      {audio}
      <AlertContextComponent />
      <Router>
        <Messages />
        <SuspenseCallback>
          <Routes>
            <Route path="/admin" element={<AdminPageLazy />} />
            <Route path="/alumni-data" element={<AlumniDataLazy />} />
            <Route
              path="/admin/request-details"
              element={<RequestDetailsLazy />}
            />
            <Route
              path="/admin/reject-details"
              element={<RejectDetailsLazy />}
            />
            <Route path="/admin/post-requests" element={<PostRequestLazy />} />
            <Route
              path="/admin/event-requests"
              element={<EventRequestLazy />}
            />
            <Route
              path="/admin/office-bearers"
              element={<AdminOfficeBearers />}
            />

            <Route element={<Navbar />}>
              <Route path="/alumni-forum" element={<AlumniForumLazy />} />
              <Route path="/alumni-forum/:postId" element={<ForumPost />} />
            </Route>

            <Route element={<WithNavFooter />}>
              <Route index path="/" element={<HomePageLazy />} />
              <Route path="/login" element={<LoginPageLazy />} />
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
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/events" element={<EventsLazy />} />

              <Route path="/alumni" element={<Alumni />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/gallery/alumni-meet" element={<AlumniMeet />} />
              <Route path="/gallery/all-photos" element={<AllPhotos />} />
              <Route
                path="/gallery/seminar-sessions"
                element={<SeminarSessions />}
              />
              <Route path="/office-bearers" element={<OfficeBearersLazy />} />
            </Route>
          </Routes>
        </SuspenseCallback>
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

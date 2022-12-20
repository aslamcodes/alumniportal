import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAudio } from "react-use";

import { useAlertContext } from "context/alert/alertContext";
import { useAuthContext } from "context/auth/authContext";
import { useSocketContext } from "context/socket/socketContext";

import { ClientSocketEvents } from "lib/enum";

import Navbar from "components/Layout/Navbar";
import Footer from "components/Layout/Footer";
import AlertContextComponent from "components/UI/Alert";
import Messages from "components/MessageComponents/Messages";
import Spinner from "components/UI/Spinner";

const AdminPageLazy = lazy(() => import("pages/Admin/Admin"));
const AlumniDataLazy = lazy(() => import("pages/Admin/AlumniData"));
const RequestDetailsLazy = lazy(() => import("pages/Admin/RequestDetails"));
const RejectDetailsLazy = lazy(() => import("pages/Admin/RejectDetails"));
const PostRequestLazy = lazy(() => import("pages/Admin/PostRequest"));
const EventRequestLazy = lazy(() => import("pages/Admin/EventRequest"));
const AdminOfficeBearersLazy = lazy(() =>
  import("pages/Admin/AdminOfficeBearers")
);
const ResetPasswordLazy = lazy(() =>
  import("pages/ForgotPassword/ResetPassword")
);
const ForumPostLazy = lazy(() => import("pages/AlumniForum/ForumPost"));
const VerifyEmailLazy = lazy(() => import("pages/VerifyEmail/VerifyEmail"));
const LoginPageLazy = lazy(() => import("pages/Login/LoginPage"));
const ForgotPasswordLazy = lazy(() =>
  import("pages/ForgotPassword/ForgotPassword")
);
const RegistrationPageAlumniLazy = lazy(() =>
  import("pages/RegisterationPage/RegistrationPageAlumni")
);
const RegistrationPageStudentLazy = lazy(() =>
  import("pages/RegisterationPage/RegistrationPageStudent")
);
const RegistrationPageFacultyLazy = lazy(() =>
  import("pages/RegisterationPage/RegistrationPageFaculty")
);
const HomePageLazy = lazy(() => import("pages/Home/Home"));
const AlumniLazy = lazy(() => import("pages/Alumni/Alumni"));
const AlumniForumLazy = lazy(() => import("pages/AlumniForum/AlumniForum"));
const OfficeBearersLazy = lazy(() =>
  import("pages/OfficeBearers/OfficeBearers")
);
const EventsLazy = lazy(() => import("pages/Events/Events"));
const GalleryPageLazy = lazy(() => import("pages/Gallery/Gallery"));
const AlumniMeetLazy = lazy(() => import("pages/Gallery/AlumniMeet"));
const AllPhotosLazy = lazy(() => import("pages/Gallery/AllPhotos"));
const SeminarSessionsLazy = lazy(() => import("pages/Gallery/SeminarSessions"));

const QrPageLazy = lazy(() => import("pages/Home/QrPage"));

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
              element={<AdminOfficeBearersLazy />}
            />

            <Route element={<Navbar />}>
              <Route path="/alumni-forum" element={<AlumniForumLazy />} />
              <Route path="/alumni-forum/:postId" element={<ForumPostLazy />} />
              <Route path="/qr" element={<QrPageLazy />} />

            </Route>

            <Route element={<WithNavFooter />}>
              <Route index path="/" element={<HomePageLazy />} />
              <Route path="/login" element={<LoginPageLazy />} />
              <Route
                path="/register-alumni"
                element={<RegistrationPageAlumniLazy />}
              />
              <Route
                path="/register-student"
                element={<RegistrationPageStudentLazy />}
              />
              <Route
                path="/register-faculty"
                element={<RegistrationPageFacultyLazy />}
              />
              <Route path="/reset-password" element={<ResetPasswordLazy />} />
              <Route path="/forgot-password" element={<ForgotPasswordLazy />} />
              <Route path="/verify-email" element={<VerifyEmailLazy />} />
              <Route path="/events" element={<EventsLazy />} />

              <Route path="/alumni" element={<AlumniLazy />} />
              <Route path="/gallery" element={<GalleryPageLazy />} />
              <Route path="/gallery/alumni-meet" element={<AlumniMeetLazy />} />
              <Route path="/gallery/all-photos" element={<AllPhotosLazy />} />
              <Route
                path="/gallery/seminar-sessions"
                element={<SeminarSessionsLazy />}
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

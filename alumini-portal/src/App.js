import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from "./pages/LoginPage"
import RegistrationPage from './pages/RegistrationPage';
import Home from './pages/Home'
function App() {
  return (
    <Router>
      <div className="App">

        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegistrationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


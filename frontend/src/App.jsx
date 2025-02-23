import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProfile from "./pages/UserProfile";
import Post from "./pages/Post";
import Screen from "./pages/Screen";
import Leaderboard from "./pages/Leaderboard"
import { AuthContextProvider } from "./authcontext/authcontext";
import SubmitTask from "./pages/SubmitTask";
import { VerifyUser } from "./utils/verifyUser";


function App() {
  return (
    <>
      <AuthContextProvider>
        <ToastContainer />
        <Router>
          <Routes>
            {/* Styled Routes */}
            <Route
              path="/*"
              element={
                <div className="flex bg-[url('/login.jpg')] bg-cover bg-center justify-center items-center h-screen">
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<SignUp />} />
                    <Route path="/Post" element={<Post />} />
                  </Routes>
                </div>
              }
            />

            <Route path="/" element={<Home />} />
            <Route element={<VerifyUser />}>
              <Route path="/Task" element={<SubmitTask />} />
              <Route path="/screen" element={<Screen />} />
              <Route path="/dashboard" element={<UserProfile />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Route>


          </Routes>
        </Router>
      </AuthContextProvider>
    </>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../pages/auth/ProtectedRoute";
import Navbar from "../components/Landing/Navbar";
import Footer from "../components/Landing/Footer";
import SignIn from "../pages/auth/Signin";
import SignUp from "../pages/auth/Signup";
import Dashboard from "../pages/Dashboard";
import Landing from "../pages/Landing";
import NotFound from "../components/NotFound";

function AppContent() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-black text-white">
              <Landing />
            </div>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default AppContent;

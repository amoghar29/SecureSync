import { Link } from "react-router-dom";
import { Lock, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center text-white text-xl font-semibold"
            >
              <Lock className="w-6 h-6 mr-2" />
              SecureSync
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-white hover:text-gray-300 px-3 py-2"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center text-white hover:text-gray-300 px-3 py-2"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/"
                    className="text-white hover:text-gray-300 px-3 py-2"
                  >
                    Home
                  </Link>
                  <Link
                    to="/signin"
                    className="text-white hover:text-gray-300 px-3 py-2"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    handleNavClick();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              onClick={handleNavClick}
              className="flex items-center text-white text-xl font-semibold"
            >
              <Lock className="w-6 h-6 mr-2" />
              SecureSync
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-gray-300"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={handleNavClick}
                    className="text-white hover:text-gray-300 px-3 py-2"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
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
                    onClick={handleNavClick}
                    className="text-white hover:text-gray-300 px-3 py-2"
                  >
                    Home
                  </Link>
                  <Link
                    to="/signin"
                    onClick={handleNavClick}
                    className="text-white hover:text-gray-300 px-3 py-2"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={handleNavClick}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={handleNavClick}
                    className="block text-white hover:text-gray-300 px-3 py-2"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-white hover:text-gray-300 px-3 py-2"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/"
                    onClick={handleNavClick}
                    className="block text-white hover:text-gray-300 px-3 py-2"
                  >
                    Home
                  </Link>
                  <Link
                    to="/signin"
                    onClick={handleNavClick}
                    className="block text-white hover:text-gray-300 px-3 py-2"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={handleNavClick}
                    className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

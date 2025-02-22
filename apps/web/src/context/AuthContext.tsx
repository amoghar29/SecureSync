import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/auth/check`, {
        withCredentials: true,
      });
      setIsAuthenticated(response.data.success);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/auth/signout`,
        {},
        {
          withCredentials: true,
        }
      );
      setIsAuthenticated(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

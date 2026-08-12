// context/AuthContext.jsx — Global admin authentication state
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getMe } from '../api/authApi';

const AuthContext = createContext(null);

/**
 * AuthProvider wraps the application and provides authentication state
 * and helper functions to all children via React Context.
 */
export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true); // True while checking stored token

  /**
   * On mount, check if a valid token is stored in localStorage.
   * If so, fetch the admin profile to validate it's still active.
   */
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('sevaconnect_token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await getMe();
        setAdmin(data.admin);
      } catch {
        // Token is invalid or expired — clear it
        localStorage.removeItem('sevaconnect_token');
        localStorage.removeItem('sevaconnect_admin');
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  /**
   * Called after a successful login API response.
   * Persists token and admin info to localStorage.
   */
  const login = useCallback((token, adminData) => {
    localStorage.setItem('sevaconnect_token', token);
    localStorage.setItem('sevaconnect_admin', JSON.stringify(adminData));
    setAdmin(adminData);
  }, []);

  /**
   * Clears authentication state and redirects to login.
   */
  const logout = useCallback(() => {
    localStorage.removeItem('sevaconnect_token');
    localStorage.removeItem('sevaconnect_admin');
    setAdmin(null);
  }, []);

  const value = {
    admin,
    isAuthenticated: !!admin,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook for consuming auth context.
 * Usage: const { admin, isAuthenticated, login, logout } = useAuth();
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

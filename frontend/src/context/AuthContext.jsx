import React, { createContext, useContext, useState, useEffect } from 'react';

// ============= AUTH CONTEXT =============
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      try {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        // Validate that we have proper user data
        if (userData && userData._id && userData.email) {
          setUser(userData);
        } else {
          // Clear invalid auth data
          logout();
        }
      } catch (error) {
        // Clear corrupted auth data
        logout();
      }
    }
  }, [token]);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
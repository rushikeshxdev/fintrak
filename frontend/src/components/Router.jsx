import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import LandingPage from './landing/LandingPage';
import AuthForm from './auth/AuthForm';
import Dashboard from './dashboard/Dashboard';

// ============= ROUTER COMPONENT =============
const Router = () => {
  const { isAuthenticated, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showClearOption, setShowClearOption] = useState(false);

  // Check for API connectivity issues
  useEffect(() => {
    if (isAuthenticated) {
      // Test API connectivity
      fetch('http://localhost:5000/api/auth/test')
        .catch(() => {
          setShowClearOption(true);
        });
    }
  }, [isAuthenticated]);

  // Handle authentication modal
  const handleAuthClick = (mode = 'login') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleCloseAuth = () => {
    setShowAuthModal(false);
  };

  const handleClearData = () => {
    logout();
    setShowClearOption(false);
    localStorage.clear();
    window.location.reload();
  };

  // If user is authenticated, show dashboard
  if (isAuthenticated) {
    return (
      <div>
        {showClearOption && (
          <div className="fixed top-4 right-4 z-50 bg-red-600 text-white p-4 rounded-lg shadow-lg">
            <p className="mb-2">API Connection Failed</p>
            <button 
              onClick={handleClearData}
              className="bg-white text-red-600 px-3 py-1 rounded text-sm"
            >
              Clear Data & Restart
            </button>
          </div>
        )}
        <Dashboard />
      </div>
    );
  }

  // If auth modal is open, show auth form
  if (showAuthModal) {
    return (
      <AuthForm 
        initialMode={authMode}
        onClose={handleCloseAuth}
        showAsModal={true}
      />
    );
  }

  // Default: show landing page
  return <LandingPage onAuthClick={handleAuthClick} />;
};

export default Router;
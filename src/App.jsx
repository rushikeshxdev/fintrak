import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthForm from './components/auth/AuthForm';
import Dashboard from './components/dashboard/Dashboard';

// ============= MAIN APP =============
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  // The isAuthenticated check determines which main component to render
  return isAuthenticated ? <Dashboard /> : <AuthForm />;
};
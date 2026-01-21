import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Router from './components/Router';

// ============= MAIN APP =============
export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();
  if (loading) return <div className="loading-spinner"><div className="spinner" /></div>;
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
};

export const AdminRoute = ({ children }) => {
  const { isAdmin, isLoggedIn, loading } = useAuth();
  if (loading) return <div className="loading-spinner"><div className="spinner" /></div>;
  if (!isLoggedIn()) return <Navigate to="/login" replace />;
  if (!isAdmin()) return <Navigate to="/books" replace />;
  return children;
};

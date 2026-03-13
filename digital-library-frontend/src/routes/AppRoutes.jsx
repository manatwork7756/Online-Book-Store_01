import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute, AdminRoute } from './ProtectedRoute';
import MainLayout from '../layouts/MainLayout';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Book Pages
import BookList from '../pages/books/BookList';
import BookDetails from '../pages/books/BookDetails';
import ReadBook from '../pages/books/ReadBook';

// Admin Pages
import Dashboard from '../pages/admin/Dashboard';
import UploadBook from '../pages/admin/UploadBook';
import ManageBooks from '../pages/admin/ManageBooks';
import ManageUsers from '../pages/admin/ManageUsers';

const AppRoutes = () => (
  <Routes>
    {/* Public Auth Routes */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Public Book Routes */}
    <Route path="/" element={<MainLayout><Navigate to="/books" replace /></MainLayout>} />
    <Route path="/books" element={<MainLayout><BookList /></MainLayout>} />
    <Route path="/books/:id" element={<MainLayout><BookDetails /></MainLayout>} />

    {/* Protected - Must be logged in to read */}
    <Route path="/books/:id/read" element={
      <ProtectedRoute>
        <MainLayout><ReadBook /></MainLayout>
      </ProtectedRoute>
    } />

    {/* Admin Routes */}
    <Route path="/admin" element={
      <AdminRoute><MainLayout><Dashboard /></MainLayout></AdminRoute>
    } />
    <Route path="/admin/books/upload" element={
      <AdminRoute><MainLayout><UploadBook /></MainLayout></AdminRoute>
    } />
    <Route path="/admin/books" element={
      <AdminRoute><MainLayout><ManageBooks /></MainLayout></AdminRoute>
    } />
    <Route path="/admin/users" element={
      <AdminRoute><MainLayout><ManageUsers /></MainLayout></AdminRoute>
    } />

    {/* Fallback */}
    <Route path="*" element={<Navigate to="/books" replace />} />
  </Routes>
);

export default AppRoutes;

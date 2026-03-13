import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosConfig';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axiosInstance.get('/api/admin/dashboard');
        setStats(res.data);
      } catch {
        toast.error('Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <div className="loading-spinner"><div className="spinner" /></div>;

  return (
    <div className="container">
      <div className="section-heading">
        <h2>⚙️ Admin Dashboard</h2>
        <div className="section-divider" />
        <p>Manage your digital library from here</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-number">{stats?.totalBooks || 0}</div>
          <div className="stat-label">Total Books</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-number">{stats?.totalUsers || 0}</div>
          <div className="stat-label">Registered Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📖</div>
          <div className="stat-number">{stats?.totalReads || 0}</div>
          <div className="stat-label">Total Reads</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-number">{stats?.activeReaders || 0}</div>
          <div className="stat-label">Active Readers</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
        <Link to="/admin/books/upload" className="card" style={{ padding: '28px', textAlign: 'center', textDecoration: 'none' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📤</div>
          <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '6px' }}>Upload Book</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Add new books to the library</p>
        </Link>
        <Link to="/admin/books" className="card" style={{ padding: '28px', textAlign: 'center', textDecoration: 'none' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📚</div>
          <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '6px' }}>Manage Books</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Edit or remove existing books</p>
        </Link>
        <Link to="/admin/users" className="card" style={{ padding: '28px', textAlign: 'center', textDecoration: 'none' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>👥</div>
          <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '6px' }}>Manage Users</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>View and manage user accounts</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

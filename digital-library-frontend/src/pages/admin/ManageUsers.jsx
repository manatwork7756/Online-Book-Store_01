import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../api/axiosConfig';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/api/admin/users');
      setUsers(res.data);
    } catch {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete user "${name}"?`)) return;
    try {
      await axiosInstance.delete(`/api/admin/users/${id}`);
      setUsers(prev => prev.filter(u => u.id !== id));
      toast.success('User deleted successfully');
    } catch {
      toast.error('Failed to delete user');
    }
  };

  if (loading) return <div className="loading-spinner"><div className="spinner" /></div>;

  return (
    <div className="container">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <Link to="/admin" className="btn btn-secondary btn-sm">← Back</Link>
        <div>
          <h2 style={{ fontFamily: 'Playfair Display, serif' }}>👥 Manage Users</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{users.length} registered users</p>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👤</div>
          <h3>No users yet</h3>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={user.id}>
                  <td style={{ color: 'var(--text-muted)' }}>{i + 1}</td>
                  <td style={{ fontWeight: 500 }}>👤 {user.name}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{user.email}</td>
                  <td>
                    <span className={`badge ${user.role === 'ADMIN' ? 'badge-admin' : 'badge-user'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                  </td>
                  <td>
                    {user.role !== 'ADMIN' && (
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id, user.name)}>
                        🗑 Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;

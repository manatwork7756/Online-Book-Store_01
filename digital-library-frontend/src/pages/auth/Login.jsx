import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authService.login(form);
      const { token, email, name, role, userId } = res.data;
      login(token, { email, name, role, userId });
      toast.success(`Welcome back, ${name}! 📚`);
      navigate(role === 'ADMIN' ? '/admin' : '/books');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <h1>📚 Digital Library</h1>
          <p>Sign in to access your books</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Signing in...' : '🔑 Sign In'}
          </button>
        </form>

        <div className="auth-divider">or</div>

        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--accent)' }}>Register here</Link>
        </p>

        <div style={{ marginTop: '20px', padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <strong style={{ color: 'var(--accent)' }}>Demo Admin:</strong> admin@library.com / admin123
        </div>
      </div>
    </div>
  );
};

export default Login;

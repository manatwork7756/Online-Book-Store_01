import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logout, isAdmin, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">
          <span>📚</span> Digital Library
        </Link>

        <ul className="navbar-links">
          <li><Link to="/books">Browse Books</Link></li>

          {isLoggedIn() && (
            <>
              {isAdmin() && <li><Link to="/admin">Admin Panel</Link></li>}
              <li className="navbar-user">👤 {user?.name}</li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}

          {!isLoggedIn() && (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register" className="btn-accent">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import bookService from '../../services/bookService';
import accessService from '../../services/accessService';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await bookService.getBookById(id);
        setBook(res.data);
      } catch {
        toast.error('Book not found');
        navigate('/books');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleRead = async () => {
    if (!isLoggedIn()) {
      toast.info('Please login to read books');
      navigate('/login');
      return;
    }
    try {
      await accessService.recordAccess(user.userId, book.id);
    } catch {}
    navigate(`/books/${id}/read`);
  };

  if (loading) return <div className="loading-spinner"><div className="spinner" /></div>;
  if (!book) return null;

  const fallback = `https://via.placeholder.com/300x400/1c1c1c/c9a84c?text=${encodeURIComponent(book.title?.substring(0, 2))}`;

  return (
    <div className="container" style={{ paddingTop: '20px' }}>
      <Link to="/books" className="btn btn-secondary btn-sm" style={{ marginBottom: '32px', display: 'inline-flex' }}>
        ← Back to Books
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '48px', alignItems: 'start' }}>
        <div>
          <img
            src={book.coverImage || fallback}
            alt={book.title}
            onError={e => e.target.src = fallback}
            style={{ width: '100%', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
          />
        </div>

        <div>
          {book.category && (
            <span className="badge badge-admin" style={{ marginBottom: '12px', display: 'inline-block' }}>
              {book.category}
            </span>
          )}
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', marginBottom: '8px' }}>
            {book.title}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '24px' }}>
            by <strong>{book.author}</strong>
          </p>

          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '28px'
          }}>
            <h3 style={{ marginBottom: '12px', fontSize: '1rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              About this Book
            </h3>
            <p style={{ color: 'var(--text-primary)', lineHeight: '1.8' }}>
              {book.description || 'No description available for this book.'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
            <div style={{ background: 'var(--bg-elevated)', borderRadius: '8px', padding: '12px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>FORMAT</div>
              <div style={{ color: 'var(--accent)', fontWeight: 600 }}>📄 PDF</div>
            </div>
            <div style={{ background: 'var(--bg-elevated)', borderRadius: '8px', padding: '12px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>ACCESS</div>
              <div style={{ color: 'var(--success)', fontWeight: 600 }}>✅ Free</div>
            </div>
          </div>

          <button onClick={handleRead} className="btn btn-primary" style={{ fontSize: '1rem', padding: '14px 32px' }}>
            📖 Read Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

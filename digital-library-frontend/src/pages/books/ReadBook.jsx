import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import bookService from '../../services/bookService';
import { toast } from 'react-toastify';

const ReadBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await bookService.getBookById(id);
        setBook(res.data);
      } catch {
        toast.error('Failed to load book');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <div className="loading-spinner"><div className="spinner" /></div>;
  if (!book) return null;

  return (
    <div className="container">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <Link to={`/books/${id}`} className="btn btn-secondary btn-sm">← Back</Link>
        <div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem' }}>{book.title}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>by {book.author}</p>
        </div>
      </div>

      <div className="pdf-viewer-container">
        {book.pdfUrl ? (
          <iframe
            src={book.pdfUrl}
            title={book.title}
            style={{ width: '100%', height: '80vh', border: 'none' }}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📄</div>
            <h3 style={{ marginBottom: '8px', color: 'var(--text-secondary)' }}>PDF Not Available</h3>
            <p>No PDF has been uploaded for this book yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadBook;

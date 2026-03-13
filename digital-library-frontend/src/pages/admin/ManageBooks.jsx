import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import bookService from '../../services/bookService';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await bookService.getAllBooks();
      setBooks(res.data);
    } catch {
      toast.error('Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    try {
      await bookService.deleteBook(id);
      setBooks(prev => prev.filter(b => b.id !== id));
      toast.success('Book deleted successfully');
    } catch {
      toast.error('Failed to delete book');
    }
  };

  if (loading) return <div className="loading-spinner"><div className="spinner" /></div>;

  return (
    <div className="container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link to="/admin" className="btn btn-secondary btn-sm">← Back</Link>
          <div>
            <h2 style={{ fontFamily: 'Playfair Display, serif' }}>📚 Manage Books</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{books.length} books in library</p>
          </div>
        </div>
        <Link to="/admin/books/upload" className="btn btn-primary">+ Add New Book</Link>
      </div>

      {books.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No books yet</h3>
          <p>Start by uploading your first book!</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Cover</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, i) => (
                <tr key={book.id}>
                  <td style={{ color: 'var(--text-muted)' }}>{i + 1}</td>
                  <td>
                    <img
                      src={book.coverImage || 'https://via.placeholder.com/40x52/1c1c1c/c9a84c?text=B'}
                      alt={book.title}
                      style={{ width: '40px', height: '52px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                  </td>
                  <td style={{ fontWeight: 500 }}>{book.title}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{book.author}</td>
                  <td>
                    {book.category && <span className="badge badge-admin">{book.category}</span>}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link to={`/books/${book.id}`} className="btn btn-secondary btn-sm">👁 View</Link>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(book.id, book.title)}>
                        🗑 Delete
                      </button>
                    </div>
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

export default ManageBooks;

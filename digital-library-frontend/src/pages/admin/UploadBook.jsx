import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import bookService from '../../services/bookService';

const CATEGORIES = ['Fiction', 'Dystopian', 'Technology', 'Philosophy', 'Science', 'History', 'Biography', 'Self-Help', 'Other'];

const UploadBook = () => {
  const [form, setForm] = useState({
    title: '', author: '', category: '', description: '', pdfUrl: '', coverImage: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.author) {
      toast.error('Title and Author are required!');
      return;
    }
    setLoading(true);
    try {
      await bookService.addBook(form);
      toast.success('Book added successfully! 📚');
      navigate('/admin/books');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add book');
    } finally {
      setLoading(false);
    }
  };

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link to="/admin" className="btn btn-secondary btn-sm">← Back</Link>
        <div>
          <h2 style={{ fontFamily: 'Playfair Display, serif' }}>📤 Upload New Book</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Add a new book to the library</p>
        </div>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '32px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Book Title *</label>
            <input type="text" className="form-control" placeholder="Enter book title" value={form.title} onChange={set('title')} required />
          </div>

          <div className="form-group">
            <label className="form-label">Author *</label>
            <input type="text" className="form-control" placeholder="Author name" value={form.author} onChange={set('author')} required />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-control" value={form.category} onChange={set('category')}>
              <option value="">Select category...</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              placeholder="Brief description of the book..."
              value={form.description}
              onChange={set('description')}
              rows={4}
            />
          </div>

          <div className="form-group">
            <label className="form-label">PDF URL</label>
            <input type="url" className="form-control" placeholder="https://example.com/book.pdf" value={form.pdfUrl} onChange={set('pdfUrl')} />
            <small style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '4px', display: 'block' }}>
              Link to the PDF file (or leave blank to upload later)
            </small>
          </div>

          <div className="form-group">
            <label className="form-label">Cover Image URL</label>
            <input type="url" className="form-control" placeholder="https://example.com/cover.jpg" value={form.coverImage} onChange={set('coverImage')} />
          </div>

          {form.coverImage && (
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
              <img src={form.coverImage} alt="Preview" style={{ maxHeight: '200px', borderRadius: '8px', border: '1px solid var(--border)' }} />
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Adding book...' : '📚 Add Book to Library'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadBook;

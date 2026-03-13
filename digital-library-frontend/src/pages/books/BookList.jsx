import React, { useState, useEffect } from 'react';
import BookCard from '../../components/BookCard';
import bookService from '../../services/bookService';
import { toast } from 'react-toastify';

const CATEGORIES = ['All', 'Fiction', 'Dystopian', 'Technology', 'Philosophy', 'Science', 'History'];

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

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

  const handleSearch = async (e) => {
    const q = e.target.value;
    setSearch(q);
    if (q.length > 2) {
      try {
        const res = await bookService.searchBooks(q);
        setBooks(res.data);
        setActiveCategory('All');
      } catch {}
    } else if (q.length === 0) {
      fetchBooks();
    }
  };

  const handleCategory = async (cat) => {
    setActiveCategory(cat);
    setSearch('');
    if (cat === 'All') {
      fetchBooks();
    } else {
      try {
        const res = await bookService.getByCategory(cat);
        setBooks(res.data);
      } catch {
        toast.error('Failed to filter books');
      }
    }
  };

  return (
    <>
      <div className="hero">
        <h1>Discover <span>Great Books</span></h1>
        <p>Access hundreds of books. Read for free, anytime, anywhere.</p>
        <div className="search-bar" style={{ margin: '0 auto' }}>
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="form-control"
            placeholder="Search by title or author..."
            value={search}
            onChange={handleSearch}
            style={{ paddingLeft: '44px' }}
          />
        </div>
      </div>

      <div className="container" style={{ marginTop: '40px' }}>
        <div className="filter-bar">
          <div className="filter-chips">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`chip ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            {books.length} book{books.length !== 1 ? 's' : ''} found
          </span>
        </div>

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner" />
            <p>Loading books...</p>
          </div>
        ) : books.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No books found</h3>
            <p>Try a different search or category</p>
          </div>
        ) : (
          <div className="books-grid">
            {books.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BookList;

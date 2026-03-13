import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book, onDelete, isAdmin }) => {
  const fallbackCover = `https://via.placeholder.com/220x260/1c1c1c/c9a84c?text=${encodeURIComponent(book.title?.substring(0, 2))}`;

  return (
    <div className="book-card">
      <div className="book-card-cover">
        <img
          src={book.coverImage || fallbackCover}
          alt={book.title}
          onError={(e) => { e.target.src = fallbackCover; }}
        />
        <div className="book-card-overlay" />
        {book.category && (
          <span className="book-card-category">{book.category}</span>
        )}
      </div>

      <div className="book-card-body">
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-author">by {book.author}</p>

        <div className="book-card-actions">
          <Link to={`/books/${book.id}`} className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
            📖 View
          </Link>
          {isAdmin && (
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDelete && onDelete(book.id)}
            >
              🗑
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;

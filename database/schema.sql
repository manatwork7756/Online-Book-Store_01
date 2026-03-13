-- Digital Library System Database
-- Run this SQL in MySQL to create the database and tables

CREATE DATABASE IF NOT EXISTS digital_library_db;
USE digital_library_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('USER', 'ADMIN') DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Books Table
CREATE TABLE IF NOT EXISTS books (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(150) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    pdf_url VARCHAR(500),
    cover_image VARCHAR(500),
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Book Access Table (reading tracking)
CREATE TABLE IF NOT EXISTS book_access (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    book_id BIGINT NOT NULL,
    access_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_page_read INT DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);

-- Sample Books Data
INSERT INTO books (title, author, category, description, pdf_url, cover_image) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', 'A story of the mysteriously wealthy Jay Gatsby and his love for Daisy Buchanan.', 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/sample.pdf', 'https://covers.openlibrary.org/b/id/8225261-L.jpg'),
('To Kill a Mockingbird', 'Harper Lee', 'Fiction', 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.', 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/sample.pdf', 'https://covers.openlibrary.org/b/id/8228691-L.jpg'),
('1984', 'George Orwell', 'Dystopian', 'A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.', 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/sample.pdf', 'https://covers.openlibrary.org/b/id/7222246-L.jpg'),
('Clean Code', 'Robert C. Martin', 'Technology', 'A handbook of agile software craftsmanship for writing better code.', 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/sample.pdf', 'https://covers.openlibrary.org/b/id/8091016-L.jpg'),
('The Alchemist', 'Paulo Coelho', 'Philosophy', 'A magical story about following your dreams and listening to your heart.', 'https://www.w3.org/WAI/WCAG21/Techniques/pdf/sample.pdf', 'https://covers.openlibrary.org/b/id/8299814-L.jpg');

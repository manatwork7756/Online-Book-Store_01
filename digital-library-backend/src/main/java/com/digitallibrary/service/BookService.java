package com.digitallibrary.service;

import com.digitallibrary.dto.BookRequest;
import com.digitallibrary.dto.BookResponse;
import java.util.List;

public interface BookService {
    List<BookResponse> getAllBooks();
    BookResponse getBookById(Long id);
    List<BookResponse> searchBooks(String keyword);
    List<BookResponse> getBooksByCategory(String category);
    BookResponse addBook(BookRequest request);
    BookResponse updateBook(Long id, BookRequest request);
    void deleteBook(Long id);
}

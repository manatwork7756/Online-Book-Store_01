package com.digitallibrary.serviceImpl;

import com.digitallibrary.dto.BookRequest;
import com.digitallibrary.dto.BookResponse;
import com.digitallibrary.entity.Book;
import com.digitallibrary.repository.BookRepository;
import com.digitallibrary.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    private BookResponse mapToResponse(Book book) {
        return new BookResponse(
            book.getId(), book.getTitle(), book.getAuthor(),
            book.getCategory(), book.getDescription(),
            book.getPdfUrl(), book.getCoverImage(), book.getUploadDate()
        );
    }

    @Override
    public List<BookResponse> getAllBooks() {
        return bookRepository.findAll().stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public BookResponse getBookById(Long id) {
        Book book = bookRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));
        return mapToResponse(book);
    }

    @Override
    public List<BookResponse> searchBooks(String keyword) {
        return bookRepository.searchBooks(keyword).stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public List<BookResponse> getBooksByCategory(String category) {
        return bookRepository.findByCategoryContainingIgnoreCase(category)
            .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public BookResponse addBook(BookRequest request) {
        Book book = new Book();
        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setCategory(request.getCategory());
        book.setDescription(request.getDescription());
        book.setPdfUrl(request.getPdfUrl());
        book.setCoverImage(request.getCoverImage());
        return mapToResponse(bookRepository.save(book));
    }

    @Override
    public BookResponse updateBook(Long id, BookRequest request) {
        Book book = bookRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));
        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setCategory(request.getCategory());
        book.setDescription(request.getDescription());
        book.setPdfUrl(request.getPdfUrl());
        book.setCoverImage(request.getCoverImage());
        return mapToResponse(bookRepository.save(book));
    }

    @Override
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
}

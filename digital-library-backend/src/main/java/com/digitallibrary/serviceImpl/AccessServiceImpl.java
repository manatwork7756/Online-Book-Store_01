package com.digitallibrary.serviceImpl;

import com.digitallibrary.entity.Book;
import com.digitallibrary.entity.BookAccess;
import com.digitallibrary.entity.User;
import com.digitallibrary.repository.BookAccessRepository;
import com.digitallibrary.repository.BookRepository;
import com.digitallibrary.repository.UserRepository;
import com.digitallibrary.service.AccessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AccessServiceImpl implements AccessService {

    @Autowired private BookAccessRepository bookAccessRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private BookRepository bookRepository;

    @Override
    public BookAccess recordAccess(Long userId, Long bookId) {
        Optional<BookAccess> existing = bookAccessRepository.findByUserIdAndBookId(userId, bookId);
        if (existing.isPresent()) {
            BookAccess access = existing.get();
            access.setAccessTime(LocalDateTime.now());
            return bookAccessRepository.save(access);
        }

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new RuntimeException("Book not found"));

        BookAccess access = new BookAccess();
        access.setUser(user);
        access.setBook(book);
        access.setAccessTime(LocalDateTime.now());
        access.setLastPageRead(1);
        return bookAccessRepository.save(access);
    }

    @Override
    public List<BookAccess> getUserReadingHistory(Long userId) {
        return bookAccessRepository.findByUserId(userId);
    }

    @Override
    public BookAccess updateLastPage(Long userId, Long bookId, int page) {
        BookAccess access = bookAccessRepository.findByUserIdAndBookId(userId, bookId)
            .orElseGet(() -> recordAccess(userId, bookId));
        access.setLastPageRead(page);
        return bookAccessRepository.save(access);
    }
}

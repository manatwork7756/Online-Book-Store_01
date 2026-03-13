package com.digitallibrary.service;

import com.digitallibrary.entity.BookAccess;
import java.util.List;

public interface AccessService {
    BookAccess recordAccess(Long userId, Long bookId);
    List<BookAccess> getUserReadingHistory(Long userId);
    BookAccess updateLastPage(Long userId, Long bookId, int page);
}

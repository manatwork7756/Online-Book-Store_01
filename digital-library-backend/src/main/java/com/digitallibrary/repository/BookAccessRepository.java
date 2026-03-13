package com.digitallibrary.repository;

import com.digitallibrary.entity.BookAccess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookAccessRepository extends JpaRepository<BookAccess, Long> {
    List<BookAccess> findByUserId(Long userId);
    Optional<BookAccess> findByUserIdAndBookId(Long userId, Long bookId);
    long countByBookId(Long bookId);

    @Query("SELECT COUNT(DISTINCT ba.user.id) FROM BookAccess ba")
    long countDistinctUsers();

    @Query("SELECT COUNT(ba) FROM BookAccess ba")
    long countTotalReads();
}

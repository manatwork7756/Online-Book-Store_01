package com.digitallibrary.serviceImpl;

import com.digitallibrary.repository.BookAccessRepository;
import com.digitallibrary.repository.BookRepository;
import com.digitallibrary.repository.UserRepository;
import com.digitallibrary.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired private BookRepository bookRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private BookAccessRepository bookAccessRepository;

    @Override
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalBooks", bookRepository.count());
        stats.put("totalUsers", userRepository.count());
        stats.put("totalReads", bookAccessRepository.countTotalReads());
        stats.put("activeReaders", bookAccessRepository.countDistinctUsers());
        return stats;
    }
}

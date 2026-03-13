package com.digitallibrary.service;

import com.digitallibrary.entity.User;
import java.util.List;

public interface UserService {
    User getUserById(Long id);
    List<User> getAllUsers();
    User updateUser(Long id, String name);
    void deleteUser(Long id);
}

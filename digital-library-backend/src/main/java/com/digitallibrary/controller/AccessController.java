package com.digitallibrary.controller;

import com.digitallibrary.entity.BookAccess;
import com.digitallibrary.service.AccessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/access")
@CrossOrigin
public class AccessController {

    @Autowired
    private AccessService accessService;

    @PostMapping("/record")
    public ResponseEntity<?> recordAccess(@RequestBody Map<String, Long> body) {
        try {
            BookAccess access = accessService.recordAccess(body.get("userId"), body.get("bookId"));
            return ResponseEntity.ok(Map.of("message", "Access recorded", "accessId", access.getId()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/history/{userId}")
    public ResponseEntity<List<BookAccess>> getReadingHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(accessService.getUserReadingHistory(userId));
    }

    @PutMapping("/page")
    public ResponseEntity<?> updateLastPage(@RequestBody Map<String, Object> body) {
        Long userId = Long.valueOf(body.get("userId").toString());
        Long bookId = Long.valueOf(body.get("bookId").toString());
        int page = Integer.parseInt(body.get("page").toString());
        accessService.updateLastPage(userId, bookId, page);
        return ResponseEntity.ok(Map.of("message", "Page updated"));
    }
}

package com.digitallibrary.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookResponse {
    private Long id;
    private String title;
    private String author;
    private String category;
    private String description;
    private String pdfUrl;
    private String coverImage;
    private LocalDateTime uploadDate;
}

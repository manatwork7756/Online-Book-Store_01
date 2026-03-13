package com.digitallibrary.dto;

import lombok.Data;

@Data
public class BookRequest {
    private String title;
    private String author;
    private String category;
    private String description;
    private String pdfUrl;
    private String coverImage;
}

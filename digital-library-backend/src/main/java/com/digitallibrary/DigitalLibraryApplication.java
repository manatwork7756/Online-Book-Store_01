package com.digitallibrary;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DigitalLibraryApplication {
    public static void main(String[] args) {
        SpringApplication.run(DigitalLibraryApplication.class, args);
        System.out.println("✅ Digital Library Backend is running on http://localhost:8080");
    }
}

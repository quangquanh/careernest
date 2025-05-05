package com.nhc.CareerNest.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URISyntaxException;

import org.springframework.core.io.InputStreamResource;
import org.springframework.web.multipart.MultipartFile;

public interface IFileService {
    void createDirectory(String folder)
            throws URISyntaxException;

    String store(MultipartFile file, String folder)
            throws URISyntaxException,
            IOException;

    InputStreamResource getResource(String fileName, String folder)
            throws URISyntaxException,
            FileNotFoundException;

    long getFileLength(String fileName, String folder)
            throws URISyntaxException,
            FileNotFoundException;
}

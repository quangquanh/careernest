package com.nhc.CareerNest.service.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nhc.CareerNest.config.language.LocalizationUtils;
import com.nhc.CareerNest.constant.MessageKeys;
import com.nhc.CareerNest.exception.errors.StorageException;
import com.nhc.CareerNest.service.IFileService;

@Service
public class FileService implements IFileService {

    private final LocalizationUtils localizationUtils;

    public FileService(LocalizationUtils localizationUtils) {
        this.localizationUtils = localizationUtils;
    }

    @Value("${careernest.upload-file.base-uri}")
    private String baseUri;

    private Path resolveAbsolutePath(String folder, String fileName) {
        return Paths.get(System.getProperty("user.dir")) // vd: CareerNest_Server/CareerNest
                .resolve(baseUri)
                .resolve(folder)
                .resolve(fileName)
                .normalize()
                .toAbsolutePath();
    }

    private Path resolveFolderPath(String folder) {
        return Paths.get(System.getProperty("user.dir"))
                .resolve(baseUri)
                .resolve(folder)
                .normalize()
                .toAbsolutePath();
    }

    @Override
    public void createDirectory(String folder) {
        Path path = resolveFolderPath(folder);
        if (!Files.exists(path)) {
            try {
                Files.createDirectories(path);
                System.out.println(">>> CREATE NEW DIRECTORY SUCCESSFUL, PATH = " + path);
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            System.out.println(">>> SKIP MAKING DIRECTORY, ALREADY EXISTS");
        }
    }

    @Override
    public String store(MultipartFile file, String folder) throws IOException {
        String finalName = System.currentTimeMillis() + "-" + file.getOriginalFilename();
        Path targetPath = resolveAbsolutePath(folder, finalName);

        Files.createDirectories(targetPath.getParent()); // Đảm bảo folder tồn tại
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, targetPath, StandardCopyOption.REPLACE_EXISTING);
        }

        return finalName;
    }

    @Override
    public long getFileLength(String fileName, String folder) {
        Path path = resolveAbsolutePath(folder, fileName);
        File file = path.toFile();
        if (!file.exists() || file.isDirectory())
            return 0;
        return file.length();
    }

    @Override
    public InputStreamResource getResource(String fileName, String folder) throws FileNotFoundException {
        Path path = resolveAbsolutePath(folder, fileName);
        File file = path.toFile();
        if (!file.exists()) {
            throw new FileNotFoundException("File not found: " + fileName);
        }
        return new InputStreamResource(new FileInputStream(file));
    }

    public void validateFile(MultipartFile file) throws StorageException {
        if (file == null || file.isEmpty()) {
            throw new StorageException(localizationUtils.getLocalizedMessage(MessageKeys.FILE_EMPTY));
        }

        String fileName = file.getOriginalFilename();
        List<String> allowedExtensions = Arrays.asList("pdf", "jpg", "jpeg", "png", "doc", "docx");

        boolean isValid = allowedExtensions.stream().anyMatch(item -> fileName.toLowerCase().endsWith(item));
        if (!isValid) {
            throw new StorageException(localizationUtils.getLocalizedMessage(MessageKeys.FILE_INVALID_EXTENSION));
        }
    }
}

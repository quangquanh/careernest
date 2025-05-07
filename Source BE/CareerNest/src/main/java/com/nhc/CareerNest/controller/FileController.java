package com.nhc.CareerNest.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.nhc.CareerNest.config.language.LocalizationUtils;
import com.nhc.CareerNest.constant.MessageKeys;
import com.nhc.CareerNest.domain.dto.response.base.RestResponse;
import com.nhc.CareerNest.domain.dto.response.file.ResUploadFileDTO;
import com.nhc.CareerNest.exception.errors.StorageException;
import com.nhc.CareerNest.service.impl.FileService;
import com.nhc.CareerNest.util.anotation.ApiMessage;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URISyntaxException;
import java.time.Instant;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/v1")
public class FileController {

    private final FileService fileService;
    private final LocalizationUtils localizationUtils;

    @Value("${careernest.upload-file.base-uri}")
    private String baseUri;

    public FileController(
            LocalizationUtils localizationUtils,
            FileService fileService) {
        this.fileService = fileService;
        this.localizationUtils = localizationUtils;
    }

    @PostMapping("files")
    @ApiMessage("upload single file")
    public ResponseEntity<RestResponse> upload(
            @RequestParam(name = "file", required = false) MultipartFile file,
            @RequestParam("folder") String folder) throws StorageException, URISyntaxException, IOException {

        // validate
        this.fileService.validateFile(file);

        // create directory if not exist

        this.fileService.createDirectory(folder);
        // storage file
        String uploadFile = this.fileService.store(file, folder);

        ResUploadFileDTO resUploadFile = new ResUploadFileDTO(uploadFile, Instant.now());

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(resUploadFile);
        res.setMessage(localizationUtils.getLocalizedMessage(MessageKeys.FILE_UPLOAD_SUCCESSFULLY));

        return ResponseEntity.ok().body(res);
    }

    @GetMapping("/files")
    @ApiMessage("Download a file")
    public ResponseEntity<Resource> download(
            @RequestParam(name = "fileName", required = false) String fileName,
            @RequestParam(name = "folder", required = false) String folder)
            throws StorageException, URISyntaxException, FileNotFoundException {
        if (fileName == null || folder == null) {
            throw new StorageException(localizationUtils.getLocalizedMessage(MessageKeys.FILE_MISS_PARAM));
        }

        // check file exist (and not a directory)
        long fileLength = this.fileService.getFileLength(fileName, folder);
        if (fileLength == 0) {
            throw new StorageException(localizationUtils.getLocalizedMessage(MessageKeys.FILE_NOT_FOUND));
        }

        // download a file
        InputStreamResource resource = this.fileService.getResource(fileName, folder);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .contentLength(fileLength)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }
}

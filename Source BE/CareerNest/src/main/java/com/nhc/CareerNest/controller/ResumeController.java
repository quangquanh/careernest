package com.nhc.CareerNest.controller;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.nhc.CareerNest.config.language.LocalizationUtils;
import com.nhc.CareerNest.constant.MessageKeys;
import com.nhc.CareerNest.constant.ResumeStateEnum;
import com.nhc.CareerNest.domain.dto.response.base.RestResponse;
import com.nhc.CareerNest.domain.dto.response.resume.ResCreateResumeDTO;
import com.nhc.CareerNest.domain.entity.Resume;
import com.nhc.CareerNest.domain.entity.User;
import com.nhc.CareerNest.exception.errors.IdInvalidException;
import com.nhc.CareerNest.exception.errors.StorageException;
import com.nhc.CareerNest.service.impl.FileService;
import com.nhc.CareerNest.service.impl.JobService;
import com.nhc.CareerNest.service.impl.ResumeService;
import com.nhc.CareerNest.service.impl.UserService;
import com.nhc.CareerNest.util.anotation.ApiMessage;
import com.nhc.CareerNest.util.security.SecurityUtil;

@RestController
@RequestMapping("/api/v1")
public class ResumeController {

    @Value("${careernest.upload-file.base-uri}")
    private String baseUri;

    private final ResumeService resumeService;
    private final LocalizationUtils localizationUtils;
    private final UserService userService;
    private final FileService fileService;
    private final JobService jobService;

    public ResumeController(
            JobService jobService,
            FileService fileService,
            ResumeService resumeService,
            LocalizationUtils localizationUtils,
            UserService userService) {
        this.jobService = jobService;
        this.fileService = fileService;
        this.localizationUtils = localizationUtils;
        this.resumeService = resumeService;
        this.userService = userService;

    }

    @PostMapping("resumes")
    @ApiMessage("create a resume")
    public ResponseEntity<RestResponse> createResume(
            @RequestParam(name = "file", required = false) MultipartFile file,
            @RequestParam(name = "folder", required = false) String folder,
            @RequestParam(name = "email", required = false) String email,
            @RequestParam(name = "userId", required = false) Long userId,
            @RequestParam(name = "jobId", required = false) Long jobId,
            @RequestParam(name = "advantage", required = false) String advantage,
            @RequestParam(name = "shortcoming", required = false) String shortcoming,
            @RequestParam(name = "rating", required = false) int rating,
            @RequestHeader(name = "Authorization") String accessToken)
            throws IdInvalidException,
            IdInvalidException,
            StorageException,
            URISyntaxException,
            IOException {
        Resume resume = new Resume();
        resume.setEmail(email);
        resume.setStatus(ResumeStateEnum.PENDING);
        resume.setUser(this.userService.findUserById(userId));
        resume.setJob(this.jobService.fetchJobById(jobId));
        resume.setAdvantage(advantage);
        resume.setLimit(shortcoming);
        resume.setRating(rating);

        // validate file
        this.fileService.validateFile(file);

        // get user by token
        RestResponse res = new RestResponse();
        Long idToken = SecurityUtil.extractClaim(accessToken.substring(7));
        if (idToken != null) {
            User currentUser = this.userService.findUserById(idToken);
            resume.setUser(currentUser);
            if (currentUser == null) {
                throw new IdInvalidException(localizationUtils.getLocalizedMessage(MessageKeys.USER_NOT_FOUND));
            }

            // create directory if not exist
            this.fileService.createDirectory(baseUri + folder);
            // storage file
            String uploadFile = this.fileService.store(file, folder);
            resume.setUrl(uploadFile);

            ResCreateResumeDTO savedResume = this.resumeService.createResume(resume);

            res.setMessage(localizationUtils.getLocalizedMessage(MessageKeys.CALL_API_SUCCESSFULLY));
            res.setStatusCode(HttpStatus.OK.value());
            res.setData(savedResume);
            return ResponseEntity.ok(res);
        }
        res.setMessage(localizationUtils.getLocalizedMessage(MessageKeys.USER_NOT_FOUND));
        res.setStatusCode(HttpStatus.BAD_REQUEST.value());
        return ResponseEntity.ok(res);

    }

    @GetMapping("resumes/{id}")
    @ApiMessage("get a resume by id")
    public ResponseEntity<RestResponse> fetchResume(@PathVariable Long id) throws IdInvalidException {
        Optional<Resume> optionalResume = this.resumeService.fetchResume(id);
        if (optionalResume.isEmpty()) {
            throw new IdInvalidException(localizationUtils.getLocalizedMessage(MessageKeys.RESUME_NOT_FOUND));
        } else {
            RestResponse res = new RestResponse();
            res.setStatusCode(HttpStatus.OK.value());
            res.setData(this.resumeService.getResume(optionalResume.get()));

            return ResponseEntity.ok(res);
        }
    }

    @GetMapping("resumes/user/{id}")
    public ResponseEntity<RestResponse> getMethodName(@PathVariable Long id) throws IdInvalidException {
        List<Resume> list = this.resumeService.findByUser(id);
        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(list);

        return ResponseEntity.ok(res);
    }

    @PutMapping("resumes")
    @ApiMessage("update a resume")
    public ResponseEntity<RestResponse> updateResume(@RequestBody Resume resume) throws IdInvalidException {
        Optional<Resume> optionalResume = this.resumeService.fetchResume(resume.getId());
        if (optionalResume.isEmpty()) {
            throw new IdInvalidException(localizationUtils.getLocalizedMessage(MessageKeys.RESUME_NOT_FOUND));
        } else {
            Resume updateResume = optionalResume.get();
            updateResume.setStatus(resume.getStatus());

            RestResponse res = new RestResponse();
            res.setStatusCode(HttpStatus.OK.value());
            res.setData(this.resumeService.update(updateResume));

            return ResponseEntity.ok(res);
        }
    }

    @DeleteMapping("resumes/{id}")
    @ApiMessage("delete a resume with id")
    public void deleteResume(@PathVariable("id") long id) throws IdInvalidException {
        Optional<Resume> optionalResume = this.resumeService.fetchResume(id);
        if (optionalResume.isEmpty()) {
            throw new IdInvalidException(localizationUtils.getLocalizedMessage(MessageKeys.RESUME_NOT_FOUND));
        } else {
            this.resumeService.deleteResume(id);
        }
    }

    @GetMapping("resumes/job/{id}")
    public ResponseEntity<RestResponse> getByJob(@PathVariable Long id) throws IdInvalidException {
        List<Resume> list = this.resumeService.findByJob(id);
        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(list);

        return ResponseEntity.ok(res);
    }

}

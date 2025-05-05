package com.nhc.CareerNest.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.nhc.CareerNest.config.language.LocalizationUtils;
import com.nhc.CareerNest.constant.MessageKeys;
import com.nhc.CareerNest.domain.dto.response.base.RestResponse;
import com.nhc.CareerNest.domain.entity.Job;
import com.nhc.CareerNest.domain.entity.User;
import com.nhc.CareerNest.exception.errors.IdInvalidException;
import com.nhc.CareerNest.exception.errors.StorageException;
import com.nhc.CareerNest.service.impl.FileService;
import com.nhc.CareerNest.service.impl.UserService;
import com.nhc.CareerNest.util.anotation.ApiMessage;
import com.nhc.CareerNest.util.security.SecurityUtil;

import jakarta.validation.Valid;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final LocalizationUtils localizationUtils;
    private final FileService fileService;

    public UserController(
            FileService fileService,
            LocalizationUtils localizationUtils,
            PasswordEncoder passwordEncoder,
            UserService userService) {
        this.localizationUtils = localizationUtils;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.fileService = fileService;
    }

    @Value("${careernest.upload-file.base-uri}")
    private String baseUri;

    @GetMapping("/users/{id}")
    @ApiMessage("get user by id")
    public ResponseEntity<RestResponse> fetchUser(@PathVariable("id") Long userId) {
        User user = this.userService.findUserById(userId);

        RestResponse res = new RestResponse();
        res.setData(this.userService.convertToResCreateUserDTO(user));
        res.setStatusCode(HttpStatus.OK.value());
        logger.info(String.format("fetch user with id: " + user.getId()));
        return ResponseEntity.ok(res);
    }

    @PostMapping("/users")
    @ApiMessage("Create a new user")
    public ResponseEntity<RestResponse> createUser(@Valid @RequestBody User user) throws IdInvalidException {
        boolean isEmailExist = this.userService.isEmailExist(user.getEmail());
        if (isEmailExist) {
            throw new IdInvalidException(localizationUtils.getLocalizedMessage(MessageKeys.EMAIL_ALREADY_EXIST));
        }

        String hashPassword = this.passwordEncoder.encode(user.getPassword());
        user.setPassword(hashPassword);

        User createdUser = this.userService.handleSaveUser(user);

        RestResponse res = new RestResponse();
        res.setData(this.userService.convertToResCreateUserDTO(createdUser));
        res.setStatusCode(HttpStatus.CREATED.value());
        logger.info(String.format("created user with id: " + createdUser.getId()));
        return ResponseEntity.ok(res);
    }

    @GetMapping("/users")
    @ApiMessage("Fetch all users")
    public ResponseEntity<RestResponse> fetchAllUser() {
        List<User> users = this.userService.fetchAllUser();

        RestResponse res = new RestResponse();
        res.setData(users);
        res.setStatusCode(HttpStatus.OK.value());

        return ResponseEntity.ok(res);
    }

    @PutMapping("/users")
    @ApiMessage("Update a user")
    public ResponseEntity<RestResponse> updateUser(
            @RequestBody User user,
            @RequestHeader(name = "Authorization") String accessToken) throws IdInvalidException {

        Long idToken = SecurityUtil.extractClaim(accessToken.substring(7));
        boolean isAdmin = this.userService.findUserById(idToken).getRole().getId() == 1;
        if (user.getId() == idToken || isAdmin) {
            User updateUser = this.userService.findUserById(user.getId());
            if (updateUser == null) {
                throw new IdInvalidException(localizationUtils.getLocalizedMessage(MessageKeys.USER_NOT_FOUND));
            }

            updateUser.setFirstName(user.getFirstName());
            updateUser.setLastName(user.getLastName());
            updateUser.setAddress(user.getAddress());
            updateUser.setDateOfBirth(user.getDateOfBirth());
            updateUser.setGender(user.getGender());
            updateUser.setPhoneNumber(user.getPhoneNumber());
            updateUser.setAvatar(user.getAvatar());
            updateUser.setCompany(user.getCompany());

            updateUser = this.userService.handleSaveUser(updateUser);

            RestResponse res = new RestResponse();
            res.setData(this.userService.convertToResUpdateUserDTO(updateUser));
            res.setStatusCode(HttpStatus.OK.value());

            return ResponseEntity.ok(res);
        } else {
            throw new IdInvalidException(localizationUtils.getLocalizedMessage(MessageKeys.USER_NOT_FOUND));
        }

    }

    @DeleteMapping("/users/{id}")
    @ApiMessage("Delete a user")
    public ResponseEntity<RestResponse> deleteUser(
            @PathVariable("id") Long id) {

        User deleteUser = this.userService.findUserById(id);
        this.userService.deleteUser(deleteUser);

        RestResponse res = new RestResponse();
        res.setData(this.userService.convertToResUpdateUserDTO(this.userService.deleteUser(deleteUser)));
        res.setStatusCode(HttpStatus.OK.value());

        return ResponseEntity.ok(res);
    }

    @PostMapping("users/saveJob/{userId}/{jobId}")
    @ApiMessage("save job")
    public ResponseEntity<RestResponse> save(
            @PathVariable("userId") Long userId,
            @PathVariable("jobId") Long jobId)
            throws IdInvalidException {

        List<Job> savedJobs = this.userService.saveJob(userId, jobId);
        RestResponse res = new RestResponse();
        res.setData(savedJobs);
        res.setStatusCode(HttpStatus.OK.value());

        return ResponseEntity.ok(res);
    }

    @PostMapping("/users/main-resume")
    public ResponseEntity<RestResponse> updateMainResume(
            @RequestParam(name = "file", required = false) MultipartFile file,
            @RequestParam(name = "folder", required = false) String folder,
            @RequestHeader(name = "Authorization") String accessToken)
            throws IdInvalidException, StorageException, URISyntaxException, IOException {

        // validate file
        this.fileService.validateFile(file);

        // get user by token
        RestResponse res = new RestResponse();
        Long idToken = SecurityUtil.extractClaim(accessToken.substring(7));
        if (idToken != null) {
            User updateUser = this.userService.findUserById(idToken);
            if (updateUser == null) {
                throw new IdInvalidException(localizationUtils.getLocalizedMessage(MessageKeys.USER_NOT_FOUND));
            }

            // create directory if not exist
            this.fileService.createDirectory(baseUri + folder);
            // storage file
            String uploadFile = this.fileService.store(file, folder);
            updateUser.setMainResume(uploadFile);
            this.userService.saveUser(updateUser);

            res.setMessage(localizationUtils.getLocalizedMessage(MessageKeys.CALL_API_SUCCESSFULLY));
            res.setStatusCode(HttpStatus.OK.value());
            res.setData(updateUser);
            return ResponseEntity.ok(res);
        }
        res.setMessage(localizationUtils.getLocalizedMessage(MessageKeys.USER_NOT_FOUND));
        res.setStatusCode(HttpStatus.BAD_REQUEST.value());
        return ResponseEntity.ok(res);
    }

}

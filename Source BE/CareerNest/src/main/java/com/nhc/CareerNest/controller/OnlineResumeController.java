package com.nhc.CareerNest.controller;

import org.springframework.web.bind.annotation.RestController;

import com.nhc.CareerNest.config.language.LocalizationUtils;
import com.nhc.CareerNest.constant.MessageKeys;
import com.nhc.CareerNest.domain.dto.response.base.RestResponse;
import com.nhc.CareerNest.domain.entity.OnlineResume;
import com.nhc.CareerNest.domain.entity.User;
import com.nhc.CareerNest.exception.errors.IdInvalidException;
import com.nhc.CareerNest.service.impl.OnlineResumeService;
import com.nhc.CareerNest.service.impl.UserService;
import com.nhc.CareerNest.util.security.SecurityUtil;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1")
public class OnlineResumeController {

    private final UserService userService;
    private final OnlineResumeService onlineResumeService;
    private final LocalizationUtils localizationUtils;

    public OnlineResumeController(
            LocalizationUtils localizationUtils,
            UserService userService,
            OnlineResumeService onlineResumeService) {
        this.userService = userService;
        this.onlineResumeService = onlineResumeService;
        this.localizationUtils = localizationUtils;
    }

    @GetMapping("/online-resumes-user")
    public ResponseEntity<RestResponse> getMethodName(
            @RequestHeader(name = "Authorization") String accessToken) throws IdInvalidException {

        RestResponse res = new RestResponse();
        Long idToken = SecurityUtil.extractClaim(accessToken.substring(7));
        if (idToken != null) {
            User currentUser = this.userService.findUserById(idToken);
            if (currentUser == null) {
                throw new IdInvalidException(localizationUtils.getLocalizedMessage(MessageKeys.USER_NOT_FOUND));
            }
            List<OnlineResume> list = new ArrayList<>();

            list = currentUser.getOnlineResumes();
            res.setStatusCode(HttpStatus.OK.value());
            res.setData(list);
            res.setMessage(localizationUtils.getLocalizedMessage(MessageKeys.CALL_API_SUCCESSFULLY));
            return ResponseEntity.ok(res);
        }
        res.setStatusCode(HttpStatus.BAD_REQUEST.value());
        res.setMessage(localizationUtils.getLocalizedMessage(MessageKeys.ERROR_EXCEPTION));
        return ResponseEntity.ok(res);
    }

    @PostMapping("/online-resumes")
    public ResponseEntity<RestResponse> createOnlineResume(@RequestBody OnlineResume onlineResume) {

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(this.onlineResumeService.handleSaveOnlineResume(onlineResume));

        return ResponseEntity.ok(res);
    }

    @PutMapping("/online-resumes")
    public ResponseEntity<RestResponse> updateOnlineResume(@RequestBody OnlineResume onlineResume) {
        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(this.onlineResumeService.handleUpdateOnlineResume(onlineResume));

        return ResponseEntity.ok(res);
    }

    @GetMapping("/online-resumes/{id}")
    public ResponseEntity<RestResponse> fetchById(@PathVariable("id") Long id) {
        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(this.onlineResumeService.fetchById(id));

        return ResponseEntity.ok(res);
    }

    @GetMapping("/online-resumes")
    public ResponseEntity<RestResponse> fetchByUser(@RequestBody User user) {
        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(this.onlineResumeService.fetchByUserId(user));

        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/online-resumes/{id}")
    public ResponseEntity<RestResponse> deleteOnlineResume(@PathVariable("id") Long id) {

        this.onlineResumeService.deleteOnlineResume(id);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());

        return ResponseEntity.ok(res);
    }

}

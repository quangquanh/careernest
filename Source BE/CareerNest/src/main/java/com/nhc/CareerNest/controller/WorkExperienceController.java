package com.nhc.CareerNest.controller;

import org.springframework.web.bind.annotation.RestController;

import com.nhc.CareerNest.domain.dto.response.base.RestResponse;
import com.nhc.CareerNest.domain.entity.WorkExperience;
import com.nhc.CareerNest.service.impl.WorkExperienceService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1")
public class WorkExperienceController {

    private final WorkExperienceService workExperienceService;

    public WorkExperienceController(
            WorkExperienceService workExperienceService) {
        this.workExperienceService = workExperienceService;
    }

    @GetMapping("/workExperiences")
    public ResponseEntity<RestResponse> fetchAll() {

        List<WorkExperience> workExperiences = this.workExperienceService.fetchAllExperience();

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(workExperiences);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/workExperiences/{id}")
    public ResponseEntity<RestResponse> FetchById(@PathVariable("id") Long id) {
        WorkExperience workExperience = this.workExperienceService.fetchById(id);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(workExperience);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/workExperiences")
    public ResponseEntity<RestResponse> createWorkExperience(@RequestBody WorkExperience we) {
        WorkExperience workExperience = this.workExperienceService.createWorkExperience(we);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(workExperience);
        return ResponseEntity.ok(res);
    }

    @PutMapping("/workExperiences")
    public ResponseEntity<RestResponse> updateWorkExperience(@RequestBody WorkExperience we) {
        WorkExperience workExperience = this.workExperienceService.updateWorkExperience(we);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(workExperience);
        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/workExperiences/{id}")
    public ResponseEntity<RestResponse> deleteWorkExperience(@PathVariable("id") Long id) {
        this.workExperienceService.deleteWorkExperience(id);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        return ResponseEntity.ok(res);
    }

}

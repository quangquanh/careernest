package com.nhc.CareerNest.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nhc.CareerNest.domain.dto.request.JobCriteriaDTO;
import com.nhc.CareerNest.domain.dto.response.base.RestResponse;
import com.nhc.CareerNest.domain.dto.response.base.ResultPaginationResponse;
import com.nhc.CareerNest.domain.entity.Job;
import com.nhc.CareerNest.service.impl.JobService;
import com.nhc.CareerNest.util.anotation.ApiMessage;
//import com.nhc.CareerNest.util.converter.JobMessageConverter;

import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1")
public class JobController {

    private final JobService jobService;
    // private final KafkaTemplate<String, Object> kafkaTemplate;

    public JobController(
            // KafkaTemplate<String, Object> kafkaTemplate,
            JobService jobService) {
        this.jobService = jobService;
        // this.kafkaTemplate = kafkaTemplate;
    }

    @GetMapping("/jobs")
    @ApiMessage("fetch all jobs")
    public ResponseEntity<ResultPaginationResponse> fetchAllJobs(
            JobCriteriaDTO jobCriteriaDTO,
            @RequestParam(defaultValue = "1", name = "page") int page,
            @RequestParam(defaultValue = "6", name = "pageSize") int pageSize) {
        Pageable pageable = PageRequest.of(page - 1, pageSize);

        ResultPaginationResponse result = this.jobService.findAllWithSpec(pageable, jobCriteriaDTO);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/jobs/{id}")
    public ResponseEntity<RestResponse> fetchJob(@PathVariable("id") Long id) {

        Job job = this.jobService.fetchJobById(id);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(job);

        return ResponseEntity.ok(res);
    }

    @PostMapping("/jobs")
    public ResponseEntity<RestResponse> createAJob(@Valid @RequestBody Job job) {

        Job newJob = this.jobService.handleSaveJob(job);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(newJob);

        // this.kafkaTemplate.setMessageConverter(new JobMessageConverter());
        // this.kafkaTemplate.send("create-a-job", newJob).whenComplete((result, ex) ->
        // {
        // if (ex == null) {
        // System.out.println("+++ Message sent successfully to topic: " +
        // result.getRecordMetadata().topic());
        // } else {
        // System.err.println("+++ Message sending failed: " + ex.getMessage());
        // }
        // });

        System.out.println("nguyen huu cuong");

        return ResponseEntity.ok(res);
    }

    @PutMapping("/jobs")
    public ResponseEntity<RestResponse> updateAJob(@RequestBody Job job) {
        Job updateJob = this.jobService.handleUpdateJob(job);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(updateJob);

        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<RestResponse> deleteAJob(@PathVariable("id") Long id) {
        this.jobService.DeleteJob(id);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());

        return ResponseEntity.ok(res);
    }

    @GetMapping("/jobs/company/{companyId}")
    public ResponseEntity<RestResponse> getJobByCompany(
            @PathVariable("companyId") Long companyId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "6") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {

        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page - 1, size, sort);

        Page<Job> jobs = this.jobService.fetchJobByCompany(companyId, pageable);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(jobs);

        return ResponseEntity.ok(res);
    }
}

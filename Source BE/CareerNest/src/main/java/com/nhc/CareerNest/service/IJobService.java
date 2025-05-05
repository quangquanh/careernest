package com.nhc.CareerNest.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.nhc.CareerNest.domain.entity.Job;

public interface IJobService {

    Job handleSaveJob(Job job);

    Job handleUpdateJob(Job job);

    List<Job> fetchAllJob();

    Page<Job> fetchJobByCompany(Long id, Pageable pageable);

    Job fetchJobById(Long id);

    void DeleteJob(Long id);
}

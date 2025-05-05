package com.nhc.CareerNest.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nhc.CareerNest.domain.dto.response.resume.ResCreateResumeDTO;
import com.nhc.CareerNest.domain.dto.response.resume.ResFetchResumeDTO;
import com.nhc.CareerNest.domain.dto.response.resume.ResUpdateResumeDTO;
import com.nhc.CareerNest.domain.entity.Job;
import com.nhc.CareerNest.domain.entity.Resume;
import com.nhc.CareerNest.domain.entity.User;
import com.nhc.CareerNest.repository.JobRepository;
import com.nhc.CareerNest.repository.ResumeRepository;
import com.nhc.CareerNest.repository.UserRepository;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;

    public ResumeService(
            ResumeRepository resumeRepository,
            UserRepository userRepository,
            JobRepository jobRepository) {
        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;

    }

    public boolean checkResumeExistByUserAndJob(Resume resume) {
        // check user by id
        if (resume.getUser() == null)
            return false;
        Optional<User> userOptional = this.userRepository.findById(resume.getUser().getId());
        if (userOptional.isEmpty())
            return false;

        // check job by id
        if (resume.getJob() == null)
            return false;
        Optional<Job> jobOptional = this.jobRepository.findById(resume.getJob().getId());
        if (jobOptional.isEmpty())
            return false;

        return true;
    }

    public Optional<Resume> fetchResume(Long id) {
        return this.resumeRepository.findById(id);
    }

    public ResCreateResumeDTO createResume(Resume resume) {
        Resume newResume = this.resumeRepository.save(resume);

        ResCreateResumeDTO dto = new ResCreateResumeDTO();
        dto.setId(newResume.getId());
        dto.setCreatedAt(newResume.getCreatedAt());
        dto.setCreatedBy(newResume.getCreatedBy());

        return dto;
    }

    public ResUpdateResumeDTO update(Resume resume) {
        resume = this.resumeRepository.save(resume);
        ResUpdateResumeDTO res = new ResUpdateResumeDTO();
        res.setUpdatedAt(resume.getUpdatedAt());
        res.setUpdatedBy(resume.getUpdatedBy());
        return res;
    }

    public void deleteResume(Long id) {
        this.resumeRepository.deleteById(id);
    }

    public ResFetchResumeDTO getResume(Resume resume) {
        ResFetchResumeDTO dto = new ResFetchResumeDTO();
        dto.setId(resume.getId());
        dto.setEmail(resume.getEmail());
        dto.setUrl(resume.getUrl());
        dto.setStatus(resume.getStatus());
        dto.setCreatedAt(resume.getCreatedAt());
        dto.setCreatedBy(resume.getCreatedBy());
        dto.setUpdatedAt(resume.getUpdatedAt());
        dto.setCreatedBy(resume.getCreatedBy());

        if (resume.getJob() != null) {
            dto.setCompany(resume.getJob().getCompany().getName());
        }

        dto.setUser(new ResFetchResumeDTO.UserResume(resume.getUser().getId(),
                resume.getUser().getFirstName() + " " + resume.getUser().getLastName()));
        dto.setJob(new ResFetchResumeDTO.JobResume(resume.getJob().getId(), resume.getJob().getName()));
        return dto;
    }

    public List<Resume> findByUser(Long id) {
        return this.resumeRepository.findByUserId(id);
    }

    public List<Resume> findByJob(Long id) {
        return this.resumeRepository.findByJobIdOrderByRatingDesc(id);
    }

}

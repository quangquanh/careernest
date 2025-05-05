package com.nhc.CareerNest.service.impl;

import java.util.List;

import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.nhc.CareerNest.domain.dto.request.JobCriteriaDTO;
import com.nhc.CareerNest.domain.dto.response.base.ResultPaginationResponse;
import com.nhc.CareerNest.domain.entity.Company;
import com.nhc.CareerNest.domain.entity.Job;
import com.nhc.CareerNest.domain.entity.Skill;
import com.nhc.CareerNest.repository.CompanyRepository;
import com.nhc.CareerNest.repository.JobRepository;
import com.nhc.CareerNest.repository.SkillRepository;
import com.nhc.CareerNest.service.IJobService;
import com.nhc.CareerNest.util.specification.JobSpecification;

@Service
public class JobService implements IJobService {

    private final JobRepository jobRepository;
    private final CompanyRepository companyRepository;
    private final SkillRepository skillRepository;

    public JobService(
            SkillRepository skillRepository,
            JobRepository jobRepository,
            CompanyRepository companyRepository) {
        this.skillRepository = skillRepository;
        this.jobRepository = jobRepository;
        this.companyRepository = companyRepository;
    }

    public ResultPaginationResponse findAllWithSpec(Pageable pageable, JobCriteriaDTO jobCriteriaDTO) {

        ResultPaginationResponse rs = new ResultPaginationResponse();
        ResultPaginationResponse.Meta mt = new ResultPaginationResponse.Meta();

        Specification<Job> combinedSpec = Specification.where(null);

        // filter name
        if (jobCriteriaDTO.getName() != null && jobCriteriaDTO.getName().isPresent()) {
            Specification<Job> currentSpec = JobSpecification.nameLike(jobCriteriaDTO.getName().get());
            combinedSpec = combinedSpec.and(currentSpec);
        }

        // filter level
        if (jobCriteriaDTO.getLevel() != null && jobCriteriaDTO.getLevel().isPresent()) {
            Specification<Job> currentSpec = JobSpecification.levelListMatch(jobCriteriaDTO.getLevel().get());
            combinedSpec = combinedSpec.and(currentSpec);
        }

        // filter location
        if (jobCriteriaDTO.getLocation() != null && jobCriteriaDTO.getLocation().isPresent()) {
            Specification<Job> currentSpec = JobSpecification.locationListMatch(jobCriteriaDTO.getLocation().get());
            combinedSpec = combinedSpec.and(currentSpec);
        }

        // filter salary
        if(jobCriteriaDTO.getSalary() != null && jobCriteriaDTO.getSalary().isPresent()){
            Specification<Job> currentSpec = this.findAllWithSalarySpec(jobCriteriaDTO.getSalary().get());
            combinedSpec = combinedSpec.and(currentSpec);
        }

        // filter active job
        Specification<Job> activeSpec = JobSpecification.activeSpec();
        combinedSpec = combinedSpec.and(activeSpec);

        Page<Job> pageUser = this.jobRepository.findAll(combinedSpec, pageable);

        mt.setPage(pageable.getPageNumber() + 1);
        mt.setPageSize(pageable.getPageSize());
        mt.setPages(pageUser.getTotalPages());
        mt.setTotal(pageUser.getTotalElements());

        rs.setMeta(mt);
        rs.setResult(pageUser.getContent());

        return rs;
    }

    public Specification<Job> findAllWithSalarySpec(List<String> salary) {
        Specification<Job> combinedSpec = Specification.where(null);
        for (String s : salary) {
            double min = 0;
            double max = 0;

            // Set the appropriate min and max based on the price range string
            switch (s) {
                case "under-1000-$":
                    min = 1;
                    max = 1000;
                    break;
                case "1000-1500-$":
                    min = 1000;
                    max = 1500;
                    break;
                case "1500-2000-$":
                    min = 1500;
                    max = 2000;
                    break;
                case "2000-2500-$":
                    min = 2000;
                    max = 2500;
                    break;
                case "2500-3000-$":
                    min = 2500;
                    max = 3000;
                    break;
                case "over-3000-$":
                    min = 3000;
                    max = 30000;
                    break;
            }

            if (min != 0 && max != 0) {
                Specification<Job> rangeSpec = JobSpecification.matchMultipleSalary(min, max);
                combinedSpec = combinedSpec.or(rangeSpec);
            }
        }

        return combinedSpec;
    }

    @Override
    public Job handleSaveJob(Job job) {

        // check company
        if (job.getCompany() != null) {
            Optional<Company> comOptional = this.companyRepository.findById(job.getCompany().getId());
            if (comOptional.isPresent()) {
                job.setCompany(comOptional.get());
            }
        }

        // check skill
        if (job.getSkills() != null) {
            List<Long> SkillId = job.getSkills()
                    .stream()
                    .map(skill -> skill.getId())
                    .collect(Collectors.toList());

            List<Skill> skills = this.skillRepository.findByIdIn(SkillId);
            job.setSkills(skills);
        }

        return this.jobRepository.save(job);
    }

    @Override
    public Job handleUpdateJob(Job job) {

        Job updateJob = this.jobRepository.findById(job.getId()).get();

        // check company
        if (job.getCompany() != null) {
            Optional<Company> comOptional = this.companyRepository.findById(job.getCompany().getId());
            if (comOptional.isPresent()) {
                job.setCompany(comOptional.get());
            }
        }

        // check skill
        if (job.getSkills() != null) {
            List<Long> SkillId = job.getSkills()
                    .stream()
                    .map(skill -> skill.getId())
                    .collect(Collectors.toList());

            List<Skill> skills = this.skillRepository.findByIdIn(SkillId);
            job.setSkills(skills);
        }

        if (updateJob != null) {
            updateJob.setName(job.getName());
            updateJob.setLocation(job.getLocation());
            updateJob.setSalary(job.getSalary());
            updateJob.setQuantity(job.getQuantity());
            updateJob.setLevel(job.getLevel());
            updateJob.setDescription(job.getDescription());
            updateJob.setStartDate(job.getStartDate());
            updateJob.setEndDate(job.getEndDate());
            updateJob.setRequirements(job.getRequirements());
            updateJob.setBenefits(job.getBenefits());
            updateJob.setActive(job.isActive());
            updateJob.setCompany((job.getCompany()));

            this.jobRepository.save(updateJob);
        }
        return updateJob;
    }

    @Override
    public List<Job> fetchAllJob() {
        return this.jobRepository.findAll();
    }

    @Override
    public Page<Job> fetchJobByCompany(Long companyId, Pageable pageable) {
        return this.jobRepository.findByCompany(companyId, pageable);
    }

    @Override
    public Job fetchJobById(Long id) {
        return this.jobRepository.findById(id).get();
    }

    @Override
    public void DeleteJob(Long id) {
        Job deleteJob = this.jobRepository.findById(id).get();
        if (deleteJob != null) {
            deleteJob.setActive(false);
            this.jobRepository.save(deleteJob);
        }
    }

}

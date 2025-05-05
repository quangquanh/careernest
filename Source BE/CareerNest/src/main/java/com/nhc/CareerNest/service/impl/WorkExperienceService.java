package com.nhc.CareerNest.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nhc.CareerNest.domain.entity.OnlineResume;
import com.nhc.CareerNest.domain.entity.WorkExperience;
import com.nhc.CareerNest.repository.OnlineResumeRepository;
import com.nhc.CareerNest.repository.WorkExperienceRepository;
import com.nhc.CareerNest.service.IWorkExperienceService;

@Service
public class WorkExperienceService implements IWorkExperienceService {

    private final WorkExperienceRepository workExperienceRepository;
    private final OnlineResumeRepository onlineResumeRepository;

    public WorkExperienceService(
            OnlineResumeRepository onlineResumeRepository,
            final WorkExperienceRepository workExperienceRepository) {
        this.workExperienceRepository = workExperienceRepository;
        this.onlineResumeRepository = onlineResumeRepository;
    }

    @Override
    public WorkExperience createWorkExperience(WorkExperience workExperience) {
        return this.workExperienceRepository.save(workExperience);
    }

    @Override
    public WorkExperience updateWorkExperience(WorkExperience we) {
        WorkExperience updateWE = this.workExperienceRepository.findById(we.getId()).get();

        // check resume
        if (we.getOnlineResume() != null) {
            Optional<OnlineResume> onlineResumeOp = this.onlineResumeRepository
                    .findById(we.getOnlineResume().getId());
            updateWE.setOnlineResume(onlineResumeOp.get());
        }

        if (updateWE != null) {
            updateWE.setCompanyName(we.getCompanyName());
            updateWE.setStartDate(we.getStartDate());
            updateWE.setEndDate(we.getEndDate());
            updateWE.setDescription(we.getDescription());
            updateWE.setLocation(we.getLocation());

            this.workExperienceRepository.save(updateWE);
        }
        return updateWE;
    }

    @Override
    public List<WorkExperience> fetchAllExperience() {
        return this.workExperienceRepository.findAll();
    }

    @Override
    public void deleteWorkExperience(Long id) {
        this.workExperienceRepository.deleteById(id);
    }

    @Override
    public WorkExperience fetchById(Long id) {
        return this.workExperienceRepository.findById(id).get();
    }

}

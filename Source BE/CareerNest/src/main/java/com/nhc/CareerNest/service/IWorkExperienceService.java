package com.nhc.CareerNest.service;

import java.util.List;

import com.nhc.CareerNest.domain.entity.WorkExperience;

public interface IWorkExperienceService {

    WorkExperience createWorkExperience(WorkExperience workExperience);

    WorkExperience updateWorkExperience(WorkExperience workExperience);

    List<WorkExperience> fetchAllExperience();

    void deleteWorkExperience(Long id);

    WorkExperience fetchById(Long id);
}

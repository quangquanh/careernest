package com.nhc.CareerNest.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.nhc.CareerNest.domain.entity.OnlineResume;
import com.nhc.CareerNest.domain.entity.Skill;
import com.nhc.CareerNest.domain.entity.User;
import com.nhc.CareerNest.domain.entity.WorkExperience;
import com.nhc.CareerNest.repository.OnlineResumeRepository;
import com.nhc.CareerNest.repository.SkillRepository;
import com.nhc.CareerNest.repository.UserRepository;
import com.nhc.CareerNest.repository.WorkExperienceRepository;
import com.nhc.CareerNest.service.IOnlineResumeService;

@Service
public class OnlineResumeService implements IOnlineResumeService {

    private final OnlineResumeRepository onlineResumeRepository;
    private final WorkExperienceRepository workExperienceRepository;
    private final SkillRepository skillRepository;
    private final UserRepository userRepository;

    public OnlineResumeService(
            UserRepository userRepository,
            SkillRepository skillRepository,
            WorkExperienceRepository workExperienceRepository,
            OnlineResumeRepository onlineResumeRepository) {
        this.skillRepository = skillRepository;
        this.userRepository = userRepository;
        this.onlineResumeRepository = onlineResumeRepository;
        this.workExperienceRepository = workExperienceRepository;
    }

    @Override
    public OnlineResume handleSaveOnlineResume(OnlineResume onlineResume) {
        // save work experience
        if (onlineResume.getWorkExperiences() != null) {
            List<WorkExperience> workExperiences = onlineResume.getWorkExperiences()
                    .stream()
                    .map(w -> this.workExperienceRepository.save(w))
                    .collect(Collectors.toList());

            onlineResume.setWorkExperiences(workExperiences);
        }

        // check skill

        if (onlineResume.getSkills() != null) {
            List<Long> ids = onlineResume.getSkills()
                    .stream()
                    .map(i -> i.getId())
                    .collect(Collectors.toList());
            List<Skill> skills = this.skillRepository.findByIdIn(ids);

            onlineResume.setSkills(skills);
        }

        // check user
        if (onlineResume.getUser() != null) {
            User user = this.userRepository.findById(onlineResume.getUser().getId()).get();

            onlineResume.setUser(user);
        }

        return this.onlineResumeRepository.save(onlineResume);
    }

    @Override
    public OnlineResume handleUpdateOnlineResume(OnlineResume onlineResume) {

        OnlineResume updateOR = this.onlineResumeRepository.findById(onlineResume.getId()).get();
        // save work experience
        if (onlineResume.getWorkExperiences() != null) {
            List<WorkExperience> workExperiences = onlineResume.getWorkExperiences()
                    .stream()
                    .map(w -> this.workExperienceRepository.save(w))
                    .collect(Collectors.toList());

            updateOR.setWorkExperiences(workExperiences);
        }

        // check skill

        if (onlineResume.getSkills() != null) {
            List<Long> ids = onlineResume.getSkills()
                    .stream()
                    .map(i -> i.getId())
                    .collect(Collectors.toList());
            List<Skill> skills = this.skillRepository.findByIdIn(ids);

            updateOR.setSkills(skills);
        }

        updateOR.setTitle(onlineResume.getTitle());
        updateOR.setFullName(onlineResume.getFullName());
        updateOR.setEmail(onlineResume.getEmail());
        updateOR.setPhone(onlineResume.getPhone());
        updateOR.setDateOfBirth(onlineResume.getDateOfBirth());
        updateOR.setAddress(onlineResume.getAddress());
        updateOR.setSummary(onlineResume.getSummary());
        updateOR.setCertifications(onlineResume.getCertifications());
        updateOR.setEducations(onlineResume.getEducations());
        updateOR.setLanguages(onlineResume.getLanguages());

        return this.onlineResumeRepository.save(updateOR);
    }

    @Override
    public OnlineResume fetchById(Long id) {
        return this.onlineResumeRepository.findById(id).get();
    }

    @Override
    public List<OnlineResume> fetchByUserId(User user) {
        return this.onlineResumeRepository.findByUser(user);
    }

    @Override
    public void deleteOnlineResume(Long id) {
        this.onlineResumeRepository.deleteById(id);
        ;
    }

}

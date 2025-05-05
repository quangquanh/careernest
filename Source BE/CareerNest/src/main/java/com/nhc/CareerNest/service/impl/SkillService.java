package com.nhc.CareerNest.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nhc.CareerNest.domain.entity.Skill;
import com.nhc.CareerNest.repository.SkillRepository;
import com.nhc.CareerNest.service.ISkillService;

@Service
public class SkillService implements ISkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @Override
    public boolean checkExistsName(String name) {
        return this.skillRepository.existsByName(name);
    }

    @Override
    public Skill addSkill(Skill skill) {
        return this.skillRepository.save(skill);
    }

    public Skill updateSkill(Skill skill) {
        Skill updateSkill = this.findById(skill.getId());
        if (updateSkill != null) {
            updateSkill.setName(skill.getName());
        }
        return this.skillRepository.save(updateSkill);
    }

    @Override
    public Skill findById(long id) {
        return this.skillRepository.findById(id).get();
    }

    @Override
    public List<Skill> fetchAllSkill() {
        return this.skillRepository.findAll();
    }

}

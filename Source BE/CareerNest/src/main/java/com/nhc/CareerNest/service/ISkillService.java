package com.nhc.CareerNest.service;

import java.util.List;

import com.nhc.CareerNest.domain.entity.Skill;

public interface ISkillService {

    boolean checkExistsName(String name);

    Skill addSkill(Skill skill);

    Skill updateSkill(Skill skill);

    Skill findById(long id);

    List<Skill> fetchAllSkill();
}

package com.nhc.CareerNest.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nhc.CareerNest.domain.entity.Job;
import com.nhc.CareerNest.domain.entity.Skill;

@Repository
public interface JobRepository extends JpaRepository<Job, Long>, JpaSpecificationExecutor<Job> {

    @Query("SELECT j FROM Job j WHERE j.company.id = :companyId")
    Page<Job> findByCompany(@Param("companyId") Long companyId, Pageable pageable);

    @Query("SELECT j FROM Job j WHERE FUNCTION('MONTH', j.createdAt) = :month AND FUNCTION('YEAR', j.createdAt) = :year")
    List<Job> findByMonthAndYear(@Param("month") int month, @Param("year") int year);

    @Query("SELECT COUNT(j) FROM Job j WHERE FUNCTION('MONTH', j.createdAt) = :month AND FUNCTION('YEAR', j.createdAt) = :year")
    long countByMonthAndYear(@Param("month") int month, @Param("year") int year);

    List<Job> findBySkillsIn(List<Skill> skills);

    Page<Job> findAll(Specification<Job> spec, Pageable page);

    Page<Job> findAll(Pageable page);

    long count();

}

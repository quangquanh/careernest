package com.nhc.CareerNest.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.nhc.CareerNest.domain.entity.Company;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long>, JpaSpecificationExecutor<Company> {
    Company findByName(String name);

    @Query("SELECT c FROM Company c WHERE c.isActive = true")
    List<Company> findActiveCompany();

    Page<Company> findAll(Specification<Company> spec, Pageable pageable);

    long count();
}

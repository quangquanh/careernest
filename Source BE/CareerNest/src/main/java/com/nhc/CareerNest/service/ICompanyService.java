package com.nhc.CareerNest.service;

import java.util.Optional;

import org.springframework.data.domain.Pageable;

import com.nhc.CareerNest.domain.dto.request.CompanyCriteriaDTO;
import com.nhc.CareerNest.domain.dto.response.base.ResultPaginationResponse;
import com.nhc.CareerNest.domain.entity.Company;

public interface ICompanyService {

    Company handleSaveCompany(Company company);

    Company handleUpdateCompany(Company company);

    ResultPaginationResponse fetchAllCompany(
            Pageable pageable, CompanyCriteriaDTO companyCriteriaDTO);

    Optional<Company> getCompanyById(Long id);

    Company findByName(String name);

    void handleDeleteCompany(Long id);
}

package com.nhc.CareerNest.service.impl;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.nhc.CareerNest.domain.dto.request.CompanyCriteriaDTO;
import com.nhc.CareerNest.domain.dto.response.base.ResultPaginationResponse;
import com.nhc.CareerNest.domain.entity.Company;
import com.nhc.CareerNest.repository.CompanyRepository;
import com.nhc.CareerNest.service.ICompanyService;
import com.nhc.CareerNest.util.specification.CompanySpecification;

@Service
public class CompanyService implements ICompanyService {

    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @Override
    public Company handleSaveCompany(Company company) {
        return this.companyRepository.save(company);
    }

    @Override
    public Company handleUpdateCompany(Company company) {
        Company updateCompany = this.getCompanyById(company.getId()).get();
        if (updateCompany != null) {
            updateCompany.setName(company.getName());
            updateCompany.setIndustry(company.getIndustry());
            updateCompany.setDescription(company.getDescription());
            updateCompany.setWebsite(company.getWebsite());
            updateCompany.setEmail(company.getEmail());
            updateCompany.setPhone(company.getPhone());
            updateCompany.setAddress(company.getAddress());
            updateCompany.setCountry(company.getCountry());
            updateCompany.setExpertise(company.getExpertise());
            updateCompany.setCity(company.getCity());
            updateCompany.setLogoUrl(company.getLogoUrl());
            updateCompany.setSize(company.getSize());
            updateCompany.setFoundedYear(company.getFoundedYear());
            updateCompany.setSocialLinks(company.getSocialLinks());

            this.companyRepository.save(updateCompany);
        }
        return updateCompany;
    }

    @Override
    public ResultPaginationResponse fetchAllCompany(
            Pageable pageable,
            CompanyCriteriaDTO companyCriteriaDTO) {

        ResultPaginationResponse rs = new ResultPaginationResponse();
        ResultPaginationResponse.Meta mt = new ResultPaginationResponse.Meta();

        Specification<Company> combinedSpec = CompanySpecification.isActiveMatch(true);

        // filter city
        if (companyCriteriaDTO.getCity() != null && companyCriteriaDTO.getCity().isPresent()) {
            Specification<Company> currentSpec = CompanySpecification.cityListMatch(companyCriteriaDTO.getCity().get());
            combinedSpec = combinedSpec.and(currentSpec);
        }

        // filter industry
        if (companyCriteriaDTO.getIndustry() != null && companyCriteriaDTO.getIndustry().isPresent()) {
            Specification<Company> currentSpec = CompanySpecification
                    .industryListMatch(companyCriteriaDTO.getIndustry().get());
            combinedSpec = combinedSpec.and(currentSpec);
        }

        // filter location
        if (companyCriteriaDTO.getCountry() != null && companyCriteriaDTO.getCountry().isPresent()) {
            Specification<Company> currentSpec = CompanySpecification
                    .countryListMatch(companyCriteriaDTO.getCountry().get());
            combinedSpec = combinedSpec.and(currentSpec);
        }

        Page<Company> companies = this.companyRepository.findAll(combinedSpec, pageable);

        mt.setPage(pageable.getPageNumber() + 1);
        mt.setPageSize(pageable.getPageSize());
        mt.setPages(companies.getTotalPages());
        mt.setTotal(companies.getTotalElements());

        rs.setMeta(mt);
        rs.setResult(companies.getContent());

        return rs;
    }

    @Override
    public Optional<Company> getCompanyById(Long id) {
        return this.companyRepository.findById(id);
    }

    @Override
    public void handleDeleteCompany(Long id) {
        Company deleteCompany = this.companyRepository.findById(id).get();
        if (deleteCompany != null) {
            deleteCompany.setIsActive(false);
            this.companyRepository.save(deleteCompany);
        }
    }

    @Override
    public Company findByName(String name) {
        return this.companyRepository.findByName(name);
    }

}

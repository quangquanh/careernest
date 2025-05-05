package com.nhc.CareerNest.controller;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.nhc.CareerNest.config.language.LocalizationUtils;
import com.nhc.CareerNest.constant.MessageKeys;
import com.nhc.CareerNest.domain.dto.request.CompanyCriteriaDTO;
import com.nhc.CareerNest.domain.dto.response.base.RestResponse;
import com.nhc.CareerNest.domain.dto.response.base.ResultPaginationResponse;
import com.nhc.CareerNest.domain.dto.response.company.ResCompany;
import com.nhc.CareerNest.domain.entity.Company;
import com.nhc.CareerNest.domain.entity.User;
import com.nhc.CareerNest.exception.errors.IdInvalidException;
import com.nhc.CareerNest.service.impl.CompanyRedisService;
import com.nhc.CareerNest.service.impl.CompanyService;
import com.nhc.CareerNest.service.impl.UserService;
import com.nhc.CareerNest.util.anotation.ApiMessage;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/v1")
public class CompanyController {

    private final CompanyService companyService;
    private final LocalizationUtils localizationUtils;
    private final CompanyRedisService companyRedisService;
    private final UserService userService;

    public CompanyController(
            UserService userService,
            CompanyRedisService companyRedisService,
            LocalizationUtils localizationUtils,
            CompanyService companyService) {
        this.userService = userService;
        this.companyRedisService = companyRedisService;
        this.companyService = companyService;
        this.localizationUtils = localizationUtils;
    }

    @PostMapping("/companies")
    @ApiMessage("create a new company")
    public ResponseEntity<RestResponse> handleCreateACompany(@Valid @RequestBody Company company)
            throws IdInvalidException {
        Company newCompany = this.companyService.findByName(company.getName());
        if (newCompany != null) {
            throw new IdInvalidException(localizationUtils.getLocalizedMessage(MessageKeys.COMPANY_ALREADY_EXIST));
        }
        newCompany = this.companyService.handleSaveCompany(company);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.CREATED.value());
        res.setData(newCompany);

        return ResponseEntity.ok(res);
    }

    @GetMapping("/companies/{id}")
    @ApiMessage("fetch a company")
    public ResponseEntity<RestResponse> fetchACompany(@PathVariable("id") Long id) {
        Company company = this.companyService.getCompanyById(id).get();

        // fetch Hr in this company

        User hr = this.userService.findByCompanyId(company.getId());

        ResCompany data = new ResCompany();
        data.setCompany(company);
        data.setHr(hr);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(data);

        return ResponseEntity.ok(res);
    }

    @PutMapping("companies")
    @ApiMessage("Update a company")
    public ResponseEntity<RestResponse> handleUpdateCompany(@RequestBody Company company) {
        Company updateCompany = this.companyService.handleUpdateCompany(company);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(updateCompany);
        return ResponseEntity.ok(res);
    }

    @DeleteMapping("companies/{id}")
    @ApiMessage("Delete a company")
    public ResponseEntity<RestResponse> handleDeleteCompany(@PathVariable("id") Long id) {
        this.companyService.handleDeleteCompany(id);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        return ResponseEntity.ok(res);
    }

    @GetMapping("/companies")
    public ResponseEntity<ResultPaginationResponse> fetchAllCompany(
            CompanyCriteriaDTO companyCriteriaDTO,
            @RequestParam(defaultValue = "1", name = "page") int page,
            @RequestParam(defaultValue = "6", name = "pageSize") int pageSize) throws JsonProcessingException {
        Pageable pageable = PageRequest.of(page - 1, pageSize);

        ResultPaginationResponse result = this.companyRedisService.fetchAllCompanies(pageable, companyCriteriaDTO);

        if (result == null) {
            result = this.companyService.fetchAllCompany(pageable, companyCriteriaDTO);
            this.companyRedisService.saveAllCompanies(result, companyCriteriaDTO, pageable);
        }

        return ResponseEntity.ok(result);
    }
}

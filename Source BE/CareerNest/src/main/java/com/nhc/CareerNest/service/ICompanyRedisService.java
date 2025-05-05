package com.nhc.CareerNest.service;

import org.springframework.data.domain.Pageable;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.nhc.CareerNest.domain.dto.request.CompanyCriteriaDTO;
import com.nhc.CareerNest.domain.dto.response.base.ResultPaginationResponse;

public interface ICompanyRedisService {

    void clear();

    ResultPaginationResponse fetchAllCompanies(
            Pageable pageable,
            CompanyCriteriaDTO companyCriteriaDTO) throws JsonProcessingException;

    void saveAllCompanies(
            ResultPaginationResponse result,
            CompanyCriteriaDTO companyCriteriaDTO,
            Pageable pageable) throws JsonProcessingException;

}

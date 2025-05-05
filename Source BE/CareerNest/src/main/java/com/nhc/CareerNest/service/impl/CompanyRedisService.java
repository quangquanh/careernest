package com.nhc.CareerNest.service.impl;

import java.util.Set;

import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nhc.CareerNest.domain.dto.request.CompanyCriteriaDTO;
import com.nhc.CareerNest.domain.dto.response.base.ResultPaginationResponse;
import com.nhc.CareerNest.service.ICompanyRedisService;

@Service
public class CompanyRedisService implements ICompanyRedisService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper redisObjectMapper;

    public CompanyRedisService(
            RedisTemplate<String, Object> redisTemplate,
            ObjectMapper redisObjectMapper) {
        this.redisObjectMapper = redisObjectMapper;
        this.redisTemplate = redisTemplate;
    }

    private String getKeyFrom(
            CompanyCriteriaDTO companyCriteriaDTO,
            Pageable pageable) {

        String industry = null;
        String country = null;
        String city = null;

        if (companyCriteriaDTO.getIndustry() != null) {
            industry = String.join("/", companyCriteriaDTO.getIndustry().get());
        }

        if (companyCriteriaDTO.getCountry() != null) {
            country = String.join("/", companyCriteriaDTO.getCountry().get());
        }

        if (companyCriteriaDTO.getCity() != null) {
            city = String.join("/", companyCriteriaDTO.getCity().get());
        }

        int page = pageable.getPageNumber();

        String key = String.format("all_companies:%s:%s:%s:%d", industry, country, city, page);
        return key;
        /*
         * {
         * "all_products:1:10:asc": "list of products object"
         * }
         */
    }

    @Override
    public void clear() {
        Set<String> keys = redisTemplate.keys("all_companies*");
        if (keys != null && !keys.isEmpty()) {
            redisTemplate.delete(keys);
        }
    }

    @Override
    public ResultPaginationResponse fetchAllCompanies(Pageable pageable, CompanyCriteriaDTO companyCriteriaDTO)
            throws JsonProcessingException {

        String key = this.getKeyFrom(companyCriteriaDTO, pageable);
        String json = (String) redisTemplate.opsForValue().get(key);

        ResultPaginationResponse result = json != null
                ? redisObjectMapper.readValue(json, new TypeReference<ResultPaginationResponse>() {
                })
                : null;

        return result;
    }

    @Override
    public void saveAllCompanies(ResultPaginationResponse result, CompanyCriteriaDTO companyCriteriaDTO,
            Pageable pageable)
            throws JsonProcessingException {
        String key = this.getKeyFrom(companyCriteriaDTO, pageable);
        String json = redisObjectMapper.writeValueAsString(result);
        redisTemplate.opsForValue().set(key, json);
    }

}

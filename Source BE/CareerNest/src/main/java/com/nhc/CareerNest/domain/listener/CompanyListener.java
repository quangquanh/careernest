package com.nhc.CareerNest.domain.listener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.nhc.CareerNest.domain.entity.Company;
import com.nhc.CareerNest.service.ICompanyRedisService;

import jakarta.persistence.PostPersist;
import jakarta.persistence.PostRemove;
import jakarta.persistence.PostUpdate;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreRemove;
import jakarta.persistence.PreUpdate;

public class CompanyListener {

    private final ICompanyRedisService companyRedisService;
    private static final Logger logger = LoggerFactory.getLogger(CompanyListener.class);

    public CompanyListener(ICompanyRedisService companyRedisService) {
        this.companyRedisService = companyRedisService;
    }

    @PrePersist
    public void prePersist(Company company) {
        logger.info("prePersist");
    }

    @PostPersist
    public void postPersist(Company company) {
        // Update Redis cache
        logger.info("postPersist");
        companyRedisService.clear();
    }

    @PreUpdate
    public void preUpdate(Company company) {
        // ApplicationEventPublisher.instance().publishEvent(event);
        logger.info("preUpdate");
    }

    @PostUpdate
    public void postUpdate(Company company) {
        // Update Redis cache
        logger.info("postUpdate");
        companyRedisService.clear();
    }

    @PreRemove
    public void preRemove(Company company) {
        // ApplicationEventPublisher.instance().publishEvent(event);
        logger.info("preRemove");
    }

    @PostRemove
    public void postRemove(Company company) {
        // Update Redis cache
        logger.info("postRemove");
        companyRedisService.clear();
    }
}

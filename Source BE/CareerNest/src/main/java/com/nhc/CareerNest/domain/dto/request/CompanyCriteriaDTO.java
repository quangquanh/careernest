package com.nhc.CareerNest.domain.dto.request;

import java.util.List;
import java.util.Optional;

public class CompanyCriteriaDTO {

    private Optional<List<String>> industry;
    private Optional<List<String>> country;
    private Optional<List<String>> city;

    public Optional<List<String>> getCountry() {
        return country;
    }

    public void setCountry(Optional<List<String>> country) {
        this.country = country;
    }

    public Optional<List<String>> getCity() {
        return city;
    }

    public void setCity(Optional<List<String>> city) {
        this.city = city;
    }

    public Optional<List<String>> getIndustry() {
        return industry;
    }

    public void setIndustry(Optional<List<String>> industry) {
        this.industry = industry;
    }

}

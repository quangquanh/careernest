package com.nhc.CareerNest.util.specification;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.nhc.CareerNest.domain.entity.Company;
import com.nhc.CareerNest.domain.entity.Company_;

public class CompanySpecification {

    public static Specification<Company> industryListMatch(List<String> industry) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.in(root.get(Company_.INDUSTRY)).value(industry);
    }

    public static Specification<Company> countryListMatch(List<String> country) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.in(root.get(Company_.COUNTRY)).value(country);
    }

    public static Specification<Company> cityListMatch(List<String> city) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.in(root.get(Company_.CITY)).value(city);
    }

    // filter active company
    public static Specification<Company> isActiveMatch(Boolean active) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(Company_.IS_ACTIVE), active);
    }
}

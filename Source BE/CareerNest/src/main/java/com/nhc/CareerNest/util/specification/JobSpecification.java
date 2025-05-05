package com.nhc.CareerNest.util.specification;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.nhc.CareerNest.domain.entity.Job;
import com.nhc.CareerNest.domain.entity.Job_;

public class JobSpecification {

    public static Specification<Job> nameLike(String name) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get(Job_.NAME), "%" + name + "%");
    }

    public static Specification<Job> minSalary(Double minPrice) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.ge(root.get(Job_.SALARY), minPrice);
    }

    public static Specification<Job> maxSalary(Double maxPrice) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.le(root.get(Job_.SALARY), maxPrice);
    }

    public static Specification<Job> locationMatch(String location) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get(Job_.LOCATION), location);
        // return (root, query, criteriaBuilder) -> criteriaBuilder.disjunction();
    }

    public static Specification<Job> locationListMatch(List<String> location) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.in(root.get(Job_.LOCATION)).value(location);
    }

    public static Specification<Job> levelListMatch(List<String> level) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.in(root.get(Job_.LEVEL)).value(level);
    }

    public static Specification<Job> activeSpec() {
        return (root, query, criteriaBuilder) -> criteriaBuilder
                .isTrue(root.get(Job_.ACTIVE));
    }

    public static Specification<Job> matchMultipleSalary(double min, double max) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.between(
                root.get(Job_.SALARY), min, max);
    }
}
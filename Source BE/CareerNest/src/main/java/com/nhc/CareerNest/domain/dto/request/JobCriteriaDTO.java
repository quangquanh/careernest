package com.nhc.CareerNest.domain.dto.request;

import java.util.List;
import java.util.Optional;

public class JobCriteriaDTO {

    private Optional<String> name;
    private Optional<List<String>> location;
    private Optional<List<String>> level;
    private Optional<List<String>> salary;
    private Optional<List<String>> JobType;

    public Optional<String> getName() {
        return name;
    }

    public void setName(Optional<String> name) {
        this.name = name;
    }

    public Optional<List<String>> getLocation() {
        return location;
    }

    public void setLocation(Optional<List<String>> location) {
        this.location = location;
    }

    public Optional<List<String>> getLevel() {
        return level;
    }

    public void setLevel(Optional<List<String>> level) {
        this.level = level;
    }

    public Optional<List<String>> getSalary() {
        return salary;
    }

    public void setSalary(Optional<List<String>> salary) {
        this.salary = salary;
    }

    public Optional<List<String>> getJobType() {
        return JobType;
    }

    public void setJobType(Optional<List<String>> jobType) {
        JobType = jobType;
    }
}

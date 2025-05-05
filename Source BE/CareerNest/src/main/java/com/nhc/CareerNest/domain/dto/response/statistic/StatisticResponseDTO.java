package com.nhc.CareerNest.domain.dto.response.statistic;

import java.util.List;

public class StatisticResponseDTO {
    public Long totalUsers;
    public Long totalJobs;
    public Long totalCompanies;
    public Long totalCandidates;
    public Long totalApplications;
    public List<JobStatisticResponseDTO> jobStatistic;

    public Long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(Long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public Long getTotalJobs() {
        return totalJobs;
    }

    public void setTotalJobs(Long totalJobs) {
        this.totalJobs = totalJobs;
    }

    public Long getTotalCompanies() {
        return totalCompanies;
    }

    public void setTotalCompanies(Long totalCompanies) {
        this.totalCompanies = totalCompanies;
    }

    public Long getTotalCandidates() {
        return totalCandidates;
    }

    public void setTotalCandidates(Long totalCandidates) {
        this.totalCandidates = totalCandidates;
    }

    public Long getTotalApplications() {
        return totalApplications;
    }

    public void setTotalApplications(Long totalApplications) {
        this.totalApplications = totalApplications;
    }

    public List<JobStatisticResponseDTO> getJobStatistic() {
        return jobStatistic;
    }

    public void setJobStatistic(List<JobStatisticResponseDTO> jobStatistic) {
        this.jobStatistic = jobStatistic;
    }

}

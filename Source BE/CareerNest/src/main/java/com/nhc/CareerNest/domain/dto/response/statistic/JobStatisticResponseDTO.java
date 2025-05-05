package com.nhc.CareerNest.domain.dto.response.statistic;

public class JobStatisticResponseDTO {

    private int month;
    private Long totalJobs;

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public Long getTotalJobs() {
        return totalJobs;
    }

    public void setTotalJobs(Long totalJobs) {
        this.totalJobs = totalJobs;
    }

}

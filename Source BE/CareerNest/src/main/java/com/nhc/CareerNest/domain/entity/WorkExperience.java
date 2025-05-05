package com.nhc.CareerNest.domain.entity;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "work_experiences")
public class WorkExperience extends BaseEntity {

    @NotBlank(message = "{name.not.blank}")
    private String companyName;

    private Date startDate;

    private Date endDate;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String description;

    private String location;

    @ManyToOne
    @JoinColumn(name = "onlineResume_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private OnlineResume onlineResume;

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public OnlineResume getOnlineResume() {
        return onlineResume;
    }

    public void setOnlineResume(OnlineResume onlineResume) {
        this.onlineResume = onlineResume;
    }

}

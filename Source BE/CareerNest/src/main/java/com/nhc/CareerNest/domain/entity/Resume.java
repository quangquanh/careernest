package com.nhc.CareerNest.domain.entity;

import com.nhc.CareerNest.constant.ResumeStateEnum;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "resumes")
public class Resume extends BaseEntity {

    @NotBlank(message = "{email.not.blank}")
    private String email;

    @NotBlank(message = "{url.not.blank}")
    private String url;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;

    @Enumerated(EnumType.STRING)
    private ResumeStateEnum status;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String advantage;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String shortcoming;

    private int rating;

    public String getAdvantage() {
        return advantage;
    }

    public void setAdvantage(String advantage) {
        this.advantage = advantage;
    }

    public String getLimit() {
        return shortcoming;
    }

    public void setLimit(String shortcoming) {
        this.shortcoming = shortcoming;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    public ResumeStateEnum getStatus() {
        return status;
    }

    public void setStatus(ResumeStateEnum status) {
        this.status = status;
    }
}

package com.nhc.CareerNest.domain.dto.response.user;

import java.sql.Date;
import java.time.Instant;
import java.util.List;

import com.nhc.CareerNest.constant.GenderEnum;
import com.nhc.CareerNest.domain.entity.Company;
import com.nhc.CareerNest.domain.entity.Job;
import com.nhc.CareerNest.domain.entity.OnlineResume;
import com.nhc.CareerNest.domain.entity.Role;

public class ResCreateUserDTO {

    private long id;
    private String firstName;
    private String lastName;
    private String email;
    private GenderEnum gender;
    private String address;
    private Date dateOfBirth;
    private Instant createdAt;
    private Role role;
    private Company company;
    private String phoneNumber;
    private String avatarUrl;
    private List<Job> saveJob;
    private List<OnlineResume> onlineResumes;
    private String mainResume;

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public GenderEnum getGender() {
        return gender;
    }

    public void setGender(GenderEnum gender) {
        this.gender = gender;
    }

    public String getAddress() {
        return address;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public List<Job> getSaveJob() {
        return saveJob;
    }

    public void setSaveJob(List<Job> saveJob) {
        this.saveJob = saveJob;
    }

    public List<OnlineResume> getOnlineResumes() {
        return onlineResumes;
    }

    public void setOnlineResumes(List<OnlineResume> onlineResumes) {
        this.onlineResumes = onlineResumes;
    }

    public String getMainResume() {
        return mainResume;
    }

    public void setMainResume(String mainResume) {
        this.mainResume = mainResume;
    }

}

package com.nhc.CareerNest.domain.dto.response.user;

import java.sql.Date;
import java.time.Instant;

import com.nhc.CareerNest.constant.GenderEnum;
import com.nhc.CareerNest.constant.RoleEnum;

public class ResUserDTO {
    private long id;
    private String avatar;
    private String email;
    private String firstName;
    private String lastName;
    private GenderEnum gender;
    private String address;
    private Date dateOfBirth;
    private Instant updatedAt;
    private Instant createdAt;
    private String phoneNumber;

    private CompanyUser company;
    private RoleUser roleUser;
    private String mainResume;

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

    public void setAddress(String address) {
        this.address = address;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public CompanyUser getCompany() {
        return company;
    }

    public void setCompany(CompanyUser company) {
        this.company = company;
    }

    public RoleUser getRoleUser() {
        return roleUser;
    }

    public void setRoleUser(RoleUser roleUser) {
        this.roleUser = roleUser;
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

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public static class CompanyUser {
        private long id;
        private String name;

        public long getId() {
            return id;
        }

        public void setId(long id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

    }

    public static class RoleUser {
        private long id;
        private RoleEnum name;

        public long getId() {
            return id;
        }

        public void setId(long id) {
            this.id = id;
        }

        public RoleEnum getName() {
            return name;
        }

        public void setName(RoleEnum name) {
            this.name = name;
        }
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getMainResume() {
        return mainResume;
    }

    public void setMainResume(String mainResume) {
        this.mainResume = mainResume;
    }
}

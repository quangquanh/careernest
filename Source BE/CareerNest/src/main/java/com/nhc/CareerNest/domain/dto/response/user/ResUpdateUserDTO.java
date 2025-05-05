package com.nhc.CareerNest.domain.dto.response.user;

import java.sql.Date;
import java.time.Instant;

import com.nhc.CareerNest.constant.GenderEnum;
import com.nhc.CareerNest.domain.entity.Company;
import com.nhc.CareerNest.domain.entity.Role;

public class ResUpdateUserDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private GenderEnum gender;
    private String address;
    private Date dateOfBirth;
    private Instant updatedAt;
    private Role role;
    private Company company;
    private String phoneNumber;
    private String avatarUrl;

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

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
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



    public Long getId() {
        return id;
    }



    public void setId(Long id) {
        this.id = id;
    }

}

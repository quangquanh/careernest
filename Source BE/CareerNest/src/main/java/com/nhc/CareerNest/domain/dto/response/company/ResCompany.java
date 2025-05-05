package com.nhc.CareerNest.domain.dto.response.company;

import com.nhc.CareerNest.domain.entity.Company;
import com.nhc.CareerNest.domain.entity.User;

public class ResCompany {
    User hr;
    Company company;

    public User getHr() {
        return hr;
    }

    public void setHr(User hr) {
        this.hr = hr;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

}

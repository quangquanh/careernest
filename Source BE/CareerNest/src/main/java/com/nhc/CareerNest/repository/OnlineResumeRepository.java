package com.nhc.CareerNest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nhc.CareerNest.domain.entity.OnlineResume;
import com.nhc.CareerNest.domain.entity.User;

@Repository
public interface OnlineResumeRepository extends JpaRepository<OnlineResume, Long> {

    List<OnlineResume> findByUser(User user);
}

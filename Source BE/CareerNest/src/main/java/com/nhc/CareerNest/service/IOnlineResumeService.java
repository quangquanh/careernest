package com.nhc.CareerNest.service;

import java.util.List;

import com.nhc.CareerNest.domain.entity.OnlineResume;
import com.nhc.CareerNest.domain.entity.User;

public interface IOnlineResumeService {

    OnlineResume handleSaveOnlineResume(OnlineResume onlineResume);

    OnlineResume handleUpdateOnlineResume(OnlineResume onlineResume);

    OnlineResume fetchById(Long id);

    List<OnlineResume> fetchByUserId(User user);

    void deleteOnlineResume(Long id);

}

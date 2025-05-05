package com.nhc.CareerNest.config.security;

import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.nhc.CareerNest.config.language.LocalizationUtils;
import com.nhc.CareerNest.constant.MessageKeys;
import com.nhc.CareerNest.service.impl.UserService;

@Component("userDetailsService")
public class UserDetailCustom implements UserDetailsService {

    private final UserService userService;
    private final LocalizationUtils localizationUtils;

    public UserDetailCustom(
            LocalizationUtils localizationUtils,
            UserService userService) {
        this.localizationUtils = localizationUtils;
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        com.nhc.CareerNest.domain.entity.User user = this.userService.handleGetUserByUserName(username);
        if (user == null) {
            throw new UsernameNotFoundException(
                    localizationUtils.getLocalizedMessage(MessageKeys.LOGIN_FAILED));
        }

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(user.getRole().getName().name())));
    }
}

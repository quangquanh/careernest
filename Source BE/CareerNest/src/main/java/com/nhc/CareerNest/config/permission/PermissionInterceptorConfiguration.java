package com.nhc.CareerNest.config.permission;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class PermissionInterceptorConfiguration implements WebMvcConfigurer {

    @Bean
    PermissionInterceptor getPermissionInterceptor() {
        return new PermissionInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        String[] whiteList = {
                "/api/v1/",
                "/api/v1/auth/**",
                "/storage/**",
                "/api/v1/companies/**",
                "/api/v1/subscribers/**",
                "/api/v1/skills/**",
                "/api/v1/emails",
                "/api/v1/files",
                "/api/v1/subscribers",
                "/api/v1/jobs/*",
                "/api/v1/workExperiences/*",
                "/api/v1/workExperiences",
                "/api/v1/emails",
                "/subscribers",
                "/api/v1/comments",
                "/api/v1/comments/**",
                "/api/v1/resumes/**",
                "/api/v1/jobs/company/**",
                "/api/v1/online-resumes",
                "api/v1/online-resumes/**",
                // "/api/v1/online-resumes/**",

                // chatting
                "/chat",
                "/messages/**",
                "/users-connected",
                "/user.disconnectUser",
                "/user.addUser",

                // statistic
                "/api/v1/admin/statistic"

        };
        registry.addInterceptor(getPermissionInterceptor())
                .excludePathPatterns(whiteList);
    }
}

package com.nhc.CareerNest.config.permission;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;

import com.nhc.CareerNest.config.language.LocalizationUtils;
import com.nhc.CareerNest.constant.MessageKeys;
import com.nhc.CareerNest.domain.entity.Permission;
import com.nhc.CareerNest.domain.entity.Role;
import com.nhc.CareerNest.domain.entity.User;
import com.nhc.CareerNest.exception.errors.PermissionException;
import com.nhc.CareerNest.service.impl.UserService;
import com.nhc.CareerNest.util.security.SecurityUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class PermissionInterceptor implements HandlerInterceptor {

    @Autowired
    UserService userService;

    @Autowired
    LocalizationUtils localizationUtils;

    @Override
    @Transactional
    public boolean preHandle(
            HttpServletRequest request,
            HttpServletResponse response, Object handler)
            throws Exception {
        String path = (String) request.getAttribute(HandlerMapping.BEST_MATCHING_PATTERN_ATTRIBUTE);
        String requestURI = request.getRequestURI();
        String httpMethod = request.getMethod();

        System.out.println(">>> RUN preHandle");
        System.out.println(">>> path= " + path);
        System.out.println(">>> httpMethod= " + httpMethod);
        System.out.println(">>> requestURI= " + requestURI);

        if ("PUT".equalsIgnoreCase(request.getMethod())
                && request.getRequestURI().startsWith("/api/v1/users")) {
            return true;
        }

        if ("GET".equalsIgnoreCase(request.getMethod())
                && request.getRequestURI().startsWith("/api/v1/jobs/**")) {
            return true;
        }
        if ("GET".equalsIgnoreCase(request.getMethod())
                && request.getRequestURI().startsWith("/api/v1/jobs")) {
            return true;
        }

        if ("GET".equalsIgnoreCase(request.getMethod())
                && request.getRequestURI().startsWith("/api/v1/users/")) {
            return true;
        }

        if ("POST".equalsIgnoreCase(request.getMethod())
                && request.getRequestURI().startsWith("/api/v1/online-resumes")) {
            return true;
        }

        if ("DELETE".equalsIgnoreCase(request.getMethod())
                && request.getRequestURI().startsWith("/api/v1/online-resumes/")) {
            return true;
        }

        if ("POST".equalsIgnoreCase(request.getMethod())
                && request.getRequestURI().startsWith("/api/v1/users/saveJob/")) {
            return true;
        }
        if ("PUT".equalsIgnoreCase(request.getMethod())
                && request.getRequestURI().startsWith("/api/v1/users/auth/change-password")) {
            return true;
        }

        if ("GET".equalsIgnoreCase(request.getMethod())
                && request.getRequestURI().startsWith("/api/v1/online-resumes-user")) {
            return true;
        }

        if ("POST".equalsIgnoreCase(request.getMethod())
                && request.getRequestURI().startsWith("/api/v1/users/main-resume")) {
            return true;
        }

        // check permission
        // get user name
        String email = SecurityUtil.getCurrentUserLogin().isPresent() == true
                ? SecurityUtil.getCurrentUserLogin().get()
                : "";
        if (email != null && !email.isEmpty()) {
            User user = this.userService.handleGetUserByUserName(email);
            if (user != null) {
                Role role = user.getRole();
                if (role != null) {
                    List<Permission> permissions = role.getPermissions();
                    boolean isAllowed = permissions.stream()
                            .anyMatch(item -> item.getApiPath()
                                    .equals(path) && item.getMethod().equals(httpMethod));
                    if (isAllowed == false) {
                        throw new PermissionException(
                                localizationUtils.getLocalizedMessage(MessageKeys.ERROR_PERMISSION));
                    }
                } else {
                    throw new PermissionException(localizationUtils.getLocalizedMessage(MessageKeys.ERROR_PERMISSION));
                }
            }
        }
        return true;
    }
}

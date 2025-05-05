package com.nhc.CareerNest.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhc.CareerNest.config.language.LocalizationUtils;
import com.nhc.CareerNest.constant.MessageKeys;
import com.nhc.CareerNest.constant.RoleEnum;
import com.nhc.CareerNest.domain.dto.request.ChangingPassWorDTO;
import com.nhc.CareerNest.domain.dto.request.ReqLoginDTO;
import com.nhc.CareerNest.domain.dto.request.ReqRegisterDTO;
import com.nhc.CareerNest.domain.dto.response.auth.ResLoginDTO;
import com.nhc.CareerNest.domain.dto.response.base.RestResponse;
import com.nhc.CareerNest.domain.entity.Role;
import com.nhc.CareerNest.domain.entity.User;
import com.nhc.CareerNest.exception.errors.IdInvalidException;
import com.nhc.CareerNest.service.impl.RoleService;
import com.nhc.CareerNest.service.impl.UserService;
import com.nhc.CareerNest.util.anotation.ApiMessage;
import com.nhc.CareerNest.util.security.SecurityUtil;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1")
public class AuthController {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final SecurityUtil securityUtil;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final RoleService roleService;
    private final LocalizationUtils localizationUtils;

    @Value("${careernest.jwt.refresh-token-validity-in-seconds}")
    private int refreshTokenExpiration;

    public AuthController(
            RoleService roleService,
            PasswordEncoder passwordEncoder,
            AuthenticationManagerBuilder authenticationManagerBuilder,
            SecurityUtil securityUtil,
            UserService userService,
            LocalizationUtils localizationUtils) {
        this.localizationUtils = localizationUtils;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.securityUtil = securityUtil;
        this.userService = userService;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<RestResponse> login(
            @RequestBody ReqLoginDTO loginDto,
            HttpServletResponse response) throws IdInvalidException {

        if (this.userService.isBlockAccount(loginDto.getUsername(), true)) {
            throw new IdInvalidException(localizationUtils.getLocalizedMessage(MessageKeys.USER_NOT_FOUND));
        }

        // nạp input gồm username/ password vào security
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginDto.getUsername(), loginDto.getPassword());

        // xác thực người dùng => cần viết hàm loaduserByUserName
        Authentication authentication = this.authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        ResLoginDTO resLoginDTO = new ResLoginDTO();

        User currentUserDb = this.userService.handleGetUserByUserName(loginDto.getUsername());
        if (currentUserDb != null) {
            ResLoginDTO.UserLogin userLogin = new ResLoginDTO.UserLogin(
                    currentUserDb.getId(),
                    currentUserDb.getEmail(),
                    currentUserDb.getFirstName(),
                    currentUserDb.getLastName(),
                    currentUserDb.getRole());

            resLoginDTO.setUser(userLogin);
        }

        // create a token
        String access_token = this.securityUtil.createAccessToken(authentication.getName(), resLoginDTO);
        resLoginDTO.setAccessToken(access_token);

        // create refresh token
        String refresh_token = this.securityUtil.createRefreshToken(loginDto.getUsername(), resLoginDTO);

        // update user
        this.userService.updateUserToken(refresh_token, loginDto.getUsername());

        // set cookies
        Cookie cookie = new Cookie("refresh_token", refresh_token);
        cookie.setPath("/");
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(refreshTokenExpiration);

        // add cookie to response
        response.addCookie(cookie);

        RestResponse res = new RestResponse();
        res.setData(resLoginDTO);
        res.setMessage(localizationUtils.getLocalizedMessage(MessageKeys.LOGIN_SUCCESSFULLY));
        res.setStatusCode(HttpStatus.OK.value());

        return ResponseEntity.ok(res);
    }

    @PostMapping("/auth/register")
    public ResponseEntity<RestResponse> register(@Valid @RequestBody ReqRegisterDTO dto) throws IdInvalidException {
        User RegisterUser = ReqRegisterDTO.registerDTOtoUser(dto);
        boolean isEmailExist = this.userService.isEmailExist(RegisterUser.getEmail());
        if (isEmailExist) {
            throw new IdInvalidException(
                    localizationUtils.getLocalizedMessage(MessageKeys.EMAIL_ALREADY_EXIST));
        }

        // set default role user
        Role role = this.roleService.findByName(RoleEnum.USER);
        if (role != null) {
            RegisterUser.setRole(role);
        }

        String hashPassword = this.passwordEncoder.encode(RegisterUser.getPassword());
        RegisterUser.setPassword(hashPassword);
        User newUser = this.userService.handleSaveUser(RegisterUser);

        RestResponse res = new RestResponse();
        res.setData(this.userService.convertToResUpdateUserDTO(newUser));
        res.setStatusCode(HttpStatus.OK.value());

        return ResponseEntity.ok(res);
    }

    @GetMapping("/auth/refresh")
    @ApiMessage("Get User by refresh token")
    public ResponseEntity<RestResponse> getRefreshToken(
            @CookieValue(name = "refresh_token") String refresh_token,
            HttpServletResponse response) throws IdInvalidException {

        // check valid token
        Jwt decodedToken = this.securityUtil.checkValidRefreshToken(refresh_token);
        String email = decodedToken.getSubject();

        // check user by token and email

        User currentUser = this.userService.getUserByRefreshTokenAndEmail(refresh_token, email);
        if (currentUser == null) {
            throw new IdInvalidException("refresh token not valid");
        }
        // create a token
        ResLoginDTO resLoginDTO = new ResLoginDTO();
        User currentUserDB = this.userService.handleGetUserByUserName(email);
        if (currentUserDB != null) {
            ResLoginDTO.UserLogin userLogin = new ResLoginDTO.UserLogin(
                    currentUserDB.getId(),
                    currentUserDB.getEmail(),
                    currentUserDB.getFirstName(),
                    currentUserDB.getLastName(),
                    currentUserDB.getRole());
            resLoginDTO.setUser(userLogin);
        }

        String access_token = this.securityUtil.createAccessToken(email, resLoginDTO);
        resLoginDTO.setAccessToken(access_token);

        // create refresh token
        String new_refresh_token = this.securityUtil.createRefreshToken(email, resLoginDTO);

        // update user
        this.userService.updateUserToken(new_refresh_token, email);

        // set cookies
        Cookie cookie = new Cookie("refresh_token", new_refresh_token);
        cookie.setPath("/");
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(refreshTokenExpiration);

        // add cookie to response
        response.addCookie(cookie);

        RestResponse res = new RestResponse();
        res.setData(resLoginDTO);
        res.setStatusCode(HttpStatus.OK.value());

        return ResponseEntity.ok(res);
    }

    @PostMapping("/auth/logout")
    @ApiMessage("Log out")
    public ResponseEntity<RestResponse> logout(
            HttpServletResponse response) {

        // get user from Security
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        // update token
        this.userService.updateUserToken(null, email);

        // remove refresh token in cookie
        Cookie cookie = new Cookie("refresh_token", null);
        cookie.setPath("/");
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(refreshTokenExpiration);

        // add cookie to response
        response.addCookie(cookie);

        RestResponse res = new RestResponse();
        res.setMessage(localizationUtils.getLocalizedMessage(MessageKeys.LOGOUT_SUCCESSFULLY));
        res.setStatusCode(HttpStatus.OK.value());

        return ResponseEntity.ok(res);
    }

    @PutMapping("auth/change-password")
    public ResponseEntity<RestResponse> putMethodName(
            @RequestBody ChangingPassWorDTO dto,
            @RequestHeader(name = "Authorization") String accessToken) throws IdInvalidException {

        RestResponse res = new RestResponse();
        Long idToken = SecurityUtil.extractClaim(accessToken.substring(7));
        if (idToken != null) {
            User updateUser = this.userService.findUserById(idToken);
            if (updateUser == null) {
                throw new IdInvalidException(localizationUtils.getLocalizedMessage(MessageKeys.USER_NOT_FOUND));
            }

            String hashPassword = this.passwordEncoder.encode(dto.getNewPassword());
            if (!passwordEncoder.matches(dto.getCurrentPassword(), updateUser.getPassword())) {
                res.setMessage(localizationUtils.getLocalizedMessage(MessageKeys.PASSWORD_WRONG));
                res.setStatusCode(HttpStatus.BAD_REQUEST.value());
                return ResponseEntity.ok(res);
            }

            if (!dto.getConfirmPassword().equals(dto.getNewPassword())) {
                res.setMessage(localizationUtils.getLocalizedMessage(MessageKeys.CONFIRM_PASSWORD_WRONG));
                res.setStatusCode(HttpStatus.BAD_REQUEST.value());
                return ResponseEntity.ok(res);
            }
            updateUser.setPassword(hashPassword);
            this.userService.saveUser(updateUser);
            res.setMessage(localizationUtils.getLocalizedMessage(MessageKeys.CHANGE_PASSWORD_SUCCESSFULLY));
            res.setStatusCode(HttpStatus.OK.value());
            return ResponseEntity.ok(res);
        }
        res.setMessage(localizationUtils.getLocalizedMessage(MessageKeys.USER_NOT_FOUND));
        res.setStatusCode(HttpStatus.OK.value());
        return ResponseEntity.ok(res);
    }
}

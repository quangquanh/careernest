package com.nhc.CareerNest.validator.register;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import org.springframework.stereotype.Service;

import com.nhc.CareerNest.domain.dto.request.ReqRegisterDTO;
import com.nhc.CareerNest.service.impl.UserService;

@Service
public class RegisterValidator implements ConstraintValidator<RegisterChecked, ReqRegisterDTO> {

    private final UserService userService;

    public RegisterValidator(UserService userService) {
        this.userService = userService;
    }

    @Override
    public boolean isValid(ReqRegisterDTO user, ConstraintValidatorContext context) {
        boolean valid = true;

        // Check if password fields match
        if (!user.getPassword().equals(user.getConfirmPassword())) {
            context.buildConstraintViolationWithTemplate("Passwords must match") // messaage
                    .addPropertyNode("confirmPassword") // path
                    .addConstraintViolation()
                    .disableDefaultConstraintViolation();
            valid = false;
        }

        // Additional validations can be added here
        // check email
        if (this.userService.isEmailExist(user.getEmail())) {
            context.buildConstraintViolationWithTemplate("This email is already in use") // messaage
                    .addPropertyNode("email") // path
                    .addConstraintViolation()
                    .disableDefaultConstraintViolation();
            valid = false;
        }
        return valid;
    }
}
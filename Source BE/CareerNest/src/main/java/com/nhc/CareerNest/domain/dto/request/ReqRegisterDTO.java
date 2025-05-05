package com.nhc.CareerNest.domain.dto.request;

import com.nhc.CareerNest.domain.entity.User;
import com.nhc.CareerNest.validator.register.RegisterChecked;
import com.nhc.CareerNest.validator.strongPassword.StrongPassword;

//import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@RegisterChecked
public class ReqRegisterDTO {
    @Size(min = 3, max = 20, message = "The full name must be between 3 and 20 characters")
    private String firstName;

    @Size(min = 3, max = 20, message = "The last name must be between 3 and 20 characters")
    private String lastName;

    // @Email
    @NotBlank(message = "{email.not.blank}")
    private String email;

    @StrongPassword
    private String password;

    private String confirmPassword;

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public static User registerDTOtoUser(ReqRegisterDTO registerDTO) {
        User user = new User();
        user.setFirstName(registerDTO.getFirstName());
        user.setLastName(registerDTO.getLastName());
        user.setEmail(registerDTO.getEmail());
        user.setPassword(registerDTO.getPassword());
        return user;
    }
}

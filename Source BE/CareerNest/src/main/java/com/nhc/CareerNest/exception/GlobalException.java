package com.nhc.CareerNest.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import com.nhc.CareerNest.config.language.LocalizationUtils;
import com.nhc.CareerNest.constant.MessageKeys;
import com.nhc.CareerNest.domain.dto.response.base.RestResponse;
import com.nhc.CareerNest.exception.errors.IdInvalidException;
import com.nhc.CareerNest.exception.errors.PermissionException;
import com.nhc.CareerNest.exception.errors.StorageException;

import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class GlobalException {

    @Autowired
    LocalizationUtils localizationUtils;

    @ExceptionHandler(Exception.class)
    public ResponseEntity<RestResponse> handleAllException(Exception ex) {

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
        res.setMessage(ex.getMessage());
        res.setError(localizationUtils.getLocalizedMessage(MessageKeys.ERROR_EXCEPTION));

        return ResponseEntity.badRequest().body(res);
    }

    @ExceptionHandler(value = {
            IdInvalidException.class,
            BadCredentialsException.class
    })
    public ResponseEntity<RestResponse> handleBadRequest(IdInvalidException ex) {
        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
        res.setMessage(ex.getMessage());
        res.setError(localizationUtils.getLocalizedMessage(MessageKeys.ERROR_BAD_CREDENTIAL));

        return ResponseEntity.badRequest().body(res);
    }

    @ExceptionHandler(value = {
            StorageException.class
    })
    public ResponseEntity<RestResponse> handleFileUploadException(Exception ex) {

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.BAD_REQUEST.value());
        res.setError(ex.getMessage());
        res.setMessage(localizationUtils.getLocalizedMessage(MessageKeys.ERROR_FILE_STORAGE));

        return ResponseEntity.badRequest().body(res);
    }

    @ExceptionHandler(value = {
            PermissionException.class
    })
    public ResponseEntity<RestResponse> handlePermissionException(Exception ex) {

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.BAD_REQUEST.value());
        res.setError(ex.getMessage());
        res.setMessage(localizationUtils.getLocalizedMessage(MessageKeys.ERROR_PERMISSION));

        return ResponseEntity.badRequest().body(res);
    }

    @ExceptionHandler(value = {
            NoResourceFoundException.class,
    })
    public ResponseEntity<RestResponse> handleNotFoundException(Exception ex) {

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.NOT_FOUND.value());
        res.setError(ex.getMessage());
        res.setMessage(localizationUtils.getLocalizedMessage(MessageKeys.ERROR_NO_RESOURCE_FOUND));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<RestResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors()
                .forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.BAD_REQUEST.value());
        res.setError(ex.getMessage());
        res.setMessage(errors);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<RestResponse> handleConstraintViolationException(ConstraintViolationException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getConstraintViolations()
                .forEach(violation -> errors.put(violation.getPropertyPath().toString(),
                        violation.getMessage()));

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.BAD_REQUEST.value());
        res.setError(ex.getMessage());
        res.setMessage(errors);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }

}

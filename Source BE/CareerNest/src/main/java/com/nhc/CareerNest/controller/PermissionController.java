package com.nhc.CareerNest.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhc.CareerNest.config.language.LocalizationUtils;
import com.nhc.CareerNest.constant.MessageKeys;
import com.nhc.CareerNest.domain.dto.response.base.RestResponse;
import com.nhc.CareerNest.domain.entity.Permission;
import com.nhc.CareerNest.exception.errors.IdInvalidException;
import com.nhc.CareerNest.service.impl.PermissionService;
import com.nhc.CareerNest.util.anotation.ApiMessage;

@RestController
@RequestMapping("/api/v1")
public class PermissionController {

    private final PermissionService permissionService;
    private final LocalizationUtils localizationUtils;

    public PermissionController(
            LocalizationUtils localizationUtils,
            PermissionService permissionService) {
        this.localizationUtils = localizationUtils;
        this.permissionService = permissionService;
    }

    @PostMapping("/permissions")
    @ApiMessage("Create a permission")
    public ResponseEntity<RestResponse> create(@RequestBody Permission p) throws IdInvalidException {
        // check exist
        if (this.permissionService.isPermissionExist(p)) {
            throw new IdInvalidException(localizationUtils.getLocalizedMessage(MessageKeys.PERMISSION_ALREADY_EXIST));
        }

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.CREATED.value());
        res.setData(this.permissionService.create(p));

        return ResponseEntity.ok(res);
    }

    @PutMapping("/permissions")
    @ApiMessage("Update a permission")
    public ResponseEntity<RestResponse> update(@RequestBody Permission p) throws IdInvalidException {
        // check exist by id
        if (this.permissionService.fetchById(p.getId()) == null) {
            throw new IdInvalidException(localizationUtils.getLocalizedMessage(MessageKeys.PERMISSION_NOT_FOUND));
        }

        // check exist by module, apiPath and method
        if (this.permissionService.isPermissionExist(p)) {
            // check name
            if (this.permissionService.isSameName(p)) {
                throw new IdInvalidException(
                        localizationUtils.getLocalizedMessage(MessageKeys.PERMISSION_ALREADY_EXIST));
            }
        }

        // update permission

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(this.permissionService.update(p));

        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/permissions/{id}")
    @ApiMessage("delete a permission")
    public ResponseEntity<RestResponse> delete(@PathVariable("id") long id) throws IdInvalidException {
        // check exist by id
        if (this.permissionService.fetchById(id) == null) {
            throw new IdInvalidException(localizationUtils.getLocalizedMessage(MessageKeys.PERMISSION_NOT_FOUND));
        }
        this.permissionService.delete(id);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());

        return ResponseEntity.ok(res);
    }

    @GetMapping("/permissions")
    @ApiMessage("Fetch permissions")
    public ResponseEntity<RestResponse> getPermissions() {
        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.CREATED.value());
        res.setData(this.permissionService.getPermissions());

        return ResponseEntity.ok(res);
    }
}

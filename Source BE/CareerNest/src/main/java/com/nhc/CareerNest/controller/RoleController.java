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
import com.nhc.CareerNest.domain.entity.Role;
import com.nhc.CareerNest.exception.errors.IdInvalidException;
import com.nhc.CareerNest.service.impl.RoleService;
import com.nhc.CareerNest.util.anotation.ApiMessage;

@RestController
@RequestMapping("/api/v1")
public class RoleController {

    private final RoleService roleService;
    private final LocalizationUtils localizationUtils;

    public RoleController(
            RoleService roleService,
            LocalizationUtils localizationUtils) {
        this.roleService = roleService;
        this.localizationUtils = localizationUtils;
    }

    @PostMapping("/roles")
    @ApiMessage("Create a role")
    public ResponseEntity<RestResponse> create(@RequestBody Role r) throws IdInvalidException {
        // check name
        if (this.roleService.existByName(r.getName())) {
            throw new IdInvalidException(localizationUtils.getLocalizedMessage(MessageKeys.ROLE_ALREADY_EXIST));
        }

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(this.roleService.create(r));

        return ResponseEntity.ok(res);
    }

    @PutMapping("/roles")
    @ApiMessage("Update a role")
    public ResponseEntity<RestResponse> update(@RequestBody Role r) throws IdInvalidException {
        // check id
        if (this.roleService.fetchById(r.getId()) == null) {
            throw new IdInvalidException(localizationUtils.getLocalizedMessage(MessageKeys.ROLE_NOT_FOUND));
        }

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(this.roleService.update(r));

        return ResponseEntity.ok(res);
    }

    @DeleteMapping("/roles/{id}")
    @ApiMessage("Delete a role")
    public ResponseEntity<RestResponse> delete(@PathVariable("id") long id) throws IdInvalidException {
        // check id
        if (this.roleService.fetchById(id) == null) {
            throw new IdInvalidException(localizationUtils.getLocalizedMessage(MessageKeys.ROLE_NOT_FOUND));
        }
        this.roleService.delete(id);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());

        return ResponseEntity.ok(res);
    }

    @GetMapping("/roles")
    @ApiMessage("Fetch roles")
    public ResponseEntity<RestResponse> getRoles() {

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(roleService.getRoles());

        return ResponseEntity.ok(res);
    }

    @GetMapping("/roles/{id}")
    @ApiMessage("Fetch role by id")
    public ResponseEntity<RestResponse> getById(@PathVariable("id") long id) throws IdInvalidException {

        Role role = this.roleService.fetchById(id);
        if (role == null) {
            throw new IdInvalidException(localizationUtils.getLocalizedMessage(MessageKeys.ROLE_NOT_FOUND));
        }

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.OK.value());
        res.setData(role);

        return ResponseEntity.ok(res);
    }
}

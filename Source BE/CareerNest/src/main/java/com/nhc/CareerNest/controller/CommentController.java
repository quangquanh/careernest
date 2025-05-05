package com.nhc.CareerNest.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhc.CareerNest.config.language.LocalizationUtils;
import com.nhc.CareerNest.constant.MessageKeys;
import com.nhc.CareerNest.domain.dto.response.base.RestResponse;
import com.nhc.CareerNest.domain.dto.response.base.ResultPaginationResponse;
import com.nhc.CareerNest.domain.entity.Comment;
import com.nhc.CareerNest.service.impl.CommentService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/v1")
public class CommentController {

    private final CommentService commentService;
    private final LocalizationUtils localizationUtils;

    public CommentController(
            CommentService commentService,
            LocalizationUtils localizationUtils) {
        this.commentService = commentService;
        this.localizationUtils = localizationUtils;
    }

    @PostMapping("/comments")
    public ResponseEntity<RestResponse> createComment(@RequestBody Comment comment) {

        Comment newComment = this.commentService.createComment(comment);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.CREATED.value());
        res.setData(newComment);

        return ResponseEntity.ok(res);
    }

    @PutMapping("/comments")
    public ResponseEntity<RestResponse> updateComment(@RequestBody Comment comment) {

        Comment updateComment = this.commentService.updateComment(comment);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.CREATED.value());
        res.setData(updateComment);

        return ResponseEntity.ok(res);
    }

    @GetMapping("/comments/{companyId}")
    public ResponseEntity<ResultPaginationResponse> getMethodName(
            @PathVariable("companyId") Long companyId,
            @RequestParam(defaultValue = "1", name = "page") int page,
            @RequestParam(defaultValue = "6", name = "pageSize") int pageSize) {

        ResultPaginationResponse rs = new ResultPaginationResponse();
        ResultPaginationResponse.Meta mt = new ResultPaginationResponse.Meta();

        Pageable pageable = PageRequest.of(page - 1, pageSize);
        Page<Comment> Comments = this.commentService.fetchAllComment(companyId, pageable);

        mt.setPage(pageable.getPageNumber() + 1);
        mt.setPageSize(pageable.getPageSize());
        mt.setPages(Comments.getTotalPages());
        mt.setTotal(Comments.getTotalElements());

        rs.setMeta(mt);
        rs.setResult(Comments.getContent());

        return ResponseEntity.ok(rs);
    }

    @DeleteMapping("/comments/{id}")
    public ResponseEntity<RestResponse> deleteComment(@PathVariable("id") Long id) {

        this.commentService.removeComment(id);

        RestResponse res = new RestResponse();
        res.setStatusCode(HttpStatus.CREATED.value());
        res.setMessage(localizationUtils.getLocalizedMessage(MessageKeys.CALL_API_SUCCESSFULLY));

        return ResponseEntity.ok(res);
    }
}

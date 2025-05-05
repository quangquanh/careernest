package com.nhc.CareerNest.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.nhc.CareerNest.domain.entity.Comment;
import com.nhc.CareerNest.domain.entity.Company;
import com.nhc.CareerNest.repository.CommentRepository;
import com.nhc.CareerNest.repository.CompanyRepository;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final CompanyRepository companyRepository;

    public CommentService(
            CommentRepository commentRepository,
            CompanyRepository companyRepository) {
        this.commentRepository = commentRepository;
        this.companyRepository = companyRepository;
    }

    // fetch all
    public Page<Comment> fetchAllComment(Long companyId, Pageable pageable) {
        return this.commentRepository.findAll(companyId, pageable);
    }

    // create
    public Comment createComment(Comment comment) {
        return this.commentRepository.save(comment);
    }

    // udpate comment
    public Comment updateComment(Comment comment) {
        Company currentCompany = this.companyRepository.findById(comment.getCompany().getId()).get();
        Comment updateComment = this.commentRepository.findById(comment.getId()).get();

        updateComment.setComment(comment.getComment());
        updateComment.setCompany(currentCompany);
        updateComment.setRating(comment.getRating());

        return this.commentRepository.save(updateComment);
    }

    // remove
    public void removeComment(Long id) {
        this.commentRepository.deleteById(id);
    }
}

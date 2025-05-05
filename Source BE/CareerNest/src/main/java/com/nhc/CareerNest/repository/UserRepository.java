package com.nhc.CareerNest.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.nhc.CareerNest.constant.UserStatusEnum;
import com.nhc.CareerNest.domain.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.isBlocked = false")
    List<User> findActiveUsers();

    User findByEmail(String email);

    List<User> findAllByStatus(UserStatusEnum status);

    boolean existsByEmailAndIsBlocked(String username, boolean isLocked);

    User findByRefreshTokenAndEmail(String token, String email);

    List<User> findByIdIn(List<Long> id);

    User findByCompanyId(Long id);

    long count();

    @Query("SELECT COUNT(u) FROM User u WHERE u.role.id = 3")
    long countUsersWithRoleId3();

    @Query("SELECT COUNT(u) FROM User u WHERE u.role.id = 2")
    long countUsersWithRoleId2();

    @Query("SELECT COUNT(u) FROM User u WHERE u.role.id = 1")
    long countUsersWithRoleId1();
}

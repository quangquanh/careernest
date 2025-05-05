package com.nhc.CareerNest.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.nhc.CareerNest.constant.UserStatusEnum;
import com.nhc.CareerNest.domain.dto.response.user.ResCreateUserDTO;
import com.nhc.CareerNest.domain.dto.response.user.ResUpdateUserDTO;
import com.nhc.CareerNest.domain.dto.response.user.ResUserDTO;
import com.nhc.CareerNest.domain.entity.ChatRoom;
import com.nhc.CareerNest.domain.entity.Company;
import com.nhc.CareerNest.domain.entity.Role;
import com.nhc.CareerNest.domain.entity.User;
import com.nhc.CareerNest.domain.entity.Job;
import com.nhc.CareerNest.repository.ChatRoomRepository;
import com.nhc.CareerNest.repository.JobRepository;
import com.nhc.CareerNest.repository.UserRepository;
import com.nhc.CareerNest.service.IUserService;

@Service
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final RoleService roleService;
    private final CompanyService companyService;
    private final JobRepository jobRepository;
    private final ChatRoomRepository chatRoomRepository;

    public UserService(
            ChatRoomRepository chatRoomRepository,
            JobRepository jobRepository,
            RoleService roleService,
            CompanyService companyService,
            UserRepository userRepository) {
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.companyService = companyService;
        this.roleService = roleService;
        this.chatRoomRepository = chatRoomRepository;
    }

    @Override
    public User handleSaveUser(User user) {

        // check company
        if (user.getCompany() != null) {
            Optional<Company> company = this.companyService.getCompanyById(user.getCompany().getId());
            user.setCompany(company.isPresent() ? company.get() : null);
        }
        // check role
        if (user.getRole() != null) {
            Role r = this.roleService.fetchById(user.getRole().getId());
            user.setRole(r != null ? r : null);
        }

        return this.userRepository.save(user);
    }

    @Override
    public List<User> fetchAllUser() {
        return this.userRepository.findActiveUsers();
    }

    @Override
    public void deleteUser(Long id) {

    }

    @Override
    public User updateUser(User user) {

        User updateUser = this.userRepository.findById(user.getId()).get();
        // check company
        if (user.getCompany() != null) {
            Optional<Company> company = this.companyService.getCompanyById(user.getCompany().getId());
            updateUser.setCompany(company.isPresent() ? company.get() : null);
        }

        updateUser.setFirstName(user.getFirstName());
        updateUser.setLastName(user.getLastName());
        updateUser.setDateOfBirth(user.getDateOfBirth());
        updateUser.setGender(user.getGender());
        updateUser.setBlocked(user.getIsBlocked());
        updateUser.setAddress(user.getAddress());
        updateUser.setAvatar(user.getAvatar());
        updateUser.setPhoneNumber(user.getPhoneNumber());

        return this.userRepository.save(updateUser);

    }

    @Override
    public boolean isEmailExist(String email) {
        return this.userRepository.existsByEmail(email);
    }

    @Override
    public User findUserById(Long id) {
        return this.userRepository.findById(id).get();
    }

    public User getUserByRefreshTokenAndEmail(String token, String email) {
        return this.userRepository.findByRefreshTokenAndEmail(token, email);
    }

    public ResCreateUserDTO convertToResCreateUserDTO(User user) {
        ResCreateUserDTO res = new ResCreateUserDTO();

        res.setId(user.getId());
        res.setEmail(user.getEmail());
        res.setFirstName(user.getFirstName());
        res.setLastName(user.getLastName());
        res.setDateOfBirth(user.getDateOfBirth());
        res.setGender(user.getGender());
        res.setAddress(user.getAddress());
        res.setCompany(user.getCompany());
        res.setRole(user.getRole());
        res.setCreatedAt(user.getCreatedAt());
        res.setPhoneNumber(user.getPhoneNumber());
        res.setAvatarUrl(user.getAvatar());
        res.setSaveJob(user.getSavedJob());
        res.setOnlineResumes(user.getOnlineResumes());
        res.setMainResume(user.getMainResume());

        return res;
    }

    public ResUpdateUserDTO convertToResUpdateUserDTO(User user) {
        ResUpdateUserDTO res = new ResUpdateUserDTO();

        res.setEmail(user.getEmail());
        res.setFirstName(user.getFirstName());
        res.setLastName(user.getLastName());
        res.setDateOfBirth(user.getDateOfBirth());
        res.setGender(user.getGender());
        res.setAddress(user.getAddress());
        res.setCompany(user.getCompany());
        res.setRole(user.getRole());
        res.setUpdatedAt(user.getUpdatedAt());
        res.setId(user.getId());
        res.setPhoneNumber(user.getPhoneNumber());
        res.setAvatarUrl(user.getAvatar());

        return res;
    }

    public ResUserDTO convertToResUserDTO(User user) {
        ResUserDTO res = new ResUserDTO();
        ResUserDTO.CompanyUser com = new ResUserDTO.CompanyUser();
        ResUserDTO.RoleUser role = new ResUserDTO.RoleUser();

        res.setId(user.getId());
        res.setEmail(user.getEmail());
        res.setFirstName(user.getFirstName());
        res.setLastName(user.getLastName());
        res.setDateOfBirth(user.getDateOfBirth());
        res.setUpdatedAt(user.getUpdatedAt());
        res.setCreatedAt(user.getCreatedAt());
        res.setGender(user.getGender());
        res.setAddress(user.getAddress());
        res.setMainResume(user.getMainResume());

        if (user.getCompany() != null) {
            com.setId(user.getCompany().getId());
            com.setName(user.getCompany().getName());
            res.setCompany(com);
        }

        if (user.getRole() != null) {
            role.setId(user.getRole().getId());
            role.setName(user.getRole().getName());
            res.setRoleUser(role);
        }

        return res;
    }

    @Override
    public User handleGetUserByUserName(String email) {
        return this.userRepository.findByEmail(email);
    }

    @Override
    public void updateUserToken(String refreshToken, String email) {
        User currentUser = this.handleGetUserByUserName(email);
        if (currentUser != null) {
            currentUser.setRefreshToken(refreshToken);
        }
        this.userRepository.save(currentUser);
    }

    @Override
    public void updateStatus(User user) {
        var storedUser = this.userRepository.findByEmail(user.getEmail());
        storedUser.setStatus(UserStatusEnum.ONLINE);
        this.userRepository.save(storedUser);
    }

    @Override
    public void disconnect(User user) {
        var storedUser = this.userRepository.findByEmail(user.getEmail());
        if (storedUser != null) {
            storedUser.setStatus(UserStatusEnum.OFFLINE);
            this.userRepository.save(storedUser);
        }
    }

    @Override
    public List<User> findConnectedUsers(Long id) {

        List<ChatRoom> chatRooms = this.chatRoomRepository.findBySenderId(id);

        if (chatRooms.isEmpty()) {
            return Collections.emptyList();
        }

        List<Long> idReceiveList = chatRooms.stream()
                .map(room -> room.getReceiver().getId())
                .distinct()
                .collect(Collectors.toList());

        return this.userRepository.findByIdIn(idReceiveList);
    }

    public List<Job> saveJob(Long userId, Long jobId) {

        List<Job> savedJob = new ArrayList<>();
        List<User> users = new ArrayList<>();

        User currentUser = this.userRepository.findById(userId).get();
        Job currentJob = this.jobRepository.findById(jobId).get();

        if (currentUser.getSavedJob() != null) {
            savedJob = currentUser.getSavedJob();
        }

        if (currentJob.getUsers() != null) {
            users = currentJob.getUsers();
        }

        savedJob.add(currentJob);
        users.add(currentUser);

        currentJob.setUsers(users);
        currentUser.setSavedJob(savedJob);

        currentUser = this.userRepository.save(currentUser);
        currentJob = this.jobRepository.save(currentJob);
        return currentUser.getSavedJob();
    }

    public User deleteUser(User deleteUser) {
        deleteUser.setBlocked(true);
        return this.userRepository.save(deleteUser);
    }

    public boolean isBlockAccount(String email, boolean True) {
        return this.userRepository.existsByEmailAndIsBlocked(email, True);
    }

    public User findByCompanyId(Long id) {
        return this.userRepository.findByCompanyId(id);
    }

    public User saveUser(User user) {
        return this.userRepository.save(user);
    }
}

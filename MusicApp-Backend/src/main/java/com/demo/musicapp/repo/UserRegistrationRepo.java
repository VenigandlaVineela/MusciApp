package com.demo.musicapp.repo; 

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.musicapp.entity.UserRegistration;

public interface UserRegistrationRepo extends JpaRepository<UserRegistration, Long> {
	
    Optional<UserRegistration> findByEmailAndPassword(String email, String password);

	}

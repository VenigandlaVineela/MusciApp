package com.demo.musicapp.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.musicapp.entity.UserContactDetails;

public interface UserContactDetailsRepo extends JpaRepository<UserContactDetails, Long> {

}

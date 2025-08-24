package com.demo.musicapp.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.musicapp.entity.UserLogin;

public interface UserLoginRepo extends JpaRepository<UserLogin, Long> {

}

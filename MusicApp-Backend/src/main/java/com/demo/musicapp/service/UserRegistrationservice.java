package com.demo.musicapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.musicapp.entity.UserRegistration;
import com.demo.musicapp.repo.UserRegistrationRepo;

@Service

public class UserRegistrationservice {
	
	@Autowired
	UserRegistrationRepo userRegistrationRepo;
	 
	
	//post
	 public UserRegistration createUserRegistration(UserRegistration userRegistration) {
		 return userRegistrationRepo.save(userRegistration);
	 }
	 
	 //get
	 public List<UserRegistration> getUserRegistration() {
		 return userRegistrationRepo.findAll();
		 
	 }
	 
	 
	  
	 
	 

}

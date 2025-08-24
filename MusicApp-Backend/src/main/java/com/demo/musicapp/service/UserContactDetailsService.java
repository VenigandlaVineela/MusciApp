package com.demo.musicapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.musicapp.entity.UserContactDetails;
import com.demo.musicapp.repo.UserContactDetailsRepo;

@Service

public class UserContactDetailsService {
	
	@Autowired
	UserContactDetailsRepo userContactDetailsRepo;
	
	//post
	public UserContactDetails createUserContactDetails(UserContactDetails userContactDetails) {
		return userContactDetailsRepo.save(userContactDetails);
	}
	
	//get
	public List<UserContactDetails> getUserContactDetails() {
		return userContactDetailsRepo.findAll();
	}

}

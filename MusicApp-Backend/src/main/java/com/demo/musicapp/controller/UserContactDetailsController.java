package com.demo.musicapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.musicapp.entity.UserContactDetails;
import com.demo.musicapp.service.UserContactDetailsService;

@RestController
@RequestMapping("/musicApp/ContactDetails")
@CrossOrigin(origins = "*")  

public class UserContactDetailsController {
	
	@Autowired
	UserContactDetailsService userContactDetailsService;
	
	@PostMapping("/createUserContactDetails")
	public UserContactDetails createUserContactDetails(@RequestBody UserContactDetails userContactDetails) {
		return userContactDetailsService.createUserContactDetails(userContactDetails);
	}
	
	@GetMapping("/getUserContactDetails")
	
	public List<UserContactDetails> getUserContactDetails(){
		return userContactDetailsService.getUserContactDetails();
	}	 

}

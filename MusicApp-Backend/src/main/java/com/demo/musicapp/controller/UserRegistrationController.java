package com.demo.musicapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.musicapp.entity.UserRegistration;
import com.demo.musicapp.service.UserRegistrationservice;

@RestController
@RequestMapping("/musicApp/registration")
@CrossOrigin(origins = "http://localhost:5173") // Allow only your frontend

public class UserRegistrationController {
	
	@Autowired
	UserRegistrationservice userRegistrationservice;
	
	@GetMapping("/getUserRegistration")
	public List<UserRegistration> getUserRegistration(){
		return userRegistrationservice.getUserRegistration();
	}
	
	
	@PostMapping("/createuserRegistration")	
	public UserRegistration createUserRegistration(@RequestBody UserRegistration userRegistration) {
		return userRegistrationservice.createUserRegistration(userRegistration);
	}
	
}

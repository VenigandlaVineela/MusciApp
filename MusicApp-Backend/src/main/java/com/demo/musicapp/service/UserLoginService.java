package com.demo.musicapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.demo.musicapp.entity.UserLogin;
import com.demo.musicapp.entity.UserRegistration;
import com.demo.musicapp.repo.UserLoginRepo;
import com.demo.musicapp.repo.UserRegistrationRepo;

import java.util.List;
import java.util.Optional;

@Service
public class UserLoginService {

    @Autowired
    UserLoginRepo userLoginRepo;

    @Autowired
    UserRegistrationRepo userRegistrationRepo;

    // Validate login before saving
    public String loginUser(UserLogin userLogin) {
        Optional<UserRegistration> registeredUser = 
            userRegistrationRepo.findByEmailAndPassword(userLogin.getEmail(), userLogin.getPassword());

        if (registeredUser.isPresent()) {
            return "Login successful!";
        } else {
            return "Invalid email or password";
        }
    }

    // Save login data (if needed)
    public UserLogin createUserLogin(UserLogin userLogin) {
        return userLoginRepo.save(userLogin);
    }

    public List<UserLogin> getUserLogin() {
        return userLoginRepo.findAll();
    }
}










//package com.demo.musicapp.service;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.demo.musicapp.entity.UserLogin;
//import com.demo.musicapp.repo.UserLoginRepo;
//
//@Service
//
//public class UserLoginService {
//	
//	@Autowired
//	UserLoginRepo userLoginRepo;
//	
//	//post
//	public UserLogin createUserLogin(UserLogin userLogin) {
//		return userLoginRepo.save(userLogin);
//	}
//	
//	//get	
//	public List<UserLogin> getUserLogin() {
//		return userLoginRepo.findAll();
//    }
//	
//	
//}

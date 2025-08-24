
package com.demo.musicapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.demo.musicapp.entity.UserLogin;
import com.demo.musicapp.service.UserLoginService;

import java.util.List;

@RestController
@RequestMapping("/musicApp/login")
@CrossOrigin(origins = "http://localhost:5173")
public class UserLoginController {

    @Autowired
    UserLoginService userLoginService;

    @PostMapping("/validateLogin")
    public String validateLogin(@RequestBody UserLogin userLogin) {
        return userLoginService.loginUser(userLogin);
    }

    @PostMapping("/createUserLogin")
    public UserLogin createUserLogin(@RequestBody UserLogin userLogin) {
        return userLoginService.createUserLogin(userLogin);
    }

    @GetMapping("/getUserLogin")
    public List<UserLogin> getUserLogin() {
        return userLoginService.getUserLogin();
    }
}










//package com.demo.musicapp.controller;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.demo.musicapp.entity.UserLogin;
//import com.demo.musicapp.service.UserLoginService;
//
//@RestController
//@RequestMapping("/musicApp/login")
//@CrossOrigin(origins = "http://localhost:5173") // Allow only your frontend
//
//
//public class UserLoginController {
//
//	@Autowired
//	UserLoginService userLoginService;
//	
//	@PostMapping("/createUserLogin")
//	public UserLogin createUserLogin(@RequestBody UserLogin userLogin) {
//		return userLoginService.createUserLogin(userLogin);
//	}
//	
//	@GetMapping("/getUserLogin")
//	public List<UserLogin> getUserLogin() { 
//		return userLoginService.getUserLogin();
//    }
//	
//}

package com.demo.musicapp.controller;

import com.demo.musicapp.entity.MusicTypes;
import com.demo.musicapp.service.MusicTypesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/musicApp/musicTypes")
@CrossOrigin(origins = "*")
//@CrossOrigin(origins = "http://localhost:3000")  

public class MusicTypesController {

    @Autowired
    private MusicTypesService musicTypesService;
    
    
    
    
     

    @PostMapping(value = "/createMusicTypes", consumes = "multipart/form-data")
    public MusicTypes createMusicTypes(
        @RequestParam("title") String title,
        @RequestParam("bgColor") String bgColor,
        @RequestParam("file") MultipartFile file
    ) throws IOException {
    	
    	

        MusicTypes m = new MusicTypes();
        m.setTitle(title);
        m.setBgColor(bgColor);               
        m.setFile(file.getOriginalFilename());
        m.setData(file.getBytes());
        m.setType(file.getContentType());

        return musicTypesService.createMusicTypes(m);
    }

    @GetMapping("/getMusicTypes")
    public List<MusicTypes> getMusicTypes(){
        return musicTypesService.getMusicTypes();
    }
}



//package com.demo.musicapp.controller;
//
//import com.demo.musicapp.entity.MusicTypes;
//import com.demo.musicapp.service.MusicTypesService;
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
//@RestController
//@RequestMapping("/musicApp/musicTypes")
//@CrossOrigin(origins = "http://localhost:3000")  
//public class MusicTypesController {
//
//    @Autowired
//    MusicTypesService musicTypesService;
//
//     
//    @PostMapping("/createMusicTypes")
//	public MusicTypes createMusicTypes(@RequestBody MusicTypes musicTypes) {
//		return musicTypesService.createMusicTypes(musicTypes);
//	}
//	
//	@GetMapping("/getMusicTypes")
//	
//	public List<MusicTypes> getMusicTypes(){
//		return musicTypesService.getMusicTypes();
//	}	
//	
//	 
//    
//}

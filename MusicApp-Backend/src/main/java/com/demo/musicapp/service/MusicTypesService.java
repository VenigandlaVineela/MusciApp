package com.demo.musicapp.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.demo.musicapp.entity.MusicTypes;
import com.demo.musicapp.repo.MusicTypesRepo;

@Service
public class MusicTypesService {

    @Autowired
    private MusicTypesRepo musicTypesRepo;

    public MusicTypes createMusicTypes(MusicTypes musicTypes) {
        return musicTypesRepo.save(musicTypes);
    }

    public List<MusicTypes> getMusicTypes() {
        return musicTypesRepo.findAll();
    }
}






//package com.demo.musicapp.service;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service; 
//import com.demo.musicapp.entity.MusicTypes;
//import com.demo.musicapp.repo.MusicTypesRepo;
//
//@Service
//public class MusicTypesService {
//
//    @Autowired
//    MusicTypesRepo musicTypesRepo; 
//    
//    //put
//    public MusicTypes createMusicTypes(MusicTypes musciTypes) {
//    	return musicTypesRepo. save(musciTypes);         
//    }
//
//    //get
//    public List<MusicTypes> getMusicTypes() {
//    	return musicTypesRepo.findAll();
//    }
//}

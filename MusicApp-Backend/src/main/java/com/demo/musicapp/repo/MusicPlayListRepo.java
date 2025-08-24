package com.demo.musicapp.repo;

import com.demo.musicapp.entity.MusicPlayList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MusicPlayListRepo extends JpaRepository<MusicPlayList, Long> {

    List<MusicPlayList> findByMusicTypeIgnoreCase(String musicType);
//    List<MusicPlayList> findBySinger(String singer);
    List<MusicPlayList> findByTitle(String title);
     List<MusicPlayList> findBySinger(String singer);

    // (Optional) if you want case-insensitive search
    List<MusicPlayList> findBySingerIgnoreCase(String singer);

 

 }

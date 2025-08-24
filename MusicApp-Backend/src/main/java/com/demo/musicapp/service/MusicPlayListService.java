package com.demo.musicapp.service;

import com.demo.musicapp.entity.MusicPlayList;
import com.demo.musicapp.repo.MusicPlayListRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MusicPlayListService {

    @Autowired
    private MusicPlayListRepo musicPlayListRepo;

    // Save or update a song
    public MusicPlayList saveMusic(MusicPlayList music) {
        return musicPlayListRepo.save(music);
    }

    // Get all songs
    public List<MusicPlayList> getAllMusic() {
        return musicPlayListRepo.findAll();
    }

    // Get song by ID
    public Optional<MusicPlayList> getMusicById(Long id) {
        return musicPlayListRepo.findById(id);
    }

    // Delete song by ID
    public void deleteMusic(Long id) {
        musicPlayListRepo.deleteById(id);
    }

    // Find songs by genre/music type
    public List<MusicPlayList> getMusicByType(String musicType) {
        return musicPlayListRepo.findByMusicTypeIgnoreCase(musicType);
    }

    // Find songs by singer
    public List<MusicPlayList> getMusicBySinger(String singer) {
        return musicPlayListRepo.findBySinger(singer);
    }

    // Find songs by title
    public List<MusicPlayList> getMusicByTitle(String title) {
        return musicPlayListRepo.findByTitle(title);
    }
    
    
 // ✅ Update song by ID
    public MusicPlayList updateMusic(Long id, MusicPlayList updatedMusic) {
        return musicPlayListRepo.findById(id).map(existingMusic -> {
            existingMusic.setTitle(updatedMusic.getTitle());
            existingMusic.setSinger(updatedMusic.getSinger());
            existingMusic.setMusicType(updatedMusic.getMusicType());
            existingMusic.setFile(updatedMusic.getFile());
            existingMusic.setImageName(updatedMusic.getImageName());
            return musicPlayListRepo.save(existingMusic);
        }).orElseThrow(() -> new RuntimeException("Music with ID " + id + " not found"));
    }
   
}

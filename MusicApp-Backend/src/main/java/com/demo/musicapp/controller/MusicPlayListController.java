package com.demo.musicapp.controller;

import com.demo.musicapp.entity.MusicPlayList;
import com.demo.musicapp.service.MusicPlayListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/musicApp")
@CrossOrigin(origins = "*") // allow frontend to access
public class MusicPlayListController {

    @Autowired
    private MusicPlayListService musicPlayListService;

    // === GET ALL SONGS (only metadata, not heavy files) ===
    @GetMapping("/music/all")
    public List<MusicPlayList> getAllMusic() {
        return musicPlayListService.getAllMusic();
    }

    // === GET SONG BY ID (metadata only) ===
    @GetMapping("/music/{id}")
    public ResponseEntity<MusicPlayList> getMusicById(@PathVariable Long id) {
        return musicPlayListService.getMusicById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // === GET AUDIO FILE ===
    @GetMapping("/music/{id}/audio")
    public ResponseEntity<byte[]> getAudio(@PathVariable Long id) {
        return musicPlayListService.getMusicById(id)
                .map(music -> ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + music.getFile() + "\"")
                        .header(HttpHeaders.CONTENT_TYPE, "audio/mpeg")    
                        .body(music.getData()))
                .orElse(ResponseEntity.notFound().build());
    }

    // === GET IMAGE FILE ===
    @GetMapping("/music/{id}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        return musicPlayListService.getMusicById(id)
                .map(music -> ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + music.getImageName() + "\"")
                        .body(music.getImageData()))
                .orElse(ResponseEntity.notFound().build());
    }
 // === GET SONGS BY MUSIC TYPE ===
    @GetMapping("/music/type/{musicType}")
    public List<MusicPlayList> getMusicByType(@PathVariable String musicType) {
        return musicPlayListService.getMusicByType(musicType);
    }
    
    
 // Get songs by singer
    @GetMapping("/singer/{singer}")
    public List<MusicPlayList> getMusicBySinger(@PathVariable String singer) {
        return musicPlayListService.getMusicBySinger(singer);
    }
    
    
    
    // === SAVE / UPDATE ===
    @PostMapping("/music")
    public MusicPlayList saveMusic(@RequestBody MusicPlayList music) {
        return musicPlayListService.saveMusic(music);
    }

    
    @PutMapping("/music/{id}")
    public MusicPlayList updateMusic(
            @PathVariable Long id,
            @RequestParam("title") String title,
            @RequestParam("singer") String singer,
            @RequestParam("musicType") String musicType,
            @RequestParam(value = "audioFile", required = false) MultipartFile audioFile,
            @RequestParam(value = "imageFile", required = false) MultipartFile imageFile
    ) {
        MusicPlayList existing = musicPlayListService.getMusicById(id)
                .orElseThrow(() -> new RuntimeException("Music with ID " + id + " not found"));

        existing.setTitle(title);
        existing.setSinger(singer);
        existing.setMusicType(musicType);

        try {
            if (audioFile != null && !audioFile.isEmpty()) {
                existing.setFile(audioFile.getOriginalFilename());
                existing.setData(audioFile.getBytes());
            }
            if (imageFile != null && !imageFile.isEmpty()) {
                existing.setImageName(imageFile.getOriginalFilename());
                existing.setImageData(imageFile.getBytes());
            }
        } catch (Exception e) {
            throw new RuntimeException("File processing error: " + e.getMessage());
        }

        return musicPlayListService.saveMusic(existing); // reuse save()
    }


    // === DELETE ===
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteMusic(@PathVariable Long id) {
//        return musicPlayListService.getMusicById(id)
//                .map(music -> {
//                    musicPlayListService.deleteMusic(id);
//                    return ResponseEntity.noContent().build();
//                }).orElse(ResponseEntity.notFound().build());
//    }
}

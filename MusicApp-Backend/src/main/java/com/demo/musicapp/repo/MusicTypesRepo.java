package com.demo.musicapp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.demo.musicapp.entity.MusicTypes;

public interface MusicTypesRepo extends JpaRepository<MusicTypes, Long> { }

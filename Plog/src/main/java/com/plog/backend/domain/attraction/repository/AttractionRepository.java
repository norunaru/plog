package com.plog.backend.domain.attraction.repository;

import com.plog.backend.domain.attraction.entity.Attraction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AttractionRepository extends JpaRepository<Attraction, Long> {


    @Query(value = "SELECT * FROM attraction ORDER BY RANDOM() LIMIT 1",nativeQuery = true)
    Attraction findRandomAttraction();

    @Query(value = "SELECT * FROM attraction " +
            "ORDER BY (6371 * acos(cos(radians(:lat)) * cos(radians(lat)) * cos(radians(lon) - radians(:lon)) + sin(radians(:lat)) * sin(radians(lat)))) ASC LIMIT 1",
            nativeQuery = true)
    Attraction findClosestAttraction(@Param("lat") Float lat, @Param("lon") Float lon);
}

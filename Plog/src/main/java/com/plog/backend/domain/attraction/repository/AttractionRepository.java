package com.plog.backend.domain.attraction.repository;

import com.plog.backend.domain.attraction.entity.Attraction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AttractionRepository extends JpaRepository<Attraction, Long> {
    @Query(value = "SELECT * FROM attraction ORDER BY RANDOM() LIMIT 1",nativeQuery = true)
    Attraction findRandomAttraction();
}

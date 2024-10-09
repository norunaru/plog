package com.plog.backend.domain.trail.repository;

import com.plog.backend.domain.trail.entity.Trail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface TrailRepository extends JpaRepository<Trail, Long> {
    @Query(value = """
            SELECT * FROM trail t
            WHERE (:type = 0 AND t.city >= 0.7)
            OR (:type = 1 AND t.ocean >= 0.7)
            OR (:type = 2 AND t.lake >= 0.7)
            OR (:type = 3 AND t.park >= 0.7)
            AND (6371 * acos(cos(radians(:lat)) * cos(radians(t.center[1])) 
            * cos(radians(t.center[0]) - radians(:lon)) + sin(radians(:lat)) 
            * sin(radians(t.center[1])))) <= 30
            """, nativeQuery = true)
    List<Trail> findRecommendedTrails(@Param("lat") Float lat,
                                      @Param("lon") Float lon,
                                      @Param("type") Integer type,
                                      Pageable pageable);
    // Haversine 공식 사용: 주어진 위도, 경도(lat, lon)에서 5km 내에 있는 Trail 조회
    @Query(value = "SELECT * FROM trail t " +
            "WHERE " +
            "(6371 * acos(cos(radians(:lat)) * cos(radians(t.center[1])) " +
            "* cos(radians(t.center[2]) - radians(:lon)) + sin(radians(:lat)) * sin(radians(t.center[1])))) < :distance",
            nativeQuery = true)
    List<Trail> findTrailsWithinDistance(
            @Param("lat") Float lat,
            @Param("lon") Float lon,
            @Param("distance") Float distance
    );
}

package com.plog.backend.domain.trail.repository;

import com.plog.backend.domain.trail.entity.Trail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrailRepository extends JpaRepository<Trail, Long> {

}

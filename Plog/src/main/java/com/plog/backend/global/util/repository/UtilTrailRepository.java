package com.plog.backend.global.util.repository;

import com.plog.backend.domain.trail.entity.Trail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UtilTrailRepository extends JpaRepository<Trail, Integer> {

}

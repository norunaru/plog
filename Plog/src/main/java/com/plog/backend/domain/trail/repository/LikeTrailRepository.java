package com.plog.backend.domain.trail.repository;

import com.plog.backend.domain.trail.entity.LikeTrail;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeTrailRepository extends JpaRepository<LikeTrail, Long> {

    LikeTrail findByTrailIdAndMemberId(Long trailId, Long memberId);

    List<LikeTrail> findAllByMemberId(Long memberId);
}

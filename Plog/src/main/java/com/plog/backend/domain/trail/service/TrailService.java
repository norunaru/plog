package com.plog.backend.domain.trail.service;

import com.plog.backend.domain.trail.dto.request.TrailPositionRequestDto;
import com.plog.backend.domain.trail.dto.response.LikeTrailListResponseDto;
import com.plog.backend.domain.trail.dto.response.TrailDetailDto;
import com.plog.backend.domain.trail.dto.response.TrailListResponseDto;
import com.plog.backend.domain.trail.dto.response.TrailRecommendDto;
import java.util.List;

public interface TrailService {

    TrailListResponseDto getAllTrails();
    // 디테일 추가
    TrailDetailDto getTrailById(Long id, Long memberId);

    void createTrailCenter();

    List<TrailRecommendDto> getRecommendedTrail(Long memberId);

    List<TrailRecommendDto> getRecommendedByPositionTrail(Long memberId, TrailPositionRequestDto trailPositionRequestDto);

    void like(Long memberId,Long trailId);

    void unlike(Long memberId, Long trailId);

    LikeTrailListResponseDto getlikeTrail();
}

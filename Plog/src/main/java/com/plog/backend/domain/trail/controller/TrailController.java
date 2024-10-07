package com.plog.backend.domain.trail.controller;

import com.plog.backend.domain.trail.dto.request.TrailPositionRequestDto;
import com.plog.backend.domain.trail.service.TrailService;
import com.plog.backend.global.common.util.MemberInfo;
import com.plog.backend.global.dto.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/trail")
public class TrailController {

    private final TrailService trailService;

    @GetMapping("")
    public SuccessResponse<?> trail() {
        return SuccessResponse.ok(trailService.getAllTrails());
    }
    // 디테일 조회
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{trailId}")
    public SuccessResponse<?> getTrail(@PathVariable(name = "trailId") Long trailId) {
        return SuccessResponse.ok(trailService.getTrailById(trailId, MemberInfo.getUserId()));
    }

    @GetMapping("/center")
    @Operation(summary = "중심 좌표 구하기", description = "새로운 산책로 추가시 실행(프론트 사용 X)")
    public SuccessResponse<?> center() {
        trailService.createTrailCenter();
        return SuccessResponse.ok();
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/recommend")
    @Operation(summary = "사용자 기반 플로깅 코스 추천", description = "플로깅 코스 추천 API(토큰만 넘기면 알아서 추천)")
    public SuccessResponse<?> recommend() {
        return SuccessResponse.ok(trailService.getRecommendedTrail(MemberInfo.getUserId()));
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/postion")
    @Operation(summary = "위치 기반 플로깅 코스 추천", description = "플로깅 코스 추천 API(위치 좌표를 넘겨주면 추천)")
    public SuccessResponse<?> postion(@RequestBody TrailPositionRequestDto trailPositionRequestDto) {
        return SuccessResponse.ok(trailService.getRecommendedByPositionTrail(MemberInfo.getUserId(),trailPositionRequestDto));
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/like/{trailId}")
    @Operation(summary = "좋아요 API", description = "토큰과 trailID 전달")
    public SuccessResponse<?> like(@PathVariable(name = "trailId") Long trailId) {
        trailService.like(MemberInfo.getUserId(), trailId);
        return SuccessResponse.ok();
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/unlike/{trailId}")
    @Operation(summary = "좋아요 취소 API", description = "토큰과 trailID 전달")
    public SuccessResponse<?> unlike(@PathVariable(name = "trailId") Long trailId) {
        trailService.unlike(MemberInfo.getUserId(), trailId);
        return SuccessResponse.ok();
    }
}

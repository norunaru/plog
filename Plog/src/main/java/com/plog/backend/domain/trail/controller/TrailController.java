package com.plog.backend.domain.trail.controller;

import com.plog.backend.domain.trail.service.TrailService;
import com.plog.backend.global.common.util.MemberInfo;
import com.plog.backend.global.dto.SuccessResponse;
import com.plog.backend.global.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/trail")
public class TrailController {

    private final TrailService trailService;

    @GetMapping("")
    public SuccessResponse<?> trail() {
        return SuccessResponse.ok(trailService.getAllTrails());
    }

    @GetMapping("/center")
    public SuccessResponse<?> center() {
        trailService.createTrailCenter();
        return SuccessResponse.ok();
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/recommend")
    public SuccessResponse<?> recommend() {
        return SuccessResponse.ok(trailService.getRecommendedTrail(MemberInfo.getUserId()));
    }
}

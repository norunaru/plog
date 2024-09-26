package com.plog.backend.domain.activity.controller;

import com.plog.backend.domain.activity.dto.request.ActivitySaveRequestDto;
import com.plog.backend.domain.activity.service.ActivityService;
import com.plog.backend.global.common.util.MemberInfo;
import com.plog.backend.global.dto.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@PreAuthorize("isAuthenticated()")
@RequiredArgsConstructor
@RequestMapping("/activities")
@RestController
public class ActivityController {

    private final ActivityService activityService;

    @PostMapping("")
    @Operation(summary = "플로깅 일지 기록", description = "플로깅 일지 기록(저장) API")
    public SuccessResponse<?> save(@RequestBody ActivitySaveRequestDto activitySaveRequestDto) {
        activityService.save(activitySaveRequestDto);
        return SuccessResponse.created();
    }

//    @GetMapping("")
//    @Operation(summary = "플로깅 일지 전체 조회(모든 데이터 조회)", description = "플로깅 일지 전체 조회 (모든 데이터 조회) API")
//    public SuccessResponse<?> findAll() {
//        return SuccessResponse.ok(activityService.findAllActivity());
//    }

    @GetMapping("/")
    @Operation(summary = "해당 멤버 일지 전체 조회", description = "email로 해당 일지 전체 조회 API")
    public SuccessResponse<?> findByEmail() {
        log.info("어떤 값이 나올까요 {}", MemberInfo.getEmail());
        log.info("어떤 값이 나올까요 {}", MemberInfo.getUserId());

        return SuccessResponse.ok(activityService.findActivityById(MemberInfo.getUserId()));
    }

}

package com.plog.backend.domain.activity.controller;

import com.plog.backend.domain.activity.dto.request.ActivitySaveRequestDto;
import com.plog.backend.domain.activity.dto.request.ActivityUpdateRequestDto;
import com.plog.backend.domain.activity.dto.response.ActivityTotalCountResponseDto;
import com.plog.backend.domain.activity.service.ActivityService;
import com.plog.backend.global.common.util.MemberInfo;
import com.plog.backend.global.dto.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@PreAuthorize("isAuthenticated()")
@RequiredArgsConstructor
@RequestMapping("/activities")
@RestController
public class ActivityController {

    private final ActivityService activityService;

    @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "플로깅 일지 기록", description = "플로깅 일지 기록(저장) API")
    public SuccessResponse<?> save(@ModelAttribute ActivitySaveRequestDto activitySaveRequestDto)
        throws IOException {
        activityService.save(activitySaveRequestDto, MemberInfo.getUserId());
        return SuccessResponse.created();
    }

    @GetMapping("")
    @Operation(summary = "해당 멤버 일지 전체 조회", description = "member_id로 해당 일지 전체 조회 API")
    public SuccessResponse<?> findByMemberId() {
        return SuccessResponse.ok(activityService.findActivityByMemberId(MemberInfo.getUserId()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Activity 상세 조회", description = "Activity Id 로 일지 상세 조회 API")
    public SuccessResponse<?> findById(@PathVariable Long id) {
        return SuccessResponse.ok(activityService.findActivityById(id));
    }

    @PatchMapping("/update")
    @Operation(summary = "Activity 수정", description = "Activity Id 로 일지 수정 API")
    public SuccessResponse<?> modify(
        @ModelAttribute ActivityUpdateRequestDto activityUpdateRequestDto) throws IOException {
        activityService.updateActivity(activityUpdateRequestDto, MemberInfo.getUserId());
        return SuccessResponse.update();
    }

    @GetMapping("/total")
    @Operation(summary = "해당 유저 총 일지 수", description = "member_id로 해당 일지 전체 조회")
    public SuccessResponse<?> total() {
        return SuccessResponse.ok(ActivityTotalCountResponseDto.builder()
            .totalCount(activityService.getTotalActivityCount(MemberInfo.getUserId())).build());
    }
}

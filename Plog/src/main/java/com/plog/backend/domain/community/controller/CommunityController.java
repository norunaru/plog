package com.plog.backend.domain.community.controller;

import com.plog.backend.domain.activity.service.ActivityService;
import com.plog.backend.domain.community.repository.CommunityRepository;
import com.plog.backend.domain.community.service.CommunityService;
import com.plog.backend.global.common.util.MemberInfo;
import com.plog.backend.global.dto.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Slf4j
@PreAuthorize("isAuthenticated()")
@RequiredArgsConstructor
@RequestMapping("/communities")
@RestController
public class CommunityController {

    private final CommunityService communityService;

    @GetMapping("")
    public SuccessResponse<?> getAllCommunities() {
        return SuccessResponse.ok(communityService.getAllMyCommunities(MemberInfo.getUserId()));
    }

    @GetMapping("/friends")
    public SuccessResponse<?> getAllFriends() {
        return SuccessResponse.ok(communityService.getAllFriendsCommunities(MemberInfo.getUserId()));
    }

    @PostMapping("/{id}")
    @Operation(summary = "Activity 커뮤니티 등록", description = "Activity Id 로 커뮤니티 등록 API(등록 성공시 true, 아니면 false)")
    public SuccessResponse<?> postCommunity(@PathVariable Long id) {
        Boolean response = communityService.addCommunity(MemberInfo.getUserId(),id);
        return SuccessResponse.ok(response);
    }
}

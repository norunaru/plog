package com.plog.backend.domain.friend.controller;

import com.plog.backend.domain.friend.dto.request.FriendRequestDto;
import com.plog.backend.domain.friend.service.FriendService;
import com.plog.backend.global.dto.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/friends")
@RestController
@RequiredArgsConstructor
public class FriendController {

    private final FriendService friendService;

    @PostMapping("/request")
    @Operation(summary = "친구 요청", description = "친구 요청 api")
    public SuccessResponse<?> addFriend(@RequestBody FriendRequestDto friendRequestDto) {
        friendService.requestFriend(friendRequestDto.getFriendID());
        return SuccessResponse.ok();
    }

    @GetMapping("")
    @Operation(summary = "친구 조회", description = "친구 조회 api")
    public SuccessResponse<?> getFriends() {
        return SuccessResponse.ok(friendService.getFriends());
    }

    @GetMapping("/requestList")
    @Operation(summary = "친구 요청 조회", description = "친구 조회 api")
    public SuccessResponse<?> getFriendRequestList() {
        return SuccessResponse.ok(friendService.getFriends());
    }

    @PostMapping("")
    @Operation(summary = "친구 승락", description = "친구 승락 api")
    public SuccessResponse<?> acceptFriend(@RequestBody FriendRequestDto friendRequestDto) {
        friendService.addFriend(friendRequestDto.getFriendID());
        return SuccessResponse.ok();
    }

    @DeleteMapping("")
    @Operation(summary = "친구 삭제 or 친구 요청 삭제", description = "친구 삭제 api")
    public SuccessResponse<?> rejectFriend(@RequestBody FriendRequestDto friendRequestDto) {
        friendService.removeFriend(friendRequestDto.getFriendID());
        return SuccessResponse.deleted();
    }

    @GetMapping("/{email}")
    @Operation(summary = "유저 이메일 검색", description = "유저 이메일 검색 api")
    public SuccessResponse<?> getFriend(@PathVariable String email) {
        return SuccessResponse.ok(friendService.findByEmail(email));
    }
}

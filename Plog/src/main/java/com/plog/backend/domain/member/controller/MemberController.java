package com.plog.backend.domain.member.controller;

import com.plog.backend.domain.member.dto.MemberDto;
import com.plog.backend.domain.member.dto.request.MemberSurveyRequestDto;
import com.plog.backend.domain.member.dto.response.MemberLoginResponseDto;
import com.plog.backend.domain.member.dto.request.MemberLoginRequestDto;
import com.plog.backend.domain.member.service.MemberService;
import com.plog.backend.global.dto.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/members")
@RestController
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/login")
    @Operation(summary = "로그인", description = "로그인 할 때 사용하는 API")
    public SuccessResponse<?> login(@RequestBody MemberLoginRequestDto memberLoginRequestDto) {
        MemberLoginResponseDto loginResponseDto = memberService.login(memberLoginRequestDto);
        if (loginResponseDto.getIsFirstLogin() == 1) {
            return SuccessResponse.created(loginResponseDto);
        }
        return SuccessResponse.ok(loginResponseDto);
    }

    @PostMapping("/logout")
    @Operation(summary = "로그아웃", description = "로그아웃 할 때 사용하는 API")
    public SuccessResponse<?> logout(@RequestBody MemberLoginRequestDto memberLoginRequestDto) {
        // 블랙리스트에 accessToken 과 refreshToken 을 저장하는 로그아웃 방식

        // 1. 해당하는 토큰을 블랙리스트에 담는다

        // 2. 끝

        return SuccessResponse.ok();
    }

    @PostMapping("/survey")
    @Operation(summary = "설문 조사", description = "설문 조사 정보 등록 할 때 사용하는 API")
    public SuccessResponse<?> survey(@RequestBody MemberSurveyRequestDto memberSurveyRequestDto) {
        memberService.updateMemberSurvey(memberSurveyRequestDto);
        return SuccessResponse.ok();
    }
}

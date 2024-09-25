package com.plog.backend.domain.member.service;

import com.plog.backend.domain.member.dto.request.MemberJoinRequestDto;
import com.plog.backend.domain.member.dto.request.MemberLoginRequestDto;
import com.plog.backend.domain.member.dto.request.MemberSurveyRequestDto;
import com.plog.backend.domain.member.dto.response.MemberLoginResponseDto;

public interface MemberService {

    MemberLoginResponseDto login(MemberLoginRequestDto memberLoginRequestDto);

    void updateMemberSurvey(MemberSurveyRequestDto memberSurveyRequestDto);
}

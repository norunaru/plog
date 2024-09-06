package com.plog.backend.domain.member.service;

import com.plog.backend.domain.member.dto.request.MemberJoinRequestDto;
import com.plog.backend.domain.member.dto.request.MemberLoginRequestDto;

public interface MemberService {

    String join(MemberJoinRequestDto memberJoinRequestDto, String signUpMethod);

    String login(MemberLoginRequestDto memberLoginRequestDto);
}

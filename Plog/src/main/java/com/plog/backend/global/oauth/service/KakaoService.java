package com.plog.backend.global.oauth.service;

import com.plog.backend.global.oauth.dto.KakaoMemberResponseDto;

public interface KakaoService {

    KakaoMemberResponseDto getKakaoUser(String code);
}

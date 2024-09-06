package com.plog.backend.global.oauth.dto;

import lombok.Data;

@Data
public class KakaoMemberResponseDto {

    private String code;
    private String email;
}

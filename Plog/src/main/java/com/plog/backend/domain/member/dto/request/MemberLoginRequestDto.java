package com.plog.backend.domain.member.dto.request;

import lombok.Data;

@Data
public class MemberLoginRequestDto {

    private String email;
    private String password;
}

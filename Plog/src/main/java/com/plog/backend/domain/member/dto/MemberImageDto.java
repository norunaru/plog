package com.plog.backend.domain.member.dto;

import lombok.Data;

@Data
public class MemberImageDto {

    private String email;
    private String savedUrl;
    private String savedPath;
}

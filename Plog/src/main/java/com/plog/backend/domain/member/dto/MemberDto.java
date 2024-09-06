package com.plog.backend.domain.member.dto;


import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class MemberDto {

    private String email;
    private String password;
    private String name;
    private String nickname;
    private Integer gender;
    private LocalDate birth;
    private String phoneNumber;
    private String role;
    private LocalDateTime regDate;
    private Integer isResign;
}

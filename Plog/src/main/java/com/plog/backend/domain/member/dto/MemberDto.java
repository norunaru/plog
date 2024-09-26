package com.plog.backend.domain.member.dto;


import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class MemberDto {

    private Long id;
    private String email;
    private String name;
    private String nickname;
    private Integer gender;
    private LocalDate birth;
    private String phoneNumber;
    private String role;
    private LocalDateTime regDate;
    private Integer isResign;
    private Boolean isFirst;
    private Integer activityTime;
    private Integer floggingTime;
    private Integer reward;
    private Integer regionType;
    private Float regionLat;
    private Float regionLon;
}

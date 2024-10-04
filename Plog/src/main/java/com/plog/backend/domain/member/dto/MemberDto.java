package com.plog.backend.domain.member.dto;


import java.time.LocalDateTime;
import lombok.Data;

@Data
public class MemberDto {

    private Long id;
    private String email;
    private String nickname;
    private String role;
    private LocalDateTime regDate;
    private Integer isResign;
    private Boolean isFirst;
    private Integer activityTime;
    private Integer floggingTime;
    private Integer regionType;
    private Float regionLat;
    private Float regionLon;
}

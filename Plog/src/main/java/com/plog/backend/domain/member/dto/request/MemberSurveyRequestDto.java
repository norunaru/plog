package com.plog.backend.domain.member.dto.request;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class MemberSurveyRequestDto {

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
    private Integer region_type;
    private Float regionLat;
    private Float regionLon;
}

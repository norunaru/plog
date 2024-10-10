package com.plog.backend.domain.member.dto.request;

import lombok.Data;

@Data
public class MemberSurveyRequestDto {

    private Integer activityTime;
    private Integer floggingTime;
    private Integer region_type;
    private Float regionLat;
    private Float regionLon;
}

package com.plog.backend.domain.activity.dto.request;

import lombok.Data;

@Data
public class ActivitySaveRequestDto {

    private Long memberId;
    private Float[] lat;
    private Float[] lon;
    private Float distance;
    private Float time;
    private String review;
    private Double score;
}

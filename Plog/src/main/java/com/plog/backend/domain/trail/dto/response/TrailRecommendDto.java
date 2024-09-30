package com.plog.backend.domain.trail.dto.response;

import com.plog.backend.domain.trail.dto.TrailDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@AllArgsConstructor
@Data
public class TrailRecommendDto {
    private Long id;
    private String title;
    private Coordinate[] polygon;
    private Float area;
    private int time;
    private Boolean like;
    private String tags;
}

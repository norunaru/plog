package com.plog.backend.domain.trail.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@AllArgsConstructor
@Data
public class TrailDetailDto {
    private Long id;
    private String title;
    private Coordinate[] polygon;
    private Float area;
    private int time;
    private Boolean like;
    private String tags;
    private String imageUri;
}

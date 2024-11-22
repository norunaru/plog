package com.plog.backend.domain.trail.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TrailPositionRequestDto {
    private Float latitude;
    private Float longitude;
}

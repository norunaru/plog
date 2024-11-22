package com.plog.backend.domain.trail.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class Coordinate {
    private Float latitude;
    private Float longitude;
}
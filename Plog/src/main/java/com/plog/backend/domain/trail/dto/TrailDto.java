package com.plog.backend.domain.trail.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TrailDto {

    private Long id;
    private String name;
    private Float park;
    private Float ocean;
    private Float city;
    private Float lake;
    private Float shopCnt;
    private Float toiletCnt;
    private Float distance;
    private Float area;
    private Float[] lat;
    private Float[] lon;
}
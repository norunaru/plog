package com.plog.backend.domain.activity.dto;

import com.plog.backend.domain.activity.entity.ActivityImage;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ActivityDto {

    private Long id;
    private Long memberId;
    private String title;
    private Float[] lat;
    private Float[] lon;
    private Float totalDistance;
    private Float totalKcal;
    private Float totalTime;
    private LocalDateTime creationDate;
    private String locationName;
    private String review;
    private Float score;
    private List<ActivityImage> activityImages;
}
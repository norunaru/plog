package com.plog.backend.domain.activity.dto.response;

import com.plog.backend.domain.activity.entity.ActivityImage;
import com.plog.backend.domain.trail.entity.Trail;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ActivityFindByIdResponseDto {

    private Long id;
    private String title;
    private Float[] lat;
    private Float[] lon;
    private Float totalDistance;
    private Float totalKcal;
    private Float totalTime;
    private LocalDateTime creationDate;
    private String locationName;
    private String review;
    private Double score;
    private List<ActivityImage> activityImages;
    private String image;
}

package com.plog.backend.domain.activity.dto.request;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ActivitySaveRequestDto {

    private Long memberId;
    private Long trailId;
    private Float[] lat;
    private Float[] lon;
    private Float distance;
    private Float time;
    private String review;
    private Float score;
    private String title;
    private Float totalDistance;
    private Float totalKcal;
    private LocalDateTime creationDate;
    private String locationName;
    private List<MultipartFile> images;

}


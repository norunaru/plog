package com.plog.backend.domain.activity.dto.response;

import com.plog.backend.domain.activity.dto.ActivityImageDto;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ActivityFindByMemberIdResponseDto {

    private Long id;
    private String locationName;
    private LocalDateTime creationDate;
    private String title;
    private List<ActivityImageDto> activityImages;
    private Float score;
}

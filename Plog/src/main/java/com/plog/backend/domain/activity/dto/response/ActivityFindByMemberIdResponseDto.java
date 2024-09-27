package com.plog.backend.domain.activity.dto.response;

import java.time.LocalDateTime;
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
}

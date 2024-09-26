package com.plog.backend.domain.activity.dto.response;

import com.plog.backend.domain.activity.entity.Activity;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ActivityFindResponseDto {

    private List<Activity> activities;
}

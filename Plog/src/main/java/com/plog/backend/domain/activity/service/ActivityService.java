package com.plog.backend.domain.activity.service;

import com.plog.backend.domain.activity.dto.request.ActivitySaveRequestDto;
import com.plog.backend.domain.activity.dto.response.ActivityFindResponseDto;

public interface ActivityService {

    void save(ActivitySaveRequestDto activity);

    ActivityFindResponseDto findAllActivity();

    ActivityFindResponseDto findActivityById(Long id);
}

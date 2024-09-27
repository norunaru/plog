package com.plog.backend.domain.activity.service;

import com.plog.backend.domain.activity.dto.response.ActivityFindByIdResponseDto;
import com.plog.backend.domain.activity.dto.response.ActivityFindByMemberIdResponseDto;
import com.plog.backend.domain.activity.dto.request.ActivitySaveRequestDto;
import java.util.List;

public interface ActivityService {

    void save(ActivitySaveRequestDto activity);

    List<ActivityFindByMemberIdResponseDto> findActivityByMemberId(Long id);

    ActivityFindByIdResponseDto findActivityById(Long id);
}

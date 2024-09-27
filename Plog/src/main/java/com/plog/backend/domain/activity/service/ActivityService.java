package com.plog.backend.domain.activity.service;

import com.plog.backend.domain.activity.dto.ActivityDto;
import com.plog.backend.domain.activity.dto.request.ActivityUpdateRequestDto;
import com.plog.backend.domain.activity.dto.response.ActivityFindByIdResponseDto;
import com.plog.backend.domain.activity.dto.response.ActivityFindByMemberIdResponseDto;
import com.plog.backend.domain.activity.dto.request.ActivitySaveRequestDto;
import java.util.List;

public interface ActivityService {

    void save(ActivitySaveRequestDto activity, Long memberId);

    List<ActivityFindByMemberIdResponseDto> findActivityByMemberId(Long id);

    ActivityFindByIdResponseDto findActivityById(Long id);

    void updateActivity(ActivityUpdateRequestDto activityUpdateRequestDto, Long memberId);
}

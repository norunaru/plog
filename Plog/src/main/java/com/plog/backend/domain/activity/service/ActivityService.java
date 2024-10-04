package com.plog.backend.domain.activity.service;

import com.plog.backend.domain.activity.dto.request.ActivityUpdateRequestDto;
import com.plog.backend.domain.activity.dto.response.ActivityFindByIdResponseDto;
import com.plog.backend.domain.activity.dto.response.ActivityFindByMemberIdResponseDto;
import com.plog.backend.domain.activity.dto.request.ActivitySaveRequestDto;
import java.io.IOException;
import java.util.List;

public interface ActivityService {

    void save(ActivitySaveRequestDto activity, Long memberId) throws IOException;

    List<ActivityFindByMemberIdResponseDto> findActivityByMemberId(Long id);

    ActivityFindByIdResponseDto findActivityById(Long id);

    void updateActivity(ActivityUpdateRequestDto activityUpdateRequestDto, Long memberId)
        throws IOException;
}

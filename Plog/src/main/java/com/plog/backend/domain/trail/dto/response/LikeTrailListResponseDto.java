package com.plog.backend.domain.trail.dto.response;

import com.plog.backend.domain.trail.entity.LikeTrail;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LikeTrailListResponseDto {

    private Long totalLikeCount;
    private List<LikeTrail> likeTrailList;
}

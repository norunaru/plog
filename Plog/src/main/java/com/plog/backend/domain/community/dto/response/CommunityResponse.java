package com.plog.backend.domain.community.dto.response;

import com.plog.backend.domain.activity.entity.Activity;
import com.plog.backend.domain.member.entity.Member;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CommunityResponse {
    private Member member;
    private Activity activity;
}

package com.plog.backend.domain.community.service;

import com.plog.backend.domain.community.dto.response.CommunityResponse;
import com.plog.backend.domain.community.entity.Community;

import java.util.List;

public interface CommunityService {
    List<CommunityResponse> getAllMyCommunities(Long userId);

    List<CommunityResponse> getAllFriendsCommunities(Long userId);

    boolean addCommunity(Long userId, Long trailId);
}

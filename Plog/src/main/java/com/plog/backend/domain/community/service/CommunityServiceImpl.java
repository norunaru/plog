package com.plog.backend.domain.community.service;

import com.plog.backend.domain.activity.repository.ActivityRepository;
import com.plog.backend.domain.community.dto.response.CommunityResponse;
import com.plog.backend.domain.community.entity.Community;
import com.plog.backend.domain.community.repository.CommunityRepository;
import com.plog.backend.domain.friend.dto.request.FriendRequestDto;
import com.plog.backend.domain.friend.entity.Friend;
import com.plog.backend.domain.member.entity.Member;
import com.plog.backend.domain.member.repository.MemberRepository;
import com.plog.backend.domain.trail.repository.TrailRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Transactional
@Slf4j
@Service
@RequiredArgsConstructor
public class CommunityServiceImpl implements CommunityService{

    private final CommunityRepository communityRepository;
    private final MemberRepository memberRepository;
    private final ActivityRepository activityRepository;

    @Override
    public List<CommunityResponse> getAllMyCommunities(Long userId){
        System.out.println(userId);
        List<Community> communities = communityRepository.findAllByMemberId(userId);
        List<CommunityResponse> communityResponses = new ArrayList<>();
        for (Community community : communities){
            CommunityResponse response = CommunityResponse.builder()
                    .member(community.getMember())
                    .activity(community.getActivity())
                    .build();
            communityResponses.add(response);
        }
        return communityResponses;
    };

    @Override
    public List<CommunityResponse> getAllFriendsCommunities(Long userId){
        System.out.println(userId);
        Member member = memberRepository.findById(userId).orElseThrow();
        Map<Long, Friend> map = member.getFriends();
        System.out.println(map);
        List<CommunityResponse> communityResponses = new ArrayList<>();
        for(Long friendId : map.keySet()){
            List<Community> communities = communityRepository.findAllByMemberId(friendId);
            for (Community community : communities){
                CommunityResponse response = CommunityResponse.builder()
                        .member(community.getMember())
                        .activity(community.getActivity())
                        .build();
                communityResponses.add(response);
            }
        }
        return communityResponses;
    };

    @Override
    public boolean addCommunity(Long userId, Long activityId){
        System.out.println(userId);
        if(communityRepository.findByMemberIdAndActivityId(userId, activityId)!=null) return false;
        Community community = Community.builder()
                .member(memberRepository.findById(userId).orElseThrow())
                .activity(activityRepository.findById(activityId).orElseThrow())
                .build();
        communityRepository.save(community);
        return true;
    };
}

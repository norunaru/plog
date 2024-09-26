package com.plog.backend.domain.activity.service;

import com.plog.backend.domain.activity.dto.request.ActivitySaveRequestDto;
import com.plog.backend.domain.activity.dto.response.ActivityFindResponseDto;
import com.plog.backend.domain.activity.entity.Activity;
import com.plog.backend.domain.activity.repository.ActivityRepository;
import com.plog.backend.domain.member.entity.Member;
import com.plog.backend.domain.member.repository.MemberRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ActivityServiceImpl implements ActivityService {

    private final ActivityRepository activityRepository;
    private final MemberRepository memberRepository;
    private final ModelMapper mapper;

    @Override
    public void save(ActivitySaveRequestDto activity) {
        // 1. memberId로 Member 조회
        Member member = memberRepository.findById(activity.getMemberId())
            .orElseThrow(
                () -> new IllegalArgumentException("Invalid member ID: " + activity.getMemberId()));

        log.info("조회 member: {}", member);
        // 2. Activity 엔티티를 생성하여 저장
        Activity newActivity = Activity.builder()
            .member(member)
            .lat(activity.getLat())
            .lon(activity.getLon())
            .distance(activity.getDistance())
            .time(activity.getTime())
            .review(activity.getReview())
            .score(activity.getScore())
            .build();

        // 3. 저장
        activityRepository.save(newActivity);
    }

    @Override
    public ActivityFindResponseDto findAllActivity() {
        List<Activity> activities = activityRepository.findAll();
        return ActivityFindResponseDto.builder().activities(activities).build();
    }

    @Override
    public ActivityFindResponseDto findActivityById(Long id) {
        List<Activity> activities = activityRepository.findAllByMemberId(id);
        return ActivityFindResponseDto.builder().activities(activities).build();
    }
}

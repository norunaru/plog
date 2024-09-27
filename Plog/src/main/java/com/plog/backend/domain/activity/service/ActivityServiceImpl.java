package com.plog.backend.domain.activity.service;

import com.plog.backend.domain.activity.dto.ActivityDto;
import com.plog.backend.domain.activity.dto.ActivityImageDto;
import com.plog.backend.domain.activity.dto.request.ActivityUpdateRequestDto;
import com.plog.backend.domain.activity.dto.response.ActivityFindByIdResponseDto;
import com.plog.backend.domain.activity.dto.response.ActivityFindByMemberIdResponseDto;
import com.plog.backend.domain.activity.dto.request.ActivitySaveRequestDto;
import com.plog.backend.domain.activity.entity.Activity;
import com.plog.backend.domain.activity.entity.ActivityImage;
import com.plog.backend.domain.activity.repository.ActivityImageRepository;
import com.plog.backend.domain.activity.repository.ActivityRepository;
import com.plog.backend.domain.member.entity.Member;
import com.plog.backend.domain.member.repository.MemberRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Slf4j
@Service
@RequiredArgsConstructor
public class ActivityServiceImpl implements ActivityService {

    private final ActivityRepository activityRepository;
    private final ActivityImageRepository activityImageRepository;
    private final MemberRepository memberRepository;
    private final ModelMapper mapper;

    @Override
    public void save(ActivitySaveRequestDto activity, Long memberId) {
        // 1. memberId로 Member 조회
        Member member = memberRepository.findById(memberId)
            .orElseThrow(
                () -> new IllegalArgumentException("Invalid member ID: " + memberId));
        // 2. Activity 엔티티를 생성하여 저장
        Activity newActivity = Activity.builder()
            .member(member)
            .title(activity.getTitle())
            .lat(activity.getLat())
            .lon(activity.getLon())
            .totalDistance(activity.getDistance())
            .totalKcal(activity.getTotalKcal())
            .totalTime(activity.getTime())
            .creationDate(activity.getCreationDate())
            .locationName(activity.getLocationName())
            .review(activity.getReview())
            .score(activity.getScore())
            .build();
        // 3. Activity 저장
        activityRepository.save(newActivity);

        // 4. ActivityImage 생성 및 저장 (여러 장의 이미지 처리)
        if (activity.getActivityImages() != null) {
            for (ActivityImage image : activity.getActivityImages()) {
                ActivityImage activityImage = ActivityImage.builder()
                    .activity(newActivity)
                    .savedUrl(image.getSavedUrl())
                    .savedPath(image.getSavedPath())
                    .build();
                // 이미지 저장
                activityImageRepository.save(activityImage);
            }
        }
    }

    @Override
    public List<ActivityFindByMemberIdResponseDto> findActivityByMemberId(Long id) {
        List<Activity> activities = activityRepository.findAllByMemberId(id);

        return activities.stream()
            .map(activity -> ActivityFindByMemberIdResponseDto.builder()
                .id(activity.getId())
                .title(activity.getTitle())
                .locationName(activity.getLocationName())
                .creationDate(activity.getCreationDate())
                .build())
            .collect(Collectors.toList());
    }

    @Override
    public ActivityFindByIdResponseDto findActivityById(Long id) {
        // 예외처리 시간 남으면 만들면 좋음
        Activity activity = activityRepository.findById(id).orElseThrow();
        return mapper.map(activity, ActivityFindByIdResponseDto.class);
    }

    @Override
    public void updateActivity(ActivityUpdateRequestDto activityDto, Long memberId) {
        // 1. memberId로 Member 조회
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new IllegalArgumentException("Invalid member ID: " + memberId));

        // 2. 기존 Activity 조회
        Activity existingActivity = activityRepository.findById(activityDto.getId())
            .orElseThrow(
                () -> new IllegalArgumentException("Invalid activity ID: " + activityDto.getId()));

        // 3. Activity 엔티티 업데이트
        existingActivity.update(activityDto);

        // 4. Activity 저장
        activityRepository.save(existingActivity);
    }
}

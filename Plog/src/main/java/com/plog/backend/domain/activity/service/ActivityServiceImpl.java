package com.plog.backend.domain.activity.service;

import com.plog.backend.domain.activity.dto.request.ActivityUpdateRequestDto;
import com.plog.backend.domain.activity.dto.response.ActivityFindByIdResponseDto;
import com.plog.backend.domain.activity.dto.response.ActivityFindByMemberIdResponseDto;
import com.plog.backend.domain.activity.dto.request.ActivitySaveRequestDto;
import com.plog.backend.domain.activity.entity.Activity;
import com.plog.backend.domain.activity.entity.ActivityImage;
import com.plog.backend.domain.activity.repository.ActivityRepository;
import com.plog.backend.domain.member.entity.Member;
import com.plog.backend.domain.member.entity.MemberScore;
import com.plog.backend.domain.member.repository.MemberRepository;
import com.plog.backend.domain.member.repository.MemberScoreRepository;
import com.plog.backend.domain.trail.entity.Trail;
import com.plog.backend.domain.trail.repository.TrailRepository;
import com.plog.backend.global.s3.service.S3Service;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Transactional
@Slf4j
@Service
@RequiredArgsConstructor
public class ActivityServiceImpl implements ActivityService {

    private final ActivityRepository activityRepository;
    private final MemberScoreRepository memberScoreRepository;
    private final MemberRepository memberRepository;
    private final TrailRepository trailRepository;
    private final ModelMapper mapper;
    private final S3Service s3Service;

    @Transactional
    @Override
    public Long save(ActivitySaveRequestDto activity, Long memberId) throws IOException {

        // S3에 이미지 업로드
        List<MultipartFile> images = activity.getImages();
        List<String> imageUrls = new ArrayList<>();

        if (images != null && !images.isEmpty()) {
            for (MultipartFile image : images) {
                // 각 파일을 S3에 업로드하고, URL을 리스트에 추가
                String imageUrl = s3Service.uploadFile(image);
                imageUrls.add(imageUrl);
            }
        }

        // 1. memberId로 Member 조회
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new IllegalArgumentException("Invalid member ID: " + memberId));

        // 2. 클러스터링을 위한 유저 점수 추가
        // 2.1. trailId로 Trail 조회
        long trailId = activity.getTrailId();
        // 2.2. trailId
        MemberScore memberScore = memberScoreRepository.findByMemberId(memberId);
        memberScore.getScore()[(int) trailId] =
            activity.getScore() != null ? activity.getScore() : 0.0f;
        memberScoreRepository.save(memberScore);
        Long retunValue = -1L;
        Optional<Trail> trail = trailRepository.findById(trailId);
        if (trail.isPresent()) {
            Trail trailEntity = trail.get();
            member.setExpLevel(member.getExpLevel() + trailEntity.getExp());

            // 3. Activity 엔티티를 생성하여 저장
            Activity newActivity = Activity.builder()
                .member(member)
                .title(activity.getTitle() != null ? activity.getTitle() : "제목을 입력해 주세요!")
                .lat(activity.getLat() != null ? activity.getLat() : new Float[]{0.0f})
                .lon(activity.getLon() != null ? activity.getLon() : new Float[]{0.0f})
                .totalDistance(
                    activity.getTotalDistance() != null ? activity.getTotalDistance() : 0.0f)
                .totalKcal(activity.getTotalKcal() != null ? activity.getTotalKcal() : 0.0f)
                .totalTime(activity.getTotalTime() != null ? activity.getTotalTime() : 0.0f)
                .creationDate(activity.getCreationDate() != null ? activity.getCreationDate()
                    : LocalDateTime.now())
                .locationName(
                    trailEntity.getName() != null ? trailEntity.getName() : "위치 정보를 입력해 주세요!")
                .review(activity.getReview() != null ? activity.getReview() : "리뷰를 남겨주세요!")
                .score(activity.getScore() != null ? activity.getScore() : 0.0f)
                .trail(trailEntity)

                .build();

            // 3. ActivityImage 엔티티 생성 및 Activity와의 연관관계 설정
            List<ActivityImage> activityImages = new ArrayList<>();
            for (String url : imageUrls) {
                ActivityImage activityImage = ActivityImage.builder().savedUrl(url)
                    .activity(newActivity)  // 연관된 Activity 설정
                    .build();
                activityImages.add(activityImage);
            }

            // Activity 객체에 ActivityImage 설정
            newActivity.setActivityImages(activityImages);

            // 4. Activity와 ActivityImage 둘 다 저장 (Cascade 설정을 통해 자동으로 ActivityImage도 저장)
            retunValue = activityRepository.save(newActivity).getId();
        }
        return retunValue;
    }


    @Override
    public List<ActivityFindByMemberIdResponseDto> findActivityByMemberId(Long id) {
        // 활동 데이터를 트랜잭션 내에서 가져옴
        List<Activity> activities = activityRepository.findAllByMemberId(id);

        // 변환 작업
        return activities.stream()
            .map(activity -> ActivityFindByMemberIdResponseDto.builder()
                .id(activity.getId())
                .title(activity.getTitle())
                .locationName(activity.getLocationName())
                .creationDate(activity.getCreationDate())
                // ActivityImage 엔티티를 ActivityImageDto로 변환
                .images(activity.getTrail().getImage())
                .score(activity.getScore())
                .build()
            )
            .collect(Collectors.toList());
    }


    @Override
    public ActivityFindByIdResponseDto findActivityById(Long id) {
        return activityRepository.findById(id)
            .map(activity -> {
                ActivityFindByIdResponseDto responseDto = mapper.map(activity,
                    ActivityFindByIdResponseDto.class);
                responseDto.setImage(activity.getTrail().getImage());
                return responseDto;
            })
            .orElseThrow(); // 예외 처리가 필요할 때만 사용
    }


    @Override
    public void updateActivity(ActivityUpdateRequestDto activityDto, Long memberId)
        throws IOException {

        // S3에 이미지 업로드
        List<MultipartFile> images = activityDto.getImages();
        List<String> imageUrls = new ArrayList<>();

        if (images != null && !images.isEmpty()) {
            for (MultipartFile image : images) {
                // 각 파일을 S3에 업로드하고, URL을 리스트에 추가
                String imageUrl = s3Service.uploadFile(image);
                imageUrls.add(imageUrl);
            }
        }

        // 2. 기존 Activity 조회
        Activity existingActivity = activityRepository.findById(activityDto.getId()).orElseThrow(
            () -> new IllegalArgumentException("Invalid activity ID: " + activityDto.getId()));

        // 3. Activity 엔티티 업데이트
        existingActivity.update(activityDto, imageUrls);

        // 3. 클러스터링을 위한 유저 점수 추가
        // 3.1. trailId로 Trail 조회
        long trailId = existingActivity.getTrail().getId();
        // 3.2. trailId
        MemberScore memberScore = memberScoreRepository.findByMemberId(memberId);
        memberScore.getScore()[(int) trailId] = existingActivity.getScore();
        memberScoreRepository.save(memberScore);

        // 4. Activity 저장
        activityRepository.save(existingActivity);
    }

    @Override
    public Long getTotalActivityCount(Long memberId) {
        return activityRepository.countByMemberId(memberId);
    }
}

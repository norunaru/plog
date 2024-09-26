package com.plog.backend.domain.trail.service;

import com.plog.backend.domain.member.entity.Member;
import com.plog.backend.domain.member.entity.MemberScore;
import com.plog.backend.domain.member.repository.MemberRepository;
import com.plog.backend.domain.member.repository.MemberScoreRepository;
import com.plog.backend.domain.trail.dto.TrailDto;
import com.plog.backend.domain.trail.dto.response.TrailListResponseDto;
import com.plog.backend.domain.trail.dto.response.TrailRecommendDto;
import com.plog.backend.domain.trail.entity.LikeTrail;
import com.plog.backend.domain.trail.entity.Trail;
import com.plog.backend.domain.trail.repository.LikeTrailRepository;
import com.plog.backend.domain.trail.repository.TrailRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class TrailServiceImpl implements TrailService {

    private final TrailRepository trailRepository;
    private final LikeTrailRepository likeTrailRepository;
    private final MemberRepository memberRepository;
    private final MemberScoreRepository memberScoreRepository;
    private final ModelMapper mapper;

    @Override
    public TrailListResponseDto getAllTrails() {
        List<Trail> trails = trailRepository.findAll();

        // List<Trail>을 List<TrailListResponseDto>로 변환
        List<TrailDto> trailResponseDtos = trails.stream()
            .map(trail -> mapper.map(trail, TrailDto.class))  // 각 Trail 객체를 TrailResponseDto로 매핑
            .collect(Collectors.toList());

        // TrailListResponseDto에 변환된 리스트를 담아 반환
        return TrailListResponseDto.builder()
            .trails(trailResponseDtos)  // 변환된 리스트를 설정
            .build();
    }

    /*
    1. trail 불러오기
    2. trail의 위도 경도 값을 활용하여 중심 좌표 계산하기
    3. 저장하기
     */
    @Override
    public void createTrailCenter() {
        List<Trail> trails = trailRepository.findAll();

        for(Trail trail : trails) {
            Float[] lonArr = trail.getLon();
            Float[] latArr = trail.getLat();

            float lonSum = 0;
            for(Float lon : lonArr) {
                lonSum += lon;
            }
            float latSum = 0;
            for(Float lat : latArr) {
                latSum += lat;
            }
            trail.setCenter(new Float[] {latSum/latArr.length, lonSum/lonArr.length});
            trailRepository.save(trail);
        }
    }

    /*
    1. 유저가 평점을 준 산책로의 갯수가 5개 이하인 경우 => filter를 통해서 추천
        1.1. city : 0, ocean : 1, lake : 2, park : 3
        1.2. lon, lat
    2. 유저가 평점을 준 산책로의 갯수가 5개 이상인 경우
        2.1. 4점 이상을 준 산책로를 기반으로 검색
        2.2. userId를 넣어 추천 받기
    3. 추천 받은 산책로 정보와 함께 넘겨 주기
     */
    @Override
    public List<TrailRecommendDto> getRecommendedTrail(Long memberId){
        MemberScore memberScore = memberScoreRepository.findByMemberId(memberId);
        Double[] scores = memberScore.getScore();
        int count = 0;
        for(Double score : scores) {
            if(score>0) count++;
        }
        if(count>5) {

        } else {
            Member member = memberRepository.findById(memberId).orElseThrow();
            Float lat = member.getRegionLat();
            Float lon = member.getRegionLon();
            Integer type = member.getRegion_type();
            Pageable pageable = PageRequest.of(0, 3);

            List<Trail> recommendedTrails = trailRepository.findRecommendedTrails(lat, lon, type, pageable);

            List<TrailRecommendDto> response = new ArrayList<>();
            for(Trail trail : recommendedTrails) {
                int time = (int) (trail.getArea()/500);
                String tag = "";
                if(time>100) {
                    tag += "#고급 ";
                } else if(time>50) {
                    tag += "#중급 ";
                } else{
                    tag += "#초급 ";
                }
                switch (type){
                    case 0: {
                        tag += "#도심";
                        break;
                    }
                    case 1: {
                        tag += "#바다";
                        break;
                    }
                    case 2: {
                        tag += "#강";
                        break;
                    }
                    case 3: {
                        tag += "#공원";
                        break;
                    }
                }
                LikeTrail likeTrail = likeTrailRepository.findByTrailIdAndMemberId(trail.getId(),memberId);
                boolean like = true;
                if(likeTrail==null){
                    like=false;
                }
                TrailRecommendDto trailRecommendDto = TrailRecommendDto.builder()
                        .id(trail.getId())
                        .area(trail.getArea())
                        .lat(trail.getLat())
                        .lon(trail.getLon())
                        .title(trail.getName())
                        .time(time)
                        .tags(tag)
                        .like(like)
                        .build();
                response.add(trailRecommendDto);
            }
            return response;
        }
        return null;
    }
}

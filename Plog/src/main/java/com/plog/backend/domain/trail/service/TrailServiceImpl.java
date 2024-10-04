package com.plog.backend.domain.trail.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.plog.backend.domain.member.entity.Member;
import com.plog.backend.domain.member.entity.MemberScore;
import com.plog.backend.domain.member.repository.MemberRepository;
import com.plog.backend.domain.member.repository.MemberScoreRepository;
import com.plog.backend.domain.trail.dto.TrailDto;
import com.plog.backend.domain.trail.dto.request.TrailPositionRequestDto;
import com.plog.backend.domain.trail.dto.response.Coordinate;
import com.plog.backend.domain.trail.dto.response.TrailListResponseDto;
import com.plog.backend.domain.trail.dto.response.TrailRecommendDto;
import com.plog.backend.domain.trail.entity.LikeTrail;
import com.plog.backend.domain.trail.entity.Trail;
import com.plog.backend.domain.trail.repository.LikeTrailRepository;
import com.plog.backend.domain.trail.repository.TrailRepository;

import java.util.*;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


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
        Double[] scores = memberScore.getScore();;
        int count = 0;
        for(Double score : scores) {
            if(score>=3) count++;
        }
        if(count>5) {
            // 사용자가 높게 평가한 플로깅 코스와 유사한 코스 추천
            // 우선순위 큐를 사용하여 가장 큰 3개의 값을 저장하는 방법 (작은 값이 먼저 제거됨)
            PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> Double.compare(scores[b], scores[a]));

            // 모든 점수의 인덱스를 힙에 추가
            for (int i = 0; i < scores.length; i++) {
                maxHeap.offer(i);
            }

            // 최대 3개의 인덱스를 담을 리스트
            List<Integer> top3Indices = new ArrayList<>();

            // 상위 3개의 인덱스를 큐에서 꺼냄
            for (int i = 0; i < 3 && !maxHeap.isEmpty(); i++) {
                top3Indices.add(maxHeap.poll());
            }
            // RestTemplate 객체 생성
            RestTemplate restTemplate = new RestTemplate();

            // 헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));

            // ObjectMapper를 사용하여 top3Indices를 JSON 문자열로 변환
            ObjectMapper objectMapper = new ObjectMapper();
            String requestBody = null;
            try {
                requestBody = objectMapper.writeValueAsString(top3Indices);
            } catch (JsonProcessingException e) {
                throw new RuntimeException("충분한 평가 데이터가 존재하지 않습니다.");
            }

            // HttpEntity 객체에 헤더와 바디를 설정
            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

            // URL 설정
            String url = "http://j11b205.p.ssafy.io/trails/recommend/";

            // POST 요청 보내기
            ResponseEntity<Long[]> idArray = restTemplate.exchange(url, HttpMethod.POST, entity, Long[].class);

            List<Trail> recommendedTrails = new ArrayList<>();

            for(Long id : idArray.getBody()) {
                recommendedTrails.add(trailRepository.findById(id).orElseThrow());
            }


            // 사용자와 유사한 사람들이 선호하는 코스 추천
            // HttpEntity 객체에 헤더와 바디를 설정
            entity = new HttpEntity<>(headers);

            // URL 설정
            url = "http://j11b205.p.ssafy.io/users/recommend/?user_id="+memberId;

            // POST 요청 보내기
            idArray = restTemplate.exchange(url, HttpMethod.POST, entity, Long[].class);


            for(Long id : idArray.getBody()) {
                recommendedTrails.add(trailRepository.findById(id).orElseThrow());
            }

            // 응답 결과 출력
            List<TrailRecommendDto> response = new ArrayList<>();
            for(Trail trail : recommendedTrails) {
                String tag = "";
                int time = (int) (trail.getArea()/500);
                tag += timeToTag(time);
                tag += trailTotag(trail);
                LikeTrail likeTrail = likeTrailRepository.findByTrailIdAndMemberId(trail.getId(),memberId);
                boolean like = true;
                if(likeTrail==null){
                    like=false;
                }
                Coordinate[] polygon = new Coordinate[trail.getLat().length];
                for(int i = 0; i < polygon.length; i++) {
                    polygon[i] = new Coordinate(trail.getLat()[i],trail.getLon()[i]);
                }

                TrailRecommendDto trailRecommendDto = TrailRecommendDto.builder()
                        .id(trail.getId())
                        .area(trail.getArea())
                        .polygon(polygon)
                        .title(trail.getName())
                        .time(time)
                        .tags(tag)
                        .like(like)
                        .build();
                response.add(trailRecommendDto);
            }
            return response;

        } else {
            Member member = memberRepository.findById(memberId).orElseThrow();
            Float lat = member.getRegionLat();
            Float lon = member.getRegionLon();
            Integer type = member.getRegion_type();
            Integer floggingTimeType = member.getActivityTime();
            Pageable pageable = PageRequest.of(0, 3);

            List<Trail> recommendedTrails = trailRepository.findRecommendedTrails(lat, lon, type, pageable);

            List<TrailRecommendDto> response = new ArrayList<>();
            for(Trail trail : recommendedTrails) {
                int time = (int) (trail.getArea()/500);
                if(checkFologgingTime(time,floggingTimeType));
                String tag = "";
                tag += timeToTag(time);
                tag += typeTotag(type);
                LikeTrail likeTrail = likeTrailRepository.findByTrailIdAndMemberId(trail.getId(),memberId);
                boolean like = true;
                if(likeTrail==null){
                    like=false;
                }

                Coordinate[] polygon = new Coordinate[trail.getLat().length];
                for(int i = 0; i < polygon.length; i++) {
                    polygon[i] = new Coordinate(trail.getLat()[i],trail.getLon()[i]);
                }

                TrailRecommendDto trailRecommendDto = TrailRecommendDto.builder()
                        .id(trail.getId())
                        .area(trail.getArea())
                        .polygon(polygon)
                        .title(trail.getName())
                        .time(time)
                        .tags(tag)
                        .like(like)
                        .build();
                response.add(trailRecommendDto);
            }
            return response;
        }
    }

    @Override
    public List<TrailRecommendDto> getRecommendedByPositionTrail(Long memberId, TrailPositionRequestDto trailPositionRequestDto){
        System.out.println(trailPositionRequestDto.getLatitude());
        System.out.println(trailPositionRequestDto.getLongitude());
        List<Trail> recommendedTrails = trailRepository.findTrailsWithinDistance(trailPositionRequestDto.getLatitude(), trailPositionRequestDto.getLongitude(),10f);

        // 응답 결과 출력
        List<TrailRecommendDto> response = new ArrayList<>();
        for(Trail trail : recommendedTrails) {
            int time = (int) (trail.getArea()/500);
            String tag = "";
            tag += timeToTag(time);
            tag += trailTotag(trail);

            LikeTrail likeTrail = likeTrailRepository.findByTrailIdAndMemberId(trail.getId(),memberId);
            boolean like = true;
            if(likeTrail==null){
                like=false;
            }
            Coordinate[] polygon = new Coordinate[trail.getLat().length];
            for(int i = 0; i < polygon.length; i++) {
                polygon[i] = new Coordinate(trail.getLat()[i],trail.getLon()[i]);
            }

            TrailRecommendDto trailRecommendDto = TrailRecommendDto.builder()
                    .id(trail.getId())
                    .area(trail.getArea())
                    .polygon(polygon)
                    .title(trail.getName())
                    .time(time)
                    .tags(tag)
                    .like(like)
                    .build();
            response.add(trailRecommendDto);
        }
        return response;
    }

    private String typeTotag(int type) {
        String[] tags = {"#도심", "#바다", "#강", "#공원"};
        return tags[type];
    }

    private String trailTotag(Trail trail) {
        if(trail.getCity() > 0.5)
            return "#도심";
        if(trail.getOcean() > 0.5)
            return "#바다";
        if(trail.getLake() > 0.5)
            return "#강";
        if(trail.getPark() > 0.5)
            return "#공원";
        return "";
    }

    private String timeToTag(int time) {
        if(time>60) {
            return "#고급 ";
        } else if(time>30) {
            return "#중급 ";
        } else{
            return "#초급 ";
        }
    }

    private boolean checkFologgingTime(int time, int type) {
        if(type == 0) {
            return time <= 30;
        } else if(type==1) {
            if(time < 30) return false;
            return time <= 60;
        } else {
            return time >= 60;
        }
    }

    @Override
    public void like(Long memberId, Long trailId) {
        likeTrailRepository.save(LikeTrail.builder().trail(trailRepository.findById(trailId).orElseThrow()).member(memberRepository.findById(memberId).orElseThrow()).build());
    }

    @Override
    public void unlike(Long memberId, Long trailId) {
        LikeTrail trail = likeTrailRepository.findByTrailIdAndMemberId(trailId,memberId);
        likeTrailRepository.delete(trail);
    }
}

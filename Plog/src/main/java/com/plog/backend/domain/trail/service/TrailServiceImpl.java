package com.plog.backend.domain.trail.service;

import com.plog.backend.domain.trail.dto.TrailDto;
import com.plog.backend.domain.trail.dto.response.TrailListResponseDto;
import com.plog.backend.domain.trail.entity.Trail;
import com.plog.backend.domain.trail.repository.TrailRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class TrailServiceImpl implements TrailService {

    private final TrailRepository trailRepository;
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
}

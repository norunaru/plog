package com.plog.backend.domain.attraction.service;

import com.plog.backend.domain.attraction.dto.response.AttractionResponseDto;
import com.plog.backend.domain.attraction.entity.Attraction;
import com.plog.backend.domain.attraction.repository.AttractionRepository;
import com.plog.backend.domain.member.entity.Member;
import com.plog.backend.domain.member.repository.MemberRepository;
import com.plog.backend.global.common.util.MemberInfo;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AttractionServiceImpl implements AttractionService {
    @Autowired
    private AttractionRepository attractionRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public void saveAttraction() {
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject("https://tour.chungbuk.go.kr/openapi/tourInfo/attr.do?pageUnit=1000000", String.class);

        System.out.println(response);

        JSONObject jsonResponse = new JSONObject(response);
        JSONArray attractions = jsonResponse.getJSONArray("result");

        for (int i = 0; i < attractions.length(); i++) {
            JSONObject attractionJson = attractions.getJSONObject(i);

            // Extract necessary fields from JSON response
            String name = attractionJson.getString("tourNm");
            String address = attractionJson.getString("adres");
            String image = attractionJson.getString("tourImg");
            String type = attractionJson.getString("tourSe");
            float lat = attractionJson.getFloat("lat");
            float lon = attractionJson.getFloat("lng");

            // Create Attraction entity object
            Attraction attraction = Attraction.builder()
                    .name(name)
                    .address(address)
                    .image(image)
                    .type(type)
                    .lat(lat)
                    .lon(lon)
                    .build();

            // Save to repository
            attractionRepository.save(attraction);
        }
    }

    @Override
    public AttractionResponseDto getRandomAttraction() {
        Member member = memberRepository.findById(MemberInfo.getUserId()).orElseThrow();
        Attraction attraction = attractionRepository.findClosestAttraction(member.getRegionLon(),member.getRegionLat());
        AttractionResponseDto attractionResponseDto = AttractionResponseDto.builder()
                .id(attraction.getId())
                .address(attraction.getAddress())
                .type(attraction.getType())
                .image(attraction.getImage())
                .name(attraction.getName())
                .lon(attraction.getLon())
                .lat(attraction.getLat())
                .build();
        return attractionResponseDto;
    }
}
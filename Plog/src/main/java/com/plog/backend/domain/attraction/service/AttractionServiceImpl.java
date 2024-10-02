package com.plog.backend.domain.attraction.service;

import com.plog.backend.domain.attraction.entity.Attraction;
import com.plog.backend.domain.attraction.repository.AttractionRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AttractionServiceImpl implements AttractionService {
    @Autowired
    private AttractionRepository attractionRepository;

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
}
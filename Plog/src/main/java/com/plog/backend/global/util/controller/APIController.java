package com.plog.backend.global.util.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.plog.backend.domain.trail.entity.Trail;
import com.plog.backend.global.util.entity.SearchPlace;
import com.plog.backend.global.util.service.UtilService;
import com.plog.backend.global.util.service.UtilServiceImpl;
import java.nio.charset.StandardCharsets;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/util")
public class APIController {

    private final UtilService utilService;

    // RestTemplate 객체는 RESTful API 호출을 위한 객체입니다.
    private final RestTemplate restTemplate = new RestTemplate();

    // ObjectMapper 객체는 JSON 데이터를 Java 객체로 변환하거나 그 반대 작업을 수행합니다.
    private final ObjectMapper objectMapper;
    private final UtilServiceImpl utilServiceImpl;

    // application.properties 파일에서 tmap.appKey 값을 주입받습니다.
    @Value("${tmap.appkey}")
    private String appKey;

    // application.properties 파일에서 kakao.restapi 값을 주입받습니다.
    @Value("${kakao.restapi}")
    private String kakaoRestApi;

    // TMap 경로 데이터를 가져오는 API 엔드포인트입니다.
    @GetMapping("/tmap/route")
    public String getRouteData(@RequestParam double startX, @RequestParam double startY,
        @RequestParam double endX, @RequestParam double endY, @RequestParam String startName,
        @RequestParam String endName, @RequestParam(required = false) String passList,
        @RequestParam(required = false) String name)
        throws UnsupportedEncodingException, JsonProcessingException {

        // TMap API를 사용하여 경로 및 좌표 데이터를 가져옵니다.
        String url = "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1";

        // HTTP 요청 헤더를 설정합니다.
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON); // 요청 데이터의 형식을 JSON으로 설정합니다.
        headers.setAccept(
            Collections.singletonList(MediaType.APPLICATION_JSON)); // 응답 데이터의 형식으로 JSON을 기대합니다.
        headers.set("appKey", appKey); // TMap API 사용을 위한 appKey를 헤더에 추가합니다.

        // 요청 본문 데이터를 구성합니다.
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("startX", startX); // 시작점의 X 좌표 (경도)
        requestBody.put("startY", startY); // 시작점의 Y 좌표 (위도)
        requestBody.put("endX", endX); // 도착점의 X 좌표 (경도)
        requestBody.put("endY", endY); // 도착점의 Y 좌표 (위도)
        requestBody.put("startName",
            URLEncoder.encode(startName, StandardCharsets.UTF_8)); // 시작점 이름 URL 인코딩
        requestBody.put("endName",
            URLEncoder.encode(endName, StandardCharsets.UTF_8)); // 도착점 이름 URL 인코딩
        requestBody.put("passList", passList != null ? passList : ""); // 경유지 리스트

        // HTTP 요청 엔터티 생성
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        // TMap API에 POST 요청을 보내고 응답을 받아옵니다.
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity,
            String.class);

        // 응답 데이터를 파싱합니다.
        JSONObject jsonObject = new JSONObject(response.getBody());
        JSONArray features = jsonObject.getJSONArray("features");

        // 첫 번째 feature에서 totalDistance 값을 추출
        double totalDistance = 0.0;
        if (features.length() > 0) {
            JSONObject firstFeature = features.getJSONObject(0);
            JSONObject properties = firstFeature.getJSONObject("properties");

            if (properties.has("totalDistance")) {
                totalDistance = properties.getDouble("totalDistance"); // totalDistance 값 설정
            }
        }

        // 경로의 좌표 리스트를 저장할 변수
        List<float[]> coordinatesList = new ArrayList<>();

        // 각 피처(feature) 객체를 순회하면서 좌표 데이터를 추출
        for (int i = 0; i < features.length(); i++) {
            JSONObject feature = features.getJSONObject(i);
            JSONObject geometry = feature.getJSONObject("geometry");

            // geometry 타입이 "LineString"인 경우 좌표 리스트를 가져옵니다.
            if ("LineString".equals(geometry.getString("type"))) {
                JSONArray coordinates = geometry.getJSONArray("coordinates");
                for (int j = 0; j < coordinates.length(); j++) {
                    JSONArray coord = coordinates.getJSONArray(j);
                    // 좌표 배열에 [위도, 경도] 형식으로 저장합니다.
                    coordinatesList.add(new float[]{coord.getFloat(1), coord.getFloat(0)});
                }
            }
        }

        // 편의점과 공중 화장실 검색
        Set<SearchPlace> convenienceStores = searchNearbyPlaces(coordinatesList, "CS2", true);
        Set<SearchPlace> restrooms = searchNearbyPlaces(coordinatesList, "공중 화장실", false);

        // 리스트 크기를 기준으로 배열 생성
        int size = coordinatesList.size();
        Float[] latArray = new Float[size];  // 위도만 저장할 배열
        Float[] lonArray = new Float[size];  // 경도만 저장할 배열

        // 리스트를 순회하며 위도와 경도를 각 배열에 저장
        for (int i = 0; i < size; i++) {
            latArray[i] = coordinatesList.get(i)[0];  // 위도 (첫 번째 값)
            lonArray[i] = coordinatesList.get(i)[1];  // 경도 (두 번째 값)
        }

        System.out.println("총 거리: " + totalDistance);
        System.out.println("편의점 개수: " + convenienceStores.size());
        System.out.println("화장실 개수: " + restrooms.size());

        // 필요한 데이터를 이용하여 원하는 작업을 수행할 수 있습니다.

        utilService.saveTrail(Trail.builder().lat(latArray).lon(lonArray).name(name)
            .shopCnt((float) (convenienceStores.size() + 0.0))
            .toiletCnt((float) (restrooms.size() + 0.0)).park(0.0F).ocean(1.0F).city(1.0F)
            .lake(0.5F).distance((float) totalDistance).area(0.0F).build());

        return "Route data and nearby places fetched successfully";
    }


    // 좌표 리스트를 기반으로 편의점이나 화장실을 검색하는 메서드입니다.
    private Set<SearchPlace> searchNearbyPlaces(List<float[]> coordinatesList,
        String queryOrCategory, boolean isCategorySearch)
        throws JsonProcessingException, UnsupportedEncodingException {

        // 검색 결과를 저장할 Set을 생성합니다. (중복된 결과를 방지하기 위해 Set을 사용)
        Set<SearchPlace> resultSet = new HashSet<>();

        // HTTP 요청 헤더를 설정합니다.
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON); // 요청 데이터 형식을 JSON으로 설정합니다.
        headers.setAccept(
            Collections.singletonList(MediaType.APPLICATION_JSON)); // 응답 데이터 형식으로 JSON을 기대합니다.
        headers.set("Authorization", "KakaoAK " + kakaoRestApi); // 카카오 API 사용을 위한 인증키를 헤더에 추가합니다.

        // 각 좌표에 대해 편의점 또는 화장실을 검색합니다.
        for (float[] coords : coordinatesList) {
            // 카카오 API에 요청할 URL을 생성합니다.
            String url = buildKakaoApiUrl(queryOrCategory, coords, isCategorySearch);

            // HTTP 요청 엔터티를 생성합니다.
            HttpEntity<String> entity = new HttpEntity<>(headers);
            // 카카오 API에 GET 요청을 보내고 응답을 받아옵니다.
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity,
                String.class);

            // JSON 응답을 파싱합니다.
            JsonNode rootNode = objectMapper.readTree(response.getBody());
            JsonNode documentsNode = rootNode.path("documents");

            // 각 검색 결과를 SearchPlace 객체로 변환하여 Set에 추가합니다.
            for (JsonNode node : documentsNode) {
                SearchPlace place = objectMapper.treeToValue(node, SearchPlace.class);
                resultSet.add(place);
            }
        }

        // 검색 결과를 반환합니다.
        return resultSet;
    }

    // 카카오 API에 요청할 URL을 생성하는 메서드입니다.
    private String buildKakaoApiUrl(String queryOrCategory, float[] coords,
        boolean isCategorySearch) throws UnsupportedEncodingException {

        // 카테고리 검색인 경우
        if (isCategorySearch) {
            return "https://dapi.kakao.com/v2/local/search/category.json?category_group_code="
                + queryOrCategory + "&x=" + coords[1] + "&y=" + coords[0]
                + "&radius=500"; // 좌표와 반경(300m)을 설정하여 URL을 생성합니다.
        }
        // 키워드 검색인 경우
        else {
            return "https://dapi.kakao.com/v2/local/search/keyword.json?query=" + queryOrCategory
                + "&x=" + coords[1] + "&y=" + coords[0]
                + "&radius=500"; // 좌표와 반경(300m)을 설정하여 URL을 생성합니다.
        }
    }
}

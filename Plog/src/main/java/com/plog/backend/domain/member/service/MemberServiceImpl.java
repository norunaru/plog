package com.plog.backend.domain.member.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.plog.backend.domain.member.dto.MemberDto;
import com.plog.backend.domain.member.dto.request.MemberSurveyRequestDto;
import com.plog.backend.domain.member.dto.response.MemberLoginResponseDto;
import com.plog.backend.global.refreshtoken.entity.RefreshToken;
import com.plog.backend.global.refreshtoken.repository.RefreshTokenRepository;
import com.plog.backend.global.security.util.JwtUtil;
import com.plog.backend.domain.member.dto.request.MemberLoginRequestDto;
import com.plog.backend.domain.member.dto.request.MemberJoinRequestDto;
import com.plog.backend.domain.member.entity.Member;
import com.plog.backend.domain.member.entity.MemberImage;
import com.plog.backend.domain.member.exception.MemberNotFoundException;
import com.plog.backend.domain.member.repository.MemberImageRepository;
import com.plog.backend.domain.member.repository.MemberRepository;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final JwtUtil jwtUtil;
    private final ModelMapper mapper;
    private final MemberRepository memberRepository;
    private final MemberImageRepository memberImageRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public MemberLoginResponseDto login(final MemberLoginRequestDto memberLoginRequestDto) {
        // kakao 토큰을 통해 사용자 id 가져와서 DB에 등록되어 있는지 확인
        String kakaoEmail = getKakaoUserInfo(memberLoginRequestDto.getKakaoAccessToken());
        Member member = null;
        MemberLoginResponseDto memberLoginResponseDto = new MemberLoginResponseDto();
        try {
            member = findMemberByEmail(kakaoEmail);
            memberLoginResponseDto.setIsFirstLogin(0);
        } catch (MemberNotFoundException e) {
            // 등록되지 않은 사용자
            memberLoginResponseDto.setIsFirstLogin(1);
            memberRepository.save(Member.builder().email(getKakaoUserInfo(kakaoEmail)).build());
        } finally {
            MemberDto memberDto = mapper.map(member, MemberDto.class);
            memberLoginResponseDto.setAccessToken(jwtUtil.createAccessToken(memberDto));
            memberLoginResponseDto.setRefreshToken(jwtUtil.createRefreshToken());
            refreshTokenRepository.save(
                RefreshToken.builder().refreshToken(memberLoginResponseDto.getRefreshToken())
                    .email(getKakaoUserInfo(kakaoEmail)).build());
        }
        return memberLoginResponseDto;
    }

    @Override
    public void updateMemberSurvey(MemberSurveyRequestDto memberSurveyRequestDto) {
        memberRepository.save(mapper.map(memberSurveyRequestDto, Member.class));
    }

    private String getKakaoUserInfo(String accessToken) {
        //HTTP 헤더 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        //Http 요청 보내기
        HttpEntity<MultiValueMap<String, String>> kakaoRequest = new HttpEntity<>(headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange("https://kapi.kakao.com/v2/user/me",
            HttpMethod.POST, kakaoRequest, String.class);

        //Http 응답 (JSON)
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = null;
        try {
            jsonNode = objectMapper.readTree(responseBody);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return jsonNode.get("kakao_account").get("email").asText();
    }

    private void saveMemberImage(MemberJoinRequestDto memberJoinRequestDto, Member savedMember) {
        MemberImage memberImage = MemberImage.builder().member(savedMember)
            .savedUrl(memberJoinRequestDto.getMemberImage().getSavedUrl())
            .savedPath(memberJoinRequestDto.getMemberImage().getSavedPath()).build();
        memberImageRepository.save(memberImage);
    }

    private Member findMemberByEmail(String email) {
        return memberRepository.findByEmail(email).orElseThrow(MemberNotFoundException::new);
    }
}

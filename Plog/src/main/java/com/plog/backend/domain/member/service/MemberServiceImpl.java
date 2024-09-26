package com.plog.backend.domain.member.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.plog.backend.domain.member.dto.MemberDto;
import com.plog.backend.domain.member.dto.request.MemberSurveyRequestDto;
import com.plog.backend.domain.member.dto.response.MemberLoginResponseDto;
import com.plog.backend.global.token.entity.RefreshToken;
import com.plog.backend.global.token.repository.RefreshTokenRepository;
import com.plog.backend.global.security.util.JwtUtil;
import com.plog.backend.domain.member.dto.request.MemberLoginRequestDto;
import com.plog.backend.domain.member.dto.request.MemberJoinRequestDto;
import com.plog.backend.domain.member.entity.Member;
import com.plog.backend.domain.member.entity.MemberImage;
import com.plog.backend.domain.member.exception.MemberNotFoundException;
import com.plog.backend.domain.member.repository.MemberImageRepository;
import com.plog.backend.domain.member.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Slf4j
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
        log.info("kakao email: {}", kakaoEmail);
        Member member = null;
        MemberLoginResponseDto memberLoginResponseDto = new MemberLoginResponseDto();
        try {
            member = findMemberByEmail(kakaoEmail);
            memberLoginResponseDto.setIsFirstLogin(0);
        } catch (MemberNotFoundException e) {
            // 등록되지 않은 사용자
            memberLoginResponseDto.setIsFirstLogin(1);
            memberRepository.save(Member.builder().email(kakaoEmail).build());
            log.info("성공적으로 회원 추가: {}", kakaoEmail);
        } finally {
            member = findMemberByEmail(kakaoEmail);
            log.info("member: {}",member);
            MemberDto memberDto = mapper.map(member, MemberDto.class);
            memberLoginResponseDto.setAccessToken(jwtUtil.createAccessToken(memberDto));
            memberLoginResponseDto.setRefreshToken(jwtUtil.createRefreshToken());
            refreshTokenRepository.save(
                RefreshToken.builder().refreshToken(memberLoginResponseDto.getRefreshToken())
                    .email(kakaoEmail).build());
        }
        return memberLoginResponseDto;
    }

    @Override
    public void updateMemberSurvey(MemberSurveyRequestDto memberSurveyRequestDto) {
        memberRepository.save(mapper.map(memberSurveyRequestDto, Member.class));
    }

    private String getKakaoUserInfo(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> kakaoRequest = new HttpEntity<>(headers);
        RestTemplate restTemplate = new RestTemplate();

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                "https://kapi.kakao.com/v2/user/me", HttpMethod.POST, kakaoRequest, String.class);

            String responseBody = response.getBody();
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(responseBody);

            // 로그로 응답을 확인
            log.info("Kakao API response: " + responseBody);

            // kakao_account와 email이 존재하는지 확인 후 처리
            JsonNode kakaoAccountNode = jsonNode.get("kakao_account");
            if (kakaoAccountNode != null) {
                JsonNode emailNode = kakaoAccountNode.get("email");
                if (emailNode != null) {
                    return emailNode.asText();
                } else {
                    log.error("Email not found in Kakao account response");
                    throw new RuntimeException("Email not found in Kakao account response");
                }
            } else {
                log.error("Kakao account information not found in response");
                throw new RuntimeException("Kakao account information not found in response");
            }
        } catch (HttpClientErrorException e) {
            log.error("Error response from Kakao API: " + e.getMessage());
            if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                throw new RuntimeException("Kakao access token is invalid or expired.");
            } else {
                throw new RuntimeException("Failed to get Kakao user info", e);
            }
        } catch (JsonProcessingException e) {
            log.error("Failed to parse Kakao response", e);
            throw new RuntimeException("Failed to parse Kakao response", e);
        }
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

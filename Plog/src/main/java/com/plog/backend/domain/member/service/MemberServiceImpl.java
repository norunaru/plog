package com.plog.backend.domain.member.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.plog.backend.domain.member.dto.MemberDto;
import com.plog.backend.domain.member.dto.request.MemberSurveyRequestDto;
import com.plog.backend.domain.member.dto.response.MemberLoginResponseDto;
import com.plog.backend.global.common.util.MemberInfo;
import com.plog.backend.global.token.entity.RefreshToken;
import com.plog.backend.global.token.repository.RefreshTokenRepository;
import com.plog.backend.global.security.util.JwtUtil;
import com.plog.backend.domain.member.dto.request.MemberLoginRequestDto;
import com.plog.backend.domain.member.entity.Member;
import com.plog.backend.domain.member.exception.MemberNotFoundException;
import com.plog.backend.domain.member.repository.MemberRepository;
import java.time.LocalDateTime;
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
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public MemberLoginResponseDto login(final MemberLoginRequestDto memberLoginRequestDto) {
        // kakao 토큰을 통해 사용자 id 가져와서 DB에 등록되어 있는지 확인
        String[] kakaoInfo = getKakaoUserInfo(memberLoginRequestDto.getKakaoAccessToken());
        log.info("kakao email: {}", kakaoInfo[0]);

        Member member;
        MemberLoginResponseDto memberLoginResponseDto = new MemberLoginResponseDto();
        boolean isFirstLogin = false;

        try {
            member = findMemberByEmail(kakaoInfo[0]);
        } catch (MemberNotFoundException e) {
            // 등록되지 않은 사용자
            member = Member.builder()
                .regDate(LocalDateTime.now())
                .email(kakaoInfo[0])
                .nickname(kakaoInfo[1])
                .profileImageUrl(kakaoInfo[2])
                .build();
            memberRepository.save(member);
            isFirstLogin = true;
            log.info("성공적으로 회원 추가: {}", kakaoInfo[0]);
        }
        memberLoginResponseDto.setIsFirstLogin(
            (member.getIsFirst() != null) ? (member.getIsFirst() ? 1 : 0) : (isFirstLogin ? 1 : 0)
        );
        log.info("member: {}", member);

        MemberDto memberDto = mapper.map(member, MemberDto.class);
        memberLoginResponseDto.setAccessToken(jwtUtil.createAccessToken(memberDto));
        memberLoginResponseDto.setRefreshToken(jwtUtil.createRefreshToken());

        refreshTokenRepository.save(
            RefreshToken.builder()
                .refreshToken(memberLoginResponseDto.getRefreshToken())
                .email(kakaoInfo[0])
                .build()
        );

        return memberLoginResponseDto;
    }

    @Override
    public void updateMemberSurvey(MemberSurveyRequestDto memberSurveyRequestDto) {
        // 기존 회원 정보 조회
        Member existingMember = memberRepository.findById(MemberInfo.getUserId())
            .orElseThrow(() -> new RuntimeException("Member not found"));

        // 필요한 필드만 업데이트
        existingMember.updateFields(memberSurveyRequestDto);

        // 변경된 정보 저장
        memberRepository.save(existingMember);
    }


    private String[] getKakaoUserInfo(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> kakaoRequest = new HttpEntity<>(headers);
        RestTemplate restTemplate = new RestTemplate();

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                "https://kapi.kakao.com/v2/user/me", HttpMethod.POST, kakaoRequest, String.class);

            String responseBody = response.getBody();
            log.info("Kakao API response: " + responseBody);

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode kakaoAccountNode = objectMapper.readTree(responseBody).path("kakao_account");

            // 이메일 노드 확인 및 처리
            // 이메일, 프로필 사진 URL, 닉네임 노드 확인 및 처리
            JsonNode emailNode = kakaoAccountNode.path("email");
            JsonNode profileNode = kakaoAccountNode.path("profile");
            JsonNode nicknameNode = profileNode.path("nickname");
            JsonNode profileImageUrlNode = profileNode.path("profile_image_url");

            if (!emailNode.isMissingNode() && !nicknameNode.isMissingNode()
                && !profileImageUrlNode.isMissingNode()) {
                String email = emailNode.asText();
                String nickname = nicknameNode.asText();
                String profileImageUrl = profileImageUrlNode.asText();

                log.info("Kakao user info - email: {}, nickname: {}, profile image URL: {}", email,
                    nickname, profileImageUrl);

                // String 배열로 반환
                return new String[]{email, nickname, profileImageUrl};
            } else {
                log.error("Required user information not found in Kakao account response");
                throw new RuntimeException(
                    "Required user information not found in Kakao account response");
            }
        } catch (HttpClientErrorException e) {
            log.error("Error response from Kakao API: {}", e.getMessage());
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

    private Member findMemberByEmail(String email) {
        return memberRepository.findByEmail(email).orElseThrow(MemberNotFoundException::new);
    }
}

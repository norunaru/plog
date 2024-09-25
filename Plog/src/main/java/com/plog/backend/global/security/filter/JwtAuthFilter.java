package com.plog.backend.global.security.filter;


import com.plog.backend.domain.member.dto.MemberDto;
import com.plog.backend.global.security.CustomUserDetailsService;
import com.plog.backend.global.security.util.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final CustomUserDetailsService customUserDetailsService;
    private final JwtUtil jwtUtil;
    private ModelMapper mapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {
        String authorizationHeader = request.getHeader("Authorization");
        String refreshTokenHeader = request.getHeader("Refresh-Token");

        // JWT가 헤더에 존재 하는 경우
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String accessToken = authorizationHeader.substring(7);

            try {
                // Access Token 유효성 검증
                if (jwtUtil.validateToken(accessToken)) {
                    String email = jwtUtil.getEmail(accessToken);

                    // 유저와 토큰 일치 시 userDetails 생성
                    UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);

                    if (userDetails != null) {
                        // 접근 권한 인증 Token 생성
                        UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(userDetails, null,
                                userDetails.getAuthorities());

                        // Security Context에 접근 권한 설정
                        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    }
                }
            } catch (ExpiredJwtException e) {
                // Access Token이 만료된 경우
                if (refreshTokenHeader != null && refreshTokenHeader.startsWith("Bearer ")) {
                    String refreshToken = refreshTokenHeader.substring(7);

                    // Refresh Token 유효성 검증
                    if (jwtUtil.validateToken(refreshToken)) {
                        String email = jwtUtil.getEmail(refreshToken);
                        if (customUserDetailsService.checkRefreshTokenEmail(email)) {
                            // 유저 정보를 바탕으로 새로운 Access Token 생성
                            UserDetails userDetails = customUserDetailsService.loadUserByUsername(
                                email);
                            if (userDetails != null) {
                                String newAccessToken = jwtUtil.createAccessToken(
                                    mapper.map(userDetails, MemberDto.class));

                                // 새로운 Access Token을 응답 헤더에 추가
                                response.setHeader("Authorization", "Bearer " + newAccessToken);

                                // Security Context에 새로운 인증 정보 설정
                                UsernamePasswordAuthenticationToken authenticationToken =
                                    new UsernamePasswordAuthenticationToken(userDetails, null,
                                        userDetails.getAuthorities());
                                SecurityContextHolder.getContext()
                                    .setAuthentication(authenticationToken);
                            }
                        }
                    } else {
                        // Refresh Token이 유효하지 않으면 401 Unauthorized 처리
                        response.setStatus(HttpStatus.UNAUTHORIZED.value());
                        response.getWriter().write("Refresh Token is expired or invalid");
                        return;
                    }
                } else {
                    // Refresh Token이 없으면 401 Unauthorized 처리
                    response.setStatus(HttpStatus.UNAUTHORIZED.value());
                    response.getWriter()
                        .write("Access Token is expired and Refresh Token is not provided");
                    return;
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}

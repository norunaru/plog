package com.plog.backend.domain.member.service;

import static com.plog.backend.domain.member.entity.LoginType.*;

import com.plog.backend.domain.member.dto.MemberDto;
import com.plog.backend.global.security.util.JwtUtil;
import com.plog.backend.domain.member.dto.request.MemberLoginRequestDto;
import com.plog.backend.domain.member.dto.request.MemberJoinRequestDto;
import com.plog.backend.domain.member.entity.Member;
import com.plog.backend.domain.member.entity.MemberImage;
import com.plog.backend.domain.member.exception.MemberDuplicateException;
import com.plog.backend.domain.member.exception.NotFoundMemberException;
import com.plog.backend.domain.member.exception.ResignedMemberException;
import com.plog.backend.domain.member.repository.MemberImageRepository;
import com.plog.backend.domain.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper mapper;
    private final MemberRepository memberRepository;
    private final MemberImageRepository memberImageRepository;

    @Transactional
    @Override
    public String join(final MemberJoinRequestDto memberJoinRequestDto, final String signUpMethod) {
        if (COMMON.get().equals(signUpMethod) && memberRepository.existsByEmail(
            memberJoinRequestDto.getEmail())) {
            throw new MemberDuplicateException();
        }
        memberJoinRequestDto.setPassword(
            encodePassword(memberJoinRequestDto.getPassword(), signUpMethod));
        Member savedMember = memberRepository.save(
            Member.signupBuilder().memberJoinRequestDto(memberJoinRequestDto).build());
        saveMemberImage(memberJoinRequestDto, savedMember);
        return jwtUtil.createAccessToken(mapper.map(savedMember, MemberDto.class));
    }

    @Override
    public String login(final MemberLoginRequestDto memberLoginRequestDto) {
        Member member = findMemberByEmail(memberLoginRequestDto.getEmail());

        validateResignedMember(member);
        validatePassword(memberLoginRequestDto.getPassword(), member.getPassword());

        return jwtUtil.createAccessToken(mapper.map(member, MemberDto.class));
    }

    private String encodePassword(String password, String signUpMethod) {
        if (COMMON.get().equals(signUpMethod)) {
            return passwordEncoder.encode(password);
        } else if (KAKAO.get().equals(signUpMethod) || GOOGLE.get().equals(signUpMethod)) {
            return signUpMethod;
        }
        return "EMPTY PASSWORD";
    }

    private void saveMemberImage(MemberJoinRequestDto memberJoinRequestDto, Member savedMember) {
        MemberImage memberImage = MemberImage.builder().member(savedMember)
            .savedUrl(memberJoinRequestDto.getMemberImage().getSavedUrl())
            .savedPath(memberJoinRequestDto.getMemberImage().getSavedPath()).build();

        memberImageRepository.save(memberImage);
    }

    private Member findMemberByEmail(String email) {
        return memberRepository.findByEmail(email).orElseThrow(NotFoundMemberException::new);
    }

    private void validateResignedMember(Member member) {
        if (member.getIsResign() == 1) {
            throw new ResignedMemberException();
        }
    }

    private void validatePassword(String rawPassword, String encodedPassword) {
        if (!passwordEncoder.matches(rawPassword, encodedPassword)) {
            throw new BadCredentialsException("비밀번호가 일치하지 않습니다.");
        }
    }
}

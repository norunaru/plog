package com.plog.backend.domain.member.repository;

import com.plog.backend.domain.member.entity.Member;
import com.plog.backend.domain.member.entity.MemberScore;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberScoreRepository extends JpaRepository<MemberScore, Long> {
    MemberScore findByMemberId(Long memberId);
}

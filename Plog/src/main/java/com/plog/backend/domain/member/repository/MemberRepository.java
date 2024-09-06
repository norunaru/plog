package com.plog.backend.domain.member.repository;

import com.plog.backend.domain.member.entity.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, String>, MemberRepositoryCustom {

    Optional<Member> findByEmail(String email);
}

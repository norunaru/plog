package com.plog.backend.domain.member.repository;

import com.plog.backend.domain.member.entity.Member;
import com.plog.backend.domain.member.entity.MemberImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberImageRepository extends JpaRepository<MemberImage, Member> {

    MemberImage findByMember(Member member);
}

package com.plog.backend.domain.community.repository;

import com.plog.backend.domain.community.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommunityRepository extends JpaRepository<Community, Long> {
    List<Community> findAllByMemberId(Long memberId);
    Community findByMemberIdAndActivityId(Long memberId, Long activityId);
}

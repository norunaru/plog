package com.plog.backend.domain.trail.entity;

import com.plog.backend.domain.member.entity.Member;
import jakarta.persistence.*;

@Entity
@Table(name = "like_trail")
public class LikeTrail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trail_id", referencedColumnName = "id", nullable = false)
    private Trail trail;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", referencedColumnName = "id", nullable = false)
    private Member member;
}
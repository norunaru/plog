package com.plog.backend.domain.trail.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.plog.backend.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Table(name = "like_trail")
public class LikeTrail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "trail_id", referencedColumnName = "id", nullable = false)
    private Trail trail;

    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "member_id", referencedColumnName = "id", nullable = false)
    private Member member;

    @Column(name = "like_check")
    private Boolean likeCheck;
}
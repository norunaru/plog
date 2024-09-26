package com.plog.backend.domain.member.entity;

import com.plog.backend.domain.trail.entity.Trail;
import io.hypersistence.utils.hibernate.type.array.DoubleArrayType;
import io.hypersistence.utils.hibernate.type.array.FloatArrayType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import org.hibernate.annotations.Type;

@Entity
@Getter
@Table(name = "member_score")
public class MemberScore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private Member member;

    @NotNull
    @Column(name = "score",columnDefinition = "double precision[]")
    private Double[] score;
}

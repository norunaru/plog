package com.plog.backend.domain.activity.entity;

import com.plog.backend.domain.member.entity.Member;
import io.hypersistence.utils.hibernate.type.array.DoubleArrayType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Type;

@Entity
@Getter
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "activity")
public class Activity {

    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "member_id", referencedColumnName = "id")
    private Member member;

    @Type(value = DoubleArrayType.class)
    @NotNull
    @Column(name = "lat", columnDefinition = "double precision[]")
    private Double[] lat;

    @Type(value = DoubleArrayType.class)
    @NotNull
    @Column(name = "lon", columnDefinition = "double precision[]")
    private Double[] lon;

    @NotNull
    @Column(name = "distance", columnDefinition = "double precision")
    private Double distance;

    @NotNull
    @Column(name = "time", columnDefinition = "double precision")
    private Double time;

    @NotNull
    @Column(name = "review", columnDefinition = "TEXT")
    private String review;

    @NotNull
    @Column(name = "score", columnDefinition = "double precision")
    private Double score;

}

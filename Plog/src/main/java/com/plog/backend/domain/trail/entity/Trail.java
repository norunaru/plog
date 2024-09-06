package com.plog.backend.domain.trail.entity;

import io.hypersistence.utils.hibernate.type.array.DoubleArrayType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "trail")
public class Trail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Type(value = DoubleArrayType.class)
    @NotNull
    @Column(name = "lat", columnDefinition = "double precision[]")
    private Double[] lat;

    @Type(value = DoubleArrayType.class)
    @NotNull
    @Column(name = "lon", columnDefinition = "double precision[]")
    private Double[] lon;

    @NotNull
    @Column(name = "name", columnDefinition = "varchar")
    private String name;

    @Column(name = "shop_cnt", columnDefinition = "double precision")
    private Double shopCnt;

    @Column(name = "toilet_cnt", columnDefinition = "double precision")
    private Double toiletCnt;

    @Column(name = "mountain", columnDefinition = "double precision")
    private Double mountain;

    @Column(name = "ocean", columnDefinition = "double precision")
    private Double ocean;

    @Column(name = "city", columnDefinition = "double precision")
    private Double city;

    @Column(name = "lake", columnDefinition = "double precision")
    private Double lake;

    @Column(name = "distance", columnDefinition = "double precision")
    private Double distance;

}

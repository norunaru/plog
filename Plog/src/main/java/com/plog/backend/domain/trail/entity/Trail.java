package com.plog.backend.domain.trail.entity;

import io.hypersistence.utils.hibernate.type.array.FloatArrayType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Type;

@Builder
@Entity
@Getter
@Setter
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "trail")
public class Trail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name", columnDefinition = "varchar")
    private String name;

    @Column(name = "park", columnDefinition = "real")
    private Float park;

    @Column(name = "ocean", columnDefinition = "real")
    private Float ocean;

    @Column(name = "city", columnDefinition = "real")
    private Float city;

    @Column(name = "lake", columnDefinition = "real")
    private Float lake;

    @Column(name = "shop_cnt", columnDefinition = "real")
    private Float shopCnt;

    @Column(name = "toilet_cnt", columnDefinition = "real")
    private Float toiletCnt;

    @Column(name = "distance", columnDefinition = "real")
    private Float distance;

    @Column(name = "area", columnDefinition = "real")
    private Float area;

    @Type(value = FloatArrayType.class)
    @NotNull
    @Column(name = "lat", columnDefinition = "real[]")
    private Float[] lat;

    @Type(value = FloatArrayType.class)
    @NotNull
    @Column(name = "lon", columnDefinition = "real[]")
    private Float[] lon;

    @Type(value = FloatArrayType.class)
    @NotNull
    @Column(name = "center", columnDefinition = "real[]")
    private Float[] center;

    @Column(name = "exp", columnDefinition = "real")
    private Float exp;
}
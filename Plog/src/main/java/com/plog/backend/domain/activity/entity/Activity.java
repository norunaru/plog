package com.plog.backend.domain.activity.entity;

import static jakarta.persistence.CascadeType.ALL;

import com.plog.backend.domain.member.entity.Member;
import io.hypersistence.utils.hibernate.type.array.DoubleArrayType;
import io.hypersistence.utils.hibernate.type.array.FloatArrayType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.awt.Image;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Type;

@Entity
@Getter
@Builder
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "activity")
public class Activity {

    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "member_id", referencedColumnName = "id")
    private Member member;

    @Column(name = "title", columnDefinition = "TEXT")
    private String title;

    @Type(value = FloatArrayType.class)
    @Column(name = "lat", columnDefinition = "real[]")
    private Float[] lat;

    @Type(value = FloatArrayType.class)
    @Column(name = "lon", columnDefinition = "real[]")
    private Float[] lon;

    @Column(name = "total_distance", columnDefinition = "real")
    private Float totalDistance;

    @Column(name = "total_kcal", columnDefinition = "real")
    private Float totalKcal;

    @Column(name = "total_time", columnDefinition = "real")
    private Float totalTime;

    @Column(name = "creation_date", columnDefinition = "TIMESTAMP")
    private LocalDateTime creationDate;

    @Column(name = "location_name", columnDefinition = "TEXT")
    private String locationName;

    @Column(name = "review", columnDefinition = "TEXT")
    private String review;

    @Column(name = "score", columnDefinition = "real")
    private Float score;

    @OneToMany(mappedBy = "activity", cascade = ALL, orphanRemoval = true)
    List<ActivityImage> reviewImages;

}

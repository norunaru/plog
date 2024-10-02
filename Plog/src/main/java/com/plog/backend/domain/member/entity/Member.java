package com.plog.backend.domain.member.entity;

import static jakarta.persistence.CascadeType.ALL;

import com.plog.backend.domain.member.dto.request.MemberSurveyRequestDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Getter
@DynamicInsert
@DynamicUpdate
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Table(name = "member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "email")
    private String email;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "profile_image_url")
    private String profileImageUrl;

    @Column(name = "role", length = 20)
    @ColumnDefault("'user'")
    private String role;

    @Column(name = "reg_date", columnDefinition = "TIMESTAMP")
    private LocalDateTime regDate;

    @Column(name = "is_resign")
    @ColumnDefault("0")
    private Integer isResign;

    @Column(name = "is_first")
    @ColumnDefault("true")
    private Boolean isFirst;

    @Column(name = "activity_time")
    private Integer activityTime;

    @Column(name = "flogging_time")
    private Integer floggingTime;

    // city : 0, ocean : 1, lake : 2, park : 3
    @Column(name = "region_type")
    private Integer region_type;

    @Column(name = "region_lat", columnDefinition = "real")
    private Float regionLat;

    @Column(name = "region_lon", columnDefinition = "real")
    private Float regionLon;

    @Setter
    @OneToOne(mappedBy = "member", fetch = FetchType.LAZY, cascade = ALL, orphanRemoval = true)
    private MemberScore memberScore;

    public void updateFields(MemberSurveyRequestDto memberSurveyRequestDto) {
        this.activityTime = memberSurveyRequestDto.getActivityTime();
        this.floggingTime = memberSurveyRequestDto.getFloggingTime();
        this.region_type = memberSurveyRequestDto.getRegion_type();
        this.regionLat = memberSurveyRequestDto.getRegionLat();
        this.regionLon = memberSurveyRequestDto.getRegionLon();
    }
}

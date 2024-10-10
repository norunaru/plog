package com.plog.backend.domain.activity.entity;

import static jakarta.persistence.CascadeType.ALL;
import static jakarta.persistence.FetchType.LAZY;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.plog.backend.domain.activity.dto.request.ActivityUpdateRequestDto;
import com.plog.backend.domain.member.entity.Member;
import com.plog.backend.domain.trail.entity.Trail;
import io.hypersistence.utils.hibernate.type.array.FloatArrayType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
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

    @JsonIgnore
    @ManyToOne
    @NotNull
    @JoinColumn(name = "member_id", referencedColumnName = "id")
    private Member member;

    @ColumnDefault("'제목을 입력해 주세요!'")
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
    @ColumnDefault("'리뷰를 남겨주세요!'")
    private String review;


    @Column(name = "score", columnDefinition = "real")
    @ColumnDefault("0")
    private Float score;

    @ManyToOne()
    @JoinColumn(name = "trail_id")
    private Trail trail;

    @Setter
    @OneToMany(mappedBy = "activity", cascade = ALL, orphanRemoval = true,  fetch = FetchType.EAGER)
    private List<ActivityImage> activityImages;

    public void update(ActivityUpdateRequestDto activityUpdateRequestDto, List<String> savedUrls) {
        this.title = (activityUpdateRequestDto.getTitle() == null || activityUpdateRequestDto.getTitle().trim().isEmpty())
            ? "제목을 수정하여 일지를 계속 작성해주세요!"
            : activityUpdateRequestDto.getTitle();

        this.review = (activityUpdateRequestDto.getReview() == null || activityUpdateRequestDto.getReview().trim().isEmpty())
            ? "일지 내용을 남겨주세요!"
            : activityUpdateRequestDto.getReview();

        this.score = activityUpdateRequestDto.getScore();

        // 기존 activityImages 컬렉션을 clear하여 모든 이미지를 제거하고 새로 추가
        this.activityImages.clear();

        // 새로운 이미지를 추가
        for (String url : savedUrls) {
            ActivityImage newImage = ActivityImage.builder()
                .savedUrl(url)
                .build();
            this.addImage(newImage); // 이미지 추가
        }
    }

    public void addImage(ActivityImage image) {
        image.update(this);  // 양방향 관계 설정
        this.activityImages.add(image); // 기존 컬렉션에 이미지 추가
    }
}
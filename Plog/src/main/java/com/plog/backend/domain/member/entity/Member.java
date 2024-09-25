package com.plog.backend.domain.member.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
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

    @Column(name = "name")
    private String name;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "gender")
    private Integer gender;

    @Column(name = "birth", columnDefinition = "DATE")
    private LocalDate birth;

    @Column(name = "phone_number", length = 50)
    private String phoneNumber;

    @Column(name = "role", length = 20)
    @ColumnDefault("'user'")
    private String role;

    @Column(name = "reg_date", columnDefinition = "TIMESTAMP")
    private LocalDateTime regDate;

    @Column(name = "is_resign")
    @ColumnDefault("0")
    private Integer isResign;

    @Column(name = "is_first")
    @ColumnDefault("false")
    private Boolean isFirst;

    @Column(name = "activity_time")
    private Integer activityTime;

    @Column(name = "flogging_time")
    private Integer floggingTime;

    @Column(name = "reward")
    private Integer reward;

    @Column(name = "region_type")
    private Integer region_type;

    @Column(name = "region_lat", columnDefinition = "real")
    private Float regionLat;

    @Column(name = "region_lon", columnDefinition = "real")
    private Float regionLon;

}

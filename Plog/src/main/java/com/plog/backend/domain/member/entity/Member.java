package com.plog.backend.domain.member.entity;

import com.plog.backend.domain.member.dto.request.MemberJoinRequestDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AccessLevel;
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
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NotNull
    @Column(name = "email")
    private String email;

    @NotNull
    @Column(name = "password")
    private String password;

    @NotNull
    @Column(name = "name")
    private String name;

    @Column(name = "nickname")
    private String nickname;

    @NotNull
    @Column(name = "gender")
    private Integer gender;

    @NotNull
    @Column(name = "birth", columnDefinition = "DATE")
    private LocalDate birth;

    @NotNull
    @Column(name = "phone_number", length = 50)
    private String phoneNumber;

    @Column(name = "role", length = 20)
    @ColumnDefault("'customer'")
    private String role;

    @Column(name = "reg_date", columnDefinition = "TIMESTAMP")
    private LocalDateTime regDate;

    @Column(name = "is_resign")
    @ColumnDefault("0")
    private Integer isResign;

    @Builder(builderMethodName = "signupBuilder")
    public Member(MemberJoinRequestDto memberJoinRequestDto) {
        this.email = memberJoinRequestDto.getEmail();
        this.password = memberJoinRequestDto.getPassword();
        this.name = memberJoinRequestDto.getName();
        this.nickname = memberJoinRequestDto.getNickname();
        this.gender = memberJoinRequestDto.getGender();
        this.birth = memberJoinRequestDto.getBirth();
        this.phoneNumber = memberJoinRequestDto.getPhoneNumber();
        this.role = "default";
        this.regDate = LocalDateTime.now();
        this.isResign = 0;
    }

}

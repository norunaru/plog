package com.plog.backend.domain.community.entity;

import com.plog.backend.domain.activity.entity.Activity;
import com.plog.backend.domain.member.entity.Member;
import com.plog.backend.domain.trail.entity.Trail;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Getter
@Builder
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "community")
public class Community {

    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @OneToOne()
    @JoinColumn(name = "activity_id")
    private Activity activity;

    @ManyToOne()
    @JoinColumn(name ="member_id")
    private Member member;
}

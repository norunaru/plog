package com.plog.backend.domain.attraction.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Builder
@Entity
@Getter
@Setter
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "attraction")
public class Attraction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;

    @NotNull
    @Column(name = "name")
    String name;

    @NotNull
    @Column(name = "address")
    String address;

    @NotNull
    @Column(name = "type")
    String type;

    @NotNull
    @Column(name = "image")
    String image;

    @NotNull
    @Column(name = "lat")
    Float lat;

    @NotNull
    @Column(name = "lon")
    Float lon;
}

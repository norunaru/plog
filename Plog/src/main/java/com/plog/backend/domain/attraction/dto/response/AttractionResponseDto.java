package com.plog.backend.domain.attraction.dto.response;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class AttractionResponseDto {
    Long id;

    String name;

    String address;

    String type;

    String image;

    Float lat;

    Float lon;
}

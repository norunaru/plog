package com.plog.backend.domain.trail.dto.response;

import com.plog.backend.domain.trail.dto.TrailDto;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@AllArgsConstructor
@Data
public class TrailListResponseDto {

    private List<TrailDto> trails;
}

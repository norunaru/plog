package com.plog.backend.domain.activity.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ActivityImageDto {

    private Long id;          // 이미지의 고유 ID
    private String savedUrl;   // 저장된 이미지 URL
    private String savedPath;  // 저장된 이미지 경로
}
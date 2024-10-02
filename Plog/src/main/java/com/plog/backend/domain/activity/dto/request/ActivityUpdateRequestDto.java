package com.plog.backend.domain.activity.dto.request;

import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ActivityUpdateRequestDto {

    private Long id;
    private String title;
    private String review;
    private Float score;
    private List<MultipartFile> images;
}

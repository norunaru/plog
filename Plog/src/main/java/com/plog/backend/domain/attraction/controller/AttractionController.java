package com.plog.backend.domain.attraction.controller;

import com.plog.backend.domain.attraction.service.AttractionService;
import com.plog.backend.global.dto.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/attraction")
@RestController
public class AttractionController {
    @Autowired
    private AttractionService attractionService;

    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "관광지 정보 업데이트", description = "프론트 사용 X")
    @GetMapping("")
    public SuccessResponse<?> saveAttraction() {
        attractionService.saveAttraction();
        return SuccessResponse.ok();
    }

    @PreAuthorize("isAuthenticated()")
    @Operation(summary = "관광지 정보 불러오기API", description = "로그인만 되어있으면 사용가능")
    @GetMapping("/random")
    public SuccessResponse<?> randomAttraction() {
        return SuccessResponse.ok(attractionService.getRandomAttraction());
    }
}

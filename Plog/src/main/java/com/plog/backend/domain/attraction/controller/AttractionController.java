package com.plog.backend.domain.attraction.controller;

import com.plog.backend.domain.attraction.service.AttractionService;
import com.plog.backend.global.dto.SuccessResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/attraction")
@RestController
public class AttractionController {
    @Autowired
    private AttractionService attractionService;

    @GetMapping("")
    public SuccessResponse<?> saveAttraction() {
        attractionService.saveAttraction();
        return SuccessResponse.ok();
    }
}

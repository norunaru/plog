package com.plog.backend.domain.attraction.service;

import com.plog.backend.domain.attraction.dto.response.AttractionResponseDto;

public interface AttractionService {
    public void saveAttraction();

    public AttractionResponseDto getRandomAttraction();
}

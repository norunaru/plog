package com.plog.backend.domain.trail.service;

import com.plog.backend.domain.trail.dto.response.TrailListResponseDto;
import com.plog.backend.domain.trail.entity.Trail;
import java.util.List;

public interface TrailService {

    TrailListResponseDto getAllTrails();
}
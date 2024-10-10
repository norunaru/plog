package com.plog.backend.global.util.service;

import com.plog.backend.domain.trail.entity.Trail;
import com.plog.backend.global.util.repository.UtilTrailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UtilServiceImpl implements UtilService {

    private final UtilTrailRepository trailRepository;

    @Override
    public void saveTrail(Trail trail) {
        trailRepository.save(trail);
    }
}

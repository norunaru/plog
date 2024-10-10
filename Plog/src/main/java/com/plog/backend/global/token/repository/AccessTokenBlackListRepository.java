package com.plog.backend.global.token.repository;

import com.plog.backend.global.token.entity.AccessTokenBlackList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccessTokenBlackListRepository extends JpaRepository<AccessTokenBlackList, Long> {
    boolean existsByAccessToken(String accessToken);
}

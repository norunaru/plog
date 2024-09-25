package com.plog.backend.global.refreshtoken.repository;

import com.plog.backend.domain.member.entity.Member;
import com.plog.backend.global.refreshtoken.entity.RefreshToken;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByEmail(String email);
}

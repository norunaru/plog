package com.plog.backend.domain.member.repository;

import java.time.LocalDate;

public interface MemberRepositoryCustom {

    String findEmailByNameAndBirthAndPhoneNumber(final String name, final LocalDate birth,
        final String phoneNumber);

    boolean existsByEmail(final String email);

    boolean existsByNickname(final String nickname);

    boolean existsByPhoneNumber(final String phoneNumber);
}

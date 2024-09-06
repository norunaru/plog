package com.plog.backend.domain.member.repository;

import com.plog.backend.domain.member.entity.QMember;
import java.time.LocalDate;

import org.springframework.stereotype.Repository;

import com.querydsl.core.types.dsl.StringPath;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MemberRepositoryCustomImpl implements MemberRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    public String findEmailByNameAndBirthAndPhoneNumber(final String name, final LocalDate birth,
        final String phoneNumber) {
        return jpaQueryFactory.select(QMember.member.email)
            .from(QMember.member)
            .where(QMember.member.name.eq(name)
                .and(
                    QMember.member.birth.eq(birth).and(QMember.member.phoneNumber.eq(phoneNumber))))
            .fetchOne();
    }

    @Override
    public boolean existsByEmail(final String email) {
        return existsByField(QMember.member.email, email);
    }

    @Override
    public boolean existsByNickname(final String nickname) {
        return existsByField(QMember.member.nickname, nickname);
    }

    @Override
    public boolean existsByPhoneNumber(final String phoneNumber) {
        return existsByField(QMember.member.phoneNumber, phoneNumber);
    }

    private boolean existsByField(StringPath field, String value) {
        Integer fetchOne = jpaQueryFactory
            .selectOne().from(QMember.member)
            .where(field.eq(value))
            .fetchFirst();

        return fetchOne != null;
    }
}


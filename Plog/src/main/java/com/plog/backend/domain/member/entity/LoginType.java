package com.plog.backend.domain.member.entity;

public enum LoginType {

    COMMON("common"),
    KAKAO("kakao"),
    GOOGLE("apple");

    private final String loginType;

    LoginType(final String loginType) {
        this.loginType = loginType;
    }

    public String get() {
        return loginType;
    }
}

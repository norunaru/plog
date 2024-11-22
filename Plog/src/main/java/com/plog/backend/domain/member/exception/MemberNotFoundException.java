package com.plog.backend.domain.member.exception;

public class MemberNotFoundException extends RuntimeException {

    private static final String ERROR_MESSAGE = "해당 회원을 찾을 수 없습니다.";

    public MemberNotFoundException() {
        super(ERROR_MESSAGE);
    }
}

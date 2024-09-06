package com.plog.backend.domain.member.exception;

public class MemberResignedException extends RuntimeException {
    private static final String message = "해당회원은 탈퇴한 회원입니다.";

    public MemberResignedException() {
        super(message);
    }
}

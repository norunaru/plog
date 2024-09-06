package com.plog.backend.global.oauth.exception;

public class AlreadySignUpException extends RuntimeException {

    public AlreadySignUpException(String message) {
        super(message);
    }
}

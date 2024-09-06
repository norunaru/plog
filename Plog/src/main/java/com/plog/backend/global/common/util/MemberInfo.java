package com.plog.backend.global.common.util;

import org.springframework.security.core.context.SecurityContextHolder;

public class MemberInfo {

    private MemberInfo() {
    }

    public static String getEmail() {
        return SecurityContextHolder.getContext()
            .getAuthentication()
            .getName();
    }
}

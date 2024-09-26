package com.plog.backend.global.common.util;

import com.plog.backend.global.security.CustomUserDetails;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public class MemberInfo {

    private MemberInfo() {
    }

    public static String getEmail() {
        return SecurityContextHolder.getContext()
            .getAuthentication()
            .getName();
    }

    // 사용자 이름을 UserDetails에서 직접 가져오는 방법 (필요할 경우)
    public static Long getUserId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ((CustomUserDetails) principal).getUserId();
    }
}

package com.plog.backend.domain.friend.dto;

import com.plog.backend.domain.member.dto.MemberDto;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FriendDto {

    private MemberDto member;
    private Integer isFriend;
    private LocalDateTime creationDate;
}

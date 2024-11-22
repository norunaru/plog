package com.plog.backend.domain.friend.dto.response;

import com.plog.backend.domain.friend.entity.Friend;
import java.util.Map;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FriendListResponseDto {
    private Integer friendCount;
    private Map<Long, Friend> friendList;
}

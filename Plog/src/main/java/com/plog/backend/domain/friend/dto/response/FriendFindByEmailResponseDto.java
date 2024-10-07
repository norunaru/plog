package com.plog.backend.domain.friend.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FriendFindByEmailResponseDto {

    String email;
}

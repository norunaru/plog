package com.plog.backend.domain.friend.service;

import com.plog.backend.domain.friend.dto.response.FriendListResponseDto;

public interface FriendService {

    void addFriend(Long member_id);

    void removeFriend(Long member_id);

    void requestFriend(Long member_id);

    FriendListResponseDto getFriends();
}

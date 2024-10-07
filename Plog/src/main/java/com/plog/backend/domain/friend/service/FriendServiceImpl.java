package com.plog.backend.domain.friend.service;

import com.plog.backend.domain.friend.dto.response.FriendListResponseDto;
import com.plog.backend.domain.friend.entity.Friend;
import com.plog.backend.domain.member.entity.Member;
import com.plog.backend.domain.member.repository.MemberRepository;
import com.plog.backend.global.common.util.MemberInfo;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class FriendServiceImpl implements FriendService {

    private final MemberRepository memberRepository;

    @Override
    public void addFriend(Long friendId) {
        Optional<Member> currentUser = memberRepository.findById(MemberInfo.getUserId());
        Optional<Member> friendToAdd = getFriend(friendId);

        if (currentUser.isPresent() && friendToAdd.isPresent()) {
            Member member = currentUser.get();
            Member friend = friendToAdd.get();
            member.getFriends().get(friend.getId()).acceptFriend();
            memberRepository.save(member);
        }
    }

    @Override
    public void removeFriend(Long friendId) {
        Optional<Member> currentUser = memberRepository.findById(MemberInfo.getUserId());
        Optional<Member> friendToRemove = getFriend(friendId);

        if (currentUser.isPresent() && friendToRemove.isPresent()) {
            Member member = currentUser.get();
            Member friend = friendToRemove.get();
            removeFriendInternal(member, friend);
            memberRepository.save(member);
        }
    }

    @Override
    public void requestFriend(Long friendId) {
        Optional<Member> currentUser = memberRepository.findById(MemberInfo.getUserId());
        Optional<Member> friendToRequest = getFriend(friendId);

        if (currentUser.isPresent() && friendToRequest.isPresent()) {
            Member member = currentUser.get();
            Member friend = friendToRequest.get();
            if (member.getFriends().containsKey(friend.getId())) {
                return;
            }
            addFriendInternal(member, friend, LocalDateTime.now());
            memberRepository.save(member);
        }
    }

    @Override
    public FriendListResponseDto getFriends() {
        Optional<Member> currentUser = memberRepository.findById(MemberInfo.getUserId());
        FriendListResponseDto friendListResponseDto = null;
        if (currentUser.isPresent()) {
            Member member = currentUser.get();
            Hibernate.initialize(member.getFriends()); // Lazy 로딩된 컬렉션을 강제 초기화
            friendListResponseDto = FriendListResponseDto.builder().friendList(member.getFriends())
                .build();
        }
        return friendListResponseDto;
    }

    private Optional<Member> getFriend(Long friendId) {
        return memberRepository.findById(friendId);
    }

    private void addFriendInternal(Member member, Member friend, LocalDateTime creationDate) {
        member.addFriend(Friend.builder()
            .member(friend)
            .creationDate(creationDate)
            .isFriend(0)
            .build());
    }

    private void removeFriendInternal(Member member, Member friend) {
        Friend friendToRemove = member.getFriends().get(friend.getId());
        if (friendToRemove != null) {
            member.removeFriend(friendToRemove);
        }
    }
}

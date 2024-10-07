package com.plog.backend.domain.friend.service;

import com.plog.backend.domain.friend.dto.response.FriendListResponseDto;
import com.plog.backend.domain.friend.entity.Friend;
import com.plog.backend.domain.member.entity.Member;
import com.plog.backend.domain.member.repository.MemberRepository;
import com.plog.backend.global.common.util.MemberInfo;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
        Optional<Member> friendToRequest = memberRepository.findById(friendId);

        if (currentUser.isPresent() && friendToRequest.isPresent()) {
            Member member = currentUser.get();
            Member friend = friendToRequest.get();

            // 기존에 같은 친구가 있는지 확인 후, 없는 경우에만 추가
            if (!member.getFriends().containsKey(friend.getId())) {
                Friend newFriend = Friend.builder()
                    .member(member)
                    .creationDate(LocalDateTime.now())
                    .isFriend(0)
                    .friend(friend)
                    .build();

                member.addFriend(newFriend);  // 친구 추가
                memberRepository.save(member);  // 변경 사항 저장
            }
        }
    }

    @Override
    @Transactional(readOnly = true)
    public FriendListResponseDto getFriends() {
        return memberRepository.findById(MemberInfo.getUserId())
            .map(member -> {
                log.info("Friend list size for member {}: {}", member.getId(),
                    member.getFriends().size());
                // FriendListResponseDto에 친구 목록 (Map 형태) 포함
                return FriendListResponseDto.builder()
                    .friendCount(member.getFriends().size())
                    .friendList(member.getFriends())
                    .build();
            })
            .orElseThrow(() -> new IllegalArgumentException(
                "Member not found with id: " + MemberInfo.getUserId()));
    }

    private Optional<Member> getFriend(Long friendId) {
        return memberRepository.findById(friendId);
    }


    private void removeFriendInternal(Member member, Member friend) {
        Friend friendToRemove = member.getFriends().get(friend.getId());
        if (friendToRemove != null) {
            member.removeFriend(friendToRemove);
        }
    }
}

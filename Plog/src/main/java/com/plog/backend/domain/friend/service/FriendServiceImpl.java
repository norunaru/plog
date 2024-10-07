package com.plog.backend.domain.friend.service;

import com.plog.backend.domain.friend.dto.response.FriendFindByEmailResponseDto;
import com.plog.backend.domain.friend.dto.response.FriendListResponseDto;
import com.plog.backend.domain.friend.entity.Friend;
import com.plog.backend.domain.member.entity.Member;
import com.plog.backend.domain.member.repository.MemberRepository;
import com.plog.backend.global.common.util.MemberInfo;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
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

            // 친구를 member의 친구 목록에서 제거
            Friend friendToRemoveFromMap = member.getFriends().get(friend.getId());
            if (friendToRemoveFromMap != null) {
                member.removeFriend(friendToRemoveFromMap);
            }

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

            if ((!Objects.equals(member.getId(), friend.getId())) && !member.getFriends()
                .containsKey(friend.getId())) {
                Friend newFriend = Friend.builder()
                    .member(member)
                    .creationDate(LocalDateTime.now())
                    .isFriend(0)
                    .friend(friend)
                    .build();

                member.addFriend(newFriend);
                memberRepository.save(member);
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

    @Override
    public List<FriendFindByEmailResponseDto> findByEmail(String email) {
        List<Member> members = memberRepository.findByEmailContaining(email);
        List<FriendFindByEmailResponseDto> emailList = new ArrayList<>(members.size());

        for (Member member : members) {
            emailList.add(FriendFindByEmailResponseDto.builder()
                .email(member.getEmail())
                .id(member.getId())
                .nickName(member.getNickname())
                .build());
        }
        return emailList;
    }


    private Optional<Member> getFriend(Long friendId) {
        return memberRepository.findById(friendId);
    }
}

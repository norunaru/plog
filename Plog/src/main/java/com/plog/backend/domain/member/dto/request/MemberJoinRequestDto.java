package com.plog.backend.domain.member.dto.request;

import com.plog.backend.domain.member.dto.MemberImageDto;
import java.time.LocalDate;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MemberJoinRequestDto {

    private String email;
    private String name;
    private String nickname;
    private Integer gender;
    private LocalDate birth;
    private String phoneNumber;
    private MemberImageDto memberImage;
}
package com.awoo.member.application.service;

import com.awoo.member.application.dto.SignUpRequestDto;
import com.awoo.member.application.dto.LoginRequestDto;
import com.awoo.member.application.dto.MemberUpdateRequestDto;
import com.awoo.member.domain.model.Member;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {

    Member signUp(SignUpRequestDto requestDto, MultipartFile profileImageFile);

    String login(LoginRequestDto requestDto);

    Member updateMemberInfo(Long memberId, MemberUpdateRequestDto requestDto, MultipartFile profileImageFile);
    
}


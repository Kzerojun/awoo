package com.awoo.member.application.service;

import com.awoo.member.application.dto.LoginRequestDto;
import com.awoo.member.application.dto.MemberInfoResponseDto;
import com.awoo.member.application.dto.MemberUpdateRequestDto;
import com.awoo.member.application.dto.SignUpRequestDto;
import com.awoo.member.ui.dto.CheckMemberRequest;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {

    void signUp(SignUpRequestDto requestDto, MultipartFile profileImageFile) throws Exception;

    String login(LoginRequestDto requestDto);

    void updateMemberInfo(Integer memberId, MemberUpdateRequestDto requestDto, MultipartFile profileImageFile);

    MemberInfoResponseDto getMemberInfo(Integer memberId);

    String getUserKey(Integer memberId) throws Exception;

    boolean isEmailDuplicate(String email);
    boolean isNicknameDuplicate(String nickname);

    void updatePassword(Integer memberId, String newPassword);
    void updatePasswordByEmail(String email, String newPassword);

    boolean checkMember(CheckMemberRequest request);

    void paymentRegister(Integer memberId);
}


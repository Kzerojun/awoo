package com.awoo.member.application.service;

import com.awoo.member.application.dto.*;
import com.awoo.member.ui.dto.CheckMemberRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {

    void signUp(SignUpRequestDto requestDto, MultipartFile profileImageFile) throws Exception;

    TokenResponseDto login(LoginRequestDto requestDto);

    ResponseEntity<?> refreshToken(HttpServletRequest request);

    void updateMemberInfo(Integer memberId, MemberUpdateRequestDto requestDto, MultipartFile profileImageFile);

    MemberInfoResponseDto getMemberInfo(Integer memberId);

    String getUserKey(Integer memberId) throws Exception;

    boolean isEmailDuplicate(String email);
    boolean isNicknameDuplicate(String nickname);

    void updatePasswordByEmail(String email, String newPassword);

    boolean checkMember(CheckMemberRequest request);

    void paymentRegister(Integer memberId);

//    void updateWalkCount(List<Integer> memberIdList);

    void deleteMember(String memberId);
}


package com.awoo.member.application.service;

import com.awoo.member.application.dto.request.LoginRequestDto;
import com.awoo.member.application.dto.request.SignUpRequestDto;
import com.awoo.member.application.dto.response.MemberInfoResponseDto;
import com.awoo.member.application.dto.response.MemberUpdateRequestDto;
import com.awoo.member.application.dto.response.TokenResponseDto;
import com.awoo.member.ui.dto.CheckMemberRequest;
import com.awoo.member.ui.dto.FetchMemberInfo;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

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

    List<FetchMemberInfo> fetchMemberInfoList(Set<Integer> memberIds);
}


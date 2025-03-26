package com.awoo.member.ui.controller;

import com.awoo.member.application.dto.LoginRequestDto;
import com.awoo.member.application.dto.MemberInfoResponseDto;
import com.awoo.member.application.dto.MemberUpdateRequestDto;
import com.awoo.member.application.dto.SignUpRequestDto;
import com.awoo.member.application.service.MemberService;
import com.awoo.member.support.ApiUtils;
import com.awoo.member.ui.dto.CheckMemberRequest;
import com.awoo.member.ui.dto.CheckMemberResponse;
import com.awoo.member.ui.dto.FindMemberKeyResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    // 회원가입 (multipart/form-data)
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiUtils.ApiResult<?> signUp(
            @RequestPart(value = "requestDto") SignUpRequestDto requestDto,
            @RequestPart(value = "profileImage", required = false) MultipartFile profileImageFile
    ) {
        try{
            memberService.signUp(requestDto, profileImageFile);
            return ApiUtils.success(Map.of("message", "회원 가입 성공"));
        }catch (Exception e) {
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }

    //로그인
    @PostMapping("/login")
    public ResponseEntity<ApiUtils.ApiResult<?>> login(@RequestBody LoginRequestDto requestDto) {
        try {
            String token = memberService.login(requestDto);

            return ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                    .body(ApiUtils.success(Map.of("message", "로그인 성공")));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ApiUtils.error(e, HttpStatus.BAD_REQUEST));
        }
    }

    //회원 정보 수정
    @PutMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ApiUtils.ApiResult<?> updateMemberInfo(
            @RequestPart(value = "requestDto") MemberUpdateRequestDto requestDto,
            @RequestPart(value = "profileImage", required = false) MultipartFile profileImageFile
    ) {
        try {
            String currentUserId = SecurityContextHolder.getContext().getAuthentication().getName();
            Integer memberId = Integer.valueOf(currentUserId);
            memberService.updateMemberInfo(memberId, requestDto, profileImageFile);
            return ApiUtils.success(Map.of("message", "회원 정보가 수정되었습니다."));
        }catch (Exception e) {
            return ApiUtils.error(e,HttpStatus.BAD_REQUEST);
        }
    }

    //회원 정보 확인
    @GetMapping
    public ApiUtils.ApiResult<?> getMemberInfo(@RequestHeader("X-User-Id") String memberId) {
        try {
            MemberInfoResponseDto memberInfoResponseDto = memberService.getMemberInfo(Integer.valueOf(memberId));
            return ApiUtils.success(memberInfoResponseDto);
        } catch (Exception e) {
            return ApiUtils.error(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //이메일 중복 확인
    @GetMapping("/check-email")
    public ApiUtils.ApiResult<?>  checkEmailDuplicate(@RequestParam String email) {
        boolean isDuplicate = memberService.isEmailDuplicate(email);

        if (isDuplicate) {
            return ApiUtils.error("이미 사용중인 이메일입니다.", HttpStatus.BAD_REQUEST);
        }

        return ApiUtils.success(Map.of("message", "사용 가능한 이메일입니다."));
    }

    //닉네임 중복확인
    @GetMapping("/check-nickname")
    public ApiUtils.ApiResult<?> checkNicknameDuplicate(@RequestParam String nickname) {
        boolean isDuplicate = memberService.isNicknameDuplicate(nickname);

        if (isDuplicate) {
            return ApiUtils.error("이미 사용중인 닉네임입니다.", HttpStatus.BAD_REQUEST);
        }

        return ApiUtils.success(Map.of("message", "사용 가능한 닉네임입니다."));
    }

    //member Key 복호화 & 발행
    @GetMapping("/member-key")
    public ApiUtils.ApiResult<?> findUserKey(@RequestParam Integer memberId) throws Exception {

        return ApiUtils.success(FindMemberKeyResponse.create(memberService.getUserKey(memberId)));

    }

    //비밀번호 재설정
    @PatchMapping("/api/members/password")
    public ApiUtils.ApiResult<?> resetPassword(
            @RequestHeader(value = "X-User-Id", required = false) Integer memberId,
            @RequestBody Map<String, String> requestBody
    ) {
        String newPassword = requestBody.get("newPassword");

        if (newPassword == null || newPassword.trim().isEmpty()) {
            return ApiUtils.error("새 비밀번호는 필수입니다.", HttpStatus.BAD_REQUEST);
        }

        try {
            if (memberId != null) {
                memberService.updatePassword(memberId, newPassword);
            } else {
                String email = requestBody.get("email");
                if (email == null || email.trim().isEmpty()) {
                    return ApiUtils.error("이메일이 누락되었습니다.", HttpStatus.BAD_REQUEST);
                }
                memberService.updatePasswordByEmail(email, newPassword);
            }

            return ApiUtils.success(Map.of("message", "비밀번호가 성공적으로 변경되었습니다."));

        } catch (Exception e) {
            return ApiUtils.error(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("check-member")
    public ApiUtils.ApiResult<?> checkMember(@RequestBody CheckMemberRequest request) {
        if (memberService.checkMember(request)) return ApiUtils.success(new CheckMemberResponse("조회 성공"));
        return ApiUtils.error("조회 실패", HttpStatus.BAD_REQUEST);
    }


}

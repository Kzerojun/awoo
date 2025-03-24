package com.awoo.member.ui.controller;

import com.awoo.member.application.dto.LoginRequestDto;
import com.awoo.member.application.dto.MemberInfoResponseDto;
import com.awoo.member.application.dto.MemberUpdateRequestDto;
import com.awoo.member.application.dto.SignUpRequestDto;
import com.awoo.member.application.service.MemberService;
import com.awoo.member.domain.model.Member;
import com.awoo.member.support.ApiUtils;
import com.awoo.member.ui.dto.FindMemberKeyResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    // 회원가입 (multipart/form-data)
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> signUp(
            @RequestPart(value = "requestDto") SignUpRequestDto requestDto,
            @RequestPart(value = "profileImage", required = false) MultipartFile profileImageFile
    ) throws Exception {
        // Service로 DTO와 파일을 넘겨 처리
        Member savedMember = memberService.signUp(requestDto, profileImageFile);
        return new ResponseEntity<>(savedMember.getId(), HttpStatus.CREATED);
    }

    //로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto requestDto) {
        // 로그인 시도 → JWT 토큰 발급
        String token = memberService.login(requestDto);

        // 토큰을 json 형태로 리턴
        return ResponseEntity.ok(token);
    }

    //회원 정보 수정
    @PutMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> updateMemberInfo(
            @RequestPart(value = "requestDto") MemberUpdateRequestDto requestDto,
            @RequestPart(value = "profileImage", required = false) MultipartFile profileImageFile
    ) {
        String currentUserId = SecurityContextHolder.getContext().getAuthentication().getName();
        Integer memberId = Integer.valueOf(currentUserId);
        Member updatedMember = memberService.updateMemberInfo(memberId, requestDto, profileImageFile);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //회원 정보 확인
    @GetMapping
    public ResponseEntity<?> getMemberInfo(@RequestHeader("X-User-Id")Integer memberId) {
        try {
//            String currentUserId = SecurityContextHolder.getContext().getAuthentication().getName();
//            Integer memberId = Integer.valueOf(currentUserId);
            MemberInfoResponseDto memberInfoResponseDto = memberService.getMemberInfo(memberId);
            return ResponseEntity.ok(memberInfoResponseDto);

        } catch (Exception e) {
            // (4) 실패 시
            // {
            //    "success": false,
            //    "response": null,
            //    "error": {
            //        "message": ...,
            //        "status": ...
            //    }
            // }
            Map<String, Object> error = new LinkedHashMap<>();
            error.put("message", e.getMessage());
            error.put("status", HttpStatus.BAD_REQUEST.value());

            Map<String, Object> result = new LinkedHashMap<>();
            result.put("success", false);
            result.put("response", null);
            result.put("error", error);

            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/member-key")
    public ApiUtils.ApiResult<?> findUserKey(@RequestParam Integer memberId) throws Exception {
        return ApiUtils.success(FindMemberKeyResponse.create(memberService.getUserKey(memberId)));
    }

    //이메일 중복 확인
    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmailDuplicate(@RequestParam String email) {
        boolean isDuplicate = memberService.isEmailDuplicate(email);

        if (isDuplicate) {
            return ResponseEntity.ok(Map.of(
                    "success", false,
                    "message", "이미 사용 중인 이메일입니다."
            ));
        }

        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "사용 가능한 이메일입니다."
        ));
    }

    @GetMapping("/check-nickname")
    public ResponseEntity<?> checkNicknameDuplicate(@RequestParam String nickname) {
        boolean isDuplicate = memberService.isNicknameDuplicate(nickname);

        if (isDuplicate) {
            return ResponseEntity.ok(Map.of(
                    "success", false,
                    "message", "이미 사용 중인 닉네임입니다."
            ));
        }

        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "사용 가능한 닉네임입니다."
        ));
    }


}

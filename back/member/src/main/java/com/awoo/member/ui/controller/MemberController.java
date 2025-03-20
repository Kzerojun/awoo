package com.awoo.member.ui.controller;

import com.awoo.member.application.dto.LoginRequestDto;
import com.awoo.member.application.dto.MemberUpdateRequestDto;
import com.awoo.member.application.dto.SignUpRequestDto;
import com.awoo.member.application.service.MemberService;
import com.awoo.member.domain.model.Member;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    ) {
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

    @PutMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> updateMemberInfo(
            @RequestPart(value = "requestDto") MemberUpdateRequestDto requestDto,
            @RequestPart(value = "profileImage", required = false) MultipartFile profileImageFile
    ) {
        String currentUserId = SecurityContextHolder.getContext().getAuthentication().getName();
        Long memberId = Long.valueOf(currentUserId);

        Member updatedMember = memberService.updateMemberInfo(memberId, requestDto, profileImageFile);
        return ResponseEntity.ok(updatedMember);
    }
}

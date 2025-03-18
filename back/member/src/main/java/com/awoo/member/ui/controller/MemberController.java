package com.awoo.member.ui.controller;

import com.awoo.member.application.dto.LoginRequestDto;
import com.awoo.member.application.dto.MemberUpdateRequestDto;
import com.awoo.member.application.dto.SignUpRequestDto;
import com.awoo.member.application.service.MemberService;
import com.awoo.member.domain.model.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    //회원가입
    @PostMapping
    public ResponseEntity<?> signUp(@RequestBody SignUpRequestDto requestDto) {
        // 서비스 호출
        Member savedMember = memberService.signUp(requestDto);

        // 성공 시 201(Created) 리턴 등
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

    //회원정보 수정
    @PutMapping
    public ResponseEntity<?> updateMemberInfo(@RequestBody MemberUpdateRequestDto requestDto) {
        String currentUserId = SecurityContextHolder.getContext().getAuthentication().getName();
        Long memberId = Long.valueOf(currentUserId);

        Member updatedMember = memberService.updateMemberInfo(memberId, requestDto);
        return ResponseEntity.ok(updatedMember);
    }
}

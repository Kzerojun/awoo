package com.awoo.member.application.service;

import com.awoo.member.application.dto.LoginRequestDto;
import com.awoo.member.application.dto.MemberUpdateRequestDto;
import com.awoo.member.application.dto.SignUpRequestDto;
import com.awoo.member.domain.model.Member;
import com.awoo.member.domain.model.Provider;
import com.awoo.member.domain.model.vo.*;
import com.awoo.member.domain.repository.MemberRepository;
import com.awoo.member.infra.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider; // JWT 생성 클래스 (아래 예시 참고)

    @Override
    public Member signUp(SignUpRequestDto requestDto) {
        // 1) 이미 해당 이메일로 가입된 계정이 있는지 검사
        memberRepository.findByEmail(new Email(requestDto.getEmail()))
                .ifPresent(m -> {
                    throw new IllegalArgumentException("이미 사용중인 이메일입니다.");
                });

        // 2) 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(requestDto.getPassword());

        // 3) 도메인 객체 생성
        Member member = new Member(
                new Email(requestDto.getEmail()),
                encodedPassword,
                new Name(requestDto.getName()),
                new BirthDate(requestDto.getBirthDate()),
                new Gender(requestDto.getGender()),
                requestDto.getPhone(),
                requestDto.getProfileImage(),
                new PrivacyAgreement(requestDto.isPrivacyAgreed()),
                requestDto.getNickname(),
                Provider.L   // 자체 회원가입 시 Provider는 L
        );

        // 4) 저장
        return memberRepository.save(member);
    }

    @Override
    public String login(LoginRequestDto requestDto) {
        // 1) 이메일로 회원 조회
        Member member = memberRepository.findByEmail(new Email(requestDto.getEmail()))
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이메일입니다."));

        // 2) 비밀번호 매칭 확인
        if (!passwordEncoder.matches(requestDto.getPassword(), member.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        // 3) JWT 토큰 발급
        return jwtTokenProvider.createToken(member.getId().toString(), member.getEmail().getValue());
    }

    @Override
    public Member updateMemberInfo(Long memberId, MemberUpdateRequestDto requestDto) {
        // 1) 회원 조회
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        // 2) 도메인 로직에 따라 필요한 값만 업데이트
        //    예) 이름, 전화번호, 프로필 이미지, 닉네임 등
        //    (Email, BirthDate 등은 VO 특성상 쉽게 바뀌지 않음
        if (requestDto.getName() != null) {
            member.changeName(new Name(requestDto.getName()));
        }

        if (requestDto.getPhone() != null) {
            member.changePhone(requestDto.getPhone());
        }

        if (requestDto.getProfileImage() != null) {
            member.updateProfileImage(requestDto.getProfileImage());
        }

        if (requestDto.getNickname() != null) {
            member.changeNickname(requestDto.getNickname());
        }

        // 3) 변경 사항 저장
        return memberRepository.save(member);
    }
}


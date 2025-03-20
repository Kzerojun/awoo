package com.awoo.member.application.service;

import com.awoo.member.application.dto.LoginRequestDto;
import com.awoo.member.application.dto.MemberUpdateRequestDto;
import com.awoo.member.application.dto.SignUpRequestDto;
import com.awoo.member.application.dto.UserKeyResponseDto;
import com.awoo.member.domain.model.Member;
import com.awoo.member.domain.model.Provider;
import com.awoo.member.domain.model.vo.*;
import com.awoo.member.domain.repository.MemberRepository;
import com.awoo.member.infra.jwt.JwtTokenProvider;
import com.awoo.member.infra.util.AESUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.json.JsonParser;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final AESUtil aesUtil;
    private final AwsS3Service awsS3Service;
    private final MemberRepository memberRepository;
    private final BeerClientService beerClientService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    // 회원가입
    @Override
    public Member signUp(SignUpRequestDto requestDto, MultipartFile profileImageFile) throws Exception {
        // 1. S3 업로드 처리
        String uploadedImageUrl = null;
        if (profileImageFile != null && !profileImageFile.isEmpty()) {
            uploadedImageUrl = awsS3Service.uploadFile(profileImageFile);
        }

        // 2. BeerClientService를 통해 userKey 받은 뒤 암호화.
        UserKeyResponseDto userKeyResponseDto = beerClientService.postBeer(requestDto.getEmail());
        String encodedUserKey = userKeyResponseDto != null ? aesUtil.encrypt(userKeyResponseDto.getUserKey()) : null;

        // 3. Member 엔티티 생성 (빌더 패턴 적용)
        Member member = Member.builder()
                .email(new Email(requestDto.getEmail()))
                .password(passwordEncoder.encode(requestDto.getPassword()))
                .userKey(encodedUserKey)
                .name(new Name(requestDto.getName()))
                .birthDate(new BirthDate(requestDto.getBirthDate()))
                .gender(new Gender(requestDto.getGender()))
                .phone(requestDto.getPhone())
                .profileImage(uploadedImageUrl)
                .privacyAgreement(new PrivacyAgreement(requestDto.isPrivacyAgreed()))
                .nickname(requestDto.getNickname())
                .provider(Provider.L)
                .build();

        // 3. DB 저장
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
    // 회원정보 수정
    public Member updateMemberInfo(Long memberId, MemberUpdateRequestDto requestDto, MultipartFile profileImageFile) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("회원을 찾을 수 없습니다."));

        // 1. 이름, 전화번호, 닉네임 등 텍스트 값 수정
        if (requestDto.getName() != null) {
            member.changeName(new Name(requestDto.getName()));
        }
        if (requestDto.getPhone() != null) {
            member.changePhone(requestDto.getPhone());
        }
        if (requestDto.getNickname() != null) {
            member.changeNickname(requestDto.getNickname());
        }

        // 2. 프로필 이미지 파일이 있으면 업로드 후 Member 엔티티에 반영
        if (profileImageFile != null && !profileImageFile.isEmpty()) {
            String newUploadedUrl = awsS3Service.uploadFile(profileImageFile);
            member.updateProfileImage(newUploadedUrl);
        }

        return member;
    }
}


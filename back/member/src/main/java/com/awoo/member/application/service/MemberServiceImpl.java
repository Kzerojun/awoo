package com.awoo.member.application.service;

import com.awoo.member.application.dto.*;
import com.awoo.member.domain.model.Member;
import com.awoo.member.domain.model.Provider;
import com.awoo.member.domain.model.vo.*;
import com.awoo.member.domain.repository.MemberRepository;
import com.awoo.member.infra.jwt.JwtTokenProvider;
import com.awoo.member.infra.util.AESUtil;
import com.awoo.member.ui.dto.CheckMemberRequest;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;
import java.util.Arrays;
import java.util.List;
import java.util.Map;


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
//    @Transactional
    public void signUp(SignUpRequestDto requestDto, MultipartFile profileImageFile) throws Exception {
        // 1. S3 업로드 처리
        String uploadedImageUrl = null;
        if (profileImageFile != null && !profileImageFile.isEmpty()) {
            uploadedImageUrl = awsS3Service.uploadFile(profileImageFile);
        }

        // 3. Member 엔티티 생성 (빌더 패턴 적용)
        Member member = Member.builder()
                .email(new Email(requestDto.getEmail()))
                .password(passwordEncoder.encode(requestDto.getPassword()))
                .userKey("")    //빈 문자열로 임시 저장
                .name(new Name(requestDto.getName()))
                .birthDate(new BirthDate(requestDto.getBirthDate()))
                .gender(new Gender(requestDto.getGender()))
                .phone(requestDto.getPhone())
                .profileImage(uploadedImageUrl)
                .privacyAgreement(new PrivacyAgreement(requestDto.isPrivacyAgreed()))
                .nickname(requestDto.getNickname())
                .provider(Provider.L)
                .build();

        // 2. BeerClientService를 통해 userKey 받은 뒤 암호화. (회원가입 실패 해도 ssafy 아이디가 생겨서 위와 순서 바꿈)
        UserKeyResponseDto userKeyResponseDto = beerClientService.postBeer(requestDto.getEmail());
        String encodedUserKey = userKeyResponseDto != null ? aesUtil.encrypt(userKeyResponseDto.getUserKey()) : null;

        member.changeUserKey(encodedUserKey);   //받아온 암호화된 유저키 저장

        // 4. DB 저장
        memberRepository.save(member);
    }

    @Override
    public TokenResponseDto login(LoginRequestDto requestDto) {
        // 1) 이메일로 회원 조회
        Member member = memberRepository.findByEmail(new Email(requestDto.getEmail()))
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이메일입니다."));

        // 2) 비밀번호 매칭 확인
        if (!passwordEncoder.matches(requestDto.getPassword(), member.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        // 3) JWT 토큰 발급
        String accessToken = jwtTokenProvider.createAccessToken(member.getId(), member.getEmail().getValue());
        String refreshToken = jwtTokenProvider.createRefreshToken(member.getId(), member.getEmail().getValue());

        return new TokenResponseDto(accessToken, refreshToken);
    }

    public ResponseEntity<?> refreshToken(HttpServletRequest request) {
        // 1. 쿠키에서 refreshToken 추출
        String refreshToken = extractRefreshTokenFromCookies(request);
        if (refreshToken == null || !jwtTokenProvider.validateToken(refreshToken)) {
            return ResponseEntity.status(401).body(Map.of("message", "유효하지 않은 리프레시 토큰입니다."));
        }

        // 2. 토큰에서 사용자 정보 추출
        Integer memberId = jwtTokenProvider.getMemberIdFromToken(refreshToken);
        String email = jwtTokenProvider.getEmailFromToken(refreshToken);

        // 3. accessToken + 새로운 refreshToken 발급
        String newAccessToken = jwtTokenProvider.createAccessToken(memberId, email);
        String newRefreshToken = jwtTokenProvider.createRefreshToken(memberId, email);

        // 4. 새로운 refreshToken을 쿠키에 세팅
        ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", newRefreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(Duration.ofDays(7))
                .sameSite("Strict")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + newAccessToken)
                .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                .body(Map.of(
                        "message", "accessToken & refreshToken 재발급 완료",
                        "accessToken", newAccessToken
                ));
    }

    private String extractRefreshTokenFromCookies(HttpServletRequest request) {
        if (request.getCookies() == null) return null;

        return Arrays.stream(request.getCookies())
                .filter(cookie -> "refreshToken".equals(cookie.getName()))
                .findFirst()
                .map(Cookie::getValue)
                .orElse(null);
    }

    @Override
    @Transactional
    // 회원정보 수정
    public void updateMemberInfo(Integer memberId, MemberUpdateRequestDto requestDto, MultipartFile profileImageFile) {
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

        // Transactional 처리로 주석처리
        // memberRepository.save(member);
    }

    //회원 정보 조회
    @Override
    public MemberInfoResponseDto getMemberInfo(Integer memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("해당 회원을 찾을 수 없습니다."));

        // Member 엔티티 정보를 DTO로 매핑
        return MemberInfoResponseDto.builder()
                .nickname(member.getNickname())
                .name(member.getName().getValue())
                .email(member.getEmail().getValue())
                .phone(member.getPhone())
                .birthDate(member.getBirthDate().getValue().toString())
                .profileImage("https://c209awoo.s3.us-east-2.amazonaws.com/" + member.getProfileImage())
                .paymentRegister(member.isPaymentRegister())
//                .walkGrade(member.getWalkGrade())
                .build();
    }

    @Override
    public String getUserKey(Integer memberId) throws Exception {

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("회원을 찾을 수 없습니다."));

        return aesUtil.decrypt(member.getUserKey());
    }

    @Override
    public boolean isEmailDuplicate(String email) {
        return memberRepository.findByEmail(new Email(email)).isPresent();
    }

    @Override
    public boolean isNicknameDuplicate(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }

    @Override
    public void updatePasswordByEmail(String email, String newPassword) {
        Member member = memberRepository.findByEmail(new Email(email))
                .orElseThrow(() -> new RuntimeException("해당 이메일의 사용자가 존재하지 않습니다."));

        member.changePassword(passwordEncoder.encode(newPassword));
        memberRepository.save(member);
    }

    @Override
    public boolean checkMember(CheckMemberRequest request) {
        Member member = memberRepository.findById(request.memberId())
                .orElseThrow(() -> new RuntimeException("회원을 찾을 수 없습니다."));

        boolean nameMatches = member.getName().getValue().equals(request.name());
        boolean phoneMatches = member.getPhone().equals(request.phone());

        return nameMatches && phoneMatches;
    }

    //멍페이 등록
    @Transactional
    public void paymentRegister(Integer memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("회원을 찾을 수 없습니다."));

        member.changePaymentRegister(true);
        memberRepository.save(member);
    }

//    public void updateWalkCount(List<Integer> memberIdList) {
//        for (Integer memberId : memberIdList) {
//            Member member = memberRepository.findById(memberId).orElseThrow(() -> new RuntimeException("회원을 찾을 수 없습니다."));
//            member.changeWalkCount();
//        }
//    }

    @Transactional
    public void deleteMember(String memberId) {
        Member member = memberRepository.findById(Integer.valueOf(memberId))
                .orElseThrow(() -> new RuntimeException("회원을 찾을 수 없습니다."));

        member.markDeleted();
    }

}


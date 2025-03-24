package com.awoo.member.domain.repository;

import com.awoo.member.domain.model.Member;
import com.awoo.member.domain.model.vo.Email;

import java.util.Optional;

public interface MemberRepository {

    //회원 저장
    Member save(Member member);

    //회원 ID로 조회
    Optional<Member> findById(Integer id);

    //이메일로 회원 조회
    Optional<Member> findByEmail(Email email);

    boolean existsByNickname(String nickname);
}


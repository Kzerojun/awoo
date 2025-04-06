package com.awoo.member.domain.repository;

import com.awoo.member.domain.model.Member;
import com.awoo.member.domain.model.vo.Email;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface MemberRepository {

    //회원 저장
    Member save(Member member);

    //회원 ID로 조회
    Optional<Member> findById(Integer id);

    //이메일로 회원 조회
    Optional<Member> findByEmail(Email email);

    boolean existsByNickname(String nickname);

    List<Member> findAllByIdIn(Set<Integer> memberIds);
}


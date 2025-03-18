package com.awoo.member.infra.repository;

import com.awoo.member.domain.model.Member;
import com.awoo.member.domain.model.vo.Email;
import com.awoo.member.domain.repository.MemberRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JpaMemberRepository
        extends MemberRepository, JpaRepository<Member, Long> {

    // 파생 쿼리 메서드
    Optional<Member> findByEmail(Email email);

    // JpaRepository가 이미 제공하는 save(), findById(), findAll(), delete() 등은
    // MemberRepository에도 구현으로 매핑됩니다.
}

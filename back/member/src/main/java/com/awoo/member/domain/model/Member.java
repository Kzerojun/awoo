package com.awoo.member.domain.model;

import com.awoo.member.domain.model.vo.*;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "members")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id", updatable = false, nullable = false)
    private Long id;

    @Embedded
    private Email email;

    @Column(name = "password", nullable = false, length = 128)
    private String password;

    @Embedded
    private Name name;

    @Embedded
    private BirthDate birthDate;

    @Embedded
    private Gender gender;

    @Column(name = "phone", nullable = false, length = 15)
    private String phone;

    @Column(name = "profile_image", length = 1024)
    private String profileImage;

    @Embedded
    private PrivacyAgreement privacyAgreement;

    @Column(name = "nickname", nullable = false, length = 50)
    private String nickname;

    @Enumerated(EnumType.STRING)
    @Column(name = "provider", nullable = false)
    private Provider provider;

    protected Member() {} // JPA 기본 생성자

    public Member(Email email, String password, Name name, BirthDate birthDate, Gender gender, String phone,
                  String profileImage, PrivacyAgreement privacyAgreement, String nickname, Provider provider) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.birthDate = birthDate;
        this.gender = gender;
        this.phone = phone;
        this.profileImage = profileImage;
        this.privacyAgreement = privacyAgreement;
        this.nickname = nickname;
        this.provider = provider;
    }

    public void updateProfileImage(String newProfileImage) {
        this.profileImage = newProfileImage;
    }

    public void changeName(Name newName) {
        this.name = newName;
    }

    public void changePhone(String newPhone) {
        this.phone = newPhone;
    }

    public void changeNickname(String newNickname) {
        this.nickname = newNickname;
    }
}


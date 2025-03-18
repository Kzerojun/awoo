package com.awoo.pet.domain.pet;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class PetEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private int memberId;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(length = 1024)
    private String profileImage;

    @Column(nullable = false, length = 50)
    private String breed;

    @Column(nullable = false)
    private int age;

    @Column
    private int savingId;
}

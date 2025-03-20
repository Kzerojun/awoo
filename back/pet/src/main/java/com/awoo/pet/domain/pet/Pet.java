package com.awoo.pet.domain.pet;

import com.awoo.pet.application.command.ModifyPetCommand;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer petId;

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

    public void modifyPet(final ModifyPetCommand command){
        this.name = command.name();
        this.profileImage = command.profileImage();
        this.breed = command.breed();
        this.age = command.age();
    }

}

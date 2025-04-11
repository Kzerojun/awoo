package com.awoo.pet.domain.pet;

import com.awoo.pet.application.command.ModifyPetCommand;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    @Column(nullable = false)
    private int savingLevel = 0;

    @Column
    private String animalRegNumber;

    @Column
    private String ocrImageUrl;

    @Builder
    public Pet(Integer petId, int memberId, String name, String profileImage, String breed, int age, int savingId, int savingLevel, String animalRegNumber, String ocrImageUrl) {
        this.petId = petId;
        this.memberId = memberId;
        this.name = name;
        this.profileImage = profileImage;
        this.breed = breed;
        this.age = age;
        this.savingId = savingId;
        this.savingLevel = savingLevel;
        this.animalRegNumber = animalRegNumber;
        this.ocrImageUrl = ocrImageUrl;
    }

    public void modifyPet(final ModifyPetCommand command){
        this.name = command.name();
        this.breed = command.breed();
        this.age = command.age();
    }

    public void modifyPetProfile(final String profileImage){
        this.profileImage = profileImage;
    }

    public void registerSavingId(final Integer savingId) {
        this.savingId = savingId;
    }

}

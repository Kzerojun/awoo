package com.awoo.pet.domain.pet;

import lombok.Getter;

@Getter
public enum PetSavingGrade {

    ONE("Step1"),
    TWO("Step2"),
    THREE("Step3");

    private final String value;

    PetSavingGrade(String value){
        this.value = value;
    }
}

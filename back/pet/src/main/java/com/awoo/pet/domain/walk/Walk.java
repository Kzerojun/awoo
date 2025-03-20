package com.awoo.pet.domain.walk;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Walk {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer walkId;

    @Column(nullable = false)
    private Integer memberId;

    @Column(nullable = false)
    private Integer petId;

    @Column(nullable = false)
    private LocalDateTime startTime;

    @Column(nullable = false)
    private LocalDateTime endTime;

    @Column(nullable = false)
    private double distance;

    @Column
    private Integer savedAmount;

    @Builder
    public Walk(Integer memberId, Integer petId, LocalDateTime startTime, LocalDateTime endTime, double distance, Integer savedAmount) {
        this.memberId = memberId;
        this.petId = petId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.distance = distance;
        this.savedAmount = savedAmount;

    }
}

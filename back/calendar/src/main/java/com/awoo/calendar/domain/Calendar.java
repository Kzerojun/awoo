package com.awoo.calendar.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Calendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer calendarId;

    @Column(nullable = false)
    private int memberId;

    @Column(nullable = false)
    private int petId;

    @Column(nullable = false)
    private String scheduleContent;

    @Column(nullable = false)
    private LocalDateTime startTime;

    @Column(nullable = false)
    private LocalDateTime endTime;

    @Column(nullable = false)
    private String color;

    @Builder
    public Calendar(Integer calendarId, int memberId, int petId, String scheduleContent, LocalDateTime startTime, LocalDateTime endTime, String color) {
        this.calendarId = calendarId;
        this.memberId = memberId;
        this.petId = petId;
        this.scheduleContent = scheduleContent;
        this.startTime = startTime;
        this.endTime = endTime;
        this.color = color;
    }

}

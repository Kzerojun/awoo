package com.awoo.alarm.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Alarm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long alarmId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String body;

    @Column
    private Integer senderId;

    @Column
    private Integer receiverId;

    @Column(length = 1, nullable = false, columnDefinition = "CHAR(1)")
    private String isSend;


    @Builder
    public Alarm(Long alarmId, String title, String body, Integer senderId, Integer receiverId, String isSend) {
        this.alarmId = alarmId;
        this.title = title;
        this.body = body;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.isSend = isSend;
    }

}

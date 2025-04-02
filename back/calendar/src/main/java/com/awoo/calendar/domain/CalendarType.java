package com.awoo.calendar.domain;

import lombok.Getter;

@Getter
public enum CalendarType {

    NOMAL("일반"),
    WALK("산책"),
    PAY("페이");

    private final String value;

    CalendarType(final String value) {
        this.value = value;
    }
}

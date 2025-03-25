package com.awoo.calendar.infra;

import com.awoo.calendar.domain.Calendar;
import com.awoo.calendar.domain.CalendarRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JpaCalendarRepository extends JpaRepository<Calendar, Integer>, CalendarRepository {

    Optional<Calendar> findByCalendarId(Integer calendarId);

    @Override
    default void registerCalendar(Calendar calendar) {
        save(calendar);
    }


    @Override
    default Optional<Calendar> searchCalendar(Integer calendarId) {
        return findByCalendarId(calendarId);
    }



}

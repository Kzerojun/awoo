package com.awoo.calendar.infra;

import com.awoo.calendar.domain.Calendar;
import com.awoo.calendar.domain.CalendarRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JpaCalendarRepository extends JpaRepository<Calendar, Integer>, CalendarRepository {

    Optional<Calendar> findByCalendarIdAndDelYn(Integer calendarId, String delYn);

    List<Calendar> findByMemberIdAndDelYn(int memberId, String delYn);

    List<Calendar> findByPetIdAndDelYn(int petId, String delYn);

    @Override
    default void registerCalendar(Calendar calendar) {
        save(calendar);
    }


    @Override
    default Optional<Calendar> searchCalendar(Integer calendarId, String delYn) {
        return findByCalendarIdAndDelYn(calendarId, delYn);
    }

    @Override
    default List<Calendar> searchCalendarList(Integer memberId, String delYn) {
        return findByMemberIdAndDelYn(memberId, delYn);
    }

    @Override
    default List<Calendar> searchCalendarListByPet(Integer petId, String delYn) {
        return findByPetIdAndDelYn(petId, delYn);
    }


}

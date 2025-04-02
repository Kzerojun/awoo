package com.awoo.alarm.infra;

import com.awoo.alarm.domain.Alarm;
import com.awoo.alarm.domain.AlarmRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaAlarmRepository extends JpaRepository<Alarm, Long>, AlarmRepository {

    @Override
    default void saveAlarm(Alarm alarm) {
        System.out.println(alarm.getTitle());
        save(alarm);
    }

}

package com.awoo.admin.infra.JPARepository;

import com.awoo.admin.domain.Entity.ReportEntity;
import com.awoo.admin.domain.repository.ReportRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JpaReportRepository extends ReportRepository, JpaRepository<ReportEntity,Integer> {
    ReportEntity findByReportedUserEmail(String reportedUserEmail);
}

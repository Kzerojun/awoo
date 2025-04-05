package com.awoo.admin.domain.repository;

import com.awoo.admin.domain.Entity.ReportEntity;

import java.util.List;

public interface ReportRepository {

    ReportEntity save(ReportEntity existingReport);

    ReportEntity findByReportedUserEmail(String reportedUserEmail);

    ReportEntity findByReportId(int reportId);

    List<ReportEntity> findAll();
}

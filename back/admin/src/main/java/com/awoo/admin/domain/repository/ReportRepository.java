package com.awoo.admin.domain.repository;

import com.awoo.admin.domain.Entity.ReportEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReportRepository {

    ReportEntity save(ReportEntity existingReport);

//    ReportEntity findByReportedUserEmail(String reportedUserEmail);
//    ReportEntity findByUsedProductId(int usedProductId);

    ReportEntity findByReportId(int reportId);

    List<ReportEntity> findAll();


    @Query(value = "SELECT report_count FROM reports WHERE used_product_id = :usedProductId ORDER BY report_count DESC LIMIT 1", nativeQuery = true)
    Integer findMaxReportCountByUsedProductId(@Param("usedProductId") int usedProductId);

}

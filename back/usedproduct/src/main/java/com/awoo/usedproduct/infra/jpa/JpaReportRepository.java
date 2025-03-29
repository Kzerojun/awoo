package com.awoo.usedproduct.infra.jpa;

import com.awoo.usedproduct.domain.ReportEntity;
import com.awoo.usedproduct.domain.ReportRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaReportRepository extends JpaRepository<ReportEntity, Integer>,
		ReportRepository {

}

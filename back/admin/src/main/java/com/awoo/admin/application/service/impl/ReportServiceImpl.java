package com.awoo.admin.application.service.impl;

import com.awoo.admin.application.command.RegisterReportCommand;
import com.awoo.admin.application.command.handleReportCommand;
import com.awoo.admin.application.service.ReportService;
import com.awoo.admin.domain.Entity.ReportEntity;
import com.awoo.admin.domain.repository.ReportRepository;
import com.awoo.admin.ui.facade.dto.response.FetchReportResponse;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@AllArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;
    @Transactional
    public void registerReport(RegisterReportCommand command) {
        // 대상자 이메일 기준으로 기존 신고 검색
        ReportEntity existingReport = reportRepository.findByReportedUserEmail(command.reportedUserEmail());

        if (existingReport != null) {
            // 이전에 신고당한 적 있음 → 횟수만 증가
            existingReport.upCount(); // reportCount++
            reportRepository.save(existingReport);
        } else {
            // 최초 신고 → 새 신고 등록
            ReportEntity newReport = ReportEntity.builder()
                    .reporterName(command.reporterName())
                    .reporterEmail(command.reporterEmail())
                    .reportedUserName(command.reportedUserName())
                    .reportedUserEmail(command.reportedUserEmail())
                    .usedProductId(command.usedProductId())
                    .reportedAt(command.reportedAt())
                    .reason(command.reason())
                    .build();
            reportRepository.save(newReport);
        }
    }

    @Transactional
    public void handleReport(handleReportCommand command) {
        ReportEntity report = reportRepository.findByReportId(command.reportId());
        report.changeProcess(command.process());
    }

    public List<FetchReportResponse> fetchReportList() {
        List<ReportEntity> reports = reportRepository.findAll();

        return reports.stream()
                .map(r -> new FetchReportResponse(
                        r.getReportId(),
                        r.getReporterName(),
                        r.getReporterEmail(),
                        r.getReportedUserName(),
                        r.getReportedUserEmail(),
                        r.getUsedProductId(),
                        r.getReportedAt(),
                        r.getReason(),
                        r.getProcess(),
                        r.getReportCount()
                ))
                .toList();
    }

    public FetchReportResponse fetchReportDetail(int reportId) {
        ReportEntity r = reportRepository.findByReportId(reportId);
        return new FetchReportResponse(
                r.getReportId(),
                r.getReporterName(),
                r.getReporterEmail(),
                r.getReportedUserName(),
                r.getReportedUserEmail(),
                r.getUsedProductId(),
                r.getReportedAt(),
                r.getReason(),
                r.getProcess(),
                r.getReportCount()
        );
    }


}

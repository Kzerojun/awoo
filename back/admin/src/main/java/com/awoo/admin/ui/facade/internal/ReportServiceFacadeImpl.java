package com.awoo.admin.ui.facade.internal;

import com.awoo.admin.application.command.handleReportCommand;
import com.awoo.admin.application.service.ReportService;
import com.awoo.admin.ui.facade.ReportServiceFacade;
import com.awoo.admin.ui.facade.dto.response.FetchReportResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportServiceFacadeImpl implements ReportServiceFacade {
    private final ReportService reportService;

    public void handleReport(handleReportCommand command) {
        reportService.handleReport(command);
    }

    public List<FetchReportResponse> fetchReportList() {
        return reportService.fetchReportList();
    }

    public FetchReportResponse fetchReportDetail(int reportId) {
        return reportService.fetchReportDetail(reportId);
    }
}

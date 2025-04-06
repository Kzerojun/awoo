package com.awoo.admin.ui.facade;

import com.awoo.admin.application.command.handleReportCommand;
import com.awoo.admin.ui.facade.dto.response.FetchReportResponse;

import java.util.List;

public interface ReportServiceFacade {
    void handleReport(handleReportCommand command);

    List<FetchReportResponse> fetchReportList();

    FetchReportResponse fetchReportDetail(int reportId);
}

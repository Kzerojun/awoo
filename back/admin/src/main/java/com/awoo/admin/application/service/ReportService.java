package com.awoo.admin.application.service;

import com.awoo.admin.application.command.RegisterReportCommand;
import com.awoo.admin.application.command.handleReportCommand;
import com.awoo.admin.ui.facade.dto.response.FetchReportResponse;

import java.util.List;

public interface ReportService {
    void registerReport(RegisterReportCommand command);

    void handleReport(handleReportCommand command);

    List<FetchReportResponse> fetchReportList();

    FetchReportResponse fetchReportDetail(int reportId);
}

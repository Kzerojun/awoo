package com.awoo.admin.ui.facade.dto.request;

import com.awoo.admin.application.command.handleReportCommand;
import com.awoo.admin.domain.Process;

public record handleReportRequest(int reportId,
                                  Process process) {
    public handleReportCommand toCommand() {
        return handleReportCommand.builder()
                .reportId(reportId)
                .process(process)
                .build();
    }
}

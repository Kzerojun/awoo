package com.awoo.admin.application.command;

import com.awoo.admin.domain.Process;
import lombok.Builder;

public record handleReportCommand(int reportId,
                                  Process process) {
    @Builder
    public  handleReportCommand {

    }
}

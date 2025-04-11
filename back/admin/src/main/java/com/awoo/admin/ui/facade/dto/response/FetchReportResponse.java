package com.awoo.admin.ui.facade.dto.response;

import com.awoo.admin.domain.Process;

import java.time.LocalDateTime;

public record FetchReportResponse(
        Long reportId,
        String reporterName,
        String reporterEmail,
        String reportedUserName,
        String reportedUserEmail,
        int usedProductId,
        LocalDateTime reportedAt,
        String reason,
        Process process,
        int reportCount
) {}


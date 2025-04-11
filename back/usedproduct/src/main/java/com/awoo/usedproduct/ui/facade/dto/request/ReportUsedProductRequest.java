package com.awoo.usedproduct.ui.facade.dto.request;

import com.awoo.usedproduct.application.command.ReportCommand;
import com.awoo.usedproduct.domain.ReportReason;

public record ReportUsedProductRequest(ReportReason reason, String reportDetails) {

	public ReportCommand toCommand(Integer usedProductId, String memberId){
		return ReportCommand.builder()
				.reason(reason)
				.memberId(Integer.valueOf(memberId))
				.usedProductId(usedProductId)
				.reportDetails(reportDetails)
				.build();
	}

}

package com.awoo.usedproduct.ui.facade.dto.request;

import com.awoo.usedproduct.application.command.ReportCommand;
import com.awoo.usedproduct.domain.ReportReason;

public record ReportUsedProductRequest(ReportReason reason) {

	public ReportCommand toCommand(Integer usedProductId){
		return ReportCommand.builder()
				.reason(reason)
				.usedProductId(usedProductId)
				.build();
	}

}

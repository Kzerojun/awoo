package com.awoo.usedproduct.application.command;

import com.awoo.usedproduct.domain.ReportReason;
import lombok.Builder;

public record ReportCommand(Integer usedProductId, ReportReason reason, Integer memberId, String reportDetails) {

	@Builder
	public ReportCommand{

	}

}

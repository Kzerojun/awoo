package com.awoo.usedproduct.infra.kafka.event;


import com.awoo.usedproduct.domain.ReportReason;
import java.time.LocalDateTime;
import lombok.Builder;

public record UsedProductReportedEvent(
		Integer usedProductId,
		Reporter reporter,
		ReportedUser reportedUser,
		ReportReason reason,
		LocalDateTime reportedAt
) {


	@Builder
	public UsedProductReportedEvent{

	}
	public record Reporter(
			String name,
			String email
	) {}

	public record ReportedUser(
			String name,
			String email
	) {}

}


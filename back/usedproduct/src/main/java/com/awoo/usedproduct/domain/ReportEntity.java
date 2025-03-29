package com.awoo.usedproduct.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "reports")
@Getter
public class ReportEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer reportId;

	@Enumerated(EnumType.STRING)
	private ReportReason reason;

	@Enumerated(EnumType.STRING)
	private ReportStatus status;

	private Integer usedProductId;

	@Builder
	public ReportEntity(Integer usedProductId, ReportReason reason) {
		this.usedProductId = usedProductId;
		this.reason = reason;
		this.status = ReportStatus.P;
	}
}

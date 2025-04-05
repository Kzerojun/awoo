package com.awoo.usedproduct.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "reports")
@Getter
@EntityListeners(AuditingEntityListener.class)
public class ReportEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer reportId;

	@Enumerated(EnumType.STRING)
	private ReportReason reason;

	@Enumerated(EnumType.STRING)
	private ReportStatus status;

	private Integer usedProductId;

	@CreatedDate
	private LocalDateTime createdAt;

	@Builder
	public ReportEntity(Integer usedProductId, ReportReason reason) {
		this.usedProductId = usedProductId;
		this.reason = reason;
		this.status = ReportStatus.P;
	}
}

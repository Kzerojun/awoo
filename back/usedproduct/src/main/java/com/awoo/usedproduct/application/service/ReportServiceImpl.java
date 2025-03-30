package com.awoo.usedproduct.application.service;

import com.awoo.usedproduct.application.ReportService;
import com.awoo.usedproduct.application.command.ReportCommand;
import com.awoo.usedproduct.application.exception.ApplicationErrorCode;
import com.awoo.usedproduct.application.exception.UsedProductNotFoundException;
import com.awoo.usedproduct.domain.ReportEntity;
import com.awoo.usedproduct.domain.ReportRepository;
import com.awoo.usedproduct.domain.UsedProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

	private final ReportRepository reportRepository;
	private final UsedProductRepository usedProductRepository;

	@Override
	public Integer report(ReportCommand command) {
		boolean existed = usedProductRepository.existsById(command.usedProductId());
		if (!existed) {
			throw new UsedProductNotFoundException(ApplicationErrorCode.PRODUCT_NOT_FOUND);
		}

		ReportEntity reportEntity = ReportEntity.builder()
				.usedProductId(command.usedProductId())
				.reason(command.reason())
				.build();

		reportRepository.save(reportEntity);
		return reportEntity.getReportId();
	}
}

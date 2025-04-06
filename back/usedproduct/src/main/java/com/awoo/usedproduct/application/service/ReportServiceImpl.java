package com.awoo.usedproduct.application.service;

import com.awoo.usedproduct.application.ReportService;
import com.awoo.usedproduct.application.command.ReportCommand;
import com.awoo.usedproduct.application.exception.ApplicationErrorCode;
import com.awoo.usedproduct.application.exception.UsedProductNotFoundException;
import com.awoo.usedproduct.domain.ReportEntity;
import com.awoo.usedproduct.domain.ReportRepository;
import com.awoo.usedproduct.domain.UsedProductEntity;
import com.awoo.usedproduct.domain.UsedProductRepository;
import com.awoo.usedproduct.infra.MemberClient;
import com.awoo.usedproduct.infra.MemberInfoResponse;
import com.awoo.usedproduct.infra.kafka.KafkaProducer;
import com.awoo.usedproduct.infra.kafka.KafkaTopic;
import com.awoo.usedproduct.infra.kafka.event.UsedProductReportedEvent;
import com.awoo.usedproduct.infra.kafka.event.UsedProductReportedEvent.ReportedUser;
import com.awoo.usedproduct.infra.kafka.event.UsedProductReportedEvent.Reporter;
import com.awoo.usedproduct.support.ApiUtils.ApiResult;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

	private final ReportRepository reportRepository;
	private final UsedProductRepository usedProductRepository;
	private final KafkaProducer kafkaProducer;
	private final MemberClient memberClient;

	@Override
	public Integer report(ReportCommand command) {
		UsedProductEntity usedProductEntity = usedProductRepository.findById(
				command.usedProductId()).orElseThrow(() ->
				new UsedProductNotFoundException(ApplicationErrorCode.PRODUCT_NOT_FOUND));

		ReportEntity reportEntity = ReportEntity.builder()
				.usedProductId(command.usedProductId())
				.reason(command.reason())
				.reportDetails(command.reportDetails())
				.build();
		reportRepository.save(reportEntity);

		//신고한 사람 멤버정보
		ApiResult<MemberInfoResponse> reporterMemberInfo = memberClient.fetchMemberInfo(
				command.memberId());

		//신고 받은 사람 정보
		ApiResult<MemberInfoResponse> reportedMemberInfo = memberClient.fetchMemberInfo(
				usedProductEntity.getMemberId());

		//이벤트 발행
		UsedProductReportedEvent event = UsedProductReportedEvent.builder()
				.reportedUser(new ReportedUser(reportedMemberInfo.getResponse().name(),
						reportedMemberInfo.getResponse().email()))
				.reporter(new Reporter(reporterMemberInfo.getResponse().name(),
						reporterMemberInfo.getResponse().email()))
				.reason(command.reason())
				.reportedAt(reportEntity.getCreatedAt())
				.reportDetails(reportEntity.getReportDetails())
				.usedProductId(command.usedProductId())
				.build();

		kafkaProducer.sendKafkaMessage(KafkaTopic.USED_PRODUCT_REPORT.getTopicName(),event);
		return reportEntity.getReportId();
	}
}

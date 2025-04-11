package com.awoo.payment.application.impl;

import com.awoo.payment.application.TransferAmountService;
import com.awoo.payment.application.command.TransferAmountCommand;
import com.awoo.payment.application.exception.ApplicationErrorCode;
import com.awoo.payment.application.exception.MemberKeyNotFoundException;
import com.awoo.payment.application.exception.PaymentNotFoundException;
import com.awoo.payment.domain.PaymentEntity;
import com.awoo.payment.domain.PaymentRepository;
import com.awoo.payment.domain.TransactionEntity;
import com.awoo.payment.domain.TransactionRepository;
import com.awoo.payment.domain.TransferType;
import com.awoo.payment.infra.client.MemberClient;
import com.awoo.payment.infra.client.SSAFYDemandDepositClient;
import com.awoo.payment.infra.client.request.SSAFYDepositRequest;
import com.awoo.payment.infra.client.response.FetchMemberKeyResponse;
import com.awoo.payment.infra.redis.RedisHandler;
import com.awoo.payment.support.ApiUtils.ApiResult;
import com.awoo.payment.support.SSAFYApiHelper;
import com.awoo.payment.support.SSAFYCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TransferAmountImpl implements TransferAmountService {

	private final PaymentRepository paymentRepository;
	private final SSAFYDemandDepositClient ssafyDemandDepositClient;
	private final MemberClient memberClient;
	private final TransactionRepository transactionRepository;
	private final SSAFYApiHelper ssafyApiHelper;
	private final RedisHandler redisHandler;
	@Override
	@Transactional
	public Integer transferAmount(TransferAmountCommand command) {
		ApiResult<FetchMemberKeyResponse> fetchMemberKeyResponse = memberClient.fetchMemberKey(
				command.memberId());
		if (!fetchMemberKeyResponse.isSuccess()) {
			throw new MemberKeyNotFoundException(ApplicationErrorCode.MEMBER_KEY_NOT_FOUND);
		}

		if (redisHandler.hasIdempotencyKey(command.idempotencyKey())) {
			return Integer.valueOf(redisHandler.getValue(command.idempotencyKey()));
		}

		// SSAFY MEMBER KEY
		String memberKey = fetchMemberKeyResponse.getResponse().memberKey();

		//멍페이 잔액 차감
		PaymentEntity paymentEntity = paymentRepository.findByMemberId(command.memberId())
				.orElseThrow(
						PaymentNotFoundException::new);
		paymentEntity.transfer(command.amount());


		//상대 사람 싸피 API 이용 입금
		SSAFYDepositRequest request = SSAFYDepositRequest.builder()
				.Header(ssafyApiHelper.createHeader(memberKey, SSAFYCode.DEPOSIT))
				.accountNo(command.receiverAmountNo())
				.transactionBalance((long) command.amount())
				.transactionSummary("멍페이 입금")
				.build();

		ssafyDemandDepositClient.deposit(request);

		//출금 기록 저장
		TransactionEntity transactionEntity = TransactionEntity.builder()
				.type(TransferType.WITHDRAW)
				.paymentId(paymentEntity.getPaymentId())
				.amount(command.amount())
				.build();
		transactionRepository.save(transactionEntity);

		redisHandler.addIdempotencyKey(command.idempotencyKey(),
				transactionEntity.getTransactionId());
		return transactionEntity.getTransactionId();
	}
}

package com.awoo.payment.application.impl;

import com.awoo.payment.application.VerifyOneWonService;
import com.awoo.payment.application.command.VerifyOneWonCommand;
import com.awoo.payment.application.exception.ApplicationErrorCode;
import com.awoo.payment.application.exception.MemberKeyNotFoundException;
import com.awoo.payment.application.exception.OneWonValidationException;
import com.awoo.payment.application.exception.PaymentNotFoundException;
import com.awoo.payment.domain.PaymentEntity;
import com.awoo.payment.domain.PaymentRepository;
import com.awoo.payment.infra.client.MemberClient;
import com.awoo.payment.infra.client.SSAFYAuthClient;
import com.awoo.payment.infra.client.request.SSAFYVerifyOneWonRequest;
import com.awoo.payment.infra.client.response.FetchMemberKeyResponse;
import com.awoo.payment.infra.client.response.SSAFYVerifyOneWonResponse;
import com.awoo.payment.support.ApiUtils.ApiResult;
import com.awoo.payment.support.SSAFYApiHelper;
import com.awoo.payment.support.SSAFYCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class VerifyOneWonServiceImpl implements VerifyOneWonService {

	private final SSAFYApiHelper ssafyApiHelper;
	private final SSAFYAuthClient ssafyAuthClient;
	private final MemberClient memberClient;
	private final PaymentRepository paymentRepository;

	@Override
	@Transactional
	public void verifyOneWon(VerifyOneWonCommand command) {
		ApiResult<FetchMemberKeyResponse> fetchMemberKeyResponse = memberClient.fetchMemberKey(
				command.memberId());
		if (!fetchMemberKeyResponse.isSuccess()) {
			throw new MemberKeyNotFoundException(ApplicationErrorCode.MEMBER_KEY_NOT_FOUND);
		}

		String memberKey = fetchMemberKeyResponse.getResponse().memberKey();
		SSAFYVerifyOneWonRequest request = SSAFYVerifyOneWonRequest.builder()
				.accountNo(command.accountNo())
				.authText("AWOO")
				.authCode(command.authCode())
				.Header(ssafyApiHelper.createHeader(memberKey, SSAFYCode.ONE_WON_VERIFICATION))
				.build();

		SSAFYVerifyOneWonResponse ssafyVerifyOneWonResponse = ssafyAuthClient.verifyOneWon(request);
		if (!ssafyVerifyOneWonResponse.REC().status().equals("SUCCESS")) {
			throw new OneWonValidationException(ApplicationErrorCode.ONE_WON_INVALIDATION);
		}

		//TODO : 원래라면 이벤트를 발행시켜서 등록하는 서비스를 만들어서 책임 분리해야하는데 시간이 부족하여 일단 진행합니다.
		PaymentEntity paymentEntity = paymentRepository.findByMemberId(command.memberId())
				.orElseThrow(
						PaymentNotFoundException::new);
		paymentEntity.registerAccount(command.accountNo());
	}
}

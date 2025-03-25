package com.awoo.payment.application.impl;

import com.awoo.payment.application.RemitOneWonService;
import com.awoo.payment.application.command.RemitOneWonCommand;
import com.awoo.payment.infra.client.MemberClient;
import com.awoo.payment.infra.client.SSAFYClient;
import com.awoo.payment.infra.client.request.SSAFYRemitOneWonRequest;
import com.awoo.payment.infra.client.response.FetchMemberKeyResponse;
import com.awoo.payment.support.ApiUtils.ApiResult;
import com.awoo.payment.support.SSAFYApiHelper;
import com.awoo.payment.support.SSAFYCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class RemitOneWonServiceImpl implements RemitOneWonService {

	private final MemberClient memberClient;
	private final SSAFYClient ssafyClient;
	private final SSAFYApiHelper ssafyApiHelper;

	@Override
	public void remitOneWon(RemitOneWonCommand command) {
		ApiResult<FetchMemberKeyResponse> fetchMemberKeyResponse = memberClient.fetchMemberKey(
				command.memberId());

		String memberKey = fetchMemberKeyResponse.getResponse().memberKey();
		log.info("MemberKey{}", memberKey);
		log.info("accountNo{}", command.accountNo());

		if (fetchMemberKeyResponse.isSuccess()) {
			SSAFYRemitOneWonRequest request = SSAFYRemitOneWonRequest.builder()
					.Header(ssafyApiHelper.createHeader(memberKey, SSAFYCode.ONE_WON_REMITTANCE))
					.accountNo(command.accountNo())
					.authText("AWOO")
					.build();
			ssafyClient.remitOneWon(request);
		}
	}
}

package com.awoo.account.application.service;

import com.awoo.account.domain.AccountEntity;
import com.awoo.account.domain.AccountRepository;
import com.awoo.account.infra.JpaAccountRepository;
import com.awoo.account.infra.client.member.MemberClient;
import com.awoo.account.infra.client.member.response.FetchMemberKeyResponse;
import com.awoo.account.infra.ssafyfinance.SSAFYDemandDepositApiClient;
import com.awoo.account.infra.ssafyfinance.request.SSAFYCreateAccountRequest;
import com.awoo.account.infra.ssafyfinance.response.SSAFYFetchAccountResponse;
import com.awoo.account.infra.util.AESUtil;
import com.awoo.account.support.ApiUtils;
import com.awoo.account.support.SSAFYApiHelper;
import com.awoo.account.support.SSAFYCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService{

    private final MemberClient memberClient;
    private final SSAFYDemandDepositApiClient SSAFYApiClient;
    private final SSAFYApiHelper ssafyApiHelper;
    private final AESUtil aesUtil;
    private final JpaAccountRepository accountRepository;

    public void createAccount(String memberId) throws Exception {
        // MemberKey 조회
        ApiUtils.ApiResult<FetchMemberKeyResponse> response = memberClient.fetchMemberKey(Integer.valueOf(memberId));
        String memberKey = response.getResponse().memberKey();

        System.out.println("memberKey+"+memberKey);

        // 계좌 생성
        SSAFYCreateAccountRequest request = SSAFYCreateAccountRequest.builder()
                .Header(ssafyApiHelper.createHeader(memberKey, SSAFYCode.CREATE_ACCOUNT))
                .accountTypeUniqueNo("999-1-2f9c2ea1789943")    //Test 계좌 상품 연결
                .build();
        SSAFYFetchAccountResponse fetchAccountResponse = SSAFYApiClient.createAccount(request);

        //응답에서의 계좌 번호 암호화 후 DB 저장
        String encodedAccountNo = aesUtil.encrypt(fetchAccountResponse.REC().accountNo());
        AccountEntity account = AccountEntity.builder()
                .accountNumber(encodedAccountNo)
                .bankCode(fetchAccountResponse.REC().bankCode())
                .memberId(Integer.valueOf(memberId))
                .build();

        // DB 저장
        accountRepository.save(account);
    }
}

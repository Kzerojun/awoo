package com.awoo.account.application.service;

import com.awoo.account.application.command.CreateAccountCommand;
import com.awoo.account.application.dto.SSAFYAccountResponseDto;
import com.awoo.account.domain.AccountEntity;
import com.awoo.account.domain.AccountRepository;
import com.awoo.account.infra.client.member.MemberClient;
import com.awoo.account.infra.client.member.response.FetchMemberKeyResponse;
import com.awoo.account.infra.ssafyfinance.SSAFYDemandDepositApiClient;
import com.awoo.account.infra.ssafyfinance.request.SSAFYAccountListRequest;
import com.awoo.account.infra.ssafyfinance.request.SSAFYCreateAccountRequest;
import com.awoo.account.infra.ssafyfinance.response.SSAFYAccountListResponse;
import com.awoo.account.infra.ssafyfinance.response.SSAFYFetchAccountResponse;
import com.awoo.account.infra.util.AESUtil;
import com.awoo.account.support.ApiUtils;
import com.awoo.account.support.SSAFYApiHelper;
import com.awoo.account.support.SSAFYCode;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService{

    private final MemberClient memberClient;
    private final SSAFYDemandDepositApiClient SSAFYApiClient;
    private final SSAFYApiHelper ssafyApiHelper;
    private final AESUtil aesUtil;
    private final AccountRepository accountRepository;

    @Transactional
    public void createAccount(String memberId, CreateAccountCommand command) throws Exception {
        // MemberKey 조회
        ApiUtils.ApiResult<FetchMemberKeyResponse> response = memberClient.fetchMemberKey(Integer.valueOf(memberId));
        String memberKey = response.getResponse().memberKey();

        System.out.println(memberKey);

        // 계좌 생성
        SSAFYCreateAccountRequest request = SSAFYCreateAccountRequest.builder()
                .Header(ssafyApiHelper.createHeader(memberKey, SSAFYCode.CREATE_ACCOUNT))
                .accountTypeUniqueNo("999-1-2f9c2ea1789943")    //Test 계좌 상품 연결
                .build();
        SSAFYFetchAccountResponse fetchAccountResponse = SSAFYApiClient.createAccount(request);

        System.out.println("fetchAccountResponse.REC().accountNo()" + fetchAccountResponse.REC().accountNo());

        //응답에서의 계좌 번호 암호화
        String encodedAccountNo = aesUtil.encrypt(fetchAccountResponse.REC().accountNo());

        //요청에서의 계좌 비밀번호 암호화
        String encodedPassword = aesUtil.encrypt(command.password());

        AccountEntity account = AccountEntity.builder()
                .memberId(Integer.valueOf(memberId))
                .bankCode(fetchAccountResponse.REC().bankCode())
                .accountNumber(encodedAccountNo)
                .password(encodedPassword)
                .conditionsAgreement(command.conditionsAgreement())
                .build();

        System.out.println(account.toString());

        // DB 저장
        accountRepository.save(account);
    }

    public List<SSAFYAccountResponseDto> getAccountList(String memberId) {
        // MemberKey 조회
        ApiUtils.ApiResult<FetchMemberKeyResponse> response = memberClient.fetchMemberKey(Integer.valueOf(memberId));
        String memberKey = response.getResponse().memberKey();

        System.out.println("memberKey: " + memberKey);

        //계좌 목록 조회
        SSAFYAccountListRequest request = SSAFYAccountListRequest.builder()
                .Header(ssafyApiHelper.createHeader(memberKey, SSAFYCode.ACCOUNT_LIST))
                .build();

        SSAFYAccountListResponse fetchAccountResponse = SSAFYApiClient.getAccountList(request);

        return fetchAccountResponse.REC();
    }
}

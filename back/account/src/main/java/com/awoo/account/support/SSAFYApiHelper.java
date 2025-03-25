package com.awoo.account.support;

import com.awoo.account.infra.client.member.MemberClient;
import com.awoo.account.infra.client.member.response.FetchMemberKeyResponse;
import com.awoo.account.infra.ssafyfinance.SSAFYFinanceCommonHeader;
import java.time.LocalDateTime;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.ThreadLocalRandom;

@Component
@Slf4j
@RequiredArgsConstructor
public class SSAFYApiHelper {

    private final MemberClient memberClient;

    @Value("${ssafy.finance.api_key}")
    private String apiKey;

    private String generateTransmissionDate() {
        return LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
    }


    private String generateTransmissionTime() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern("HHmmss"));
    }

    private String generateInstitutionCode(){
        StringBuilder code = new StringBuilder(20);
        for (int i = 0; i < 20; i++) {
            code.append(ThreadLocalRandom.current().nextInt(0, 10));
        }
        return code.toString();
    }

    public SSAFYFinanceCommonHeader createHeader(Integer memberId,SSAFYCode code) {
        // MemberKey 조회
        ApiUtils.ApiResult<FetchMemberKeyResponse> response = memberClient.fetchMemberKey(memberId);
        String memberKey = response.getResponse().memberKey();

        return SSAFYFinanceCommonHeader
                .builder()
                .apiName(code.getCode())
                .transmissionDate(generateTransmissionDate())
                .transmissionTime(generateTransmissionTime())
                .institutionCode("00100")
                .fintechAppNo("001")
                .apiServiceCode(code.getCode())
                .institutionTransactionUniqueNo(generateInstitutionCode())
                .apiKey(apiKey)
                .userKey(memberKey)
                .build();
    }
}

package com.awoo.payment.support;

import com.awoo.payment.infra.client.SSAFYFinanceCommonHeader;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.ThreadLocalRandom;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class SSAFYApiHelper {

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

    public SSAFYFinanceCommonHeader createHeader(String memberKey,SSAFYCode code) {
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

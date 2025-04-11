package com.awoo.account.ui.facade.dto.response;

import java.util.List;

public record InquireSavingPaymentResponse(String bankCode,
                                           String bankName,
                                           String accountNo,
                                           String accountName,
                                           String interestRate,
                                           String depositBalance,
                                           String totalBalance,
                                           String accountCreateDate,
                                           String accountExpiryDate,
                                           List<paymentInfoResponse> paymentInfo
) {
}

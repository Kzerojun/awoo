package com.awoo.account.ui.facade.dto.response;

public record paymentInfoResponse(String depositInstallment,
                                  String paymentBalance,
                                  String paymentDate,
                                  String paymentTime,
                                  String status,
                                  String failureReason
) {
}

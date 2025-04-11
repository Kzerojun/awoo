package com.awoo.payment.application.impl;

import com.awoo.payment.application.CommonPayService;
import com.awoo.payment.application.command.CommonPayCommand;
import com.awoo.payment.application.exception.PaymentNotFoundException;
import com.awoo.payment.domain.*;
import com.awoo.payment.infra.client.UsedProductClient;
import com.awoo.payment.infra.client.response.UsedProductInfoResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CommonPayServiceImpl implements CommonPayService {

    private final UsedProductClient usedProductClient;
    private final PaymentRepository paymentRepository;
    private final TransactionRepository transactionRepository;

    @Override
    @Transactional
    public Integer commonPay(CommonPayCommand command) {
        UsedProductInfoResponse response = usedProductClient.fetchUsedProduct(command.usedProductId()).getResponse();

        PaymentEntity buyerPayment = paymentRepository.findByMemberId(command.memberId()).orElseThrow(PaymentNotFoundException::new);
        PaymentEntity sellerPayment = paymentRepository.findByMemberId(response.sellerId()).orElseThrow(PaymentNotFoundException::new);

        buyerPayment.commonPay(response.price(), sellerPayment);

        TransactionEntity buyerTransaction = TransactionEntity.builder()
                .type(TransferType.WITHDRAW)
                .amount(response.price())
                .paymentId(buyerPayment.getPaymentId())
                .build();

        TransactionEntity sellerTransaction = TransactionEntity.builder()
                .type(TransferType.DEPOSIT)
                .amount(response.price())
                .paymentId(sellerPayment.getPaymentId())
                .build();

        transactionRepository.save(buyerTransaction);
        transactionRepository.save(sellerTransaction);

        return buyerTransaction.getTransactionId();
    }
}

package com.awoo.payment.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "transactions")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class TransactionEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer transactionId;

	private Integer amount;

	@Enumerated(EnumType.STRING)
	private TransferType type;

	private Integer paymentId;

	@Builder
	public TransactionEntity(Integer amount, TransferType type, Integer paymentId) {
		this.amount = amount;
		this.type = type;
		this.paymentId = paymentId;
	}
}

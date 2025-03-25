package com.awoo.payment.infra.client.response;

public record SSAFYVerifyOneWonResponse(REC REC) {


	public record REC(String status){

	}
}

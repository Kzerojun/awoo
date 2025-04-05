package com.awoo.usedproduct.infra.kafka.event;

import lombok.Builder;

public record ChatEvent(String senderName, Integer receiverId, String message, String image) {


	@Builder
	public ChatEvent{

	}
}

package com.awoo.usedproduct.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ReportReason {
	ABUSE("욕설/비하"),
	FRAUD("사기"),
	SPAM("스팸/광고"),
	FALSE_INFORMATION("허위 정보"),
	HATE_SPEECH("혐오 발언"),
	SEXUAL_CONTENT("성적 콘텐츠"),
	OTHER("기타");

	private final String description;
}
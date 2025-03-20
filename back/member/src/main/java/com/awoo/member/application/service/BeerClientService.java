package com.awoo.member.application.service;

import com.awoo.member.application.dto.UserKeyRequestDto;
import com.awoo.member.application.dto.UserKeyResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@Slf4j
public class BeerClientService {
    private final WebClient webClient;
    @Value("${ssafy.finance.api_key}")
    private String apiKey;

    public BeerClientService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://finopenapi.ssafy.io").build();
    }

    public UserKeyResponseDto postBeer(String email) {
        String url = "/ssafy/api/v1/member/";

        UserKeyRequestDto requestDto = new UserKeyRequestDto(apiKey, email);

        log.info("Sending request to API: {}", url);
        log.info("Request Body: {}", requestDto);

        return webClient.post()
                .uri(url)
                .header("Content-Type", "application/json")  // JSON 헤더 추가
                .bodyValue(requestDto)
                .retrieve()
                .bodyToMono(UserKeyResponseDto.class)
                .block();
    }
}


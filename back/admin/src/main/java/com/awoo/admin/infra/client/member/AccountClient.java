package com.awoo.admin.infra.client.member;

import com.awoo.admin.infra.client.member.response.FetchAccountResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "account")
public interface AccountClient {

    @GetMapping("/api/account/all")
    List<FetchAccountResponse> fetchAccountAll();

}

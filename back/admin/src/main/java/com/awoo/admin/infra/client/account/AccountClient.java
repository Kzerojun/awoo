package com.awoo.admin.infra.client.account;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "account")
public interface AccountClient {

    @GetMapping("/api/accounts/all")
    List<FetchAccountResponse> fetchAccountAll();

}

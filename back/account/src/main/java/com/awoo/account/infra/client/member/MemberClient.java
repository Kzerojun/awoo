package com.awoo.account.infra.client.member;

import com.awoo.account.infra.client.member.response.FetchMemberKeyResponse;
import com.awoo.account.support.ApiUtils;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "member-service",url = "http://localhost:8085/api/members")
public interface MemberClient {

    @GetMapping("/member-key")
    ApiUtils.ApiResult<FetchMemberKeyResponse> fetchMemberKey(@RequestParam("memberId")Integer memberId);

}

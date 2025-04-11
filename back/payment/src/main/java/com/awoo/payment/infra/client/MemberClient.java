package com.awoo.payment.infra.client;

import com.awoo.payment.infra.client.request.CheckMemberRequest;
import com.awoo.payment.infra.client.response.CheckMemberResponse;
import com.awoo.payment.infra.client.response.FetchMemberKeyResponse;
import com.awoo.payment.support.ApiUtils;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "member")
public interface MemberClient {

    @PostMapping("/api/members/check-member")
    ApiUtils.ApiResult<CheckMemberResponse> checkMember(@RequestBody CheckMemberRequest request);

    @GetMapping("/api/members/member-key")
    ApiUtils.ApiResult<FetchMemberKeyResponse> fetchMemberKey(@RequestParam("memberId")Integer memberId);

}

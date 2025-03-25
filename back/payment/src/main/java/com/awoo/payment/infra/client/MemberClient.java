package com.awoo.payment.infra.client;

import com.awoo.payment.infra.client.request.CheckMemberRequest;
import com.awoo.payment.infra.client.response.CheckMemberResponse;
import com.awoo.payment.support.ApiUtils;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "member-service", url = "http://localhost:8085/api/members")
public interface MemberClient {

    @PostMapping("/check-member")
    ApiUtils.ApiResult<CheckMemberResponse> checkMember(@RequestBody CheckMemberRequest request);
}

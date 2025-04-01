package com.awoo.admin.infra.client.member;

import com.awoo.admin.infra.client.member.response.FetchMemberKeyResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "member")
public interface MemberClient {

    @GetMapping("/api/members/member-key")
    FetchMemberKeyResponse fetchMemberKey(@RequestParam("memberId")Integer memberId);

}

package com.awoo.admin.infra.client.member;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Set;

@FeignClient(name = "member")
public interface MemberClient {
    @PostMapping("/api/members/admin")
    List<FetchMemberInfo> fetchMemberInfoList(@RequestBody Set<Integer> memberIds);
}

package com.awoo.usedproduct.infra;

import com.awoo.usedproduct.support.ApiUtils;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "member")
public interface MemberClient {

    @GetMapping("/api/members")
    ApiUtils.ApiResult<MemberNicknameResponse> fetchNickname(@RequestHeader("X-User-Id") Integer memberId);

}

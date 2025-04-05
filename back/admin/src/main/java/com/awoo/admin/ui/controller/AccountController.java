package com.awoo.admin.ui.controller;

import com.awoo.admin.infra.client.member.response.FetchAccountResponse;
import com.awoo.admin.infra.client.member.response.FetchMemberInfo;
import com.awoo.admin.infra.client.member.response.FetchPetInfo;
import com.awoo.admin.support.ApiUtils;
import com.awoo.admin.ui.facade.AccountServiceFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountServiceFacade accountServiceFacade;

    @GetMapping
    public ApiUtils.ApiResult<?> fetchAccountList() {
        try {
            List<FetchAccountResponse> fetchAccountList = accountServiceFacade.fetchAccountList();

            // memberId 중복 제거
            Set<Integer> memberIds = fetchAccountList.stream()
                    .map(FetchAccountResponse::memberId)
                    .collect(Collectors.toSet());

            // petId 중복 제거
            Set<Integer> petIds = fetchAccountList.stream()
                    .map(FetchAccountResponse::petId)
                    .collect(Collectors.toSet());

            List<FetchMemberInfo> fetchMemberInfoList = accountServiceFacade.fetchMemberInfoList(memberIds);
            List<FetchPetInfo> fetchPetInfoList = accountServiceFacade.fetchPetInfoList(petIds);

            return null;
//            return ApiUtils.success();
        }catch (Exception e) {
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }
}

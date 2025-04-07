package com.awoo.admin.ui.controller;

import com.awoo.admin.infra.client.account.FetchAccountResponse;
import com.awoo.admin.infra.client.member.FetchMemberInfo;
import com.awoo.admin.infra.client.pet.FetchPetInfo;
import com.awoo.admin.support.ApiUtils;
import com.awoo.admin.ui.facade.AccountServiceFacade;
import com.awoo.admin.ui.facade.dto.response.CollectInternalInfoResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountServiceFacade accountServiceFacade;

    @GetMapping
    public ApiUtils.ApiResult<?> CollectInternalInfos() {
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

            // memberId → FetchMemberInfo 매핑
            Map<Integer, FetchMemberInfo> memberInfoMap = fetchMemberInfoList.stream()
                    .collect(Collectors.toMap(FetchMemberInfo::memberId, m -> m));

            // petId → petName 매핑
            Map<Integer, String> petNameMap = fetchPetInfoList.stream()
                    .collect(Collectors.toMap(FetchPetInfo::petId, FetchPetInfo::name));

            // 최종 응답 리스트 구성
            List<CollectInternalInfoResponse> responseList = fetchAccountList.stream()
                    .map(account -> {
                        FetchMemberInfo member = memberInfoMap.get(account.memberId());
                        String petName = petNameMap.get(account.petId());

                        return CollectInternalInfoResponse.builder()
                                .memberName(member.name())
                                .email(member.email())
                                .nickname(member.nickname())
                                .memberCreatedAt(member.memberCreatedAt())
                                .bankCode(account.bankCode())
                                .accountNo(account.accountNo())
                                .accountType(CollectInternalInfoResponse.AccountType.valueOf(account.accountType().name()))
                                .accountCreatedAt(account.accountCreatedAt())
                                .isDelete(account.isDelete())
                                .petName(petName)
                                .build();
                    })
                    .toList();

            return ApiUtils.success(responseList);
        }catch (Exception e) {
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }
}

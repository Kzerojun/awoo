package com.awoo.admin.ui.facade.internal;

import com.awoo.admin.application.service.AccountService;
import com.awoo.admin.infra.client.account.FetchAccountResponse;
import com.awoo.admin.infra.client.member.FetchMemberInfo;
import com.awoo.admin.infra.client.pet.FetchPetInfo;
import com.awoo.admin.ui.facade.AccountServiceFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AccountServiceFacadeImpl implements AccountServiceFacade {
    private final AccountService accountService;

    public List<FetchAccountResponse> fetchAccountList() {
        return accountService.fetchAccountList();
    }

    public List<FetchMemberInfo> fetchMemberInfoList(Set<Integer> memberIds) {
        return accountService.fetchMemberInfoList(memberIds);
    }

    public List<FetchPetInfo> fetchPetInfoList(Set<Integer> petIds) {
        return accountService.fetchPetInfoList(petIds);
    }
}

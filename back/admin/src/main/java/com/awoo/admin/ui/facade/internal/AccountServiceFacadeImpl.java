package com.awoo.admin.ui.facade.internal;

import com.awoo.admin.application.service.AccountService;
import com.awoo.admin.infra.client.member.response.FetchAccountResponse;
import com.awoo.admin.infra.client.member.response.FetchMemberInfo;
import com.awoo.admin.infra.client.member.response.FetchPetInfo;
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
        return null;
    }

    public List<FetchPetInfo> fetchPetInfoList(Set<Integer> petIds) {
        return null;
    }
}

package com.awoo.admin.application.service.impl;

import com.awoo.admin.application.service.AccountService;
import com.awoo.admin.infra.client.account.AccountClient;
import com.awoo.admin.infra.client.account.FetchAccountResponse;
import com.awoo.admin.infra.client.member.FetchMemberInfo;
import com.awoo.admin.infra.client.member.MemberClient;
import com.awoo.admin.infra.client.pet.FetchPetInfo;
import com.awoo.admin.infra.client.pet.PetClient;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class AccountServiceImpl implements AccountService {
    private final AccountClient accountClient;
    private final MemberClient memberClient;
    private final PetClient petClient;
    public List<FetchAccountResponse> fetchAccountList() {
        return accountClient.fetchAccountAll();
    }

    public List<FetchMemberInfo> fetchMemberInfoList(Set<Integer> memberIds) {
        return memberClient.fetchMemberInfoList(memberIds);
    }

    public List<FetchPetInfo> fetchPetInfoList(Set<Integer> petIds) {
        return petClient.fetchPetInfoList(petIds);
    }


}

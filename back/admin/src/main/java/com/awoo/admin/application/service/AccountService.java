package com.awoo.admin.application.service;

import com.awoo.admin.infra.client.account.FetchAccountResponse;
import com.awoo.admin.infra.client.member.FetchMemberInfo;
import com.awoo.admin.infra.client.pet.FetchPetInfo;

import java.util.List;
import java.util.Set;

public interface AccountService {
    List<FetchAccountResponse> fetchAccountList();

    List<FetchMemberInfo> fetchMemberInfoList(Set<Integer> memberIds);

    List<FetchPetInfo> fetchPetInfoList(Set<Integer> petIds);
}

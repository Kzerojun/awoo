package com.awoo.admin.ui.facade;

import com.awoo.admin.infra.client.account.FetchAccountResponse;
import com.awoo.admin.infra.client.member.FetchMemberInfo;
import com.awoo.admin.infra.client.pet.FetchPetInfo;

import java.util.List;
import java.util.Set;

public interface AccountServiceFacade {
    List<FetchAccountResponse> fetchAccountList(int page, int size);

    List<FetchMemberInfo> fetchMemberInfoList(Set<Integer> memberIds);

    List<FetchPetInfo> fetchPetInfoList(Set<Integer> petIds);
}

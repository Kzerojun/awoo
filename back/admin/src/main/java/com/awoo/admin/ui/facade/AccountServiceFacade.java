package com.awoo.admin.ui.facade;

import com.awoo.admin.infra.client.member.response.FetchAccountResponse;
import com.awoo.admin.infra.client.member.response.FetchMemberInfo;
import com.awoo.admin.infra.client.member.response.FetchPetInfo;

import java.util.List;
import java.util.Set;

public interface AccountServiceFacade {
    List<FetchAccountResponse> fetchAccountList();

    List<FetchMemberInfo> fetchMemberInfoList(Set<Integer> memberIds);

    List<FetchPetInfo> fetchPetInfoList(Set<Integer> petIds);
}

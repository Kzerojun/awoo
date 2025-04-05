package com.awoo.admin.application.service;

import com.awoo.admin.infra.client.member.response.FetchAccountResponse;

import java.util.List;

public interface AccountService {
    List<FetchAccountResponse> fetchAccountList();
}

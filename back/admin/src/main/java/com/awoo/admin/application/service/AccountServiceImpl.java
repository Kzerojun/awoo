package com.awoo.admin.application.service;

import com.awoo.admin.infra.client.member.response.FetchAccountResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AccountServiceImpl implements AccountService{
    public List<FetchAccountResponse> fetchAccountList() {



        return null;
    }
}

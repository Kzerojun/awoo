package com.awoo.account.ui.controller;

import com.awoo.account.support.ApiUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
public class AccountController {

    @PostMapping
    public ResponseEntity<?> createAccount(@RequestBody String userKey) {
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

//    @PostMapping
//    public ApiUtils.ApiError<>

}

package com.awoo.admin.support;

import lombok.Getter;

@Getter
public enum SSAFYCode {

    CREATE_SAVING_PRODUCT("createProduct"),
    INQUIRE_SAVING_PRODUCT("inquireSavingsProducts");

    private final String code;

    SSAFYCode(String code) {
        this.code = code;
    }
}

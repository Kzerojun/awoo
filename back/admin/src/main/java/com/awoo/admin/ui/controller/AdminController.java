package com.awoo.admin.ui.controller;

import com.awoo.admin.application.command.CreateAdminAccountCommand;
import com.awoo.admin.application.command.CreateSavingProductCommand;
import com.awoo.admin.application.command.LoginAdminCommand;
import com.awoo.admin.domain.Role;
import com.awoo.admin.support.ApiUtils;
import com.awoo.admin.ui.facade.AdminServiceFacade;
import com.awoo.admin.ui.facade.dto.request.CreateAdminAccountRequest;
import com.awoo.admin.ui.facade.dto.request.CreateSavingProductRequest;
import com.awoo.admin.ui.facade.dto.request.LoginAdminRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminServiceFacade adminServiceFacade;
    @PostMapping("/savings")
    public ApiUtils.ApiResult<?> createSavingProduct(@RequestBody CreateSavingProductRequest request) {
        try {
            CreateSavingProductCommand command = request.toCommand();
            adminServiceFacade.createSavingProduct(command);
            return ApiUtils.success("적금 상품이 생성되었습니다.");
        }catch (Exception e) {
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/savings")
    public ApiUtils.ApiResult<?> getSavingsProduct() {
        try {
            return ApiUtils.success(adminServiceFacade.getSavingsProduct());
        }catch (Exception e) {
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping
    public ApiUtils.ApiResult<?> createAdminAccount(@RequestBody CreateAdminAccountRequest request) {
        try {
            CreateAdminAccountCommand command = request.toCommand();
            adminServiceFacade.createAdminAccount(command);
            return ApiUtils.success("관리자 계정이 생성되었습니다.");
        }catch (Exception e) {
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ApiUtils.ApiResult<?> loginAdmin(@RequestBody LoginAdminRequest request) {
        try {
            LoginAdminCommand command = request.toCommand();
            Role role = adminServiceFacade.loginAdmin(command);
            if (role != null) {
                return ApiUtils.success(role);
            }
            return ApiUtils.error("비밀번호가 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
        }catch (Exception e) {
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }




}

package com.awoo.admin.ui.controller;

import com.awoo.admin.application.command.CreateSavingProductCommand;
import com.awoo.admin.support.ApiUtils;
import com.awoo.admin.ui.facade.SavingServiceFacade;
import com.awoo.admin.ui.facade.dto.request.CreateSavingProductRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/savings")
@RequiredArgsConstructor
public class SavingController {

    private final SavingServiceFacade savingServiceFacade;
    @PostMapping
    public ApiUtils.ApiResult<?> createSavingProduct(@RequestBody CreateSavingProductRequest request) {
        try {
            CreateSavingProductCommand command = request.toCommand();
            savingServiceFacade.createSavingProduct(command);
            return ApiUtils.success("적금 상품이 생성되었습니다.");
        }catch (Exception e) {
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ApiUtils.ApiResult<?> getSavingsProduct() {
        try {
            return ApiUtils.success(savingServiceFacade.getSavingsProduct());
        }catch (Exception e) {
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }
}

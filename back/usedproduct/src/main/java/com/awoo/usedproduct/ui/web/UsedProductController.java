package com.awoo.usedproduct.ui.web;

import com.awoo.usedproduct.application.command.LikeCommand;
import com.awoo.usedproduct.application.command.ModifyUsedProductCommand;
import com.awoo.usedproduct.application.command.RegisterUsedProductCommand;
import com.awoo.usedproduct.support.ApiUtils;
import com.awoo.usedproduct.ui.facade.UsedProductServiceFacade;
import com.awoo.usedproduct.ui.facade.dto.request.ModifyUsedProductRequest;
import com.awoo.usedproduct.ui.facade.dto.request.RegisterUsedProductRequest;
import com.awoo.usedproduct.ui.facade.dto.response.LikeResponse;
import com.awoo.usedproduct.ui.facade.dto.response.ModifyUsedProductResponse;
import com.awoo.usedproduct.ui.facade.dto.response.RegisterUsedProductResponse;
import com.awoo.usedproduct.ui.facade.dto.response.UsedProductsResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/used-products")
public class UsedProductController {

    private final UsedProductServiceFacade usedProductServiceFacade;

    @PostMapping
    public ApiUtils.ApiResult<RegisterUsedProductResponse> registerUsedProduct(@RequestPart RegisterUsedProductRequest request,
                                                                               @RequestPart List<MultipartFile> images,
                                                                               @RequestHeader("X-User-Id") String userId) {
        RegisterUsedProductCommand command = request.toCommand(userId, images);
        RegisterUsedProductResponse response = usedProductServiceFacade.registerUsedProduct(command);
        return ApiUtils.success(response);
    }

    @PutMapping("/{usedProductId}")
    public ApiUtils.ApiResult<ModifyUsedProductResponse> modifyUsedProduct(@RequestPart ModifyUsedProductRequest request,
                                                                           @RequestPart List<MultipartFile> images,
                                                                           @RequestHeader("X-User-Id") String userId,
                                                                           @PathVariable Integer usedProductId) {
        ModifyUsedProductCommand command = request.toCommand(userId, usedProductId, images);
        ModifyUsedProductResponse response = usedProductServiceFacade.modifyUsedProduct(command);
        return ApiUtils.success(response);
    }

    @GetMapping
    public ApiUtils.ApiResult<UsedProductsResponse> fetchUsedProducts(@PageableDefault(size = 20, sort = "usedProductId", direction = Sort.Direction.DESC) Pageable pageable) {

        UsedProductsResponse response = usedProductServiceFacade.fetchUsedProducts(pageable);
        return ApiUtils.success(response);
    }

    @PostMapping("/{usedProductId}/likes")
    public ApiUtils.ApiResult<LikeResponse> like(@RequestHeader("X-User-Id") String memberId,
                                     @PathVariable(name = "usedProductId") Integer usedProductId) {
        LikeCommand command = LikeCommand.builder()
                .usedProductId(usedProductId)
                .memberId(Integer.valueOf(memberId))
                .build();

        LikeResponse response = usedProductServiceFacade.like(command);
        return ApiUtils.success(response);
    }
}

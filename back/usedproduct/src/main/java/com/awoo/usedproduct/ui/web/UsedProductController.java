package com.awoo.usedproduct.ui.web;

import com.awoo.usedproduct.application.command.RegisterUsedProductCommand;
import com.awoo.usedproduct.support.ApiUtils;
import com.awoo.usedproduct.ui.facade.UsedProductServiceFacade;
import com.awoo.usedproduct.ui.facade.dto.request.RegisterUsedProductRequest;
import com.awoo.usedproduct.ui.facade.dto.response.RegisterUsedProductResponse;
import lombok.RequiredArgsConstructor;
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
        RegisterUsedProductCommand command = request.toCommand(userId,images);
        RegisterUsedProductResponse response = usedProductServiceFacade.registerUsedProduct(command);
        return ApiUtils.success(response);
    }
}

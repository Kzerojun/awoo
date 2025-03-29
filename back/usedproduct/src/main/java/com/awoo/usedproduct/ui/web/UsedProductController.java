package com.awoo.usedproduct.ui.web;

import com.awoo.usedproduct.application.command.DeleteUsedProductCommand;
import com.awoo.usedproduct.application.command.LikeCommand;
import com.awoo.usedproduct.application.command.ModifyUsedProductCommand;
import com.awoo.usedproduct.application.command.RegisterUsedProductCommand;
import com.awoo.usedproduct.application.query.FetchUsedProductQuery;
import com.awoo.usedproduct.application.query.FetchUsedProductQuery.FetchUsedProductQueryBuilder;
import com.awoo.usedproduct.support.ApiUtils;
import com.awoo.usedproduct.ui.facade.UsedProductServiceFacade;
import com.awoo.usedproduct.ui.facade.dto.request.ModifyUsedProductRequest;
import com.awoo.usedproduct.ui.facade.dto.request.RegisterUsedProductRequest;
import com.awoo.usedproduct.ui.facade.dto.response.*;
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

    @DeleteMapping("/{usedProductId}")
    public ApiUtils.ApiResult<DeleteUsedProductResponse> deleteUsedProduct(@PathVariable(name = "usedProductId") Integer usedProductId,
                                                  @RequestHeader("X-User-Id") String memberId){
        DeleteUsedProductCommand command = DeleteUsedProductCommand.builder()
                .userProductId(usedProductId)
                .memberId(Integer.valueOf(memberId))
                .build();

        DeleteUsedProductResponse response = usedProductServiceFacade.delete(command);
        return ApiUtils.success(response);
    }
    @GetMapping("/{usedProductId}")
    public ApiUtils.ApiResult<FetchUsedProductDetailResponse> fetchUsedProduct(
            @PathVariable(name = "usedProductId") Integer usedProductId,
            @RequestHeader(value = "X-User-Id", required = false) String memberId) {
        Integer memberIdInt = (memberId != null) ? Integer.valueOf(memberId) : null;

        FetchUsedProductQuery query = FetchUsedProductQuery.builder()
                .usedProductId(usedProductId)
                .memberId(memberIdInt)
                .build();
        FetchUsedProductDetailResponse response = usedProductServiceFacade.fetchUsedProduct(query);
        return ApiUtils.success(response);
    }
}

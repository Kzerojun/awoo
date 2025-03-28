package com.awoo.usedproduct.ui.facade.internal;

import com.awoo.usedproduct.application.LikeService;
import com.awoo.usedproduct.application.ModifyUsedProductService;
import com.awoo.usedproduct.application.QueryUsedProductsService;
import com.awoo.usedproduct.application.RegisterUsedProductService;
import com.awoo.usedproduct.application.command.LikeCommand;
import com.awoo.usedproduct.application.command.ModifyUsedProductCommand;
import com.awoo.usedproduct.application.command.RegisterUsedProductCommand;
import com.awoo.usedproduct.domain.UsedProductEntity;
import com.awoo.usedproduct.ui.facade.UsedProductServiceFacade;
import com.awoo.usedproduct.ui.facade.dto.response.LikeResponse;
import com.awoo.usedproduct.ui.facade.dto.response.UsedProductsResponse;
import com.awoo.usedproduct.ui.facade.dto.response.ModifyUsedProductResponse;
import com.awoo.usedproduct.ui.facade.dto.response.RegisterUsedProductResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsedProductServiceFacadeImpl implements UsedProductServiceFacade {

    private final RegisterUsedProductService registerUsedProductService;
    private final ModifyUsedProductService modifyUsedProductService;
    private final QueryUsedProductsService queryUsedProductsService;
    private final LikeService likeService;

    @Override
    public RegisterUsedProductResponse registerUsedProduct(RegisterUsedProductCommand command) {
        Integer usedProductId = registerUsedProductService.registerUsedProduct(command);
        return new RegisterUsedProductResponse(usedProductId);
    }

    @Override
    public ModifyUsedProductResponse modifyUsedProduct(ModifyUsedProductCommand command) {
        Integer productId = modifyUsedProductService.modifyUsedProduct(command);
        return new ModifyUsedProductResponse(productId);
    }

    @Override
    public UsedProductsResponse fetchUsedProducts(Pageable pageable) {
        Page<UsedProductEntity> result = queryUsedProductsService.fetchUsedProducts(pageable);
        return UsedProductsResponse.fromPage(result);

    }

    @Override
    public LikeResponse like(LikeCommand command) {
        boolean result = likeService.like(command);
        return new LikeResponse(result);
    }
}

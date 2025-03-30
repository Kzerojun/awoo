package com.awoo.usedproduct.ui.facade.internal;

import com.awoo.usedproduct.application.*;
import com.awoo.usedproduct.application.command.DeleteUsedProductCommand;
import com.awoo.usedproduct.application.command.LikeCommand;
import com.awoo.usedproduct.application.command.ModifyUsedProductCommand;
import com.awoo.usedproduct.application.command.RegisterUsedProductCommand;
import com.awoo.usedproduct.application.command.ReportCommand;
import com.awoo.usedproduct.application.query.FetchMySalesQuery;
import com.awoo.usedproduct.application.query.FetchUsedProductQuery;
import com.awoo.usedproduct.domain.UsedProductEntity;
import com.awoo.usedproduct.ui.facade.UsedProductServiceFacade;
import com.awoo.usedproduct.ui.facade.dto.response.*;
import java.util.List;
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
    private final DeleteUsedProductService deleteUsedProductService;
    private final LikeService likeService;
    private final ReportService reportService;

    @Override
    public RegisterUsedProductResponse registerUsedProduct(RegisterUsedProductCommand command) {
        Integer usedProductId = registerUsedProductService.registerUsedProduct(command);
        return new RegisterUsedProductResponse(usedProductId);
    }

    @Override
    public ReportResponse report(ReportCommand command) {
        Integer reportId = reportService.report(command);
        return new ReportResponse(reportId);
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
    public FetchUsedProductDetailResponse fetchUsedProduct(FetchUsedProductQuery query) {
        UsedProductEntity usedProductEntity = queryUsedProductsService.fetchUsedProduct(query);
        boolean liked = queryUsedProductsService.isLiked(query.usedProductId(),query.memberId());
        FetchUsedProductDetailResponse response = FetchUsedProductDetailResponse.create(
                usedProductEntity, liked);

        return response;
    }

    @Override
    public LikeResponse like(LikeCommand command) {
        boolean result = likeService.like(command);
        return new LikeResponse(result);
    }

    @Override
    public DeleteUsedProductResponse delete(DeleteUsedProductCommand command) {
        deleteUsedProductService.deleteUsedProduct(command);
        return new DeleteUsedProductResponse("중고거래 삭제가 성공하였습니다.");
    }

    @Override
    public FetchMySalesResponse fetchMySales(FetchMySalesQuery query) {
        List<UsedProductEntity> usedProductEntities = queryUsedProductsService.fetchMySales(query);
        return FetchMySalesResponse.fromEntity(usedProductEntities);
    }
}

package com.awoo.usedproduct.ui.facade;

import com.awoo.usedproduct.application.command.DeleteUsedProductCommand;
import com.awoo.usedproduct.application.command.LikeCommand;
import com.awoo.usedproduct.application.command.ModifyUsedProductCommand;
import com.awoo.usedproduct.application.command.RegisterUsedProductCommand;
import com.awoo.usedproduct.application.command.ReportCommand;
import com.awoo.usedproduct.application.query.FetchUsedProductQuery;
import com.awoo.usedproduct.ui.facade.dto.response.*;
import org.springframework.data.domain.Pageable;

public interface UsedProductServiceFacade {

    RegisterUsedProductResponse registerUsedProduct(RegisterUsedProductCommand command);

    ModifyUsedProductResponse modifyUsedProduct(ModifyUsedProductCommand command);

    UsedProductsResponse fetchUsedProducts(Pageable pageable);

    FetchUsedProductDetailResponse fetchUsedProduct(FetchUsedProductQuery query);

    LikeResponse like(LikeCommand command);

    DeleteUsedProductResponse delete(DeleteUsedProductCommand command);

    ReportResponse report(ReportCommand command);

}

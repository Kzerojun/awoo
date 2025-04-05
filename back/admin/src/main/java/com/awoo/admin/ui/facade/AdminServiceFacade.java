package com.awoo.admin.ui.facade;

import com.awoo.admin.application.command.*;
import com.awoo.admin.domain.Role;
import com.awoo.admin.ui.facade.dto.response.FetchReportResponse;
import com.awoo.admin.ui.facade.dto.response.QuestionDetailResponse;
import com.awoo.admin.ui.facade.dto.response.SavingsProductResponse;
import com.awoo.admin.ui.facade.dto.response.fetchQuestionResponse;

import java.util.List;

public interface AdminServiceFacade {
    void createSavingProduct(CreateSavingProductCommand command);

    List<SavingsProductResponse> getSavingsProduct();

    void createAdminAccount(CreateAdminAccountCommand command);

    Role loginAdmin(LoginAdminCommand command);

    void answerQuestion(AnswerQuestionCommand command);

    List<fetchQuestionResponse> fetchQuestionList();

    QuestionDetailResponse fetchQuestionDetail(int questionId);

    void handleReport(handleReportCommand command);

    List<FetchReportResponse> fetchReportList();

    FetchReportResponse fetchReportDetail(int reportId);
}

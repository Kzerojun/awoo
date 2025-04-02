package com.awoo.admin.ui.facade.internal;

import com.awoo.admin.application.command.AnswerQuestionCommand;
import com.awoo.admin.application.command.CreateAdminAccountCommand;
import com.awoo.admin.application.command.CreateSavingProductCommand;
import com.awoo.admin.application.command.LoginAdminCommand;
import com.awoo.admin.application.service.AdminService;
import com.awoo.admin.application.service.QuestionService;
import com.awoo.admin.domain.Role;
import com.awoo.admin.ui.facade.AdminServiceFacade;
import com.awoo.admin.ui.facade.dto.response.QuestionDetailResponse;
import com.awoo.admin.ui.facade.dto.response.SavingsProductResponse;
import com.awoo.admin.ui.facade.dto.response.fetchQuestionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceFacadeImpl implements AdminServiceFacade {

    private final AdminService adminService;
    private final QuestionService questionService;
    public void createSavingProduct(CreateSavingProductCommand command) {
        adminService.createSavingProduct(command);
    }

    public List<SavingsProductResponse> getSavingsProduct() {
        return adminService.getSavingsProduct();
    }

    public void createAdminAccount(CreateAdminAccountCommand command) {
        adminService.createAdminAccount(command);
    }

    public Role loginAdmin(LoginAdminCommand command) {
        return adminService.loginAdmin(command);
    }

    public void answerQuestion(AnswerQuestionCommand command) {
        questionService.answerQuestion(command);
    }

    public List<fetchQuestionResponse> fetchQuestionList() {
        return questionService.fetchQuestionList();
    }

    public QuestionDetailResponse fetchQuestionDetail(int questionId) {
        return questionService.fetchQuestionDetail(questionId);
    }
}

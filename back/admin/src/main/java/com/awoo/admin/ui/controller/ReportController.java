package com.awoo.admin.ui.controller;

import com.awoo.admin.application.command.handleReportCommand;
import com.awoo.admin.support.ApiUtils;
import com.awoo.admin.ui.facade.AdminServiceFacade;
import com.awoo.admin.ui.facade.dto.request.handleReportRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/reports")
@RequiredArgsConstructor
public class ReportController {

    private final AdminServiceFacade adminServiceFacade;

    @PostMapping
    public ApiUtils.ApiResult<?> handleReport(@RequestBody handleReportRequest request) {
        try {
            handleReportCommand command = request.toCommand();
            adminServiceFacade.handleReport(command);
            return ApiUtils.success("처리 되었습니다.");
        }catch (Exception e) {
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ApiUtils.ApiResult<?> fetchReportList() {
        try {
            return ApiUtils.success(adminServiceFacade.fetchReportList());
        }catch (Exception e) {
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{reportId}")
    public ApiUtils.ApiResult<?> fetchReportDetail(@PathVariable int reportId) {
        try {
            return ApiUtils.success(adminServiceFacade.fetchReportDetail(reportId));
        }catch (Exception e) {
            return ApiUtils.error(e, HttpStatus.BAD_REQUEST);
        }
    }
}

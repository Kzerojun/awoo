package com.awoo.usedproduct.application;

import com.awoo.usedproduct.application.command.ReportCommand;

public interface ReportService {


	Integer report(ReportCommand command);
}

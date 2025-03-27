package com.awoo.usedproduct.ui.exception;

import com.awoo.usedproduct.application.exception.ApplicationException;
import com.awoo.usedproduct.domain.exception.DomainException;
import com.awoo.usedproduct.support.ApiUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class UsedProductExceptionHandler {

    @ExceptionHandler(ApplicationException.class)
    public ResponseEntity<?> handleApplicationException(ApplicationException e) {
        log.error("[Application Layer Exception]", e);
        return newResponse(e.getMessage(),e.getHttpStatus());
    }

    @ExceptionHandler(UiException.class)
    public ResponseEntity<?> handleUiException(UiException e) {
        log.error("[UI Layer Exception]", e);
        return newResponse(e.getMessage(),e.getHttpStatus());
    }

    @ExceptionHandler(DomainException.class)
    public ResponseEntity<?> handleDomainException(DomainException e) {
        log.error("[Domain Layer Exception]", e);
        return newResponse(e.getMessage(),e.getHttpStatus());
    }

    private ResponseEntity<ApiUtils.ApiResult<?>> newResponse(String message, HttpStatus status) {
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
        return new ResponseEntity<>(ApiUtils.error(message, status), headers, status);
    }
}

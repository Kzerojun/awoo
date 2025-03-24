package com.awoo.account.ui.exception;


import com.awoo.account.application.exception.AccountApplicationException;
import com.awoo.account.support.ApiUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AccountExceptionHandler {

    @ExceptionHandler(AccountApplicationException.class)
    public ResponseEntity<?> handleApplicationException(AccountApplicationException e) {
        return newResponse(e.getMessage(),e.getHttpStatus());
    }

    private ResponseEntity<ApiUtils.ApiResult<?>> newResponse(String message, HttpStatus status) {
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
        return new ResponseEntity<>(ApiUtils.error(message, status), headers, status);
    }
}

package com.awoo.member.infra.BaseColumn;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class AuditorHeaderFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        try {
            HttpServletRequest httpRequest = (HttpServletRequest) request;
            String userIdHeader = httpRequest.getHeader("X-User-Id");
            if (userIdHeader != null && !userIdHeader.isBlank()) {
                RequestHeaderAuditorAware.setCurrentAuditor(userIdHeader);
            }

            chain.doFilter(request, response);
        } finally {
            RequestHeaderAuditorAware.clear();
        }
    }
}


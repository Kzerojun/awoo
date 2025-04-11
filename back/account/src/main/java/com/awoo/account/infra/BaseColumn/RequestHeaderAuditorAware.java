package com.awoo.account.infra.BaseColumn;

import org.springframework.data.domain.AuditorAware;

import java.util.Optional;

public class RequestHeaderAuditorAware implements AuditorAware<Long> {

    private static final ThreadLocal<Long> currentAuditor = new ThreadLocal<>();

    public static void setCurrentAuditor(String userId) {
        try {
            currentAuditor.set(Long.parseLong(userId));
        } catch (NumberFormatException e) {
            currentAuditor.remove();
        }
    }

    public static void clear() {
        currentAuditor.remove();
    }

    @Override
    public Optional<Long> getCurrentAuditor() {
        return Optional.ofNullable(currentAuditor.get());
    }
}

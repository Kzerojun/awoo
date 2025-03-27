package com.awoo.member.infra.BaseColumn;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
public class JpaAuditingConfig {

    @Bean(name = "auditorProvider")
    public AuditorAware<Long> auditorProvider() {
        return new RequestHeaderAuditorAware();
    }
}

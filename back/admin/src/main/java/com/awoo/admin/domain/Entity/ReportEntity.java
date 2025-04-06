package com.awoo.admin.domain.Entity;

import com.awoo.admin.domain.Process;
import com.awoo.admin.infra.Kafka.consume.RegisterReportConsume;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "reports")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReportEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;

    @Column(nullable = false)
    private String reporterName;

    @Column(nullable = false)
    private String reporterEmail;

    @Column(nullable = false)
    private String reportedUserName;

    @Column(nullable = false)
    private String reportedUserEmail;

    @Column(nullable = false)
    private int usedProductId;

    @Column(nullable = false)
    private LocalDateTime reportedAt;

    @Column(nullable = false)
    private RegisterReportConsume.Reason reason;

//    @Column(nullable = false)
//    private String content;

    @Column
    @Enumerated(EnumType.STRING)
    private Process process;

    @Column(nullable = false)
    private int reportCount;

    @Builder
    public ReportEntity(String reporterName, String reporterEmail,
                        String reportedUserName, String reportedUserEmail, int usedProductId,
                        LocalDateTime reportedAt, RegisterReportConsume.Reason reason) {
        this.reporterName = reporterName;
        this.reporterEmail = reporterEmail;
        this.reportedUserName = reportedUserName;
        this.reportedUserEmail = reportedUserEmail;
        this.usedProductId = usedProductId;
        this.reportedAt = reportedAt;
        this.reason = reason;
        this.process = Process.P;
        this.reportCount = 1;
    }

    public void changeProcess(Process process) { this.process = process; }

    public void changeCount(int reportCount) { this.reportCount = reportCount; }
}

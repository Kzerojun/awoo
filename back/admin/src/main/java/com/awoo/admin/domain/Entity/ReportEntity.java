package com.awoo.admin.domain.Entity;

import com.awoo.admin.domain.Process;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Table(name = "reports")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReportEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;

    @Column(name = "user_from", nullable = false)
    private String userFrom;

    @Column(name = "user_to", nullable = false)
    private String userTo;

    @Column(name = "user_to_email", nullable = false)
    private String userToEmail;

    @Column(name = "report_by", nullable = false)
    private String reportBy;

    @Column(nullable = false)
    private String content;

    @Column
    @Enumerated(EnumType.STRING)
    private Process process;

    @Column(nullable = false)
    private int count;

    @Builder
    public ReportEntity(String userFrom, String userTo, String userToEmail, String reportBy,
                        String content) {
        this.userFrom = userFrom;
        this.userTo = userTo;
        this.userToEmail = userToEmail;
        this.reportBy = reportBy;
        this.content = content;
        this.process = Process.P;
        this.count = 1;
    }

    public void changeProcess(Process process) { this.process = process; }

    public void upCount() { this.count++; }
}

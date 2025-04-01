package com.awoo.admin.domain.Entity;

import com.awoo.admin.domain.Role;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Table(name = "admins")
@AllArgsConstructor
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AdminEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "admin_id")
    private String adminId;

    @Column(name = "password")
    private String adminPassword;

    @Column
    @Enumerated(EnumType.STRING)
    private Role role;

}

package com.app.backend.Entity;

import com.app.backend.Config.Role;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class JoinEntity {
    @Id
    private String uuid;
    @Column(unique = true)
    private String id;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String nickname;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String gender;
    @Column(nullable = false)
    private int age;
    @Column(nullable = false)
    private String auth_path;

    @Enumerated(EnumType.STRING) // Role enum을 DB에 문자열로 저장
    private Role role;

}
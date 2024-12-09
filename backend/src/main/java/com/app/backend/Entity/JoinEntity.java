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
    private String password;
    private String name;
    private String email;

    @Enumerated(EnumType.STRING) // Role enum을 DB에 문자열로 저장
    private Role role;

}
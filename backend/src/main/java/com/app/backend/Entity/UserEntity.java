package com.app.backend.Entity;

import com.app.backend.Config.Role;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class UserEntity {
    @Id
    private String uuid;
    private String id;
    private String password;
    private String name;
    private String email;

    @Enumerated(EnumType.STRING) // Role enum을 DB에 문자열로 저장
    private Role role;

}
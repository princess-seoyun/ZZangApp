package com.app.backend.DTO;

import org.springframework.data.annotation.Id;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class JoinDto {
    private String id;
    private String password;
    private String name;
    private String email;
}

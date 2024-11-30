package com.app.backend.DTO;

import org.springframework.data.annotation.Id;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDto {
     @Id
    private String id;
    private String password;
    private String name;
    private String email;
}

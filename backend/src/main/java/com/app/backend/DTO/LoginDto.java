package com.app.backend.DTO;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginDto {

    @Column(nullable = false)
    private String id;

    @Column(nullable = false)
    private String password;
}

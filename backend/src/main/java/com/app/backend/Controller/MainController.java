package com.app.backend.Controller;

import com.app.backend.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping("/user")
public class MainController {

//    @Autowired
//    private JwtUtil jwtUtil;

    // jwt 유효성 검사
    @PostMapping("/validJWT")
    public boolean validateToken(String token, String username) {
//        String extractedUsername = jwtUtil.extractUsername(token);
        boolean expiredToken = isTokenExpired(token);
        if(!expiredToken) { // 만료 되었으면 로그인 페이지로 이동하도록

        }
        return false;
//        return (extractedUsername.equals(username) && !jwtUtil.isTokenExpired(token));
    }

    // JWT가 만료되었는지 확인
    public boolean isTokenExpired(String token) {
//        return jwtUtil.extractExpiration(token).before(new Date());
        return false;
    }


}

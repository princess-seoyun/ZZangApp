package com.app.backend.Util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;


@Component
public class JwtUtil {

    private final SecretKey secretKey;

    public JwtUtil(@Value("${jwt.secret-key}")String secret) {
        this.secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
    }

    // 각 메소드는 토큰을 전달받아서 내부 Jwts.parser 를 이용해서 내부 데이터를 확인해서 return 해줌
    // verifyWith 메소드를 통해 우리가 가진 시크릿 키가 우리 서버에서 생성되었는지 확인함
    // parseSignedClaims 를 통해 Claims 를 확인 후
    // 특정한 데이터를 가져올 것이고(get 메소드 사용)
    // 마지막은 String 타입으로 가져오라는 의미
    public String getUserId(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("userId", String.class);
    }

    // 토큰이 만료되었는지 확인하는 메소드
    public Boolean isExpired(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration()
                .before(new Date());
    }

    // 로그인이 성공했을 때 토큰을 생성해서 응답하는 토큰 생성 메소드
    public String createJwt(String userId, String role) { // 유저 이름, 역할, 토큰 시간 인자로 넣어줌

        return Jwts.builder()
                .claim("userId", userId)
                .claim("role", role)
                .setIssuedAt(new Date(System.currentTimeMillis())) // 언제 발행되었는지 발행 시간을 issuedAt 메소드 활용해서 넣어줌
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))  // 24시간 유효
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }
}

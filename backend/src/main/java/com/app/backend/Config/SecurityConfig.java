package com.app.backend.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf((csrfConfig) -> csrfConfig.disable())  // 1. CSRF 비활성화
            .headers((headerConfig) ->
                headerConfig.frameOptions(frameOptionsConfig -> frameOptionsConfig.disable())  // 2. H2 콘솔 허용
            )
            .authorizeHttpRequests((authorizeRequests) ->
                authorizeRequests
                    .requestMatchers("/h2-console/**").permitAll()  // H2 콘솔 접근 허용
                    .requestMatchers("/user/**").permitAll()  // "/user/**" 경로 허용
                        .requestMatchers("/").permitAll()
                        .requestMatchers("/posts/**", "/api/posts/**").hasRole("USER")  // USER 역할을 가진 사람만 접근 가능
                    .requestMatchers("/admin/**", "/api/admin/**").hasRole("ADMIN")  // ADMIN 역할을 가진 사람만 접근 가능
                    .anyRequest().authenticated()  // 나머지 요청은 인증 필요
            );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("*");  // 모든 도메인 허용(보안 주의)
        configuration.addAllowedMethod("*");  // 모든 HTTP 메서드 허용
        configuration.addAllowedHeader("*");  // 모든 헤더 허용
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

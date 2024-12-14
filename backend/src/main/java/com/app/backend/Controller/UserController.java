package com.app.backend.Controller;

import com.app.backend.DTO.LoginDto;
import com.app.backend.Util.JwtUtil;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend.Entity.JoinEntity;
import com.app.backend.Service.UserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/user")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class); // Logger 인스턴스 생성

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    // 회원가입
    @PostMapping("/insert")
    public String registerUser(@RequestBody JoinEntity joinEntity) {
        int save = userService.registerUser(joinEntity);

        if(save == 1) {
            logger.info("회원가입 성공");
            return "success";
        }

        return "fail";
    }

    // 로그인
    @PostMapping("/login")
    public String loginUser(@RequestBody LoginDto loginDto, HttpSession session) {

        int login = userService.loginUser(loginDto);

        logger.info(String.valueOf(login));

        if(login == 1) {
            String userId = loginDto.getId();
            String jwt = mkJWT(userId, session);
            logger.info(jwt);
            logger.info("로그인 성공");
            logger.info(jwtUtil.getUserId(jwt));
            return "success";
        }

        return "fail";
    }

    // JWT 토큰 생성 후 세션에 저장
    public String mkJWT(String userId, HttpSession session) {
        // 1. 사용자 이름 존재 여부
        if (userId != null) {
//             2. JWT 생성
            String token = jwtUtil.createJwt(userId, "USER");

            // 3. 세션에 JWT 저장
            session.setAttribute("jwt", token);

            // 4. 클라이언트에게 JWT 반환
            return token;
        } else {
            return "fail";
        }
    }

    // 회원가입
    @PostMapping("/checkId")
    public String checkId(@RequestBody LoginDto loginDto) throws Exception {
        int save = userService.checkId(loginDto);

        if(save == 1) {
            logger.info("아이디 중복 없음");
            return "success";
        }

        return "fail";
    }

}

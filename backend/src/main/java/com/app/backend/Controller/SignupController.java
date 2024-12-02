package com.app.backend.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend.DTO.UserDto;
import com.app.backend.Entity.UserEntity;
import com.app.backend.Service.UserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/signup")
public class SignupController {

    private static final Logger logger = LoggerFactory.getLogger(SignupController.class); // Logger 인스턴스 생성

    @Autowired
    private UserService userService;

    UserDto userDto;

    @PostMapping("/insert")
    public String registerUser(@RequestBody UserEntity user) {
        int save = userService.registerUser(user);

        if(save == '1') {
            logger.info("save");
            return "success";
        }

        return "fail";
    }
}

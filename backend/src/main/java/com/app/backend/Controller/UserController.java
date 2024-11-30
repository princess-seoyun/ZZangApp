package com.app.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.backend.DTO.UserDto;
import com.app.backend.Entity.UserEntity;
import com.app.backend.Service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("signup")
    public String registerUser(@RequestBody UserDto user) {
        UserEntity userEntity = userService.registerUser(user);

        System.out.println(userEntity.getName());
        System.out.println("실행중");
        
        if(userEntity.getName() != "" ) {
            return "success" + userEntity.getName() + "--";
        }

        return "fail";
    }
    

}

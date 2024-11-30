package com.app.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.backend.DTO.UserDto;
import com.app.backend.Entity.UserEntity;
import com.app.backend.Mapper.UserMapper;

@Service
public class UserService {
    
    @Autowired
    UserMapper userMapper;

    public UserEntity registerUser(UserDto user) {

        // 같은 아이디가 있는지 중복 체크하기

        UserEntity userEntity = userMapper.insert(user);
        return userEntity;
    }

}

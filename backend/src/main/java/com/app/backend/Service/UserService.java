package com.app.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Service;

import com.app.backend.Config.Role;
import com.app.backend.Entity.UserEntity;
import com.app.backend.Mapper.UserMapper;

@Service
public class UserService {
    
    @Autowired
    UserMapper userMapper;

    @Autowired
    private EncryptionService encryptionService;

    @Autowired
    private AESService aesService;

    public int registerUser(UserEntity userEntity) {

        // 비밀번호 암호화
        String encryptedPassword = encryptionService.encryptPassword(userEntity.getPassword());
        userEntity.setPassword(encryptedPassword);
 
        // 이름 암호화
        try {
            String encryptName = aesService.encrypt(userEntity.getName());
            userEntity.setName(encryptName);
        } catch (Exception e) {
            e.printStackTrace();
        }

        
        if(userEntity.getId() == "admin") {
            userEntity.setRole(Role.ADMIN);
        } else { // 기본 역할은 USER 로 설정
            userEntity.setRole(Role.USER);
        }

        int save = userMapper.insert(userEntity);
        return save;
    }

}

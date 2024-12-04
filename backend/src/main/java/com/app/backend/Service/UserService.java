package com.app.backend.Service;

import com.app.backend.Controller.UserController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.method.P;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.backend.Config.Role;
import com.app.backend.Entity.JoinEntity;
import com.app.backend.DTO.LoginDto;
import com.app.backend.Mapper.UserMapper;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class); // Logger 인스턴스 생성

    @Autowired
    UserMapper userMapper;

    @Autowired
    private EncryptionService encryptionService;

    @Autowired
    private AESService aesService;

    // 회원가입
    public int registerUser(JoinEntity userEntity) {

        // 비밀번호 암호화
        String encryptedPassword = encryptionService.encryptPassword(userEntity.getPassword());
        userEntity.setPassword(encryptedPassword);
 
        // 아이디, 이름 암호화
        try {
            String encryptName = aesService.encrypt(userEntity.getName());
            String encryptId = aesService.encrypt(userEntity.getId());
            if(encryptName == null) {
                return 0;
            }
            userEntity.setName(encryptName);
            userEntity.setId(encryptId);
        } catch (Exception e) {
            e.printStackTrace();
        }

        
        if(userEntity.getId().equals("admin")) {
            userEntity.setRole(Role.ADMIN);
        } else { // 기본 역할은 USER 로 설정
            userEntity.setRole(Role.USER);
        }
        return userMapper.insert(userEntity);
    }

    // 로그인
    public int loginUser(LoginDto loginDto) {

        String encryptId = null;
        // DB 에는 암호화로 저장되어 있는 아이디를 검색하기 위해 사용자가 입력한 ID 를 암호화한 값으로 넘겨서 조회
        try {
            encryptId = aesService.encrypt(loginDto.getId());
            logger.info("암호화 아이디: " + encryptId);
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 사용자가 입력한 비밀번호와 DB에 저장된 암호화된 비밀번호 비교
        String pw = loginDto.getPassword();
        loginDto.setPassword(userMapper.login(encryptId));  // 사용자가 입력한 ID로 DB에서 사용자 정보 조회
        if (pw != null && encryptionService.passwordMatches(pw, loginDto.getPassword())) {
            return 1;
        } else {
            return 0;
        }
    }

}

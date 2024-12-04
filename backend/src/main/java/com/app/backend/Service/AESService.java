package com.app.backend.Service;

import com.app.backend.Controller.UserController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Service
public class AESService {

    private final String ALGORITHM = "AES";
    private final String ALGORITHM_WITH_PADDING = "AES/CBC/PKCS5Padding"; // 패딩 방식 명시

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    // application.properties에서 비밀 키와 IV를 가져옴
    @Value("${aes.secret-key}")
    private String secretKey;  // AES 키 (32 바이트 사용)

    @Value("${aes.secret-iv}")
    private String secretIv;   // AES IV (16 바이트 사용)

    public String encrypt(String input) throws Exception {
        try {
            byte[] key = Base64.getDecoder().decode(secretKey); // 키
            byte[] iv = Base64.getDecoder().decode(secretIv);  // iv

            SecretKeySpec keySpec = new SecretKeySpec(key, ALGORITHM);
            IvParameterSpec ivSpec = new IvParameterSpec(iv);

            Cipher cipher = Cipher.getInstance(ALGORITHM_WITH_PADDING); // 패딩 방식 포함
            cipher.init(Cipher.ENCRYPT_MODE, keySpec, ivSpec);

            byte[] encryptedBytes = cipher.doFinal(input.getBytes());

            // 암호화된 데이터와 IV를 Base64로 인코딩하여 반환
            return Base64.getEncoder().encodeToString(encryptedBytes);
        } catch(Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public String decrypt(String input) throws Exception {
        try {
            byte[] encryptedString = Base64.getDecoder().decode(input); // 복호화 할 값
            byte[] key = Base64.getDecoder().decode(secretKey); // 키
            byte[] iv = Base64.getDecoder().decode(secretIv);  // iv

            // secretKey로 SecretKeySpec 생성
            SecretKeySpec keySpec = new SecretKeySpec(key, ALGORITHM);
            IvParameterSpec ivSpec = new IvParameterSpec(iv);

            // Cipher 인스턴스 생성 및 초기화
            Cipher cipher = Cipher.getInstance(ALGORITHM_WITH_PADDING); // 패딩 방식 포함
            cipher.init(Cipher.DECRYPT_MODE, keySpec, ivSpec);

            // 복호화
            byte[] decryptedBytes = cipher.doFinal(encryptedString);

            // 결과를 문자열로 변환하여 반환
            return new String(decryptedBytes);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}

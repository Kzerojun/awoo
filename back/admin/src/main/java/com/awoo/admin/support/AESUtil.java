package com.awoo.admin.support;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Component
public class AESUtil {

    private static final String ALGORITHM = "AES";
    private final String secretKey;

    // 생성자로 환경 변수 주입
    public AESUtil(@Value("${aes.secret_key}") String secretKey) {
        this.secretKey = secretKey;
    }

    public String encrypt(String input) {
        try {
            SecretKeySpec keySpec = new SecretKeySpec(secretKey.getBytes(), ALGORITHM);
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, keySpec);
            byte[] encryptedBytes = cipher.doFinal(input.getBytes());
            return Base64.getEncoder().encodeToString(encryptedBytes);
        }catch (Exception e) {
            ApiUtils.error(e, org.springframework.http.HttpStatus.valueOf(HttpStatus.SC_INTERNAL_SERVER_ERROR));
            return "비밀번호 인코딩 실패";
        }
    }

    public String decrypt(String encryptedInput) {
        try {
            SecretKeySpec keySpec = new SecretKeySpec(secretKey.getBytes(), ALGORITHM);
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, keySpec);
            byte[] encryptedBytes = Base64.getDecoder().decode(encryptedInput);
            byte[] decryptedBytes = cipher.doFinal(encryptedBytes);
            return new String(decryptedBytes);
        }catch (Exception e) {
            ApiUtils.error(e, org.springframework.http.HttpStatus.valueOf(HttpStatus.SC_INTERNAL_SERVER_ERROR));
            return "비밀번호 디코딩 실패";
        }
    }
}

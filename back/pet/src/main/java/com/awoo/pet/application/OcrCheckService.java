package com.awoo.pet.application;

import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface OcrCheckService {

    Map<String, Object> ocrCheck(Integer memberId, MultipartFile ocrImage);
}

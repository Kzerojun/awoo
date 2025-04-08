package com.awoo.pet.ui.facade.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class OcrCheckResponse {

    private String animalRegNumber;
    private String animalName;
    private String breedType;
    private String ocrImageUrl;

    public static OcrCheckResponse fromResult(Map<String, Object> ocrInfo) {

        String ocrImageUrl = "https://c209awoo.s3.us-east-2.amazonaws.com/" + (String) ocrInfo.get("ocrImageUrl");

        return OcrCheckResponse.builder()
                .animalRegNumber((String) ocrInfo.get("animalRegNumber"))
                .animalName((String) ocrInfo.get("animalName"))
                .breedType((String) ocrInfo.get("breedType"))
                .ocrImageUrl(ocrImageUrl)
                .build();
    }

}

package com.awoo.pet.application.impl;

import com.awoo.pet.application.AwsS3Service;
import com.awoo.pet.application.OcrCheckService;
import com.awoo.pet.application.exception.ApplicationErrorCode;
import com.awoo.pet.application.exception.OcrImageRequiredException;
import com.awoo.pet.application.exception.PetRegisterException;
import com.awoo.pet.application.exception.TextExtractionException;
import lombok.RequiredArgsConstructor;
import net.sourceforge.tess4j.Tesseract;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class OcrCheckServiceImpl implements OcrCheckService {

    private final AwsS3Service awsS3Service;

    @Override
    public Map<String, Object> ocrCheck(Integer memberId, MultipartFile ocrImage) {


        Map<String, Object> petInfo = new HashMap<>();

        if(ocrImage != null) {
            String ocrImageUrl = awsS3Service.upload(ocrImage);
            petInfo.put("ocrImageUrl", ocrImageUrl);
            try{
                // MultipartFile을 File로 변환
                File convFile = new File(System.getProperty("java.io.tmpdir") + "/" + ocrImage.getOriginalFilename());
                ocrImage.transferTo(convFile);

                // Tesseract 인식
                Tesseract tesseract = new Tesseract();
                tesseract.setDatapath("/usr/share/tesseract-ocr/4.00/tessdata"); // 언어팩 경로
                tesseract.setLanguage("kor"); // 한글 지원

                String text = tesseract.doOCR(convFile);

                // 동물 등록 번호 추출
                Pattern regNumPattern = Pattern.compile("동물등록번호\\s*:\\s*(\\d+)");
                Matcher regNumMatcher = regNumPattern.matcher(text);

                String animalRegNumber = "";
                if (regNumMatcher.find()) {
                    animalRegNumber = regNumMatcher.group(1);  // 예: "410123456789012"
                }

                // 이름 추출
                Pattern nameOnlyPattern = Pattern.compile("이름\\s+(\\S+)");
                Matcher nameOnlyMatcher = nameOnlyPattern.matcher(text);

                String animalName = "";
                if (nameOnlyMatcher.find()) {
                    animalName = nameOnlyMatcher.group(1);  // 예: "종이"
                }

                // 동물종 추출
                Pattern breedPattern = Pattern.compile("동물종\\s*\\s*(\\S+)");
                Matcher breedMatcher = breedPattern.matcher(text);

                String animalSpecies = "";
                if (breedMatcher.find()) {
                    animalSpecies = breedMatcher.group(1);  // 예: "개"
                }

                // 품종(견종) 추출
                Pattern breedTypePattern = Pattern.compile("품종[:\\s]+(\\S+)");
                Matcher breedTypeMatcher = breedTypePattern.matcher(text);

                String breedType = "";
                if (breedTypeMatcher.find()) {
                    breedType = breedTypeMatcher.group(1);  // 예: "믹스견"
                }

                // 소유자 이름 추출
                Pattern ownerPattern = Pattern.compile("성\\s*명\\(법인명\\)\\s*:\\s*(\\S+)");
                Matcher ownerMatcher = ownerPattern.matcher(text);

                String ownerName = "";
                if (ownerMatcher.find()) {
                    ownerName = ownerMatcher.group(1);  // 예: "김지한"
                }

                System.out.println("동물등록번호: " + animalRegNumber);
                System.out.println("동물이름: " + animalName);
                System.out.println("동물종: " + animalSpecies);
                System.out.println("품종: " + breedType);
                System.out.println("소유자 이름: " + ownerName);

                petInfo.put("animalRegNumber", animalRegNumber);
                petInfo.put("animalName", animalName);
                petInfo.put("breedType", breedType);
                petInfo.put("ownerName", ownerName);

            }catch (Exception e){
                throw new TextExtractionException(ApplicationErrorCode.TEXT_EXTRACTION_FAILED);
            }
        }else{
            throw new OcrImageRequiredException(ApplicationErrorCode.OCR_IMAGE_REQUIRED);
        }

        return petInfo;

    }
}

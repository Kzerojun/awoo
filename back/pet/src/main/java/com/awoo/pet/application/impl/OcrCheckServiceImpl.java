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

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
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

                //이미지 보정
                BufferedImage image = ImageIO.read(convFile);
                BufferedImage cleanedImage = new BufferedImage(
                        image.getWidth(),
                        image.getHeight(),
                        BufferedImage.TYPE_INT_RGB
                );
                Graphics2D g = cleanedImage.createGraphics();
                g.drawImage(image, 0, 0, null);
                g.dispose();


                // Tesseract 인식
                Tesseract tesseract = new Tesseract();
                tesseract.setDatapath("/usr/share/tesseract-ocr/4.00/tessdata"); // 언어팩 경로
                tesseract.setLanguage("kor"); // 한글 지원

                String text = tesseract.doOCR(cleanedImage);
                System.out.println(text);

                // 동물등록번호 추출
                Pattern regNumPattern = Pattern.compile("동\\s*물\\s*등\\s*록\\s*번\\s*호\\s*[:：]?\\s*(\\d{12,})");
                Matcher regNumMatcher = regNumPattern.matcher(text);

                String animalRegNumber = "";
                if (regNumMatcher.find()) {
                    animalRegNumber = regNumMatcher.group(1);
                }

                // 이름 추출
                Pattern nameOnlyPattern = Pattern.compile("이\\s*름\\s*[:：]?\\s*(\\S+)");
                Matcher nameOnlyMatcher = nameOnlyPattern.matcher(text);

                String animalName = "";
                if (nameOnlyMatcher.find()) {
                    animalName = nameOnlyMatcher.group(1);
                }

                // 동물종 추출
                Pattern speciesPattern = Pattern.compile("동\\s*물\\s*종\\s*[:：]?\\s*(\\S+)");
                Matcher speciesMatcher = speciesPattern.matcher(text);

                String animalSpecies = "";
                if (speciesMatcher.find()) {
                    animalSpecies = speciesMatcher.group(1);
                }

                // 품종 추출
                Pattern breedTypePattern = Pattern.compile("품\\s*종\\s*[:：]?\\s*(\\S+)");
                Matcher breedTypeMatcher = breedTypePattern.matcher(text);

                String breedType = "";
                if (breedTypeMatcher.find()) {
                    breedType = breedTypeMatcher.group(1);
                }

                // 소유자 이름 추출
                Pattern ownerPattern = Pattern.compile("성\\s*명.*?[:：]?\\s*(\\S+)");
                Matcher ownerMatcher = ownerPattern.matcher(text);

                String ownerName = "";
                if (ownerMatcher.find()) {
                    ownerName = ownerMatcher.group(1);
                }

                // 출력
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

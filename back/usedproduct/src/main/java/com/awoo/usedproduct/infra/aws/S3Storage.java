package com.awoo.usedproduct.infra.aws;

import com.awoo.usedproduct.support.FileNameGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetUrlRequest;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.Base64;

@Component
@RequiredArgsConstructor
@Slf4j
public class S3Storage {

    private final FileNameGenerator fileNameGenerator;
    private final S3Client s3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    public String uploadFile(MultipartFile multipartFile) {
        String fileName = fileNameGenerator.createFileName(multipartFile.getOriginalFilename());
        log.info("Content Type : {}", multipartFile.getContentType());

        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .contentType(multipartFile.getContentType())
                    .contentLength(multipartFile.getSize())
                    .key(fileName)
                    .acl(ObjectCannedACL.PUBLIC_READ)
                    .build();
            RequestBody requestBody = RequestBody.fromInputStream(multipartFile.getInputStream(), multipartFile.getSize());
            s3Client.putObject(putObjectRequest, requestBody);
        } catch (IOException e) {
            log.error("AWS S3 이미지 업로드 실패", e);
            throw new RuntimeException(e);
        }

        GetUrlRequest getUrlRequest = GetUrlRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .build();

        return s3Client.utilities().getUrl(getUrlRequest).toString();
    }

    public String uploadFile(String base64Image, String originalFileName) {
        String fileName = "chat/" + System.currentTimeMillis() + "_" + originalFileName;
        log.info("Uploading file to S3: {}", fileName);

        try {
            // Base64 디코딩
            byte[] fileData = Base64.getDecoder().decode(base64Image);
            String contentType = guessContentType(originalFileName);

            // S3 업로드 요청
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .contentType(contentType)
                    .contentLength((long) fileData.length)
                    .acl(ObjectCannedACL.PUBLIC_READ)
                    .build();

            RequestBody requestBody = RequestBody.fromBytes(fileData);
            s3Client.putObject(putObjectRequest, requestBody);

            // URL 생성
            GetUrlRequest getUrlRequest = GetUrlRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .build();
            return s3Client.utilities().getUrl(getUrlRequest).toString();
        } catch (Exception e) {
            log.error("Failed to upload file to S3", e);
            throw new RuntimeException("S3 upload failed", e);
        }
    }

    private String guessContentType(String fileName) {
        if (fileName == null || fileName.isEmpty()) return "application/octet-stream";
        String extension = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
        return switch (extension) {
            case "jpg", "jpeg" -> "image/jpeg";
            case "png" -> "image/png";
            case "gif" -> "image/gif";
            default -> "application/octet-stream";
        };
    }

}

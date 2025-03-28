package com.awoo.pet.application;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.awoo.pet.application.exception.ApplicationErrorCode;
import com.awoo.pet.application.exception.FileDeleteFailedException;
import com.awoo.pet.application.exception.FileUploadFailedException;
import com.awoo.pet.application.exception.InvalidFileTypeException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class  AwsS3Service {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;

    public String upload(MultipartFile multipartFile) {

        String fileName = createFileName(multipartFile.getOriginalFilename());
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(multipartFile.getSize());
        objectMetadata.setContentType(multipartFile.getContentType());

        try(InputStream inputStream = multipartFile.getInputStream()){
            amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e){
            throw new FileUploadFailedException(ApplicationErrorCode.FILE_UPLOAD_FAILED);
        }

        return fileName;


    }


    public String createFileName(String fileName){
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }

    //  "."의 존재 유무만 판단
    private String getFileExtension(String fileName){
        try{
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e){
            throw new InvalidFileTypeException(ApplicationErrorCode.INVALID_FILE_TYPE);
        }
    }


    public void deleteFile(String fileName){
        try{
            amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));
            System.out.println(bucket);
        } catch (Exception e) {
            throw new FileDeleteFailedException(ApplicationErrorCode.FILE_DELETE_FAILED);
        }
    }



}

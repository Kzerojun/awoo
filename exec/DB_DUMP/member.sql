CREATE DATABASE  IF NOT EXISTS `member` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `member`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 43.201.97.59    Database: member
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `birth_date` date NOT NULL,
  `gender` varchar(1) NOT NULL,
  `is_deleted` bit(1) NOT NULL,
  `member_id` int NOT NULL AUTO_INCREMENT,
  `payment_register` bit(1) DEFAULT NULL,
  `privacy_agreed` bit(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `created_by` bigint NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `updated_by` bigint NOT NULL,
  `phone` varchar(15) NOT NULL,
  `name` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `nickname` varchar(50) NOT NULL,
  `password` varchar(128) NOT NULL,
  `profile_image` varchar(1024) DEFAULT NULL,
  `user_key` varchar(255) NOT NULL,
  `provider` enum('K','L','N') NOT NULL,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES ('2025-03-20','M',_binary '\0',1,_binary '\0',_binary '','2025-03-29 21:27:21.982592',0,'2025-03-29 21:27:21.982592',0,'01055617043','김영준','paymenttester12@test.com','string','{bcrypt}$2a$10$1ypka1spdNG3ZTNc/akuxubgHswyfJJYu0G6ozbg9ihx2CismMxG6','87be681e-4fd7-48a1-92f5-1f0c966f8453.png','P8zfy04GSTAQqW2amKMyp1kxVOTT7Xb3SrQsEe4bHb12DTUu5RdOXixAfgvZQgrk','L'),('1999-09-09','M',_binary '\0',2,_binary '',_binary '','2025-03-29 21:32:54.149167',0,'2025-03-30 17:13:53.867591',2,'01050621874','김홍범','honghong1@naver.com','홍뱀입니다','{bcrypt}$2a$10$rtDDOt.nwcW1/3svEr4hYu0wsr2K6WcdMmm1zYDOupKpzw/ezqqOK','bd9c97f4-301a-4c91-b73c-b1e6c80d9575.png','hRCEwNmLroAJT5g2aMVZqswWEyXdHal0zzsMtvAZpudKQIwSzgk/shblKSC4+QgC','L'),('2000-01-01','F',_binary '\0',3,_binary '\0',_binary '','2025-03-30 12:54:11.255948',0,'2025-03-30 12:54:11.255948',0,'01090909909','이다은투','danivalen2@naver.com','다은2','{bcrypt}$2a$10$uUGvZhIZBUR.gXnRCmYt4ONBkAZRDlGSYrgJL9vRGy6GCYGrfWA0O','d7b9a0da-8a60-4797-b252-832c27445ea1.jpg','2sFAX0lxU2aJJN51NR617EOjt2z1KnE7RnddE8KdhajNhI3t5SuZ953mN1HZ+otU','L'),('2000-01-01','F',_binary '\0',4,_binary '',_binary '','2025-03-30 13:04:50.687347',0,'2025-04-07 13:36:38.291443',4,'01090049790','이다은','danivalen3@naver.com','다은타운베이비','{bcrypt}$2a$10$CcHXR2uHpzN3Fy3gTeRM/.biJ21ICtkXuceaUQM4sImtf41XQubwK','86f98878-8a67-42ee-ab4f-5c3cfaa45c20.jpg','AL55nvCno8oBcFmx0PUVXsyxtjZG3Yxizlm9TxBZzWKULhmDm3d5R4J9+JG8n00u','L'),('2000-10-05','F',_binary '\0',5,_binary '\0',_binary '','2025-03-30 15:32:07.011269',0,'2025-03-30 15:32:07.011269',0,'01020307617','강은수','kes2450@naver.com','은수짱짱맨','{bcrypt}$2a$10$vGR7.vfHLxadyqfADFNLMuw9u76duwt8ZyhSn6dO.FI0I2TK0DvKq','58421e74-b91e-417d-ad9f-7ff9935373c5.jpg','G8SF8Q0v1YDiqlUXXJHXydzWbfUL24rMQlJEGcncVwnYf2ngz1UVBBHw/SNPSWmG','L'),('2025-03-20','M',_binary '\0',6,_binary '',_binary '','2025-03-31 14:32:20.136101',0,'2025-03-31 14:32:20.136101',0,'test','test','awootest2@test.com','test','{bcrypt}$2a$10$G/G.t3/rD.ONqqCkqdrdhOvGZ42qZFl0Eb8XU2k6llx39W1f05kRW',NULL,'OlhAHVn2VRRmhDG7Zxfa0Ds0RxToj31AO7AXjyCuY37BmAluo9Lr4S6ByIkVFqFZ','L'),('2003-02-02','F',_binary '\0',7,_binary '',_binary '','2025-04-01 10:21:29.739721',0,'2025-04-01 10:21:29.739721',0,'01099999999','기몽범','honghong@naver.com','뱅','{bcrypt}$2a$10$hzZDBUM/6XHB58MpAaFJCedpPWmSaw9rZvdmi3y/etqSC9xafoe8K','261093d0-7454-4862-93f7-8b793a0b93dc.jpg','n+DylyqaJX0c7VgRbCE4dOGczOAfOcQZnDvDhnskAFF15cF4BG/Qd6nSxQsTcB3n','L'),('2025-03-20','M',_binary '\0',8,_binary '\0',_binary '','2025-04-01 12:06:54.146771',0,'2025-04-01 12:06:54.146771',0,'01055617043','멍페이 주식회사','mungcompany@mungcompany.com','멍페이 주식회사','{bcrypt}$2a$10$BVsG02e/zAy5D0/jTyQw5uI4jx19QHwgwqKyCqxxKjvKfVlO/X5Za',NULL,'9n+o2+7HEmc3nsoIcFLcq8qtglzrqIRfaGCDS6+eBhrHtMNfiwBLuIjZErnT7Dqi','L'),('2025-03-20','M',_binary '\0',9,_binary '\0',_binary '','2025-04-02 11:38:26.904838',0,'2025-04-02 11:38:26.904838',0,'01055617043','멍페이 주식회사','kimyeongjun@naver.com','멍페이 주식회사','{bcrypt}$2a$10$4SF7FfkyTG/fWOG9KjsX0uoYtQb6rk6lgDHAlTOqo4/uIk0eT48gy','429dd6a1-9043-4d61-ac0c-1f38c18e133b.jpg','nP+htmEVFJh51SjUL7SB9IcMHFa4dAYFUbHfvcO6P4eWhh6KWkCgwr6s7sActcg9','L'),('2025-03-20','M',_binary '\0',10,_binary '',_binary '','2025-04-02 14:23:00.291861',0,'2025-04-02 14:34:40.332048',10,'01055617043','김영준','kimyeongjun1@naver.com','멍페이 주식회사','{bcrypt}$2a$10$UIlhGCZa8UmCuWVNF./LVejd2XjIxm6.kBEaLoPopDWYZEr11bcY2','555a9bf2-b54f-45a5-aa3f-60163b1ff900.jpg','VW1MFSlzWZxhlvQHlZZRIFFJucExzmBzjw4vWoY7y8QIzZ+Pq8vdof2Kqz14+gC+','L'),('1997-08-27','M',_binary '\0',11,_binary '\0',_binary '','2025-04-02 16:20:51.908868',0,'2025-04-02 16:20:51.908868',0,'01087957460','김지한','wlgks7460@naver.com','지한킴','{bcrypt}$2a$10$uzYjUoOOrDmGX4r9HO67duC9Yz290iaLAwNS73zu/GMvXO.BMA17y','10a90265-20ef-49ac-8edf-62269b1182a4.jpg','eN0teUzH/UzpuASclQurGyg3NFKIAESRZ7+LDdF7CIymKRJCLllH8qhqeW6Mq3Fm','L'),('1998-12-11','M',_binary '\0',12,_binary '\0',_binary '','2025-04-03 11:14:36.769947',0,'2025-04-03 11:14:36.769947',0,'01111111111','다은테스토','danivalen5@naver.com','하요','{bcrypt}$2a$10$mbQJG4B3klH6kFANuAScS.q9Twb5v3ICtZkQERdUaFDg/YAvm856y','d4990b68-c488-4e2e-8d3f-9e7a275f8abd.jpg','q+p1UWoW+MYGhGTxYOKYZ0oxTgCIzXtDOSaVgdZhEfE/r0L31MFZRS23FzC9qnDT','L'),('2025-03-20','M',_binary '\0',13,_binary '\0',_binary '','2025-04-03 15:01:50.301559',0,'2025-04-03 15:01:50.301559',0,'01055617043','멍페이 주식회사','mungcompany2@mungcompany.com','멍페이 주식회사','{bcrypt}$2a$10$PrrQvpLsxvpdyB8yybDAu.dgO5smh1ay3pmaSczKZ3zVDDgdg0J6C',NULL,'SMNl6VN4Ac2YzTHOmxNTAmye8ul/APdNBNjrqSIziTs9gnkCZE2/wzl649K9BZ2V','L'),('1999-01-01','M',_binary '\0',14,_binary '\0',_binary '','2025-04-04 15:05:45.770698',0,'2025-04-04 15:05:45.770698',0,'01000009999','뮹뮹범씨','ahdqja@naver.com','묭묭범씨','{bcrypt}$2a$10$zC92eS1/8uEvmekVIrRLQObyywfyWd1PUrLuP5Y4wRFG5dowpaWmq','974e3179-0bca-4576-8559-8fc536b72813.jpg','ZP4rJ7Nshoa5o5MOdRu50Y8avUD76tC+qB3RC76d4thE6v1SSnMUuGt+SgtqyoK3','L'),('1997-08-27','M',_binary '\0',15,_binary '\0',_binary '','2025-04-04 15:05:52.475165',0,'2025-04-04 15:05:52.475165',0,'01087957460','김지한','java@java.com','1111as','{bcrypt}$2a$10$JaAEzwH9L6mz4yhmRHAuSulnQR11q0R9EA17g8Bt/FUldYX/8KKjG','275677a5-4922-49df-af5d-c1986496df8d.jpg','VgQGFwNo1nJ/wVxH4AG9yB0A8UYzTDvg2K+0tggIkqLqL+WZi/4vu6CXgErsx5hF','L'),('1997-08-27','M',_binary '\0',16,_binary '\0',_binary '','2025-04-04 15:08:43.943117',0,'2025-04-04 15:08:43.943117',0,'01087957460','김기하','Spring@spring.com','Tt45','{bcrypt}$2a$10$QzxWc7z0SNe4L4TJW37s4.q68RawvFUXoBMSUPOcCWgBe0zEZElPS','7a025587-9448-4ea1-8bf4-70a472edae81.jpg','fxNOoNDosZw+T5EWrcm1C9EKmSYqaV/p8f9vyYZIQVr0pef/NBYtqLI4APsP/m6L','L'),('1999-09-09','M',_binary '\0',17,_binary '',_binary '','2025-04-04 22:30:40.385116',0,'2025-04-07 09:50:01.195687',17,'01050621874','김홍범','awoo1@naver.com','차차차','{bcrypt}$2a$10$bqUVF/RcPK6WZ0A7gGYFt.MYxPSvYLkpBGEe8skXnIJWXWN/sj/2.','0c2b4195-0a37-4d85-bfaf-b2168e3b3e3b.jpg','+yaREcwm6ltUFrNt9LsVcWpPfQqw7KJlJJt85bKbJRE5DiNOsZ3cf7JUeuHzDMyD','L'),('1997-08-27','M',_binary '\0',18,_binary '\0',_binary '','2025-04-05 00:35:48.045582',0,'2025-04-05 00:35:48.045582',0,'01087957460','김지한','testjh@test.com','testjh','{bcrypt}$2a$10$jznVOShslh8NBMWucDd2weEqY7zyIm.xy4B6Kgi64nh9QzFVF1OmS','a7100921-9ba6-4c49-8314-00e9d1f06863.jpg','rQXNHk9jcYVobyb+q7yTS0l1f9AJRzavymDW2JeAHMxljTw3JWWaw6V+awX0VL2C','L'),('1999-01-01','M',_binary '\0',19,_binary '\0',_binary '','2025-04-05 11:51:54.166098',0,'2025-04-05 11:51:54.166098',0,'01011111111','테스트','111@naver.com','test98','{bcrypt}$2a$10$84GeKNNjclQ/NMvZEzFSYeBXWsGxaScwhR43JDX1legie21HHu6Ou','bb816191-4123-4e06-a00f-5d8897c38914.jpg','56JfaVUKR/+hVPHdblYK3YfAL33aV2SbSU5McXfjEHoJ4/zR8YZlB+dwx2zYnMLq','L'),('2000-11-11','M',_binary '\0',20,_binary '\0',_binary '','2025-04-05 12:14:15.437204',0,'2025-04-05 12:14:15.437204',0,'01046074629','뭐하노','1122@naver.com','똑바로해라','{bcrypt}$2a$10$rotCQw/nTXbmWPPQUUnjgeHMzKmX5hAbce1AUG4j8VFx43I0/V6bK','d59db2e1-f0ea-4fff-9d62-8df94d2f6d8b.jpg','g0mCXTTTno2ujCwij660/6lKr7pEh7FIM4SarCao8VMGin6qDXhhmSb1zWqwM7IF','L'),('1999-08-21','M',_binary '\0',21,_binary '\0',_binary '','2025-04-05 20:46:48.941592',0,'2025-04-05 20:46:48.941592',0,'01055617043','김영준','testtest1004@test.com','테스터','{bcrypt}$2a$10$tfO4UjnmCg8wGDMwboVyh.HoSk7yOFY8S..1xiUm5ylpX7mSClgkm',NULL,'t86352ClCTTDmSkjSfCVncz1D4UZfy9XoSNYlWdpwdghUf490l1WVPNnyPiLCawU','L'),('2000-01-01','F',_binary '\0',22,_binary '',_binary '','2025-04-05 23:44:05.278434',0,'2025-04-05 23:44:05.278434',0,'01090049790','김길동','kimroad@naver.com','김길동','{bcrypt}$2a$10$ZegmQuMYKwfBaORjHNpu8ONcnFvHzqf3XkTyT8XZVJwHRal8aWnIq','a8e65587-fa0a-40fb-bfa0-792c75693082.jpg','4KKgRmi8mjLz7XiJBlwoviWcUT2282m5DbWuENB+iTP7xpXf/cmm9ATcSN4anUmc','L'),('2000-10-05','F',_binary '\0',23,_binary '\0',_binary '','2025-04-06 02:24:30.290965',0,'2025-04-06 02:24:30.290965',0,'01020307617','강은수','kes2450@awoo.com','은수가짱','{bcrypt}$2a$10$L/sPg5ecavKtpv0UYuFvuOXoVa.x2U5CTJTVlzslUXikLV6pv8fI.','a353c81b-2c9a-40a0-b99e-9cc740131f64.jpg','Tm8cidbHMVBbsdiqh/HNpG9U7haGudprocDVMjy99Qoko3YPW6lmwqWWb0IjYYUS','L'),('1999-08-08','M',_binary '\0',24,_binary '',_binary '','2025-04-07 00:18:16.066206',0,'2025-04-07 14:19:02.567615',0,'01090049790','고길동','roadeast@naver.com','고길동','{bcrypt}$2a$10$nIvT86Cmkz3SFW9XONmgA.vf.J1mVtvxdqXTy4nQQ47QTqgsmS0jm','2eb23b75-7758-4b9a-8334-30b8d441aa8e.jpg','mU0R7sSEK/fnrW06F1Kp4OwuvQ2bs8GbQCVhRuwV0tGwTB/M3s52mjKh+HXPeO7+','L'),('1997-09-08','M',_binary '\0',25,_binary '\0',_binary '','2025-04-07 09:25:43.990435',0,'2025-04-07 09:25:43.990435',0,'01087957460','김지한','ghtest@test.com','shm7','{bcrypt}$2a$10$zLS7a.MG/N9rgUItFTr5lOgtm8qJCuqaXeR1cVsNuFDYWq3hquVWS','b265a6d2-d5bf-44e9-a46c-68c53eb97d22.jpg','C4/zjuH26UYZzOmCKn1tonaxEuhd6ARQAEsETXg1ARW03FsIshh0wFKARAxmdR6y','L'),('2000-10-05','F',_binary '\0',26,_binary '\0',_binary '','2025-04-07 14:29:42.751901',0,'2025-04-07 14:29:42.751901',0,'01020307617','강깡수','kes2450@awoo1.com','깡수','{bcrypt}$2a$10$kLO1gvfpwk3ko/HFgRz0IugC8xW9tF6z/A8JWnaywrIqUux6C/icu','14cafee5-da3d-4813-9dff-6f6a36060329.jpg','EBL5i2WhulVzVKwsbxvk23i4C4tkPLpLwSBqV3d10fc5qEhU732leQPLoaQRKWu6','L'),('1988-04-27','M',_binary '\0',27,_binary '\0',_binary '','2025-04-08 09:18:25.080895',0,'2025-04-08 09:18:25.080895',0,'01067889766','박주영','jypark@awoo.com','주멘','{bcrypt}$2a$10$fcXWzjE5Pi7QhoyWoz.HR.jrkfonR5Cr6SU8hY03bWMvJUtBiI8i6','88df1921-8709-4503-9a98-8126506aead8.jpg','3ZNpH0yWfqFdxNnEEQon+UkEC5BuYMlVgC8QqSV5IdQAFJMLiGAgk4K/43kvBfG1','L'),('1999-08-21','M',_binary '\0',28,_binary '',_binary '','2025-04-08 14:08:46.250989',0,'2025-04-08 14:09:48.444620',0,'01055617043','김영준','happykim@gmail.com','해피킴짭','{bcrypt}$2a$10$4ephkqR6/qH5G109GR8DqOUFfDkmgfgRzGUCBRbsmRM.uz0qaKMVq','5f06ff59-a6d6-4963-8e89-74fda18a2f4c.jpg','JkzYXeo56dU6boXU/g23Bp+Ql0Sq3zeKJxHZvFoVduYmUbRtNFz8zuUyUveAftas','L'),('1997-08-27','M',_binary '\0',29,_binary '',_binary '','2025-04-08 14:20:21.273174',0,'2025-04-08 14:25:18.457421',0,'01087957460','김지한','jhjh@awoo.com','김치한','{bcrypt}$2a$10$jN2k4CzP66CvOQ8JANSdfuVrhGdhG6gA7s6HFr1KAAX7evVL70Mtu','e7249445-3481-437e-b823-1fdcb7082ec8.jpg','Eh3Xf+o7owE/LEJGqBaCLWdbNYh3PTYCIyiLz3W7VL20Q6W50A3XtW1wmEJV77Pc','L'),('2000-10-05','F',_binary '\0',30,_binary '\0',_binary '','2025-04-08 14:29:55.532447',0,'2025-04-08 14:29:55.532447',0,'01020307617','강은수','kes2450@awoo2.com','깡깡수','{bcrypt}$2a$10$/8xrqQfUwHjdho5IfXzkDuvONn/iEAnGCG97ln/qNUeJMMn1pDXrq','d77a510f-169a-4e04-8a48-f3ffeb6cc72e.jpg','w2jFW8tWkRn77Ex+bUtZCbxLHc+9cSbJtd777L2l/AaS4Xt0gCUOYy/i5Uej3HJe','L'),('1997-08-27','M',_binary '\0',31,_binary '\0',_binary '','2025-04-08 15:08:37.406490',0,'2025-04-08 15:08:37.406490',0,'01087957460','김지한','jhjh1@awoo.com','지하니','{bcrypt}$2a$10$mbGlTcmxpAkSS9YY9wuFEuLAIWHSTShWhgv47.f5Ui9z7jw1X0va6','88a37b0c-1b84-46bd-b9ba-4b3744de9beb.jpg','/RYfw1AbSFlE6TMYWZlCoFGVWpLVYOWNwC65DjJDQoNBHjAugmIm/JFA2S15eJqo','L'),('1999-07-27','M',_binary '\0',32,_binary '\0',_binary '','2025-04-08 15:10:35.384460',0,'2025-04-08 15:10:35.384460',0,'01087957460','강안수','jhjh3@awoo.com','지현','{bcrypt}$2a$10$pdp4S0gMBd28Ai/rjB41Re84HYag9iykr4vuBahviYatEzcsuK4Y6','84006a35-7ca6-4d4a-8c18-83218b6993e8.jpg','2WM7KBWXXLOPAOA/VUTI9NW1AkUtxVFaiXNWd6+Os+UmiIxQlsP6UZkDVzhQp2Wn','L'),('1997-06-05','M',_binary '\0',33,_binary '\0',_binary '','2025-04-08 15:52:10.856633',0,'2025-04-08 15:52:10.856633',0,'01087957460','김지한','jh01@awoo.com','Gh01','{bcrypt}$2a$10$iAxMKhU.qjkeeizJUJBNHuN3aYlthUA1RiR9RtqCkwMYjyPxM/4HS','894c45a3-08d3-45d2-b2eb-fec7ecb7a0e3.jpg','8LSypWis3UrBoXC0hh1zL/GE6RWARi63YmYNZlALzTY4NL6xDWPqwEqmhnJaAZag','L'),('1996-03-04','M',_binary '\0',34,_binary '\0',_binary '','2025-04-08 15:56:04.084158',0,'2025-04-08 15:56:04.084158',0,'01087957460','김지한','jh02@awoo.com','jh0101','{bcrypt}$2a$10$M3XJRNKY/KL5bPHL9oPygOPEFWmmFo12Bru/Ws/2wPnIpNNSwt.FC','ee13ad7b-f6e4-4c34-a301-f2df93dbe32f.jpg','IyiC/1q27OJ2PGzN3vKQrR3EL4++fYWXhMe/F3O3SZ9HdBJpVCoiGBdf2CgPP6Wz','L'),('1999-08-21','M',_binary '\0',35,_binary '',_binary '','2025-04-08 16:07:11.743290',0,'2025-04-09 10:00:38.104680',35,'01055617043','김영준','happykim@naver.com','해피킴','{bcrypt}$2a$10$FyzXo.soTil3bpwfNWUlrudALBLc/Z1Xer8ETN/u87XE8t7H/eG7i','e988c3e9-d658-48cd-87da-40908e772fff.jpg','qnJyUXMtOhhIwGNLKmQrPfE5iN2QxM7xO6uH87M+03ljXepG4EkyIkQa983O0HhL','L'),('2000-02-14','F',_binary '\0',36,_binary '',_binary '','2025-04-08 17:11:30.383704',0,'2025-04-09 15:04:40.025741',0,'01090049790','아우우','testtting@naver.com','아우우테스트','{bcrypt}$2a$10$/rYpgrDsEZl6P/ehhCbHOeAGdJjDEJ0heeOsYZYm3aTnfpdZsoklW','0b787595-8cf2-4517-8040-e929acfb00cf.jpg','ivSmHETofG+e5gyYKpmGvGaM0414PQ6vGzFfZJJ47GQcxsXqxiukltNfoCqqifCh','L'),('1999-08-21','M',_binary '\0',37,_binary '',_binary '','2025-04-08 20:50:22.165502',0,'2025-04-08 20:59:30.287462',0,'01055617043','김영준','happyjun@naver.com','해피영','{bcrypt}$2a$10$wmc9EvVzQWyDVBa5wNL84eOuKx2IGp4UqzWzMWgaSX7BQySrlFIkS','dcde27f2-e751-4c8c-834f-fa8e27ccb4a3.jpg','KVET/tckr5dCc0OqRIzHNeuQiE9MSScPYC8kBfM9Q81KkGclx9NU+SBk3lSyHzRA','L'),('2000-10-05','F',_binary '\0',38,_binary '',_binary '','2025-04-09 14:37:40.757781',0,'2025-04-09 14:53:04.508760',0,'01020307617','김은덕','eundeok@naver.com','응떡이','{bcrypt}$2a$10$dS/R.QNfM1CiNGwt.gbDNOoK2NVdLNNF/.reTI2KHOkXwf/mOw/r6','65b4b7fe-d950-4599-b452-cfd0a952011b.jpg','1Ed+qE26AUgE2LtIjm3eTG+SOuFYdKohMt1Jf16ay96k3TkriTo1kklqRifNk4De','L'),('1998-07-14','F',_binary '\0',39,_binary '\0',_binary '','2025-04-09 14:40:29.936770',0,'2025-04-09 14:40:29.936770',0,'01033794250','김진수','jinsu@naver.com','찐쑤','{bcrypt}$2a$10$HKr1VjnaQevh9ZgpNfv6DuQ13B0NXvgjqlGz4j8C5dRIEd2eDUmWG','91a37750-4f00-4892-9228-d89454f7689a.jpg','ZoaF7DdrqN6dEFP3UPxf7RnJ7/+WxKhhAdTE5v2TEelrOPWjEmZLJHWBaN2/olrp','L'),('2000-02-14','M',_binary '\0',40,_binary '\0',_binary '','2025-04-09 17:10:36.398498',0,'2025-04-09 17:10:36.398498',0,'01090049790','김벙멍','kimdog@naver.com','쁘이','{bcrypt}$2a$10$jFmvtuOFHXCakHZKl69oWuo4F1OSvuLMgbnbs..EOpPfDxQ/FvD9C','fd011288-8067-47b0-895f-47b866755ab5.jpg','6PeluMhIWvlSD9HOmgaIt4pVngcU5izm3zBUlXBPLC5qcnhdxMm0qBFXBWGSrf9z','L'),('1999-08-21','M',_binary '\0',41,_binary '',_binary '','2025-04-09 20:19:56.471660',0,'2025-04-09 20:28:37.227994',0,'01055617043','김준','sadkim@naver.com','새드킴','{bcrypt}$2a$10$oX3nFOrzS0j2qUUiK91y.OQ1tTbSGDxDf9qdPx/OhPjVQhpeRgCZe','0567d4b8-c4ab-4980-b787-87ebe563da81.jpg','bUEGFzzL01QScH5f9qQU4ejXmH9IbmfTVt2WpjxmwWz4+emVhzd8UBzVlUg+V9b7','L'),('2000-02-14','F',_binary '\0',42,_binary '\0',_binary '','2025-04-11 09:55:59.985898',0,'2025-04-11 09:55:59.985898',0,'01090049790','이다은','starwalk@naver.com','다은','{bcrypt}$2a$10$/iyykdN7kjSLk1nVllyU3.JeUMYlKmf6jI2VxIa6.BtXvYU/mZ1gq','d48c1aa9-50ed-4bc6-8024-03aac1b5166f.jpg','rSYQVOAqWzuluDLkJrC0X0zHWDiVdoTD9q5MrZTXDH+5LXBiT62VC71zgpgNcLsZ','L');
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `question_id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `created_by` bigint NOT NULL,
  `is_deleted` bit(1) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `updated_by` bigint NOT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `category` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `is_public` bit(1) NOT NULL,
  `member_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `subject` varchar(255) NOT NULL,
  PRIMARY KEY (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,'2025-04-02 23:16:12.486057',2,_binary '\0','2025-04-03 09:29:26.893956',2,'네 ? 뭐라구요 ?','욕설','ㅋㅋ','honghong1@naver.com',_binary '\0',2,'김홍범','','바보'),(2,'2025-04-02 23:17:08.156368',2,_binary '\0','2025-04-02 23:17:08.156368',2,NULL,'욕설','ㅋㅋ','honghong1@naver.com',_binary '\0',2,'김홍범','','바보'),(3,'2025-04-02 23:31:43.795092',2,_binary '\0','2025-04-02 23:31:43.795092',2,NULL,'산책 관련','궁금해요 !','honghong1@naver.com',_binary '',2,'김홍범','','안녕하세요');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-11 10:52:34

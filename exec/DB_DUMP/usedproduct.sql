CREATE DATABASE  IF NOT EXISTS `usedproduct` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `usedproduct`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 43.201.97.59    Database: usedproduct
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
-- Table structure for table `chat_rooms`
--

DROP TABLE IF EXISTS `chat_rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_rooms` (
  `chat_room_id` int NOT NULL AUTO_INCREMENT,
  `buyer_id` int DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `seller_id` int DEFAULT NULL,
  `used_product_id` int DEFAULT NULL,
  PRIMARY KEY (`chat_room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_rooms`
--

LOCK TABLES `chat_rooms` WRITE;
/*!40000 ALTER TABLE `chat_rooms` DISABLE KEYS */;
INSERT INTO `chat_rooms` VALUES (1,22,'2025-04-09 10:51:36.618296',29,2),(2,22,'2025-04-09 10:55:12.008444',17,1),(3,22,'2025-04-09 12:02:34.438577',35,3),(4,22,'2025-04-09 12:15:21.171622',35,4),(5,17,'2025-04-09 13:38:26.541964',29,2),(6,35,'2025-04-09 15:11:43.520034',36,6),(7,35,'2025-04-09 15:30:52.040774',29,2),(8,38,'2025-04-09 15:31:36.065218',22,9),(9,22,'2025-04-09 15:53:05.959223',38,7),(10,22,'2025-04-09 16:14:02.718208',38,10),(11,38,'2025-04-09 16:17:47.049984',22,11),(12,38,'2025-04-09 16:48:38.765685',22,12),(13,17,'2025-04-10 08:38:59.183194',22,11),(14,38,'2025-04-10 08:40:56.661701',17,1),(15,17,'2025-04-10 08:51:30.439849',38,13),(16,24,'2025-04-10 09:28:42.560491',22,11),(17,17,'2025-04-10 10:25:17.889371',35,5),(18,37,'2025-04-10 12:04:22.998371',29,2),(19,37,'2025-04-10 12:10:53.052114',35,4),(20,17,'2025-04-10 12:19:31.990105',24,14),(21,29,'2025-04-10 13:13:39.236016',22,9),(22,29,'2025-04-10 13:13:51.969490',36,6),(23,22,'2025-04-10 13:14:13.125611',24,14),(24,29,'2025-04-10 13:14:15.194454',22,11),(25,37,'2025-04-10 13:14:56.308097',29,15),(26,37,'2025-04-10 13:15:59.395876',29,16),(27,22,'2025-04-10 13:17:53.183369',29,15),(28,37,'2025-04-10 13:18:56.847779',29,17),(29,38,'2025-04-10 13:46:43.688260',22,18),(30,37,'2025-04-10 15:17:55.999873',35,19),(31,37,'2025-04-10 15:24:08.221077',35,20),(32,37,'2025-04-10 17:29:41.218893',35,21),(33,37,'2025-04-10 17:37:36.299825',35,22),(34,37,'2025-04-10 17:43:05.214472',35,23),(35,37,'2025-04-11 09:01:39.838354',35,24);
/*!40000 ALTER TABLE `chat_rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `member_id` int DEFAULT NULL,
  `used_product_id` int DEFAULT NULL,
  PRIMARY KEY (`like_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (1,22,9),(2,38,4),(3,38,1),(4,17,9);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `chat_message_id` int NOT NULL AUTO_INCREMENT,
  `chat_room_id` int DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `sender_id` int DEFAULT NULL,
  PRIMARY KEY (`chat_message_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,32,'2025-04-11 08:59:46.889518',NULL,'안녕하세요 ',37),(2,35,'2025-04-11 09:01:48.249533',NULL,'안녕하세요 ',37),(3,35,'2025-04-11 09:02:02.210727',NULL,'안녕하세요!',35),(4,35,'2025-04-11 09:02:11.964873',NULL,'안심결제로 구매하겠습니다 ',37),(5,35,'2025-04-11 09:02:14.906237',NULL,'네 알겠습니다.!',35),(6,35,'2025-04-11 09:02:31.401785',NULL,'SAFE_FINISH',37),(7,35,'2025-04-11 09:02:37.148424',NULL,'SAFE_INFO_SUBMITTED',35),(8,35,'2025-04-11 09:02:44.557073',NULL,'SAFE_COMPLETE',37);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `reason` enum('ABUSE','FALSE_INFORMATION','FRAUD','HATE_SPEECH','OTHER','SEXUAL_CONTENT','SPAM') DEFAULT NULL,
  `report_details` varchar(255) DEFAULT NULL,
  `status` enum('P','R') DEFAULT NULL,
  `used_product_id` int DEFAULT NULL,
  PRIMARY KEY (`report_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `used_product_images`
--

DROP TABLE IF EXISTS `used_product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `used_product_images` (
  `used_product_id` int NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  KEY `FKhnncr52k1txw54qppll4ku68n` (`used_product_id`),
  CONSTRAINT `FKhnncr52k1txw54qppll4ku68n` FOREIGN KEY (`used_product_id`) REFERENCES `used_products` (`used_product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `used_product_images`
--

LOCK TABLES `used_product_images` WRITE;
/*!40000 ALTER TABLE `used_product_images` DISABLE KEYS */;
INSERT INTO `used_product_images` VALUES (1,'https://c209awoo.s3.us-east-2.amazonaws.com/2d352840-197e-414e-9bf2-7e9e9d0dc12d.jpg'),(2,'https://c209awoo.s3.us-east-2.amazonaws.com/c443ac5b-9881-42c8-b87a-74485370bac4.jpg'),(3,'https://c209awoo.s3.us-east-2.amazonaws.com/ec5d9661-d8d4-4ca4-a8f3-b7d63dcf0361.jpg'),(4,'https://c209awoo.s3.us-east-2.amazonaws.com/78df96ec-63cf-404b-8ce3-abe933155c0a.jpg'),(5,'https://c209awoo.s3.us-east-2.amazonaws.com/5470589b-d2e6-473b-8e62-61d6140f2576.jpg'),(6,'https://c209awoo.s3.us-east-2.amazonaws.com/2cf889ca-48ae-4f34-9061-6d7a9f020f72.jpg'),(7,'https://c209awoo.s3.us-east-2.amazonaws.com/1e2deebf-824b-4abc-b476-660960c0f1ac.jpeg'),(9,'https://c209awoo.s3.us-east-2.amazonaws.com/679b3f5c-462f-44cd-b708-c1fcced8f034.jpg'),(10,'https://c209awoo.s3.us-east-2.amazonaws.com/3e70af34-a5be-48f4-8888-f9ecbb699d11.jpg'),(11,'https://c209awoo.s3.us-east-2.amazonaws.com/cb37133c-fb45-45e7-8271-1d0e75a7eee5.jpg'),(12,'https://c209awoo.s3.us-east-2.amazonaws.com/583c741e-9cce-4d1b-ac73-3d0ea4264d60.jpeg'),(13,'https://c209awoo.s3.us-east-2.amazonaws.com/8f77cf79-a166-42af-981b-368bc20efe62.jpeg'),(14,'https://c209awoo.s3.us-east-2.amazonaws.com/f526acf4-8117-478c-8eac-25218d6b4471.jpg'),(15,'https://c209awoo.s3.us-east-2.amazonaws.com/5a01cfaa-980c-4a4a-a6d6-49a7a6ca3afc.jpg'),(16,'https://c209awoo.s3.us-east-2.amazonaws.com/5565f145-b70a-48f1-a745-eed4844d9fc0.jpg'),(17,'https://c209awoo.s3.us-east-2.amazonaws.com/1affcc80-c8ef-4f7a-a6e1-16b8b3489362.jpg'),(18,'https://c209awoo.s3.us-east-2.amazonaws.com/eb2a1fdb-946a-45f4-8164-e51b634b649e.webp'),(19,'https://c209awoo.s3.us-east-2.amazonaws.com/7cfbf6d9-8fcc-4ca5-bcf0-81173a700ebc.jpg'),(20,'https://c209awoo.s3.us-east-2.amazonaws.com/52b27df5-dff6-40f2-a5f6-78f6031f1e72.jpg'),(21,'https://c209awoo.s3.us-east-2.amazonaws.com/2ad8fbbc-1e93-4b26-b4dc-be1dcfb3c6a1.jpg'),(22,'https://c209awoo.s3.us-east-2.amazonaws.com/fc3977ea-7f03-4722-ac3f-f41e9c8cdf64.jpg'),(23,'https://c209awoo.s3.us-east-2.amazonaws.com/57459c4a-c784-49ea-b6ce-69f607ba62f5.jpg'),(24,'https://c209awoo.s3.us-east-2.amazonaws.com/9a83275a-66e5-47c1-accf-3d2811b9cf97.jpg'),(25,'https://c209awoo.s3.us-east-2.amazonaws.com/2c9ac98c-c43c-4eb8-a8f6-5711db006cb9.jpg');
/*!40000 ALTER TABLE `used_product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `used_product_outbox`
--

DROP TABLE IF EXISTS `used_product_outbox`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `used_product_outbox` (
  `used_product_message_id` int NOT NULL AUTO_INCREMENT,
  `aggregate_id` int DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `event_type` enum('USED_PRODUCT_SAFE_SOLD') DEFAULT NULL,
  `payload` json NOT NULL,
  `status` enum('PENDING','PUBLISHED') DEFAULT NULL,
  `topic` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`used_product_message_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `used_product_outbox`
--

LOCK TABLES `used_product_outbox` WRITE;
/*!40000 ALTER TABLE `used_product_outbox` DISABLE KEYS */;
INSERT INTO `used_product_outbox` VALUES (1,12,'2025-04-09 16:51:35.551510','USED_PRODUCT_SAFE_SOLD','{\"price\": 50000, \"buyerId\": 38, \"sellerId\": 22, \"usedProductId\": 12}','PUBLISHED','used-product-safe-sold'),(2,1,'2025-04-10 08:49:03.963980','USED_PRODUCT_SAFE_SOLD','{\"price\": 30000, \"buyerId\": 38, \"sellerId\": 17, \"usedProductId\": 1}','PUBLISHED','used-product-safe-sold'),(3,16,'2025-04-10 13:16:52.355693','USED_PRODUCT_SAFE_SOLD','{\"price\": 11111, \"buyerId\": 37, \"sellerId\": 29, \"usedProductId\": 16}','PUBLISHED','used-product-safe-sold'),(4,17,'2025-04-10 13:20:38.715297','USED_PRODUCT_SAFE_SOLD','{\"price\": 889, \"buyerId\": 37, \"sellerId\": 29, \"usedProductId\": 17}','PUBLISHED','used-product-safe-sold'),(5,18,'2025-04-10 13:50:25.697457','USED_PRODUCT_SAFE_SOLD','{\"price\": 50000, \"buyerId\": 38, \"sellerId\": 22, \"usedProductId\": 18}','PUBLISHED','used-product-safe-sold'),(6,19,'2025-04-10 15:19:38.715952','USED_PRODUCT_SAFE_SOLD','{\"price\": 10000, \"buyerId\": 37, \"sellerId\": 35, \"usedProductId\": 19}','PUBLISHED','used-product-safe-sold'),(7,20,'2025-04-10 15:25:12.665593','USED_PRODUCT_SAFE_SOLD','{\"price\": 10000, \"buyerId\": 37, \"sellerId\": 35, \"usedProductId\": 20}','PUBLISHED','used-product-safe-sold'),(8,22,'2025-04-10 17:40:06.429821','USED_PRODUCT_SAFE_SOLD','{\"price\": 6000, \"buyerId\": 37, \"sellerId\": 35, \"usedProductId\": 22}','PUBLISHED','used-product-safe-sold'),(9,23,'2025-04-10 17:44:09.937653','USED_PRODUCT_SAFE_SOLD','{\"price\": 1000, \"buyerId\": 37, \"sellerId\": 35, \"usedProductId\": 23}','PUBLISHED','used-product-safe-sold'),(10,24,'2025-04-11 09:02:42.258941','USED_PRODUCT_SAFE_SOLD','{\"price\": 5000, \"buyerId\": 37, \"sellerId\": 35, \"usedProductId\": 24}','PUBLISHED','used-product-safe-sold');
/*!40000 ALTER TABLE `used_product_outbox` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `used_products`
--

DROP TABLE IF EXISTS `used_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `used_products` (
  `used_product_id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `like_count` int NOT NULL,
  `member_id` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `used_product_status` enum('RE','SA','SO') DEFAULT NULL,
  `view_count` int NOT NULL,
  PRIMARY KEY (`used_product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `used_products`
--

LOCK TABLES `used_products` WRITE;
/*!40000 ALTER TABLE `used_products` DISABLE KEYS */;
INSERT INTO `used_products` VALUES (1,'제품 구매한 지가 꽤 오래되어서 싼 가격에 내놓습니다 ! 필요하신 분은 빨리 연락 주셔서 좋은 가격에 사가세요 !!','2025-04-09 09:36:30.589807',1,17,30000,'팻 드라이룸 싸게 팝니다 !!','SO',79),(2,'산책 필수 품입니다. 안터져요!','2025-04-09 10:50:05.204422',0,29,10000,'산책 필수품 배변봉투 팔아요!','SA',255),(3,'단 한 번밖에 안 써봤습니다. 정가 4만 원입니다. 싸게 드릴게요.','2025-04-09 11:55:12.224088',0,35,25000,'개 사료 팝니다.!','SA',44),(4,'10번밖에 안썻습니다. 싸게 드려요','2025-04-09 12:07:57.557459',1,35,5000,'강아지 옷 팝니다.','SA',35),(5,'10번밖에 안사용해본 거의 신품입니다. 배송비는 별도입니다.','2025-04-09 12:11:27.032199',0,35,10000,'리드줄 팝니다. 단 10번 사용!','SA',11),(6,'다이소에서 샀는데 아이가 잘 안갖고 놀아서 팝니다 ! 채팅으로 연락 주세용','2025-04-09 15:08:15.709658',0,36,2000,'뼈다귀 인형 팔아용','SA',14),(7,'색도 이쁘고 강아지들이 엄청 좋아합니다!!ㅎㅎ 우리 아이도 많이 가지고 놀아서 원래 비싼건데 싸게 내놨어여~~','2025-04-09 15:21:00.807175',0,38,5000,'강아지 터그 팔아요','SO',53),(9,'슬개골 탈구 방지용으로 샀는데 애들이 쓰질 않아서 .. 팝니다! 필요하신 분들 사가세용 채팅으로 연락 주세요','2025-04-09 15:30:23.112161',2,22,50000,'슬개골 탈구 방지 계단 팝니다','SA',80),(10,'우리 아이가 밥을 아주 잘 먹었던 자동식기 팝니다!!! 요즘에는 생식으로 줘서 사료기기가 필요없어졌네요><','2025-04-09 16:13:28.357653',0,38,50000,'강아지 자동 식기!!','SO',16),(11,'백화점에서 비싸게 주고 샀는데 애가 안써서 내놉니당','2025-04-09 16:17:08.682573',0,22,50000,'데이지 가방!!','SA',69),(12,'선물받았는데 쓰던게있어서 팔아요!','2025-04-09 16:46:18.538626',0,22,50000,'강아지 진드기 목걸이','SO',15),(13,'고기인형 팝니다~~~ 빨아서 깨끗해영!!','2025-04-10 08:51:16.666531',0,38,2000,'고기뼈다귀 팔아요!!','SO',33),(14,'강아지 유모차 팝니다! \n비싼데 사용감이 조금 있어서 예민하지 않으신 분들 과 거래 원합니당','2025-04-10 09:44:05.170299',0,24,50000,'개모차','SO',22),(15,'111','2025-04-10 13:14:50.622016',0,29,11111,'ㅇㅇ1','SO',13),(16,'11','2025-04-10 13:15:49.917426',0,29,11111,'test','SO',9),(17,'111','2025-04-10 13:18:50.207585',0,29,889,'1','SO',21),(18,'강지 침대용','2025-04-10 13:46:38.015584',0,22,50000,'강지침대','SO',25),(19,'10개 있습니다. 싸게 팝니다.','2025-04-10 14:05:31.225606',0,35,10000,'배변 봉투팝니다. 싸게','SO',17),(20,'안터쟈요!','2025-04-10 15:21:01.308098',0,35,10000,'배변봉투 팔아요!','SO',9),(21,'절대 안터져요!','2025-04-10 17:24:36.677913',0,35,7000,'배변 봉투 밥니다.','SO',14),(22,'냄새가 안세어나와요!','2025-04-10 17:32:31.853312',0,35,6000,'배변봉투 팝니다!','SO',10),(23,'배변 봉투 산책에 꼭필요해','2025-04-10 17:41:05.988321',0,35,1000,'배변봉투 팔아요!','SO',7),(24,'안터져요!','2025-04-11 09:01:29.428670',0,35,5000,'배변봉투 팝니다!','SO',7),(25,'냄새, 내용물 안터져요!','2025-04-11 09:04:39.781848',0,35,10000,'배변 봉투 팔아요! ','SA',0);
/*!40000 ALTER TABLE `used_products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-11 10:53:31

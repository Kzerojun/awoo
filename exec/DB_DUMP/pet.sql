CREATE DATABASE  IF NOT EXISTS `pet` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pet`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 43.201.97.59    Database: pet
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
-- Table structure for table `pet`
--

DROP TABLE IF EXISTS `pet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pet` (
  `pet_id` int NOT NULL AUTO_INCREMENT,
  `age` int NOT NULL,
  `breed` varchar(50) NOT NULL,
  `member_id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `profile_image` varchar(1024) DEFAULT NULL,
  `saving_id` int DEFAULT NULL,
  `saving_level` int NOT NULL,
  `animal_reg_number` varchar(255) DEFAULT NULL,
  `ocr_image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`pet_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pet`
--

LOCK TABLES `pet` WRITE;
/*!40000 ALTER TABLE `pet` DISABLE KEYS */;
INSERT INTO `pet` VALUES (4,98,'푸들',1,'얌얌이','d4701bf3-bf39-4211-9661-a6e79f83d91f.jpg',0,0,NULL,NULL),(5,28,'말티즈',1,'덕진이','9e1beb70-a723-4d70-9ca7-56acf771d806.jpg',0,0,NULL,NULL),(6,98,'푸들',1,'얌얌이','6a41eecf-364e-408a-b8f5-90f88a659824.jpg',0,0,NULL,NULL),(8,2,'리트리버',1,'떡지니','57c70d67-da01-47af-9474-4f817dd108fa.jpg',0,0,NULL,NULL),(10,3,'시바견',1,'영주니','8b771ce1-cbdd-40af-893d-d7c8e5d7baf0.jpg',0,0,NULL,NULL),(11,3,'말티즈',1,'ㅎㅇ','a9255db8-3e4b-4011-a19d-1421c2d04a51.jpg',0,0,NULL,NULL),(12,3,'말티즈',1,'ㅎㅇ','91b2e4ac-b287-4ed8-aaa0-5a0d993204a2.jpg',0,0,NULL,NULL),(13,12,'말티즈',9,'아아','0c749674-f2c4-4875-9885-2a98491bdd11.jpg',0,0,NULL,NULL),(14,12,'말티즈',9,'아아','7938e1cc-122e-4074-857e-1cbedcbd416d.jpg',0,0,NULL,NULL),(15,3,'리트리버',1,'덕진잉','fb8b7c44-b3c7-4c4a-a344-e647fee03a62.jpg',0,0,NULL,NULL),(16,5,'시바견',3,'뭉히','61262d1d-a955-4fb8-a3b8-31be2d76da66.jpg',0,0,NULL,NULL),(17,3,'골든리트리버',4,'둥히','eca5ffec-956f-489d-be44-07ff2bd4d679.jpg',55,4,NULL,NULL),(18,5,'시바견',4,'몽실','d2e5da09-c62b-4bff-b45e-04f4c6979d3f.jpg',0,8,NULL,NULL),(19,2,'말티즈',5,'덕지니','7aef6b8d-c7cc-40eb-99c1-083bd1e0e73d.jpg',39,0,NULL,NULL),(20,1,'리트리버',5,'또리','a626e784-ac3e-4c28-b11e-b3a9e3d7f0c0.jpg',42,0,NULL,NULL),(21,3,'싸피독',2,'김낑','b78597a8-9034-4c5e-a835-9fc497f3e297.jpg',40,0,NULL,NULL),(22,3,'싸피독',2,'김낑깡','59d95d69-efa8-4e51-922d-7671474c8599.jpg',49,0,NULL,NULL),(23,7,'시고르자브종',4,'말랑','77e4789d-a904-4215-8ec4-48d33fce9a97.jpg',0,0,NULL,NULL),(24,2,'시바견',7,'멍이','94f37600-da22-4854-9ac2-2ae1bd82b35c.jpg',0,0,NULL,NULL),(25,12,'말티즈',2,'아아테스트','08aa5646-f4fb-45cc-8c0a-57205430b111.jpg',0,0,NULL,NULL),(26,1,'말티즈',19,'벼리','73585727-5648-4177-a0b4-80ec276501d6.jpg',0,0,NULL,NULL),(27,1,'말티즈',20,'star','01fa52f5-1d66-42c8-9fba-bbb1be0985e5.jpg',0,0,NULL,NULL),(28,12,'시바견',22,'김말랑','3f970f1d-7d2e-4875-8906-f2f470b34597.jpg',56,0,NULL,NULL),(29,10,'말티즈',22,'김뭉치','92a4eb09-c8b4-48dd-ab53-5390462db7eb.jpg',75,0,NULL,NULL),(30,1,'말티즈',23,'흰둥이','401279d9-68a7-46d4-a027-3c2b20851af0.jpg',54,0,NULL,NULL),(31,4,'골든리트리버',22,'인절미','fbf5cc26-c910-4e0d-8d59-5d593aea53f0.jpg',74,0,NULL,NULL),(32,12,'시바견',17,'시바시바','47e4bae3-0555-4a48-968c-e41f8aa44952.jpg',69,0,NULL,NULL),(33,26,'말티즈',6,'은수','a820f1de-5dc6-43ed-bae9-24ada3bc781a.jpg',55,0,NULL,NULL),(34,2,'시바',23,'빵빵이','082e1cd9-4166-4304-9bb1-67838a08738d.jpg',0,0,NULL,NULL),(35,1,'시고르브',23,'알렉산드라소','28c3b637-10fd-4c30-b944-9b5b6cbb276a.jpg',0,0,NULL,NULL),(36,1,'말티즈',26,'먼지','4e4fea25-f3b3-4938-85f1-98a6ca15e677.jpg',70,0,NULL,NULL),(37,98,'푸들',1,'얌얌이',NULL,0,0,'aa','aaa'),(38,98,'푸들',1,'얌얌이',NULL,0,0,'aa','aaa'),(39,98,'푸들',1,'얌얌이','659b6f1e-fee8-40f7-b640-ef3f78814568.jpg',0,0,'410123456789012','https://c209awoo.s3.us-east-2.amazonaws.com/37cd553e-c86b-4950-b24f-8b32ba199033.jpg'),(40,98,'푸들',27,'얌얌이','6f2a4781-5136-471d-b8fd-7098359c2d1c.jpg',0,0,'410123456789012','https://c209awoo.s3.us-east-2.amazonaws.com/37cd553e-c86b-4950-b24f-8b32ba199033.jpg'),(41,1,'믹스견',26,'딸기','4491d5d4-0eea-48d9-9b84-34d8204123b1.jpg',0,0,'410123456789012','https://c209awoo.s3.us-east-2.amazonaws.com/4e7a9857-e77d-45fd-a2dc-805bac683718.jpg'),(42,2,'리트리버',26,'까미','a3f9b68c-bdb6-4190-a1f7-eda17f01ee18.jpg',0,0,'410123456789012','https://c209awoo.s3.us-east-2.amazonaws.com/2f7ac760-65c3-46ac-b377-76042f103e1c.jpg'),(43,1,'믹스견',30,'깡쥐','774bd948-2153-4192-8dba-8ea5aa058e1a.jpg',0,0,'410123456789012','https://c209awoo.s3.us-east-2.amazonaws.com/dd076cd1-1771-4d46-9886-946a845f2515.jpg'),(44,33,'믹스견',29,'망고','3e55f961-68bd-4bf9-851c-2a84913af0d1.jpg',0,0,'410123456789012','https://c209awoo.s3.us-east-2.amazonaws.com/5af4fe79-1920-425c-84cb-bbbf30680345.jpg'),(45,1,'믹스견',35,'멍준','292e6014-b417-401d-b3ad-e3269f625396.jpg',0,0,'410123456789012','https://c209awoo.s3.us-east-2.amazonaws.com/29865bea-d3be-4d80-9310-a548911ea5ac.png'),(46,12,'믹스견',36,'망고링','77456871-086f-4aa4-ae34-045152839b09.jpg',66,0,'410123456789012','https://c209awoo.s3.us-east-2.amazonaws.com/d89e84e6-ed9c-4f8b-a71c-aa1f91b5b750.png'),(47,1,'믹스견',37,'멍주','3c4d0051-1687-425b-968e-4ac1e58a2b63.jpg',68,0,'410123456789012','https://c209awoo.s3.us-east-2.amazonaws.com/dec1a889-3b59-438e-a87d-243d33aef59a.png'),(48,7,'믹스견',17,'망고','bd2ae396-0953-463b-84e3-551a2a2d6045.jpg',0,0,'410123456789012','https://c209awoo.s3.us-east-2.amazonaws.com/5fabd7da-ba37-4424-807b-ae489fc66e2a.png'),(49,1,'말티즈',38,'먼지','7c62721f-d94e-42ef-a661-7d3f48c0314e.jpeg',72,0,'410123456789015','https://c209awoo.s3.us-east-2.amazonaws.com/69117e0f-2d6e-4291-9642-c139730ac7dc.png'),(50,2,'믹스견',38,'콩이','96a0a1ed-d276-4839-9fd6-e5d98ab33f6a.jpg',0,0,'410123451549015','https://c209awoo.s3.us-east-2.amazonaws.com/0f7f69e8-3e0d-43ad-a518-5e022c2466f7.png'),(51,6,'믹스견',24,'뭉치','d43e2b59-22b1-4b67-9240-49eac1b895da.jpg',0,0,'410123456789012','https://c209awoo.s3.us-east-2.amazonaws.com/a5914082-04a4-4261-9523-12b6960b56f9.png');
/*!40000 ALTER TABLE `pet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `walk`
--

DROP TABLE IF EXISTS `walk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `walk` (
  `walk_id` int NOT NULL AUTO_INCREMENT,
  `distance` double NOT NULL,
  `end_time` datetime(6) NOT NULL,
  `member_id` int NOT NULL,
  `pet_id` int NOT NULL,
  `start_time` datetime(6) NOT NULL,
  `is_saving` char(1) NOT NULL,
  PRIMARY KEY (`walk_id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `walk`
--

LOCK TABLES `walk` WRITE;
/*!40000 ALTER TABLE `walk` DISABLE KEYS */;
INSERT INTO `walk` VALUES (1,3.2,'2025-03-30 06:52:32.257000',5,19,'2025-03-30 06:52:26.822000',''),(2,3.2,'2025-03-31 01:45:55.580000',5,19,'2025-03-31 01:45:54.530000',''),(3,3.2,'2025-03-31 01:46:56.105000',5,19,'2025-03-31 01:46:40.202000',''),(4,3.2,'2025-03-31 01:46:56.105000',5,19,'2025-03-31 01:46:40.202000',''),(5,3.2,'2025-03-31 01:49:19.263000',5,19,'2025-03-31 01:49:13.956000',''),(6,3.2,'2025-03-31 22:57:07.977000',5,19,'2025-03-31 22:31:59.792000',''),(7,3.2,'2024-02-05 15:30:00.000000',1,4,'2024-02-05 14:30:00.000000',''),(8,3.2,'2024-02-05 15:30:00.000000',1,4,'2024-02-05 14:30:00.000000',''),(9,3.2,'2024-02-05 15:30:00.000000',1,4,'2024-02-05 14:30:00.000000',''),(10,3.2,'2024-02-05 15:30:00.000000',1,4,'2024-02-05 14:30:00.000000',''),(11,3.2,'2024-02-05 15:30:00.000000',1,4,'2024-02-05 14:30:00.000000',''),(12,3.2,'2024-02-05 15:30:00.000000',1,4,'2024-02-05 14:30:00.000000',''),(13,3.2,'2025-04-01 07:23:12.357000',2,22,'2025-04-01 07:22:55.817000',''),(14,3.2,'2025-04-02 02:48:00.389000',2,21,'2025-04-02 02:44:15.771000',''),(15,3.2,'2024-02-05 15:30:00.000000',1,4,'2024-02-05 14:30:00.000000',''),(16,3.2,'2025-04-04 07:45:57.908000',4,18,'2025-04-04 07:45:56.310000',''),(17,33.2,'2024-02-05 15:30:00.000000',1,4,'2024-02-05 14:30:00.000000',''),(18,3.2,'2025-04-04 09:30:16.263000',4,17,'2025-04-04 09:21:56.577000',''),(19,3.2,'2025-04-04 13:38:24.344000',5,19,'2025-04-04 13:32:10.924000',''),(20,3.2,'2025-04-04 14:24:23.028000',4,17,'2025-04-04 14:24:21.012000',''),(21,3.2,'2025-04-04 14:31:09.313000',4,23,'2025-04-04 14:31:08.431000',''),(22,3.2,'2025-04-05 02:59:00.155000',19,26,'2025-04-05 02:58:58.966000',''),(23,3.2,'2025-04-05 07:46:56.971000',5,20,'2025-04-05 07:46:50.268000',''),(24,3.2,'2025-04-06 11:12:22.690000',6,33,'2025-04-06 11:12:19.528000',''),(25,3.2,'2025-04-06 14:44:09.072000',6,33,'2025-04-06 14:44:07.455000',''),(26,3.2,'2025-04-06 16:28:54.579000',23,30,'2025-04-06 16:28:49.938000',''),(27,3.2,'2025-04-06 16:28:54.579000',23,30,'2025-04-06 16:28:49.938000',''),(28,3.2,'2025-04-06 16:29:42.658000',23,30,'2025-04-06 16:29:37.905000',''),(29,3.2,'2025-04-06 16:29:42.658000',23,30,'2025-04-06 16:29:37.905000',''),(30,3.2,'2025-04-07 02:34:33.694000',23,30,'2025-04-07 02:34:19.434000',''),(31,0.31,'2025-04-07 05:47:14.938000',23,30,'2025-04-07 05:44:18.534000',''),(32,3.19,'2025-04-07 18:29:35.000000',23,30,'2025-04-07 18:15:20.000000',''),(33,0.01,'2025-04-08 08:44:30.000000',17,32,'2025-04-08 08:43:51.000000',''),(34,2.61,'2025-04-08 23:22:40.000000',35,45,'2025-04-08 23:12:17.000000','T'),(35,3.1,'2025-04-09 18:32:07.000000',37,47,'2025-04-09 18:20:18.000000','T'),(36,1.31,'2025-04-10 12:01:13.000000',37,47,'2025-04-10 11:35:44.000000','T'),(37,1.31,'2025-04-10 12:01:13.000000',37,47,'2025-04-10 11:35:44.000000','T'),(38,0.16,'2025-04-10 12:09:55.000000',37,47,'2025-04-10 12:03:31.000000','T'),(39,1.31,'2025-04-10 13:16:20.000000',29,44,'2025-04-10 12:22:18.000000','F'),(40,0.18,'2025-04-10 15:16:13.000000',22,31,'2025-04-10 15:11:19.000000','T'),(41,0.06,'2025-04-10 15:22:58.000000',22,28,'2025-04-10 15:20:53.000000','T'),(42,0.09,'2025-04-10 17:28:00.000000',22,31,'2025-04-10 17:24:14.000000','T'),(43,0.03,'2025-04-10 17:35:57.000000',22,28,'2025-04-10 17:34:19.000000','T'),(44,0.03,'2025-04-10 17:35:57.000000',22,29,'2025-04-10 17:34:19.000000','T'),(45,0.01,'2025-04-10 17:42:13.000000',22,28,'2025-04-10 17:41:05.000000','T'),(46,0.01,'2025-04-10 17:42:13.000000',22,28,'2025-04-10 17:41:05.000000','T'),(47,0.01,'2025-04-11 10:25:03.000000',22,29,'2025-04-11 10:25:01.000000','T');
/*!40000 ALTER TABLE `walk` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-11 10:53:10

CREATE DATABASE  IF NOT EXISTS `admin` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `admin`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 43.201.97.59    Database: admin
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
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `account_id` bigint NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `account_no` varchar(255) NOT NULL,
  `create_at` datetime(6) NOT NULL,
  `pet_name` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  PRIMARY KEY (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `admin_id` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('M','S') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'admin','pWZtinb5nDNaOnGvxg1TZg==','S');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `question_id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `process` enum('O','P','R','W') DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `category` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `member_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,'ㅋㅋ','2025-04-02 23:16:12.486057','R','바보','네 ? 뭐라구요 ?','욕설','honghong1@naver.com',2,'김홍범'),(2,'ㅋㅋ','2025-04-02 23:17:08.156368','P','바보',NULL,'욕설','honghong1@naver.com',2,'김홍범'),(3,'궁금해요 !','2025-04-02 23:31:43.795092','P','안녕하세요',NULL,'산책 관련','honghong1@naver.com',2,'김홍범');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `report_id` bigint NOT NULL AUTO_INCREMENT,
  `process` enum('O','P','R','W') DEFAULT NULL,
  `reason` tinyint NOT NULL,
  `report_count` int NOT NULL,
  `reported_at` datetime(6) NOT NULL,
  `reported_user_email` varchar(255) NOT NULL,
  `reported_user_name` varchar(255) NOT NULL,
  `reporter_email` varchar(255) NOT NULL,
  `reporter_name` varchar(255) NOT NULL,
  `used_product_id` int NOT NULL,
  `report_details` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`report_id`),
  CONSTRAINT `reports_chk_1` CHECK ((`reason` between 0 and 6))
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
INSERT INTO `reports` VALUES (1,'W',2,1,'2025-04-06 23:02:44.470104','kimroad@naver.com','김길동','awootest2@test.com','test',3,NULL),(2,'W',4,1,'2025-04-06 23:32:55.190976','honghong@naver.com','기몽범','awootest2@test.com','test',4,NULL),(3,'P',1,1,'2025-04-06 15:21:14.175539','awoo1@naver.com','김홍범','honghong1@naver.com','김홍범',8,NULL),(4,'P',0,1,'2025-04-06 16:00:41.826867','honghong1@naver.com','김홍범','honghong1@naver.com','김홍범',1,'reportDetails'),(5,'P',3,2,'2025-04-06 20:43:57.652867','kimroad@naver.com','김길동','awootest2@test.com','test',3,NULL),(6,'P',3,3,'2025-04-06 22:36:58.299640','kimroad@naver.com','김길동','awootest2@test.com','test',3,NULL),(7,'P',6,4,'2025-04-06 22:41:07.641422','kimroad@naver.com','김길동','awootest2@test.com','test',3,NULL),(8,'P',4,2,'2025-04-06 23:32:55.190976','honghong@naver.com','기몽범','awootest2@test.com','test',4,NULL),(9,'P',3,5,'2025-04-06 19:54:08.956946','kimroad@naver.com','김길동','awootest2@test.com','test',3,NULL),(10,'P',3,6,'2025-04-06 20:19:12.111546','kimroad@naver.com','김길동','awootest2@test.com','test',3,NULL),(11,'P',3,7,'2025-04-06 20:23:03.864301','kimroad@naver.com','김길동','awootest2@test.com','test',3,NULL),(12,'P',3,8,'2025-04-06 20:31:33.870152','kimroad@naver.com','김길동','awootest2@test.com','test',3,NULL),(13,'P',3,9,'2025-04-06 20:34:33.758659','kimroad@naver.com','김길동','awootest2@test.com','test',3,NULL),(14,'P',5,10,'2025-04-06 23:01:09.522525','kimroad@naver.com','김길동','awootest2@test.com','test',3,NULL),(15,'P',2,11,'2025-04-06 23:02:44.470104','kimroad@naver.com','김길동','awootest2@test.com','test',3,NULL),(16,'O',6,1,'2025-04-08 14:40:54.902250','jhjh@awoo.com','김지한','awootest2@test.com','test',26,NULL);
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-11 10:51:31

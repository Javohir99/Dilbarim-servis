-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: students
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `RIGISTRATION`
--

DROP TABLE IF EXISTS `RIGISTRATION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RIGISTRATION` (
  `ID` mediumint NOT NULL AUTO_INCREMENT,
  `LastName` varchar(50) DEFAULT NULL,
  `FirstName` varchar(50) DEFAULT NULL,
  `Phone` json DEFAULT NULL,
  `Course` varchar(30) DEFAULT NULL,
  `Advertising` varchar(255) DEFAULT NULL,
  `Adress` varchar(255) DEFAULT NULL,
  `Status` varchar(30) DEFAULT NULL,
  `Comment` varchar(255) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RIGISTRATION`
--

LOCK TABLES `RIGISTRATION` WRITE;
/*!40000 ALTER TABLE `RIGISTRATION` DISABLE KEYS */;
INSERT INTO `RIGISTRATION` VALUES (1,'Shavkatov','Javoxir',NULL,NULL,'Баннер','Farobiy-76','Регестрирован',NULL,'2023-12-19 22:14:38'),(2,'Shavkatov','Javoxir',NULL,NULL,'Баннер','Farobiy-76','Регестрирован',NULL,'2023-12-19 23:11:54'),(3,'Shavkatov','Javoxir',NULL,'Компьютер','Таниш','Farobiy','Регистрирован',NULL,'2023-12-19 23:13:13'),(4,'Shavkatov','Javoxir',NULL,NULL,'Баннер','Farobiy-76','Регестрирован',NULL,'2023-12-19 23:13:22'),(5,'Shavkatov','Javoxir','[\"+998 (97) 410-63-23\", \"undefined\"]','Компьютер','Таниш','Farobiy','Регистрирован',NULL,'2023-12-19 23:20:08'),(6,'Shavkatov','Javoxir','[\"+998 (94) 608-24-42\", \"undefined\"]','Компьютер','Таниш','Farobiy','Регистрирован',NULL,'2023-12-19 23:21:01');
/*!40000 ALTER TABLE `RIGISTRATION` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-20  4:34:40

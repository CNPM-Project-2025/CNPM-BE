CREATE DATABASE  IF NOT EXISTS `cnpm` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cnpm`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 160.250.134.253    Database: cnpm
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.24.04.1

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
-- Table structure for table `bills`
--

DROP TABLE IF EXISTS `bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bills` (
  `id` int NOT NULL AUTO_INCREMENT,
  `paymentMethod` enum('CASH','BANK_TRANSFER','CARD') DEFAULT NULL,
  `type` enum('DINE_IN','TAKE_AWAY') NOT NULL,
  `status` enum('UNPAID','PAID') NOT NULL DEFAULT 'UNPAID',
  `totalPrice` decimal(10,2) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `table_id` int DEFAULT NULL,
  `cardinfo` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_d9e410ab4acd856404380028f7e` (`table_id`),
  CONSTRAINT `FK_d9e410ab4acd856404380028f7e` FOREIGN KEY (`table_id`) REFERENCES `tables` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bills`
--

LOCK TABLES `bills` WRITE;
/*!40000 ALTER TABLE `bills` DISABLE KEYS */;
INSERT INTO `bills` VALUES (93,'BANK_TRANSFER','DINE_IN','PAID',1094000.00,'2025-05-16 17:39:09.674110','2025-05-17 02:34:39.000000',1,NULL),(94,'BANK_TRANSFER','DINE_IN','UNPAID',221000.00,'2025-05-17 03:32:48.492255','2025-05-17 03:32:48.492255',1,NULL),(95,'BANK_TRANSFER','DINE_IN','UNPAID',221000.00,'2025-05-17 03:32:55.102302','2025-05-17 03:32:55.102302',1,NULL),(96,'BANK_TRANSFER','DINE_IN','PAID',178000.00,'2025-05-17 03:33:36.585638','2025-05-17 03:34:07.000000',1,NULL),(97,'CASH','DINE_IN','UNPAID',56000.00,'2025-05-17 03:56:24.399559','2025-05-17 03:56:24.399559',1,NULL),(98,'CASH','DINE_IN','UNPAID',56000.00,'2025-05-17 03:59:08.100313','2025-05-17 03:59:08.100313',1,NULL),(99,'CASH','DINE_IN','UNPAID',79000.00,'2025-05-17 04:14:02.140807','2025-05-17 04:14:02.140807',2,NULL),(100,'BANK_TRANSFER','DINE_IN','UNPAID',72000.00,'2025-05-17 04:22:21.713742','2025-05-17 04:22:21.713742',2,NULL),(101,'CASH','DINE_IN','UNPAID',194000.00,'2025-05-17 10:36:16.181874','2025-05-17 10:36:16.181874',1,NULL),(102,'BANK_TRANSFER','DINE_IN','UNPAID',161000.00,'2025-05-17 10:53:32.497303','2025-05-17 10:53:32.497303',1,NULL),(103,'CASH','DINE_IN','UNPAID',79000.00,'2025-05-17 10:54:10.675340','2025-05-17 10:54:10.675340',1,NULL),(104,'CASH','DINE_IN','UNPAID',79000.00,'2025-05-17 10:54:17.728061','2025-05-17 10:54:17.728061',1,NULL),(105,'CASH','DINE_IN','UNPAID',79000.00,'2025-05-17 10:54:25.704430','2025-05-17 10:54:25.704430',1,NULL),(106,'CASH','DINE_IN','UNPAID',79000.00,'2025-05-17 10:55:05.885726','2025-05-17 10:55:05.885726',1,NULL);
/*!40000 ALTER TABLE `bills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `status` int NOT NULL DEFAULT '1',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `created_update` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'food','fooditem',1,'2025-05-09 03:57:14.780101','2025-05-10 08:32:39.000000','uploads/category/1746839184566-product_3.jpg'),(2,'h2O','BurgerBurgerBurgerBurger',1,'2025-05-09 23:25:48.146908','2025-05-17 07:10:34.000000','uploads/category/1746839075630-product_4.jpg'),(3,'Burger','BurgerBurger',1,'2025-05-09 23:27:35.459896','2025-05-09 23:27:38.000000','uploads/category/1746808058300-product_5.jpg');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_items`
--

DROP TABLE IF EXISTS `food_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `sell_price` int NOT NULL,
  `import_price` int NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `created_update` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `status` int NOT NULL DEFAULT '1',
  `stock` int NOT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_bf31353b77c5507183f82b7a28a` (`category_id`),
  CONSTRAINT `FK_bf31353b77c5507183f82b7a28a` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_items`
--

LOCK TABLES `food_items` WRITE;
/*!40000 ALTER TABLE `food_items` DISABLE KEYS */;
INSERT INTO `food_items` VALUES (5,'Burger Bò phô mai đặc biệt',56000,10000,'Burger Bò phô mai đặc biệt','uploads/FoodImage/1747432802373-product_7.jpg','2025-05-09 14:55:12.071000','2025-05-17 10:36:16.000000',1,0,1),(6,'Burger 2 lớp bò, phô-mai',66000,20000,'Burger 2 lớp bò, phô-mai','uploads/FoodImage/1746777499551-product_2.jpg','2025-05-09 14:58:19.280000','2025-05-17 05:29:36.000000',1,7,3),(7,'Burger Bò miếng lớn phô-mai',79000,20000,'Burger Bò miếng lớn phô-mai','uploads/FoodImage/1746777583841-product_3.jpg','2025-05-09 14:59:43.643000','2025-05-17 10:55:05.000000',1,4,3),(8,'Burger Big Mac',76000,10000,'Burger Big Mac','uploads/FoodImage/1746777637771-product_4.jpg','2025-05-09 15:00:37.495000','2025-05-17 04:24:19.000000',1,1,3),(9,'Burger Bò Hoàng Gia Đặc Biệt',89000,0,'Burger Bò Hoàng Gia Đặc Biệt','uploads/FoodImage/1746777669507-product_5.jpg','2025-05-09 15:01:09.317115','2025-05-17 10:53:32.000000',1,5,1),(10,'Burger Gà phô-mai đặc biệt',69000,0,'Burger Gà phô-mai đặc biệt','uploads/FoodImage/1746777699202-product_6.jpg','2025-05-09 15:01:39.033559','2025-05-17 10:36:16.000000',1,5,1),(11,'Burger Gà Nhỏ Mayo',36000,0,'Burger Gà Nhỏ Mayo','uploads/FoodImage/1746777718825-product_7.jpg','2025-05-09 15:01:58.513588','2025-05-17 10:53:32.000000',1,1,1),(12,'Burger Gà Thượng Hạng Giòn Cay',89000,0,'Burger Gà Thượng Hạng Giòn Cay','uploads/FoodImage/1746777749539-product_7.jpg','2025-05-09 15:02:29.190650','2025-05-17 05:29:36.000000',1,2,1),(13,'Burger Phi lê Cá phô mai',56000,0,'Burger Phi lê Cá phô mai','uploads/FoodImage/1746777774514-product_8.jpg','2025-05-09 15:02:54.337025','2025-05-17 05:29:36.000000',1,2,1),(14,'Burger Xúc Xích - 337 Kcal',36000,0,'Burger Xúc Xích - 337 Kcal','uploads/FoodImage/1746777801776-product_9.jpg','2025-05-09 15:03:21.523698','2025-05-17 10:53:32.000000',1,4,1),(15,'ahihi',0,0,'','uploads/FoodImage/1747430674964-product_2.jpg','2025-05-16 13:06:09.820000','2025-05-17 04:24:35.000000',1,0,1),(16,'b',20000,10000,'b','uploads/FoodImage/1747432810269-product_6.jpg','2025-05-17 02:40:13.238000','2025-05-17 05:00:10.000000',1,0,1),(17,'c',0,0,'c','uploads/FoodImage/1747432822888-product_10.jpg','2025-05-17 02:44:05.604000','2025-05-17 05:00:22.000000',1,0,1),(18,'d',0,0,'d','uploads/FoodImage/1747432829696-product_7.jpg','2025-05-17 02:46:04.779000','2025-05-17 05:00:29.000000',1,0,1);
/*!40000 ALTER TABLE `food_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,1746715130291,'DeleteOrder1746715130291');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `status` enum('PLACED','PREPARING','SERVED','COMPLETED','CANCELLED') NOT NULL DEFAULT 'PLACED',
  `billId` int DEFAULT NULL,
  `foodItemId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_6e48cc52c4b3983bf0e0c218d6e` (`billId`),
  KEY `FK_cb0924625c58c74e228404d898f` (`foodItemId`),
  CONSTRAINT `FK_6e48cc52c4b3983bf0e0c218d6e` FOREIGN KEY (`billId`) REFERENCES `bills` (`id`),
  CONSTRAINT `FK_cb0924625c58c74e228404d898f` FOREIGN KEY (`foodItemId`) REFERENCES `food_items` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (1,2,'PLACED',93,12),(2,2,'PLACED',93,8),(3,2,'PLACED',93,7),(4,2,'PLACED',93,6),(5,3,'PLACED',93,10),(6,3,'PLACED',93,9),(7,1,'PLACED',96,6),(8,2,'PLACED',96,5),(9,1,'PLACED',97,13),(10,1,'PLACED',98,13),(11,1,'PLACED',99,7),(12,2,'PLACED',100,11),(13,1,'PLACED',101,5),(14,2,'PLACED',101,10),(15,1,'PLACED',102,14),(16,1,'PLACED',102,11),(17,1,'PLACED',102,9),(18,1,'PLACED',103,7),(19,1,'PLACED',104,7),(20,1,'PLACED',105,7),(21,1,'PLACED',106,7);
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` enum('DINE_IN','TAKE_AWAY') NOT NULL,
  `status` enum('UNPAID','PAID') NOT NULL DEFAULT 'UNPAID',
  `totalPrice` decimal(10,2) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `table_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3d36410e89a795172fa6e0dd968` (`table_id`),
  CONSTRAINT `FK_3d36410e89a795172fa6e0dd968` FOREIGN KEY (`table_id`) REFERENCES `tables` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_order_details`
--

DROP TABLE IF EXISTS `purchase_order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_order_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `price` int NOT NULL,
  `purchase_order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_08f0d16ed60b199a4973097255d` (`purchase_order_id`),
  KEY `FK_d3b4369887dd815c0b52023ddca` (`product_id`),
  CONSTRAINT `FK_08f0d16ed60b199a4973097255d` FOREIGN KEY (`purchase_order_id`) REFERENCES `purchase_orders` (`id`),
  CONSTRAINT `FK_d3b4369887dd815c0b52023ddca` FOREIGN KEY (`product_id`) REFERENCES `food_items` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_order_details`
--

LOCK TABLES `purchase_order_details` WRITE;
/*!40000 ALTER TABLE `purchase_order_details` DISABLE KEYS */;
INSERT INTO `purchase_order_details` VALUES (1,10,1,6,10),(2,1,10,7,5),(3,1,0,7,6),(4,1,0,7,7),(5,1,10000,8,5),(6,1,20000,8,6),(7,1,10000,8,7),(8,1,10000,8,8),(9,3,10000,8,9),(10,3,20000,9,10),(11,3,20000,9,11),(12,3,20000,9,12),(13,3,20000,9,13),(14,3,20000,9,14),(15,1,10000,10,8),(16,1,20000,10,7),(17,1,20000,10,6),(18,1,10000,11,8),(19,1,10000,11,5),(20,1,10000,12,5),(21,1,10000,12,8),(22,7,20000,13,6),(23,8,20000,13,7),(24,6,0,13,9),(25,7,0,13,10),(26,1,0,13,11),(27,1,0,13,12),(28,1,0,13,13),(29,2,0,13,14);
/*!40000 ALTER TABLE `purchase_order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_orders`
--

DROP TABLE IF EXISTS `purchase_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` enum('PENDING','APPROVED','REJECTED','COMPLETED') NOT NULL DEFAULT 'PENDING',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c13036093717212c2c6aa111c73` (`user_id`),
  CONSTRAINT `FK_c13036093717212c2c6aa111c73` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_orders`
--

LOCK TABLES `purchase_orders` WRITE;
/*!40000 ALTER TABLE `purchase_orders` DISABLE KEYS */;
INSERT INTO `purchase_orders` VALUES (1,'PENDING','2025-05-12 20:46:35.342554','2025-05-12 20:46:35.342554',1),(2,'PENDING','2025-05-12 20:47:27.756960','2025-05-12 20:47:27.756960',1),(3,'PENDING','2025-05-12 20:52:34.257780','2025-05-12 20:52:34.257780',1),(4,'REJECTED','2025-05-12 20:52:41.503890','2025-05-15 19:32:21.000000',1),(5,'PENDING','2025-05-12 20:52:55.494847','2025-05-12 20:52:55.494847',1),(6,'PENDING','2025-05-12 20:56:07.525928','2025-05-12 20:56:07.525928',1),(7,'COMPLETED','2025-05-15 18:46:10.915763','2025-05-15 19:31:51.000000',1),(8,'COMPLETED','2025-05-15 19:41:27.349980','2025-05-15 19:41:44.000000',1),(9,'COMPLETED','2025-05-16 04:36:24.695041','2025-05-16 04:36:40.000000',1),(10,'COMPLETED','2025-05-16 04:40:31.755867','2025-05-16 04:40:45.000000',1),(11,'PENDING','2025-05-16 04:41:24.742699','2025-05-16 04:41:24.742699',1),(12,'COMPLETED','2025-05-16 04:42:16.103458','2025-05-17 04:24:19.000000',1),(13,'COMPLETED','2025-05-17 05:29:22.321920','2025-05-17 05:29:36.000000',1);
/*!40000 ALTER TABLE `purchase_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `created_update` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tables`
--

DROP TABLE IF EXISTS `tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tables` (
  `id` int NOT NULL AUTO_INCREMENT,
  `qr_code` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tables`
--

LOCK TABLES `tables` WRITE;
/*!40000 ALTER TABLE `tables` DISABLE KEYS */;
INSERT INTO `tables` VALUES (1,NULL,'2025-05-12 16:37:12.880424','2025-05-17 01:46:00.790426','Bàn số 1'),(2,NULL,'2025-05-17 01:45:31.747015','2025-05-17 02:12:40.000000','Bàn số 02'),(3,NULL,'2025-05-17 07:12:21.768064','2025-05-17 07:12:21.768064','Bàn số 3');
/*!40000 ALTER TABLE `tables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `roles` varchar(255) NOT NULL DEFAULT 'User',
  `refresh_token` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `created_update` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'huynh','tien','1','a','0326076715','Admin',NULL,NULL,1,'2025-05-09 00:59:30.648515','2025-05-09 01:44:45.780600'),(2,'Tien','Huynh','$2b$10$jojwPqYn15.3gOgYdEu.vu5uQbjYzowv5hIdDNmcG8P7lAp3UPQ92','tien@gamil.com','032323','Admin','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0aWVuQGdhbWlsLmNvbSIsImlhdCI6MTc0NzQzNTEwMSwiZXhwIjoxNzQ4MDM5OTAxfQ.L7eZhNIF0QNA8ViyDkXLpBRCGc9BS6nske0GgNIzElQ',NULL,1,'2025-05-09 01:36:29.737111','2025-05-17 05:38:21.000000'),(3,'huynh','tien','$2b$10$dq2X2u//TemW.E4XmnRmtOWJEYdrD9zesSDipuzmZomy8TbE.2oJm','huynhtien@gmail.com','0326046715','User','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJodXluaHRpZW5AZ21haWwuY29tIiwiaWF0IjoxNzQ3NDMyNTM2LCJleHAiOjE3NDgwMzczMzZ9.NBpLboFwJUraUy_7680yxaAt2xsuJnHY42EhXKsb3Us',NULL,1,'2025-05-16 18:10:24.687485','2025-05-17 04:55:36.000000'),(4,'Tien','Nguyen','$2b$10$J5rN1JPseiO0bMEnLYc/CuD6iwfKXxc9qqzFj43HpPmOm0s/XakIi','tien@example.com',NULL,'Admin','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ0aWVuQGV4YW1wbGUuY29tIiwiaWF0IjoxNzQ3NDYzOTM1LCJleHAiOjE3NDgwNjg3MzV9.4QP6sdXDF-fbGDoV-S0X-h04vqHi7eW5Et1KAjwHecw',NULL,1,'2025-05-17 04:46:41.743160','2025-05-17 13:38:55.000000'),(5,'a','a','$2b$10$3e1CeQs0ztAFmfufOEMKGeyy2hu7j6.OrZ9Z8C9kYG6T6MagM0Sky','aa@aa','0326046715','User',NULL,NULL,1,'2025-05-17 04:51:32.584441','2025-05-17 04:51:32.584441'),(6,'a','aa','$2b$10$qi02MNIFFTV2lq.HlqVXnuneilfZrelr0oPgQT9UYFVjHhs2WNAju','a@aaaa','123','User',NULL,NULL,1,'2025-05-17 04:53:26.897819','2025-05-17 04:53:26.897819'),(7,'b','bb','$2b$10$EAMoPdrlNtYuR.pqZyUT1efcDJiZbp4BsU.dyF0rJ5G2SfjCSavHG','huynh@gmail.com','03260','User','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJodXluaEBnbWFpbC5jb20iLCJpYXQiOjE3NDc0MzI3NTUsImV4cCI6MTc0ODAzNzU1NX0.cEEBgDxl5oMw0G_LgxTigS3hk--nhdR3-JC7vtRBJqE',NULL,1,'2025-05-17 04:58:02.172169','2025-05-17 04:59:15.000000'),(8,'a','ââ','$2b$10$TNa7WYPS0zu6LWBRlswPHObzu6Zr.7gZCmB1U7YZ5NmLYV/1U3AzC','huyhyt@g.com','31232','User',NULL,NULL,1,'2025-05-17 10:45:45.603932','2025-05-17 10:45:45.603932');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-17 15:16:48

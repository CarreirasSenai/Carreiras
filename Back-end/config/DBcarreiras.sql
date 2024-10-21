CREATE DATABASE  IF NOT EXISTS `carreiras` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `carreiras`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: carreiras
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `agendamento`
--

DROP TABLE IF EXISTS `agendamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agendamento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) NOT NULL,
  `vaga` varchar(45) NOT NULL,
  `data` date NOT NULL,
  `hora` time NOT NULL,
  `id_empresa` int NOT NULL,
  `id_candidato` int NOT NULL,
  `data_atu` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_empresa` (`id_empresa`),
  KEY `id_candidato` (`id_candidato`),
  CONSTRAINT `agendamento_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `user_empresa` (`id`) ON DELETE CASCADE,
  CONSTRAINT `agendamento_ibfk_2` FOREIGN KEY (`id_candidato`) REFERENCES `user_candidato` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agendamento`
--

LOCK TABLES `agendamento` WRITE;
/*!40000 ALTER TABLE `agendamento` DISABLE KEYS */;
INSERT INTO `agendamento` VALUES (8,'Desenvolvedor Full Stack','Pleno','2024-09-17','09:00:00',1,25,'2024-09-18 00:00:26'),(9,'Engenheiro de Software','Sênior','2024-09-18','14:30:00',1,25,'2024-09-18 00:00:26'),(10,'Analista de Dados','Júnior','2024-09-19','11:00:00',1,25,'2024-09-18 00:00:26');
/*!40000 ALTER TABLE `agendamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidatura`
--

DROP TABLE IF EXISTS `candidatura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidatura` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_candidato` int NOT NULL,
  `id_vaga` int NOT NULL,
  `data_atu` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_candidato` (`id_candidato`),
  KEY `id_vaga` (`id_vaga`),
  CONSTRAINT `candidatura_ibfk_1` FOREIGN KEY (`id_candidato`) REFERENCES `user_candidato` (`id`) ON DELETE CASCADE,
  CONSTRAINT `candidatura_ibfk_2` FOREIGN KEY (`id_vaga`) REFERENCES `vagas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidatura`
--

LOCK TABLES `candidatura` WRITE;
/*!40000 ALTER TABLE `candidatura` DISABLE KEYS */;
INSERT INTO `candidatura` VALUES (1,25,105,'2024-10-19 00:17:11'),(2,25,124,'2024-10-19 01:01:19'),(3,25,4,'2024-10-19 21:20:57');
/*!40000 ALTER TABLE `candidatura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curso`
--

DROP TABLE IF EXISTS `curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curso` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `lugar` varchar(100) NOT NULL,
  `inicio` varchar(7) NOT NULL,
  `termino` varchar(7) NOT NULL,
  `id_candidato` int NOT NULL,
  `data_atu` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_candidato` (`id_candidato`),
  CONSTRAINT `curso_ibfk_1` FOREIGN KEY (`id_candidato`) REFERENCES `user_candidato` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curso`
--

LOCK TABLES `curso` WRITE;
/*!40000 ALTER TABLE `curso` DISABLE KEYS */;
INSERT INTO `curso` VALUES (8,'Inglês','Duolingo','2024-09','2024-12',25,'2024-09-30 18:20:44'),(9,'Totvs Protheus','IOS','2016-02','2016-12',25,'2024-09-30 18:21:31');
/*!40000 ALTER TABLE `curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experiencia`
--

DROP TABLE IF EXISTS `experiencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experiencia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cargo` varchar(100) NOT NULL,
  `empresa` varchar(100) NOT NULL,
  `atividades` json DEFAULT NULL,
  `contrato` varchar(100) NOT NULL,
  `inicio` varchar(7) NOT NULL,
  `termino` varchar(7) NOT NULL,
  `id_candidato` int NOT NULL,
  `data_atu` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_candidato` (`id_candidato`),
  CONSTRAINT `experiencia_ibfk_1` FOREIGN KEY (`id_candidato`) REFERENCES `user_candidato` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experiencia`
--

LOCK TABLES `experiencia` WRITE;
/*!40000 ALTER TABLE `experiencia` DISABLE KEYS */;
INSERT INTO `experiencia` VALUES (14,'Desenvolvedor Full Stack','TOTVS','[\"Criação de Interfaces\", \"Controle de Estoque\", \"Gestão de Pessoas\", \"Testes\", \"Desenvolvimento\"]','PJ','2024-10','2024-12',25,'2024-09-19 06:07:10');
/*!40000 ALTER TABLE `experiencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formacao`
--

DROP TABLE IF EXISTS `formacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formacao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `nivel` varchar(100) NOT NULL,
  `lugar` varchar(100) NOT NULL,
  `inicio` varchar(7) DEFAULT NULL,
  `termino` varchar(7) DEFAULT NULL,
  `id_candidato` int NOT NULL,
  `data_atu` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_candidato` (`id_candidato`),
  CONSTRAINT `formacao_ibfk_1` FOREIGN KEY (`id_candidato`) REFERENCES `user_candidato` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formacao`
--

LOCK TABLES `formacao` WRITE;
/*!40000 ALTER TABLE `formacao` DISABLE KEYS */;
INSERT INTO `formacao` VALUES (6,'','Ensino Fundamental','Senai','2024-09','2024-12',26,'2024-09-30 18:19:14'),(7,'Desenvolvimento de Sistemas','Curso Técnico','Senai Norte Joinville','2019-02','2020-11',25,'2024-09-30 18:20:23'),(8,'Análise e Desenvolvimento de Sistemas','Ensino Superior (Graduação)','UniSenai Norte Joinville','2022-02','2025-12',25,'2024-09-30 18:22:13');
/*!40000 ALTER TABLE `formacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habilidade`
--

DROP TABLE IF EXISTS `habilidade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habilidade` (
  `id` int NOT NULL AUTO_INCREMENT,
  `habilidades` json DEFAULT NULL,
  `id_candidato` int NOT NULL,
  `data_atu` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_candidato` (`id_candidato`),
  CONSTRAINT `habilidade_ibfk_1` FOREIGN KEY (`id_candidato`) REFERENCES `user_candidato` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habilidade`
--

LOCK TABLES `habilidade` WRITE;
/*!40000 ALTER TABLE `habilidade` DISABLE KEYS */;
INSERT INTO `habilidade` VALUES (5,'[\"vue.js\", \"react\", \"javascript\", \"node.js\", \"mysql\", \"postgresql\", \"bootstrap\", \"html\", \"css\", \"materialui\", \"C#\", \"lógica de programação\"]',25,'2024-09-30 18:23:55');
/*!40000 ALTER TABLE `habilidade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mensagem`
--

DROP TABLE IF EXISTS `mensagem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mensagem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(45) DEFAULT NULL,
  `assunto` text NOT NULL,
  `envio` datetime NOT NULL,
  `id_empresa` int NOT NULL,
  `id_candidato` int NOT NULL,
  `data_atu` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_empresa` (`id_empresa`),
  KEY `id_candidato` (`id_candidato`),
  CONSTRAINT `mensagem_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `user_empresa` (`id`) ON DELETE CASCADE,
  CONSTRAINT `mensagem_ibfk_2` FOREIGN KEY (`id_candidato`) REFERENCES `user_candidato` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensagem`
--

LOCK TABLES `mensagem` WRITE;
/*!40000 ALTER TABLE `mensagem` DISABLE KEYS */;
/*!40000 ALTER TABLE `mensagem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perfil`
--

DROP TABLE IF EXISTS `perfil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `perfil` (
  `id` int NOT NULL,
  `descricao` varchar(1000) DEFAULT NULL,
  `foto` text,
  `capa` text,
  `id_candidato` int DEFAULT NULL,
  `id_empresa` int DEFAULT NULL,
  `data_atu` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `perfil_ibfk_1` (`id_candidato`),
  KEY `perfil_ibfk_2` (`id_empresa`),
  CONSTRAINT `perfil_ibfk_1` FOREIGN KEY (`id_candidato`) REFERENCES `user_candidato` (`id`) ON DELETE CASCADE,
  CONSTRAINT `perfil_ibfk_2` FOREIGN KEY (`id_empresa`) REFERENCES `user_empresa` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfil`
--

LOCK TABLES `perfil` WRITE;
/*!40000 ALTER TABLE `perfil` DISABLE KEYS */;
/*!40000 ALTER TABLE `perfil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questionario`
--

DROP TABLE IF EXISTS `questionario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questionario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(11) NOT NULL,
  `pergunta` varchar(2000) NOT NULL,
  `respostas` json DEFAULT NULL,
  `respCorreta` varchar(500) DEFAULT NULL,
  `id_vaga` int NOT NULL,
  `data_atu` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_vaga` (`id_vaga`),
  CONSTRAINT `questionario_ibfk_1` FOREIGN KEY (`id_vaga`) REFERENCES `vagas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questionario`
--

LOCK TABLES `questionario` WRITE;
/*!40000 ALTER TABLE `questionario` DISABLE KEYS */;
INSERT INTO `questionario` VALUES (30,'discursiva','Fale sobre você','[]',NULL,105,'2024-10-18 00:27:05'),(31,'alternativa','Há quanto tempo você usa node.js no trabalho?','[\"1 a 2 anos\", \"2 a 3 anos\", \"3 a 4 anos\", \"mais de 4 anos\"]','mais de 4 anos',105,'2024-10-18 00:28:11'),(32,'discursiva','fasdfasdfasdf','[]',NULL,124,'2024-10-18 23:05:26');
/*!40000 ALTER TABLE `questionario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questionario_respostas`
--

DROP TABLE IF EXISTS `questionario_respostas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questionario_respostas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `resposta` varchar(2000) DEFAULT NULL,
  `id_questionario` int NOT NULL,
  `id_candidato` int NOT NULL,
  `data_atu` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_questionario` (`id_questionario`),
  KEY `id_candidato` (`id_candidato`),
  CONSTRAINT `questionario_respostas_ibfk_1` FOREIGN KEY (`id_questionario`) REFERENCES `questionario` (`id`) ON DELETE CASCADE,
  CONSTRAINT `questionario_respostas_ibfk_2` FOREIGN KEY (`id_candidato`) REFERENCES `user_candidato` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questionario_respostas`
--

LOCK TABLES `questionario_respostas` WRITE;
/*!40000 ALTER TABLE `questionario_respostas` DISABLE KEYS */;
INSERT INTO `questionario_respostas` VALUES (64,'asdfasdfasdf',30,25,'2024-10-19 00:17:11'),(65,'1 a 2 anos',31,25,'2024-10-19 00:17:11'),(66,'asdfasdfasdfasdf',32,25,'2024-10-19 01:01:19');
/*!40000 ALTER TABLE `questionario_respostas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_admin`
--

DROP TABLE IF EXISTS `user_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo_admin` varchar(45) NOT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `cpf` char(11) NOT NULL,
  `senha` varchar(250) NOT NULL,
  `celular` varchar(20) DEFAULT NULL,
  `grupo` varchar(5) NOT NULL,
  `foto` varchar(200) DEFAULT NULL,
  `data_atu` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_admin`
--

LOCK TABLES `user_admin` WRITE;
/*!40000 ALTER TABLE `user_admin` DISABLE KEYS */;
INSERT INTO `user_admin` VALUES (1,'super',1,'Super Admin','admin@admin.com','00000000000','$2b$10$5jDcy0sSqqOVE5WWNkGU2OFwsLsOFDusGnQSFjx1HM.IsBCnmQmgq','00000000000','admin',NULL,'2024-10-10 00:30:01'),(3,'adm',1,'Thiago Mau','thiago@gmail.com','11111111111','$2a$10$SZ2JrSM2D4kxnKV1DJ0qbOuQOb739aKazbyLUe.VM2g8QG6iKsnC.','11111111111','admin',NULL,'2024-10-10 00:30:01'),(9,'user',1,'Felipeca','fefe@gmail.com','11111122222','$2b$10$ZhVt8qEspVy3DmPhZIzQi.hZe6F77TYAt6Ptfbsj0sKm/L3j1RYqS','11111111111','admin',NULL,'2024-10-10 00:30:11'),(12,'adm',1,'haha','haha@gmail.com','11113331111','$2b$10$1NFLVx8hUsBWqwM/rHd8Ce.4qCxtyJ2kMr/yuWG0mzfrRxN2IXLhm','11111111111','admin',NULL,'2024-10-02 01:30:01'),(13,'adm',1,'Thiago Mau','ddd@gmail.com','22222334444','$2a$10$.lFRs8zOrD4Nz5y6euMHpePAoRw8hMixUIs7dDwDSc8D7u73/cXnG','11111111111','admin',NULL,'2024-10-02 08:17:51'),(14,'adm',0,'Thiago Mau','mauesckt@gmail.com','11111111112','$2a$10$IX2p2Ymevarm38FtuYkfgOxwd8GLBe9OCmYLeiwEx5Piq5ozb9v2i','11111111111','admin',NULL,'2024-10-13 23:03:10');
/*!40000 ALTER TABLE `user_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_candidato`
--

DROP TABLE IF EXISTS `user_candidato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_candidato` (
  `id` int NOT NULL AUTO_INCREMENT,
  `verificado` tinyint(1) DEFAULT '0',
  `token_ativacao` varchar(64) DEFAULT NULL,
  `nome_social` varchar(100) NOT NULL,
  `nome_completo` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `celular` varchar(20) NOT NULL,
  `cpf` char(11) NOT NULL,
  `cep` char(8) NOT NULL,
  `rua` varchar(100) NOT NULL,
  `numero` int NOT NULL,
  `complemento` varchar(100) NOT NULL,
  `bairro` varchar(45) NOT NULL,
  `cidade` varchar(45) NOT NULL,
  `estado` char(2) NOT NULL,
  `senha` varchar(250) NOT NULL,
  `area` varchar(150) NOT NULL,
  `profissao` varchar(200) DEFAULT NULL,
  `grupo` varchar(9) NOT NULL,
  `descricao` text,
  `foto` varchar(200) DEFAULT NULL,
  `capa` varchar(200) DEFAULT NULL,
  `data_atu` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `cpf` (`cpf`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_candidato`
--

LOCK TABLES `user_candidato` WRITE;
/*!40000 ALTER TABLE `user_candidato` DISABLE KEYS */;
INSERT INTO `user_candidato` VALUES (25,1,'ae605f546f2b651413dd4ef42bf12307b846ba6e6f883c93af2688ba9e2724e0','Thiagoo','Thiag Lima','mauesckt@gmail.com','(47) 0000-0000','(47) 00000-0000','00000000000','00000000','Rua Bonita',0,'cabana','Bairro Bonito','Bonita','SC','$2a$10$/F9WxjA262hh/euxjvBdP.VBEvMNtCTiijSt0HhxMvLXOFP0WZmGa','Engenharia','programador node.js','candidato','<h1 style=\"text-align: center; white-space-collapse: collapse;\"><span style=\"font-weight: 400; letter-spacing: 0.249999px;\"><i><font color=\"#00ff91\">Me contrata!</font></i></span></h1><div style=\"white-space-collapse: collapse; text-align: center;\"><br></div><div style=\"white-space-collapse: collapse; text-align: center;\"><pre autocapitalize=\"none\" autocomplete=\"off\" autocorrect=\"off\" spellcheck=\"false\" style=\"box-sizing: border-box; margin: 4px; font-size: 16px; overflow-wrap: break-word; scrollbar-width: thin; text-align: left; overflow: auto; min-width: 1em; color: rgb(51, 51, 51); letter-spacing: normal; font-family: -apple-system, BlinkMacSystemFont, &quot;segoe ui&quot;, Roboto, Helvetica, Arial, sans-serif !important;\"><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">░░░░░░░▄▄▀▀▀▀▀▀▀▀▀▀▄▄█▄░░░░▄░░░░█░░░░░░░</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">░░░░░░█▀░░░░░░░░░░░░░▀▀█▄░░░▀░░░░░░░░░▄░</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">░░░░▄▀░░░░░░░░░░░░░░░░░▀██░░░▄▀▀▀▄▄░░▀░░</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">░░▄█▀▄█▀▀▀▀▄░░░░░░▄▀▀█▄░▀█▄░░█▄░░░▀█░░░░</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">░▄█░▄▀░░▄▄▄░█░░░▄▀▄█▄░▀█░░█▄░░▀█░░░░█░░░</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">▄█░░█░░░▀▀▀░█░░▄█░▀▀▀░░█░░░█▄░░█░░░░█░░░</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">██░░░▀▄░░░▄█▀░░░▀▄▄▄▄▄█▀░░░▀█░░█▄░░░█░░░</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">██░░░░░▀▀▀░░░░░░░░░░░░░░░░░░█░▄█░░░░█░░░</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">██░░░░░░░░░░░░░░░░░░░░░█░░░░██▀░░░░█▄░░░</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">██░░░░░░░░░░░░░░░░░░░░░█░░░░█░░░░░░░▀▀█▄</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">██░░░░░░░░░░░░░░░░░░░░█░░░░░█░░░░░░░▄▄██</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">░██░░░░░░░░░░░░░░░░░░▄▀░░░░░█░░░░░░░▀▀█▄</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">░▀█░░░░░░█░░░░░░░░░▄█▀░░░░░░█░░░░░░░▄▄██</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">░▄██▄░░░░░▀▀▀▄▄▄▄▀▀░░░░░░░░░█░░░░░░░▀▀█▄</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">░░▀▀▀▀░░░░░░░░░░░░░░░░░░░░░░█▄▄▄▄▄▄▄▄▄██</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░</span></div></pre></div>','perfil-foto-303555970711905-userId-25.jpg','perfil-capa-907946581442958-userId-25.jpeg','2024-10-09 02:56:59'),(26,1,'faa095dd29bbbfd1237c42c37b738e81f50f5a7756d8d3c04fac3c227ad737ce','Thiago','Thiag Lima','pibipax668@skrak.com','4700000000','47000000000','00000000323','00000000','Rua Bonita',0,'cabana','Bairro Bonito','Bonita','SC','$2b$10$dOVZucG0o1Q9M/YVpYGrbuzwtD2o3s6PWGxfy/hs.1GvHxyqDudNm','Tecnologia da Informação','programador node.js','candidato','Olá meu nome é nome e eu quero um emprego','perfil-foto-010968158942723-userId-26.jpg',NULL,'2024-09-30 18:18:40'),(27,0,'81e78cb059a1c9c7709a44a386300e2c6b0f2c5bec77133a7dd7ea44487fc41c','Thiago','Thiag Lima','thiago@gmail.com','4700000000','47000000000','00000000001','00000000','Rua Bonita',0,'cabana','Bairro Bonito','Bonita','SC','$2a$10$Ob3siMmrOt.AsebKqzq1ueHl6MQZiIS/DSxyRDuQcG6Th29ayzy3e','Tecnologia da Informação','abastecedor de linha de produção','candidato',NULL,NULL,NULL,'2024-10-04 00:57:22'),(28,1,'653fd71d3b4b9bbf64292641ea5d5697e0db8c9f1bdbc3a1078e5486abe01091','Thiago','Thiag Lima','cotat19455@adosnan.com','4700000000','47000000000','00000000011','00000000','Rua Bonita',0,'cabana','Bairro Bonito','Bonita','SC','$2a$10$/zoeeTzfPs6lo1lfIWLSMeMjcLdC8bbTdxJXEQyGuGcxKsNO7lOaG','Tecnologia da Informação','programador node.js','candidato',NULL,NULL,NULL,'2024-10-17 19:18:12');
/*!40000 ALTER TABLE `user_candidato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_empresa`
--

DROP TABLE IF EXISTS `user_empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_empresa` (
  `id` int NOT NULL AUTO_INCREMENT,
  `verificado` tinyint(1) DEFAULT '0',
  `token_ativacao` varchar(64) DEFAULT NULL,
  `razao_social` varchar(255) NOT NULL,
  `nome_fantasia` varchar(255) NOT NULL,
  `cnpj` char(14) NOT NULL,
  `inscricao_estadual` varchar(12) DEFAULT NULL,
  `cep` char(8) NOT NULL,
  `endereco` varchar(150) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `complemento` varchar(100) DEFAULT NULL,
  `bairro` varchar(45) NOT NULL,
  `cidade` varchar(45) NOT NULL,
  `estado` char(2) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `celular` varchar(20) DEFAULT NULL,
  `responsavel_legal` varchar(100) NOT NULL,
  `cpf_responsavel` char(11) NOT NULL,
  `contato_responsavel` varchar(100) DEFAULT NULL,
  `senha` varchar(250) NOT NULL,
  `grupo` varchar(7) NOT NULL,
  `descricao` text,
  `foto` varchar(200) DEFAULT NULL,
  `capa` varchar(200) DEFAULT NULL,
  `data_atu` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cnpj` (`cnpj`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_empresa`
--

LOCK TABLES `user_empresa` WRITE;
/*!40000 ALTER TABLE `user_empresa` DISABLE KEYS */;
INSERT INTO `user_empresa` VALUES (1,0,NULL,'Thiago Teste Ltda','Thiago Teste','12345678000195','123456789012','12345678','Rua das Flores','123','Apto 101','Centro','São Paulo','SP','contato@abc.com','(11) 1234-5678','(11) 91234-5678','João Silva','12345678901','(11) 91234-5678','senhaSegura1','empresa',NULL,NULL,NULL,'2024-10-10 00:12:18'),(2,0,NULL,'Empresa XYZ S.A.','XYZ Consultoria','98765432000158','987654321098','87654321','Av. Paulista','456','','Bela Vista','São Paulo','SP','contato@xyz.com','(11) 8765-4321','(11) 98765-4321','Maria Souza','98765432100','(11) 98765-4321','senhaSegura2','empresa',NULL,NULL,NULL,'2024-09-17 05:23:29'),(3,0,NULL,'Tech Innovators Ltda','Tech Innovators','11223344000122','112233445566','11223344','Rua Inovação','789','Bloco B','Tecnologia','Campinas','SP','contato@techinnovators.com','(19) 1234-5678','(19) 91234-5678','Carlos Pereira','22334455677','(19) 91234-5678','senhaSegura3','empresa',NULL,NULL,NULL,'2024-09-17 05:23:29'),(16,0,'a38ddbbd307196efe54e3a98ddcd4da02e98198f79adf1cf35b870d732d7999a','InfoTech S.A.','InfoTech','20117741000164','283759312284','89225785','Rua Ivon Cury','50','Casa','Aventureiro','Joinville','SC','seuemail@gmail.com','4780614657','47997213589','Fulano da Silva','90035392002','ciclano_santos@infotech.com.br','$2b$10$0AcjYRERx6lTFXmahdmAuu7PVQWVtNoE3W2DLxQype3xLEKFjojY6','empresa',NULL,NULL,NULL,'2024-09-24 17:34:39'),(18,1,'72337164ab27329ea11454d7b3f84af0d928a9cbea4b2e3e05caba95beef943d','Thynk AI','Thynk AI','20316433333333','283759312284','89225785','Rua Ivon Cury','50','Casa','Aventureiro','Joinville','SC','contato@thynkai.com.br','(47) 8061-4657','(47) 99721-3589','Fulano da Silva','90035392002','ciclano_santos@infotech.com.br','$2a$10$nwpvKJ4TLibCI5sQUsbBeOFajBiEMt9Sjyv/FJxBzB2K/7.4ETShG','empresa','<h1 style=\"text-align: center;\"><span style=\"letter-spacing: normal; white-space-collapse: collapse;\"><font color=\"#00b3ff\">Bem vindo a Thynk AI</font><br></span></h1><div style=\"font-size: 16px; letter-spacing: normal; white-space-collapse: collapse; color: rgb(33, 33, 33);\"><span style=\"font-weight: bolder; color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; text-align: justify;\"><br></span></div><span style=\"font-size: 16px; letter-spacing: normal; white-space-collapse: collapse; font-weight: bolder; color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; text-align: justify;\">Lorem Ipsum</span><span style=\"font-size: 16px; letter-spacing: normal; white-space-collapse: collapse; color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; text-align: justify;\">&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.&nbsp;</span><i style=\"color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity)); font-size: 16px; letter-spacing: normal; white-space-collapse: collapse;\"><span style=\"font-weight: bolder;\"><span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; text-align: justify;\">Lorem Ipsum</span><span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; text-align: justify;\">&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.&nbsp;</span></span></i><div style=\"font-size: 16px; letter-spacing: normal; white-space-collapse: collapse;\"><span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; text-align: justify;\"><br></span></div><div style=\"font-size: 16px; letter-spacing: normal; white-space-collapse: collapse; text-align: center;\"><span style=\"font-family: &quot;Open Sans&quot;, Arial, sans-serif; text-align: justify;\"><i><font color=\"#ff7b00\">It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</font></i></span></div>','perfil-foto-080961251678973-userId-18.png','perfil-capa-080961251678973-userId-18.png','2024-10-18 00:43:40');
/*!40000 ALTER TABLE `user_empresa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vagas`
--

DROP TABLE IF EXISTS `vagas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vagas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(45) NOT NULL,
  `cep` varchar(9) DEFAULT NULL,
  `cidade` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `contrato` varchar(45) NOT NULL,
  `modalidade` varchar(45) NOT NULL,
  `nivel` varchar(45) DEFAULT NULL,
  `remuneracao` varchar(10) DEFAULT NULL,
  `habilidades_exigidas` json DEFAULT NULL,
  `habilidades_opcionais` json DEFAULT NULL,
  `descricao` text,
  `max_candidaturas` int DEFAULT NULL,
  `id_empresa` int NOT NULL,
  `data_atu` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_empresa` (`id_empresa`),
  CONSTRAINT `vagas_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `user_empresa` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vagas`
--

LOCK TABLES `vagas` WRITE;
/*!40000 ALTER TABLE `vagas` DISABLE KEYS */;
INSERT INTO `vagas` VALUES (4,'Desenvolvedor Junior','87775-435','Mafra','SC','Estágio','Presencial','Júnior','600,00','[\"JavaScript\", \"Vuejs\", \"react\", \"Angular\", \"Uma banheira do gugu\", \"3 soletrando\"]','[\"Boa comunication\"]','A vaga é uma vaga muito boa e precisa ser muito bom para essa vaga. Só quem é muito bom poderá passar nessa vaga, então se você é bom se inscreva nela.',NULL,1,'2024-09-10 07:24:44'),(105,'Analista de Dados','87775-435','Joinville','SC','CLT','Remoto','Júnior','3.000,00','[\"Pacote Office\", \"Lógica de Programação\", \"Trabalho em Equipe\"]','[\"Malabarismo\", \"Conserto de Veículos\", \"Plantar Bananeira\"]','A vaga é uma vaga muito boa e precisa ser muito bom para essa vaga. Só quem é muito bom poderá passar nessa vaga, então se você é bom se inscreva nela.',100,18,'2024-10-14 03:39:42'),(124,'Analista de Dados','87775-435','Joinville','SC','CLT','Remoto','Júnior','3.000,00','[\"Pacote Office\", \"Lógica de Programação\", \"Trabalho em Equipe\"]','[\"Malabarismo\", \"Conserto de Veículos\", \"Plantar Bananeira\"]','A vaga é uma vaga muito boa e precisa ser muito bom para essa vaga. Só quem é muito bom poderá passar nessa vaga, então se você é bom se inscreva nela.',100,18,'2024-10-18 23:05:12');
/*!40000 ALTER TABLE `vagas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-21 18:17:40

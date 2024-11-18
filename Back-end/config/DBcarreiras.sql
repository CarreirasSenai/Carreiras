CREATE DATABASE IF NOT EXISTS `carreiras`;
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
  `relevancia` int DEFAULT NULL,
  `id_vaga` int NOT NULL,
  `data_atu` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_candidato` (`id_candidato`),
  KEY `id_vaga` (`id_vaga`),
  CONSTRAINT `candidatura_ibfk_1` FOREIGN KEY (`id_candidato`) REFERENCES `user_candidato` (`id`) ON DELETE CASCADE,
  CONSTRAINT `candidatura_ibfk_2` FOREIGN KEY (`id_vaga`) REFERENCES `vagas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidatura`
--

LOCK TABLES `candidatura` WRITE;
/*!40000 ALTER TABLE `candidatura` DISABLE KEYS */;
INSERT INTO `candidatura` VALUES (91,28,25,126,'2024-11-18 03:58:26'),(92,28,0,130,'2024-11-18 04:03:19'),(95,25,0,130,'2024-11-18 18:35:50'),(98,25,100,126,'2024-11-18 19:13:49'),(99,25,0,129,'2024-11-18 19:43:00'),(100,25,0,127,'2024-11-18 20:11:47');
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
INSERT INTO `formacao` VALUES (7,'Desenvolvimento de Sistemas','Curso Técnico','Senai Norte Joinville','2019-02','2020-11',25,'2024-09-30 18:20:23'),(8,'Análise e Desenvolvimento de Sistemas','Ensino Superior (Graduação)','UniSenai Norte Joinville','2022-02','2025-12',25,'2024-09-30 18:22:13');
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
INSERT INTO `habilidade` VALUES (5,'[\"vue.js\", \"react\", \"javascript\", \"node.js\", \"mysql\", \"postgresql\", \"bootstrap\", \"html\", \"css\", \"materialui\", \"C#\", \"Pacote Office\", \"Trabalho em Equipe\", \"Lógica de Programação\"]',25,'2024-11-18 19:13:13');
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
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questionario`
--

LOCK TABLES `questionario` WRITE;
/*!40000 ALTER TABLE `questionario` DISABLE KEYS */;
INSERT INTO `questionario` VALUES (34,'discursiva','Fale sobre você','[]',NULL,126,'2024-11-01 23:34:19'),(36,'alternativa','Há quanto tempo você trabalha com C#?','[\"1 ano\", \"1 a 2 anos\", \"Mais de 2 anos\", \"Nunca trabalhei\"]','Mais de 2 anos',127,'2024-11-17 01:51:10'),(37,'discursiva','Fale um pouco sobre você e oque te motiva a vir trabalhar conosco','[]',NULL,127,'2024-11-17 01:52:15'),(38,'alternativa','Há quanto tempo você trabalha com Node.js?','[\"1 a 2 anos\", \"2 a 3 anos\", \"mais que 3 anos\", \"nunca trabalhei\"]','mais que 3 anos',128,'2024-11-17 01:57:57'),(39,'alternativa','Há quanto tempo você trabalha com React?','[\"1 a 2 anos\", \"2 a 3 anos\", \"mais que 3 anos\", \"nunca trabalhei\"]','mais que 3 anos',128,'2024-11-17 01:58:10'),(40,'alternativa','Há quanto tempo você trabalha com Typescript?','[\"1 a 2 anos\", \"2 a 3 anos\", \"mais que 3 anos\", \"nunca trabalhei\"]','mais que 3 anos',128,'2024-11-17 01:58:23'),(41,'alternativa','Há quanto tempo você trabalha com Postgress?','[\"1 a 2 anos\", \"2 a 3 anos\", \"mais que 3 anos\", \"nunca trabalhei\"]','mais que 3 anos',128,'2024-11-17 01:58:31'),(42,'alternativa','Há quanto tempo você trabalha com Cloud Azure?','[\"1 a 2 anos\", \"2 a 3 anos\", \"mais que 3 anos\", \"nunca trabalhei\"]','mais que 3 anos',128,'2024-11-17 01:58:42'),(43,'discursiva','Fale sobre você e toda a sua experiência na tecnologia','[]',NULL,128,'2024-11-17 01:59:15'),(44,'alternativa','Há quanto tempo você trabalha com Js?','[\"4 a 5 anos\", \"5 a 6 anos\", \"mais que 6 anos\", \"menos que 4 anos\"]','mais que 6 anos',129,'2024-11-17 02:03:56'),(45,'alternativa','Há quanto tempo você trabalha com Ts?','[\"4 a 5 anos\", \"5 a 6 anos\", \"mais que 6 anos\", \"menos que 4 anos\"]','mais que 6 anos',129,'2024-11-17 02:04:05'),(46,'alternativa','Há quanto tempo você trabalha com GIT?','[\"4 a 5 anos\", \"5 a 6 anos\", \"mais que 6 anos\", \"menos que 4 anos\"]','mais que 6 anos',129,'2024-11-17 02:04:12'),(47,'alternativa','Há quanto tempo você trabalha com CI/CD?','[\"4 a 5 anos\", \"5 a 6 anos\", \"mais que 6 anos\", \"menos que 4 anos\"]','mais que 6 anos',129,'2024-11-17 02:04:26'),(48,'alternativa','Há quanto tempo você trabalha?','[\"4 a 5 anos\", \"5 a 6 anos\", \"mais que 6 anos\", \"menos que 4 anos\"]','mais que 6 anos',129,'2024-11-17 02:04:36'),(49,'discursiva','Fale sobre a sua tese de Doutorado','[]',NULL,129,'2024-11-17 02:05:20'),(52,'alternativa','Há quanto tempo usa o Jira?','[\"1 a 2 anos\", \"2 a 3 anos\", \"mais de 3 anos\", \"nunca usei\"]','mais de 3 anos',126,'2024-11-17 18:08:49'),(53,'alternativa','Há quanto tempo usa um Computador?','[\"1 a 2 anos\", \"2 a 3 anos\", \"mais de 3 anos\", \"nunca usei\"]','mais de 3 anos',126,'2024-11-17 18:09:11'),(54,'alternativa','Há quanto tempo usa Git?','[\"1 a 2 anos\", \"2 a 3 anos\", \"mais de 3 anos\", \"nunca usei\"]','mais de 3 anos',126,'2024-11-17 18:09:33'),(55,'alternativa','Há quanto tempo usa C#?','[\"1 a 2 anos\", \"2 a 3 anos\", \"mais de 3 anos\", \"nunca usei\"]','mais de 3 anos',126,'2024-11-17 18:09:38');
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
  `id_vaga` int NOT NULL,
  `data_atu` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_questionario` (`id_questionario`),
  KEY `id_candidato` (`id_candidato`),
  KEY `id_vaga` (`id_vaga`),
  CONSTRAINT `questionario_respostas_ibfk_1` FOREIGN KEY (`id_questionario`) REFERENCES `questionario` (`id`) ON DELETE CASCADE,
  CONSTRAINT `questionario_respostas_ibfk_2` FOREIGN KEY (`id_candidato`) REFERENCES `user_candidato` (`id`) ON DELETE CASCADE,
  CONSTRAINT `questionario_respostas_ibfk_3` FOREIGN KEY (`id_vaga`) REFERENCES `vagas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=427 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questionario_respostas`
--

LOCK TABLES `questionario_respostas` WRITE;
/*!40000 ALTER TABLE `questionario_respostas` DISABLE KEYS */;
INSERT INTO `questionario_respostas` VALUES (395,'asdf',34,28,126,'2024-11-18 03:58:26'),(396,'2 a 3 anos',52,28,126,'2024-11-18 03:58:26'),(397,'mais de 3 anos',53,28,126,'2024-11-18 03:58:26'),(398,'1 a 2 anos',54,28,126,'2024-11-18 03:58:26'),(399,'mais de 3 anos',55,28,126,'2024-11-18 03:58:26'),(420,'asdfasdfasdfasdf',34,25,126,'2024-11-18 19:13:49'),(421,'mais de 3 anos',52,25,126,'2024-11-18 19:13:49'),(422,'mais de 3 anos',53,25,126,'2024-11-18 19:13:49'),(423,'mais de 3 anos',54,25,126,'2024-11-18 19:13:49'),(424,'mais de 3 anos',55,25,126,'2024-11-18 19:13:49'),(425,'1 a 2 anos',36,25,127,'2024-11-18 20:11:47'),(426,'asdfasdf',37,25,127,'2024-11-18 20:11:47');
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
INSERT INTO `user_admin` VALUES (1,'super',1,'Super Admin','admin@admin.com','00000000000','$2b$10$5jDcy0sSqqOVE5WWNkGU2OFwsLsOFDusGnQSFjx1HM.IsBCnmQmgq','00000000000','admin',NULL,'2024-10-10 00:30:01'),(3,'adm',1,'Thiago Mau','thiago@gmail.com','11111111111','$2a$10$SZ2JrSM2D4kxnKV1DJ0qbOuQOb739aKazbyLUe.VM2g8QG6iKsnC.','11111111111','admin',NULL,'2024-10-29 20:47:11'),(9,'user',1,'Felipeca','fefe@gmail.com','11111122222','$2b$10$ZhVt8qEspVy3DmPhZIzQi.hZe6F77TYAt6Ptfbsj0sKm/L3j1RYqS','11111111111','admin',NULL,'2024-10-10 00:30:11'),(12,'adm',1,'haha','haha@gmail.com','11113331111','$2b$10$1NFLVx8hUsBWqwM/rHd8Ce.4qCxtyJ2kMr/yuWG0mzfrRxN2IXLhm','11111111111','admin',NULL,'2024-10-02 01:30:01'),(13,'adm',1,'Thiago Mau','ddd@gmail.com','22222334444','$2a$10$.lFRs8zOrD4Nz5y6euMHpePAoRw8hMixUIs7dDwDSc8D7u73/cXnG','11111111111','admin',NULL,'2024-10-02 08:17:51'),(14,'adm',0,'Thiago Mau','mauesckt@gmail.com','11111111112','$2a$10$IX2p2Ymevarm38FtuYkfgOxwd8GLBe9OCmYLeiwEx5Piq5ozb9v2i','11111111111','admin',NULL,'2024-10-13 23:03:10');
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
INSERT INTO `user_candidato` VALUES (25,1,'ae605f546f2b651413dd4ef42bf12307b846ba6e6f883c93af2688ba9e2724e0','Thiago','Thiago Mauesck','mauesckt@gmail.com','(47) 0000-0000','(47) 00000-0000','00000000000','00000000','Rua Bonita',0,'cabana','Bairro Bonito','Bonita','SC','$2a$10$/F9WxjA262hh/euxjvBdP.VBEvMNtCTiijSt0HhxMvLXOFP0WZmGa','Engenharia','programador node.js','candidato','<h1 style=\"text-align: center; white-space-collapse: collapse;\"><span style=\"font-weight: 400; letter-spacing: 0.249999px;\"><i><font color=\"#00ff91\">Me contrata!</font></i></span></h1><div style=\"white-space-collapse: collapse; text-align: center;\"><br></div><div style=\"white-space-collapse: collapse; text-align: center;\"><pre autocapitalize=\"none\" autocomplete=\"off\" autocorrect=\"off\" spellcheck=\"false\" style=\"box-sizing: border-box; margin: 4px; font-size: 16px; overflow-wrap: break-word; scrollbar-width: thin; text-align: left; overflow: auto; min-width: 1em; color: rgb(51, 51, 51); letter-spacing: normal; font-family: -apple-system, BlinkMacSystemFont, &quot;segoe ui&quot;, Roboto, Helvetica, Arial, sans-serif !important;\"><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">░░░░░░░▄▄▀▀▀▀▀▀▀▀▀▀▄▄█▄░░░░▄░░░░█░░░░░░░</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">░░░░░░█▀░░░░░░░░░░░░░▀▀█▄░░░▀░░░░░░░░░▄░</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">░░░░▄▀░░░░░░░░░░░░░░░░░▀██░░░▄▀▀▀▄▄░░▀░░</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">░░▄█▀▄█▀▀▀▀▄░░░░░░▄▀▀█▄░▀█▄░░█▄░░░▀█░░░░</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">░▄█░▄▀░░▄▄▄░█░░░▄▀▄█▄░▀█░░█▄░░▀█░░░░█░░░</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">▄█░░█░░░▀▀▀░█░░▄█░▀▀▀░░█░░░█▄░░█░░░░█░░░</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">██░░░▀▄░░░▄█▀░░░▀▄▄▄▄▄█▀░░░▀█░░█▄░░░█░░░</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">██░░░░░▀▀▀░░░░░░░░░░░░░░░░░░█░▄█░░░░█░░░</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">██░░░░░░░░░░░░░░░░░░░░░█░░░░██▀░░░░█▄░░░</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">██░░░░░░░░░░░░░░░░░░░░░█░░░░█░░░░░░░▀▀█▄</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">██░░░░░░░░░░░░░░░░░░░░█░░░░░█░░░░░░░▄▄██</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">░██░░░░░░░░░░░░░░░░░░▄▀░░░░░█░░░░░░░▀▀█▄</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">░▀█░░░░░░█░░░░░░░░░▄█▀░░░░░░█░░░░░░░▄▄██</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">░▄██▄░░░░░▀▀▀▄▄▄▄▀▀░░░░░░░░░█░░░░░░░▀▀█▄</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">░░▀▀▀▀░░░░░░░░░░░░░░░░░░░░░░█▄▄▄▄▄▄▄▄▄██</span></div><div style=\"text-align: center;\"><span style=\"text-wrap: wrap;\">░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░</span></div></pre></div>','perfil-foto-303555970711905-userId-25.jpg','perfil-capa-907946581442958-userId-25.jpeg','2024-11-17 02:19:36'),(28,1,'653fd71d3b4b9bbf64292641ea5d5697e0db8c9f1bdbc3a1078e5486abe01091','Luquinhas','Lucas santos','cotat19455@adosnan.com','4700000000','47000000000','00000000011','00000000','Rua Bonita',0,'cabana','Bairro Bonito','Bonita','SC','$2a$10$dafpDAi0Z6B0ucx7yXrRxuVGqx/wh2lVkrg6BUuSB.f.DTrJh66Z6','Tecnologia da Informação','analista de sistemas','candidato',NULL,'perfil-foto-432522924559963-userId-28.jpg','perfil-capa-432522924559963-userId-28.jpg','2024-11-17 18:24:03');
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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_empresa`
--

LOCK TABLES `user_empresa` WRITE;
/*!40000 ALTER TABLE `user_empresa` DISABLE KEYS */;
INSERT INTO `user_empresa` VALUES (18,1,'72337164ab27329ea11454d7b3f84af0d928a9cbea4b2e3e05caba95beef943d','Thynk AI','Thynk AI','20316433333333','283759312284','89225785','Rua Ivon Cury','50','Casa','Aventureiro','Joinville','SC','contato@thynkai.com.br','(47) 8061-4657','(47) 99721-3589','Fulano da Silva','90035392002','ciclano_santos@infotech.com.br','$2a$10$nwpvKJ4TLibCI5sQUsbBeOFajBiEMt9Sjyv/FJxBzB2K/7.4ETShG','empresa','<h1 style=\"text-align: center;\"><span style=\"letter-spacing: normal; white-space-collapse: collapse;\"><font color=\"#00b3ff\">Bem vindo a Thynk AI</font><br></span></h1><div style=\"font-size: 16px; letter-spacing: normal; white-space-collapse: collapse; color: rgb(33, 33, 33);\"><span style=\"font-weight: bolder; color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; text-align: justify;\"><br></span></div><span style=\"font-size: 16px; letter-spacing: normal; white-space-collapse: collapse; font-weight: bolder; color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; text-align: justify;\">Lorem Ipsum</span><span style=\"font-size: 16px; letter-spacing: normal; white-space-collapse: collapse; color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; text-align: justify;\">&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.&nbsp;</span><i style=\"color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity)); font-size: 16px; letter-spacing: normal; white-space-collapse: collapse;\"><span style=\"font-weight: bolder;\"><span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; text-align: justify;\">Lorem Ipsum</span><span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; text-align: justify;\">&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.&nbsp;</span></span></i><div style=\"font-size: 16px; letter-spacing: normal; white-space-collapse: collapse;\"><span style=\"color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; text-align: justify;\"><br></span></div><div style=\"font-size: 16px; letter-spacing: normal; white-space-collapse: collapse; text-align: center;\"><span style=\"font-family: &quot;Open Sans&quot;, Arial, sans-serif; text-align: justify;\"><i><font color=\"#ff7b00\">It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</font></i></span></div>','perfil-foto-080961251678973-userId-18.png','perfil-capa-080961251678973-userId-18.png','2024-10-18 00:43:40'),(22,1,'99f2d3dc656f1a20b6ee390ccb9304c8fe44fc0778b65a530635c3c56d0a87ca','Orbido S.A.','Orbido','20177410001643','283759312284','88807278','Rua 3 de Maio','23','Casa','Santa Luzia','Criciúma','SC','orbido@gmail.com','4780614657','47997213589','Fulano da Silva','90035390021','email@orbido.com.br','$2a$10$RgZrsmVlWnGZ.fKNl5D3Uet4KmbzG5Mr0ofwxzfxxCpsoCWkc6kqG','empresa','<p style=\"margin-bottom: 15px; text-align: justify; color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; letter-spacing: normal; white-space-collapse: collapse;\">\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"</p>','perfil-foto-352003465105651-userId-22.png','perfil-capa-352003465105651-userId-22.png','2024-11-17 02:00:48'),(23,1,'5d348ad08dcf465e6abbdc1640d665746d90c5fc9727200a9e6a8a8383db0f0c','Ninja Creative S.A.','Ninja Creative','20117741000164','283759312284','76801974','Avenida Presidente Dutra 2701','50','Casa','Centro','Porto Velho','RO','contato@ninjacreative.com.br','4780614657','47997213589','Fulano da Silva','90035392002','ciclano_santos@infotech.com.br','$2a$10$nm3.WH5migqAsMtlDwwPROzb.jaDTG.Ef5K4TggOjyefeDjMrj/3m','empresa',NULL,'perfil-foto-559438709391489-userId-23.png','perfil-capa-559438709391489-userId-23.png','2024-11-17 01:46:36'),(24,1,'4e62511c03dec57aea905b9dbbc9b59e9107bb22096cd3a3928d0280946095a2','Oneron S.A.','Oneron ','20177410001642','283759312284','76801974','Avenida Presidente Dutra 2701','50','Casa','Centro','Porto Velho','SC','contato@oneron.com.br','4780614657','47997213589','Fulano da Silva','90035392002','ciclano_santos@infotech.com.br','$2a$10$r0.3hVROT4Tk7s5NupiNj.011eI6Bqp/4Npj7J2r88IRCLyZx17M.','empresa','<p style=\"margin-bottom: 15px; text-align: justify; color: rgb(0, 0, 0); font-family: &quot;Open Sans&quot;, Arial, sans-serif; letter-spacing: normal; white-space-collapse: collapse;\">\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"</p><div><br></div>','perfil-foto-751726891682515-userId-24.png','perfil-capa-751726891682515-userId-24.png','2024-11-17 01:54:36');
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
  `status` tinyint DEFAULT NULL,
  `data_atu` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_empresa` (`id_empresa`),
  CONSTRAINT `vagas_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `user_empresa` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vagas`
--

LOCK TABLES `vagas` WRITE;
/*!40000 ALTER TABLE `vagas` DISABLE KEYS */;
INSERT INTO `vagas` VALUES (126,'Analista de Dados','87775-435','Joinville','SC','CLT','Remoto','Júnior','3.000,00','[\"Pacote Office\", \"Lógica de Programação\", \"Trabalho em Equipe\", \"vue.js\", \"react\"]','[\"Malabarismo\", \"Conserto de Veículos\", \"Plantar Bananeira\"]','A vaga é uma vaga muito boa e precisa ser muito bom para essa vaga. Só quem é muito bom poderá passar nessa vaga, então se você é bom se inscreva nela.',3,18,'2024-11-17 20:20:15'),(127,'Programador C# Pleno','87775-435','Joinville','SC','PJ','Remoto','Pleno','4.000,00','[\"c#\", \"programação\", \"inglês\", \"docker\"]','[\"nodejs\", \"php\"]','Junte-se a nós e se torne um ninja da computação! ',100,23,'2024-11-17 02:21:12'),(128,'Desenvolvedor(a) Web ','87775-435','Joinville','SC','CLT','Remoto','Sênior','3.000,00','[\"Cloud Azure\", \"Postgress\", \"Typescript\", \"NodeJS\"]','[\"Malabarismo\", \"Conserto de Veículos\", \"Plantar Bananeira\"]','?‍? ♿️?? Na Oneron, celebramos a diversidade e acreditamos que são as diferentes ideias e perspectivas que nos enriquecem. Portanto, sua cor, religião, gênero, raça, nacionalidade, idade, origem, identidade de gênero, deficiência ou orientação sexual não são barreiras para se juntar à nossa equipe. #VemSerFoursys!\n\n \n\nQue tal se juntar a nós e se tornar um(a) #FourTalent?\n\nEntão se liga nessa oportunidade incrível: ?\n\n \n\nRequisitos\n\nConhecimento Técnico\n\nReact;\nNodeJS;\nTypescript;\nBanco de Dados Postgress;\nCloud Azure. \n \n\nResponsabilidade\n\nCodificar os programas conforme requisitos; Realizar testes unitários e/ou integrados dos programas; Acompanhar a implantação do sistema.\n \n\nE temos o Clube da Four que oferece ótimas vantagens!?\n\n? Assistência médica;\n\n? VR e VA flexível;\n\n?️ Gympass e Wellz;\n\n⚽ Parceria com o SESC;\n\n? Descontos em restaurantes;\n\n? Descontos em cursos técnicos e de ensinos superior;\n\n? Descontos em escolas e plataformas de idiomas.\n\n \n\nE aí, aceita o desafio? Então conclua sua inscrição e #VemSerFoursys! Boa sorte! ?',100,24,'2024-11-17 01:56:26'),(129,'Desenvolvedor Frontend','87775-435','Joinville','SC','CLT','Remoto','Júnior','2.000,00','[\"CI/CD\", \"GIT \", \"Java\", \"Typescript\"]','[\"Jira\", \"Docker\"]','A Orbido é líder global em soluções de tecnologia, com uma equipe de mais de 4.000 colegas em 22 países, fornecendo serviços abrangentes de ponta a ponta em todo o mundo. Temos o compromisso de oferecer um atendimento excepcional ao cliente, para permitir que eles se concentrem em seus principais pontos fortes, enquanto confiam suas necessidades de TI à Orbido. Temos uma oportunidade incrível para você se juntar à nossa equipe, na seguinte vaga: Desenvolvedor Front-end - Remoto.\n\n\n\nO que oferecemos a você\n\n- Assistência médica sem desconto para titulares;\n\n- Assistência odontológica sem desconto para titulares;\n\n- Cartão flex tanto para alimentação quanto refeição;\n\n- Auxílio home office para vaga remota;\n\n- Vale transporte para posições presenciais ou híbridas;\n\n- Auxílio creche;\n\n- Seguro de vida;\n\n- Desconto em terapia: plataforma de apoio psicossocial;\n\n- Parceria com instituições de ensino;\n\n- Parceria com escolas de idiomas;\n\n- Programa de subsídio para aulas de inglês;\n\n- Programa de indicações: prêmio para indicações bem-sucedidas; - Licença maternidade estendida de 180 dias e a licença paternidade de 20 dias;\n\n- Treinamento completo fornecido como parte de um processo de indução robusto, incluindo oportunidades de desenvolvimento contínuo com nossa plataforma de aprendizado online NorthStar, LinkedIn Learning e Udemy, que possui mais de 80.000 cursos disponíveis;\n\n- GetVibes - nosso programa de escuta ativa que nos permite conectar e ouvir feedback de todos os colegas, e como empresa, trabalhamos juntos para elaborar planos de ação para melhorar e desenvolver continuamente a Orbido!\n\n\n\nO que esperar dessa posição:\n\nAtuação no desenvolvimento e melhorias de sistemas bancários.\n\n\n\nO que esperamos de você:\n\nAngular 16+ \nHTML\nCSS\nJavascript/Typescript/Java\nGIT e práticas de CI/CD\nRequisitos Desejáveis\n\n•Metodologia ágeis\n\n\n\nO que fazer em seguida:\n\nCaso você seja a pessoa que estamos procurando, aguarde nosso contato para te conhecermos melhor e siga as instruções durante o processo seletivo. Se você gostaria de fazer alguma pergunta sobre nossas vagas, sobre a Orbido como empresa ou qualquer outra coisa, por favor, não hesite em entrar em contato. A equipe de RH estará disponível no e-mail recrutamento@Orbido.com.',100,22,'2024-11-17 02:02:47'),(130,'Analista de Dados','87775-435','Joinville','SC','CLT','Remoto','Júnior','3.000,00','[]','[]','A vaga é uma vaga muito boa e precisa ser muito bom para essa vaga. Só quem é muito bom poderá passar nessa vaga, então se você é bom se inscreva nela.',100,18,'2024-11-18 04:00:48');
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

-- Dump completed on 2024-11-18 18:20:26

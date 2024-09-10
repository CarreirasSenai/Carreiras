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
  `data_atu` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_empresa` (`id_empresa`),
  KEY `id_candidato` (`id_candidato`),
  CONSTRAINT `agendamento_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `user_empresa` (`id`) ON DELETE CASCADE,
  CONSTRAINT `agendamento_ibfk_2` FOREIGN KEY (`id_candidato`) REFERENCES `user_candidato` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agendamento`
--

LOCK TABLES `agendamento` WRITE;
/*!40000 ALTER TABLE `agendamento` DISABLE KEYS */;
/*!40000 ALTER TABLE `agendamento` ENABLE KEYS */;
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
  `data_atu` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_candidato` (`id_candidato`),
  CONSTRAINT `curso_ibfk_1` FOREIGN KEY (`id_candidato`) REFERENCES `user_candidato` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curso`
--

LOCK TABLES `curso` WRITE;
/*!40000 ALTER TABLE `curso` DISABLE KEYS */;
INSERT INTO `curso` VALUES (2,'Inglês','Papacapin','2024-08','2029-12',13,'2024-09-10 15:21:56');
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
  `atividades` text,
  `contrato` varchar(100) NOT NULL,
  `inicio` varchar(7) NOT NULL,
  `termino` varchar(7) NOT NULL,
  `id_candidato` int NOT NULL,
  `data_atu` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_candidato` (`id_candidato`),
  CONSTRAINT `experiencia_ibfk_1` FOREIGN KEY (`id_candidato`) REFERENCES `user_candidato` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experiencia`
--

LOCK TABLES `experiencia` WRITE;
/*!40000 ALTER TABLE `experiencia` DISABLE KEYS */;
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
  `data_atu` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_candidato` (`id_candidato`),
  CONSTRAINT `formacao_ibfk_1` FOREIGN KEY (`id_candidato`) REFERENCES `user_candidato` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formacao`
--

LOCK TABLES `formacao` WRITE;
/*!40000 ALTER TABLE `formacao` DISABLE KEYS */;
INSERT INTO `formacao` VALUES (47,'Sistemas de Informação','Ensino Superior (Graduação)','Senai','2024-10','2024-12',13,'2024-09-09 05:08:41');
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
  `nome` varchar(100) NOT NULL,
  `id_candidato` int NOT NULL,
  `data_atu` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_candidato` (`id_candidato`),
  CONSTRAINT `habilidade_ibfk_1` FOREIGN KEY (`id_candidato`) REFERENCES `user_candidato` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habilidade`
--

LOCK TABLES `habilidade` WRITE;
/*!40000 ALTER TABLE `habilidade` DISABLE KEYS */;
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
  `data_atu` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
  `data_atu` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
-- Table structure for table `user_admin`
--

DROP TABLE IF EXISTS `user_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(45) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `cpf` char(11) NOT NULL,
  `senha` varchar(250) NOT NULL,
  `celular` varchar(20) DEFAULT NULL,
  `grupo` varchar(5) NOT NULL,
  `data_atu` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_admin`
--

LOCK TABLES `user_admin` WRITE;
/*!40000 ALTER TABLE `user_admin` DISABLE KEYS */;
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
  `data_atu` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `cpf` (`cpf`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_candidato`
--

LOCK TABLES `user_candidato` WRITE;
/*!40000 ALTER TABLE `user_candidato` DISABLE KEYS */;
INSERT INTO `user_candidato` VALUES (11,'Thiago','Thiag Lima','thiago2@gmail.com','4700000000','47000000000','00000000001','00000000','Rua Bonita',0,'cabana','Bairro Bonito','Bonita','SC','$2b$10$u32UGx4c3Xf.5W9iwJBlaOpzCDEwlKEB1uKYSblt9MJvVjeMzUgtO','Tecnologia da Informação','abastecedor de linha de produção','candidato','2024-09-08 02:59:20'),(13,'Thiago','Thiag Lima','thiago@gmail.com','4700000000','47000000000','00000000000','00000000','Rua Bonita',0,'cabana','Bairro Bonito','Bonita','SC','$2b$10$pTHmMxH8IEAeEv7esbAy0OhenqxjX/UoFW7N8afnzNacvqnl5xN4.','Tecnologia da Informação','abastecedor de linha de produção','candidato','2024-09-09 04:00:33');
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
  `contato_responsavel` varchar(20) DEFAULT NULL,
  `senha` varchar(250) NOT NULL,
  `grupo` varchar(7) NOT NULL,
  `data_create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_empresa`
--

LOCK TABLES `user_empresa` WRITE;
/*!40000 ALTER TABLE `user_empresa` DISABLE KEYS */;
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
  `localizacao` text NOT NULL,
  `contrato` varchar(45) NOT NULL,
  `modalidade` varchar(45) NOT NULL,
  `remuneracao` decimal(10,2) DEFAULT NULL,
  `descricao` text NOT NULL,
  `responsabilidades` text,
  `habilidades_exigidas` text,
  `habilidades_extras` text,
  `beneficios` text,
  `id_empresa` int NOT NULL,
  `data_atu` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_empresa` (`id_empresa`),
  CONSTRAINT `vagas_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `user_empresa` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vagas`
--

LOCK TABLES `vagas` WRITE;
/*!40000 ALTER TABLE `vagas` DISABLE KEYS */;
/*!40000 ALTER TABLE `vagas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vagas_candidatadas`
--

DROP TABLE IF EXISTS `vagas_candidatadas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vagas_candidatadas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_vaga` int NOT NULL,
  `data_atu` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_vaga` (`id_vaga`),
  CONSTRAINT `vagas_candidatadas_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user_candidato` (`id`) ON DELETE CASCADE,
  CONSTRAINT `vagas_candidatadas_ibfk_2` FOREIGN KEY (`id_vaga`) REFERENCES `vagas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vagas_candidatadas`
--

LOCK TABLES `vagas_candidatadas` WRITE;
/*!40000 ALTER TABLE `vagas_candidatadas` DISABLE KEYS */;
/*!40000 ALTER TABLE `vagas_candidatadas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vagas_etapas`
--

DROP TABLE IF EXISTS `vagas_etapas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vagas_etapas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `data_inicio` date NOT NULL,
  `data_termino` date NOT NULL,
  `id_vaga` int NOT NULL,
  `id_empresa` int NOT NULL,
  `data_atu` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_vaga` (`id_vaga`),
  KEY `id_empresa` (`id_empresa`),
  CONSTRAINT `vagas_etapas_ibfk_1` FOREIGN KEY (`id_vaga`) REFERENCES `vagas` (`id`) ON DELETE CASCADE,
  CONSTRAINT `vagas_etapas_ibfk_2` FOREIGN KEY (`id_empresa`) REFERENCES `user_empresa` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vagas_etapas`
--

LOCK TABLES `vagas_etapas` WRITE;
/*!40000 ALTER TABLE `vagas_etapas` DISABLE KEYS */;
/*!40000 ALTER TABLE `vagas_etapas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-10 20:08:10

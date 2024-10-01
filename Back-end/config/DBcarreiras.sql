create database carreiras;
use carreiras;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

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

CREATE DATABASE IF NOT EXISTS `carreiras`;
USE `carreiras`;

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_admin`
--

LOCK TABLES `user_admin` WRITE;
/*!40000 ALTER TABLE `user_admin` DISABLE KEYS */;
INSERT INTO `user_admin` VALUES (1,'super',1,'Super Admin','admin@admin.com','00000000000','$2b$10$5jDcy0sSqqOVE5WWNkGU2OFwsLsOFDusGnQSFjx1HM.IsBCnmQmgq','(00)00000-0000','admin',NULL,'2024-09-30 21:02:44');
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_candidato`
--

LOCK TABLES `user_candidato` WRITE;
/*!40000 ALTER TABLE `user_candidato` DISABLE KEYS */;
INSERT INTO `user_candidato` VALUES (25,1,'ae605f546f2b651413dd4ef42bf12307b846ba6e6f883c93af2688ba9e2724e0','Thiagoo','Thiag Lima','mauesckt@gmail.com','(47) 0000-0000','(47) 00000-0000','00000000000','00000000','Rua Bonita',0,'cabana','Bairro Bonito','Bonita','SC','$2b$10$CbXB085hKBrYixwnUYMKYuP0bku5j9PnIP6EYYlWOo0rz91NlYMeq','Engenharia','programador php','candidato','<h1><span style=\"font-weight: bolder; white-space-collapse: collapse;\">Olá, tudo bem?</span></h1><div style=\"white-space-collapse: collapse;\"><br></div><div style=\"white-space-collapse: collapse;\">Meu nome é Thiago, eu sou desenvolvedor Full Stack com ênfase na criação de aplicações web utilizando node.js.</div><div style=\"white-space-collapse: collapse;\"><br></div><div style=\"white-space-collapse: collapse;\">Veja meu portfólio -&gt;&nbsp;<font color=\"#0055ff\">https://mauesck.github.io/portfolio/</font></div>','perfil-foto-303555970711905-userId-25.jpg','perfil-capa-907946581442958-userId-25.jpeg','2024-09-30 18:26:40'),(26,1,'faa095dd29bbbfd1237c42c37b738e81f50f5a7756d8d3c04fac3c227ad737ce','Thiago','Thiag Lima','pibipax668@skrak.com','4700000000','47000000000','00000000323','00000000','Rua Bonita',0,'cabana','Bairro Bonito','Bonita','SC','$2b$10$dOVZucG0o1Q9M/YVpYGrbuzwtD2o3s6PWGxfy/hs.1GvHxyqDudNm','Tecnologia da Informação','programador node.js','candidato','Olá meu nome é nome e eu quero um emprego','perfil-foto-010968158942723-userId-26.jpg',NULL,'2024-09-30 18:18:40');
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_empresa`
--

LOCK TABLES `user_empresa` WRITE;
/*!40000 ALTER TABLE `user_empresa` DISABLE KEYS */;
INSERT INTO `user_empresa` VALUES (1,0,NULL,'Empresa ABC Ltda','ABC Soluções','12345678000195','123456789012','12345678','Rua das Flores','123','Apto 101','Centro','São Paulo','SP','contato@abc.com','(11) 1234-5678','(11) 91234-5678','João Silva','12345678901','(11) 91234-5678','senhaSegura1','empresa',NULL,NULL,NULL,'2024-09-17 05:23:29'),(2,0,NULL,'Empresa XYZ S.A.','XYZ Consultoria','98765432000158','987654321098','87654321','Av. Paulista','456','','Bela Vista','São Paulo','SP','contato@xyz.com','(11) 8765-4321','(11) 98765-4321','Maria Souza','98765432100','(11) 98765-4321','senhaSegura2','empresa',NULL,NULL,NULL,'2024-09-17 05:23:29'),(3,0,NULL,'Tech Innovators Ltda','Tech Innovators','11223344000122','112233445566','11223344','Rua Inovação','789','Bloco B','Tecnologia','Campinas','SP','contato@techinnovators.com','(19) 1234-5678','(19) 91234-5678','Carlos Pereira','22334455677','(19) 91234-5678','senhaSegura3','empresa',NULL,NULL,NULL,'2024-09-17 05:23:29'),(16,0,'a38ddbbd307196efe54e3a98ddcd4da02e98198f79adf1cf35b870d732d7999a','InfoTech S.A.','InfoTech','20117741000164','283759312284','89225785','Rua Ivon Cury','50','Casa','Aventureiro','Joinville','SC','seuemail@gmail.com','4780614657','47997213589','Fulano da Silva','90035392002','ciclano_santos@infotech.com.br','$2b$10$0AcjYRERx6lTFXmahdmAuu7PVQWVtNoE3W2DLxQype3xLEKFjojY6','empresa',NULL,NULL,NULL,'2024-09-24 17:34:39'),(18,1,'72337164ab27329ea11454d7b3f84af0d928a9cbea4b2e3e05caba95beef943d','InfoTech S.A.','InfoTech','20316433333333','283759312284','89225785','Rua Ivon Cury','50','Casa','Aventureiro','Joinville','SC','pibipax668@skrak.com','4780614657','47997213589','Fulano da Silva','90035392002','ciclano_santos@infotech.com.br','$2b$10$quM8UwdkdXXdFLdDPuxCReUla2k4Nrm/Z7E.bFbmGChVQSJdRMwru','empresa','adfasdfasdf',NULL,NULL,'2024-09-30 16:29:19');
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
  `etapas` json DEFAULT NULL,
  `questionario` json DEFAULT NULL,
  `id_empresa` int NOT NULL,
  `data_atu` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_empresa` (`id_empresa`),
  CONSTRAINT `vagas_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `user_empresa` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vagas`
--

LOCK TABLES `vagas` WRITE;
/*!40000 ALTER TABLE `vagas` DISABLE KEYS */;
INSERT INTO `vagas` VALUES (4,'Desenvolvedor Junior','87775-435','Mafra','SC','Estágio','Presencial','Júnior','600,00','[\"JavaScript\", \"Vuejs\", \"react\", \"Angular\", \"Uma banheira do gugu\", \"3 soletrando\"]','[\"Boa comunication\"]','A vaga é uma vaga muito boa e precisa ser muito bom para essa vaga. Só quem é muito bom poderá passar nessa vaga, então se você é bom se inscreva nela.','[\"Entrevista\", \"Desafio\", \"Call com Líder\", \"Acordo\"]','[\"Há quantos anos você usa Excel no trabalho?\", \"Fale sobre um projeto desafiador.\"]',1,'2024-09-10 07:24:44'),(10,'Analista de Dados','87775-435','Joinville','SC','CLT','Remoto','Júnior','3.000,00','[\"Pacote Office\", \"Lógica de Programação\", \"Trabalho em Equipe\"]','[\"Malabarismo\", \"Conserto de Veículos\"]','A vaga é uma vaga muito boa e precisa ser muito bom para essa vaga. Só quem é muito bom poderá passar nessa vaga, então se você é bom se inscreva nela.','[\"Entrevista\", \"Desafio\", \"Call com Líder\", \"Acordo\"]','[\"Há quantos anos você usa Excel no trabalho?\", \"Fale sobre um projeto desafiador.\"]',1,'2024-09-18 16:04:36'),(11,'Analista de Python','87775-435','Joinville','SC','CLT','Remoto','Júnior','3.000,00','[\"Pacote Office\", \"Lógica de Programação\", \"Trabalho em Equipe\"]','[\"Malabarismo\", \"Conserto de Veículos\", \"Plantar Bananeira\"]','A vaga é uma vaga muito boa e precisa ser muito bom para essa vaga. Só quem é muito bom poderá passar nessa vaga, então se você é bom se inscreva nela.','[\"Entrevista\", \"Desafio\", \"Call com Líder\", \"Acordo\"]','[\"Há quantos anos você usa Excel no trabalho?\", \"Fale sobre um projeto desafiador.\"]',2,'2024-09-01 07:24:44'),(12,'Gente como a Gente','87775-435','Joinville','SC','CLT','Remoto','Júnior','3.000,00','[\"Pacote Office\", \"Lógica de Programação\", \"Trabalho em Equipe\"]','[\"Malabarismo\", \"Conserto de Veículos\", \"Plantar Bananeira\"]','A vaga é uma vaga muito boa e precisa ser muito bom para essa vaga. Só quem é muito bom poderá passar nessa vaga, então se você é bom se inscreva nela.','[\"Entrevista\", \"Desafio\", \"Call com Líder\", \"Acordo\"]','[\"Há quantos anos você usa Excel no trabalho?\", \"Fale sobre um projeto desafiador.\"]',2,'2024-09-18 16:34:49'),(14,'Tech Lider','87775-435','Jaragua','SC','CLT','Remoto','Júnior','3.000,00','[\"Pacote Office\", \"Lógica de Programação\", \"Trabalho em Equipe\"]','[\"Malabarismo\", \"Conserto de Veículos\", \"Plantar Bananeira\"]','A vaga é uma vaga muito boa e precisa ser muito bom para essa vaga. Só quem é muito bom poderá passar nessa vaga, então se você é bom se inscreva nela.','[\"Entrevista\", \"Desafio\", \"Call com Líder\", \"Acordo\"]','[\"Há quantos anos você usa Excel no trabalho?\", \"Fale sobre um projeto desafiador.\"]',2,'2024-09-19 06:05:58'),(15,'Analista de Dados','87775-435','Joinville','SC','CLT','Remoto','Júnior','3.000,00','[\"Pacote Office\", \"Lógica de Programação\", \"Trabalho em Equipe\"]','[\"Malabarismo\", \"Conserto de Veículos\", \"Plantar Bananeira\"]','A vaga é uma vaga muito boa e precisa ser muito bom para essa vaga. Só quem é muito bom poderá passar nessa vaga, então se você é bom se inscreva nela.','[\"Entrevista\", \"Desafio\", \"Call com Líder\", \"Acordo\"]','[\"Há quantos anos você usa Excel no trabalho?\", \"Fale sobre um projeto desafiador.\"]',18,'2024-09-24 17:47:01'),(16,'Analista de Dados','87775-435','Joinville','SC','CLT','Remoto','Júnior','3.000,00','[\"Pacote Office\", \"Lógica de Programação\", \"Trabalho em Equipe\"]','[\"Malabarismo\", \"Conserto de Veículos\", \"Plantar Bananeira\"]','A vaga é uma vaga muito boa e precisa ser muito bom para essa vaga. Só quem é muito bom poderá passar nessa vaga, então se você é bom se inscreva nela.','[\"Entrevista\", \"Desafio\", \"Call com Líder\", \"Acordo\"]','[\"Há quantos anos você usa Excel no trabalho?\", \"Fale sobre um projeto desafiador.\"]',18,'2024-09-24 17:47:06');
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
  `data_atu` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
  `id_vaga` int NOT NULL,
  `id_empresa` int NOT NULL,
  `data_atu` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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

-- Dump completed on 2024-09-30 18:38:11

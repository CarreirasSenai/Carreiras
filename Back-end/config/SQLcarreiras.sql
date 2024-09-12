create database carreiras;
use carreiras;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

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
  `descricao` varchar(1000),
  `foto` varchar(200),
  `capa` varchar(200),
  `data_atu` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `cpf` (`cpf`)
);

CREATE TABLE `formacao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `nivel` varchar(100) NOT NULL,
  `lugar` varchar(100) NOT NULL,
  `inicio` varchar(7) DEFAULT NULL,
  `termino` varchar(7) DEFAULT NULL,
  `id_candidato` int NOT NULL,
  `data_atu` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_candidato` (`id_candidato`),
  CONSTRAINT `formacao_ibfk_1` FOREIGN KEY (`id_candidato`) REFERENCES `user_candidato` (`id`) ON DELETE CASCADE
);

CREATE TABLE `curso` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `lugar` varchar(100) NOT NULL,
  `inicio` varchar(7) NOT NULL,
  `termino` varchar(7) NOT NULL,
  `id_candidato` int NOT NULL,
  `data_atu` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_candidato` (`id_candidato`),
  CONSTRAINT `curso_ibfk_1` FOREIGN KEY (`id_candidato`) REFERENCES `user_candidato` (`id`) ON DELETE CASCADE
);

CREATE TABLE `experiencia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cargo` varchar(100) NOT NULL,
  `empresa` varchar(100) NOT NULL,
  `atividades` text,
  `contrato` varchar(100) NOT NULL,
  `inicio` varchar(7) NOT NULL,
  `termino` varchar(7) NOT NULL,
  `id_candidato` int NOT NULL,
  `data_atu` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_candidato` (`id_candidato`),
  CONSTRAINT `experiencia_ibfk_1` FOREIGN KEY (`id_candidato`) REFERENCES `user_candidato` (`id`) ON DELETE CASCADE
);

CREATE TABLE `habilidade` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `id_candidato` int NOT NULL,
  `data_atu` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_candidato` (`id_candidato`),
  CONSTRAINT `habilidade_ibfk_1` FOREIGN KEY (`id_candidato`) REFERENCES `user_candidato` (`id`) ON DELETE CASCADE
);

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
  `descricao` varchar(1000),
  `foto` varchar(200),
  `capa` varchar(200),
  `data_atu` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cnpj` (`cnpj`),
  UNIQUE KEY `email` (`email`)
);

CREATE TABLE `agendamento` (
  `id` int NOT NULL AUTO_INCREMENT, 
  `titulo` varchar(100) NOT NULL,
  `vaga` varchar(45) NOT NULL,
  `data` date NOT NULL,
  `hora` time NOT NULL,
  `id_empresa` int NOT NULL,
  `id_candidato` int NOT NULL,
  `data_atu` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_empresa` (`id_empresa`),
  KEY `id_candidato` (`id_candidato`),
  CONSTRAINT `agendamento_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `user_empresa` (`id`) ON DELETE CASCADE,
  CONSTRAINT `agendamento_ibfk_2` FOREIGN KEY (`id_candidato`) REFERENCES `user_candidato` (`id`) ON DELETE CASCADE
);

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
  `data_atu` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_empresa` (`id_empresa`),
  CONSTRAINT `vagas_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `user_empresa` (`id`) ON DELETE CASCADE
);

CREATE TABLE `vagas_etapas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `data_inicio` date NOT NULL,
  `data_termino` date NOT NULL,
  `id_vaga` int NOT NULL,
  `id_empresa` int NOT NULL,
  `data_atu` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_vaga` (`id_vaga`),
  KEY `id_empresa` (`id_empresa`),
  CONSTRAINT `vagas_etapas_ibfk_1` FOREIGN KEY (`id_vaga`) REFERENCES `vagas` (`id`) ON DELETE CASCADE,
  CONSTRAINT `vagas_etapas_ibfk_2` FOREIGN KEY (`id_empresa`) REFERENCES `user_empresa` (`id`) ON DELETE CASCADE
);

CREATE TABLE `perfil` (
  `id` int NOT NULL,
  `descricao` varchar(1000) DEFAULT NULL,
  `foto` text,
  `capa` text,
  `id_candidato` int DEFAULT NULL,
  `id_empresa` int DEFAULT NULL,
  `data_atu` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `perfil_ibfk_1` (`id_candidato`),
  KEY `perfil_ibfk_2` (`id_empresa`),
  CONSTRAINT `perfil_ibfk_1` FOREIGN KEY (`id_candidato`) REFERENCES `user_candidato` (`id`) ON DELETE CASCADE,
  CONSTRAINT `perfil_ibfk_2` FOREIGN KEY (`id_empresa`) REFERENCES `user_empresa` (`id`) ON DELETE CASCADE
);

CREATE TABLE `vagas_candidatadas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_vaga` int NOT NULL,
  `data_atu` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_vaga` (`id_vaga`),
  CONSTRAINT `vagas_candidatadas_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user_candidato` (`id`) ON DELETE CASCADE,
  CONSTRAINT `vagas_candidatadas_ibfk_2` FOREIGN KEY (`id_vaga`) REFERENCES `vagas` (`id`) ON DELETE CASCADE
);

CREATE TABLE `user_admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(45) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `cpf` char(11) NOT NULL,
  `senha` varchar(250) NOT NULL,
  `celular` varchar(20) DEFAULT NULL,
  `grupo` varchar(5) NOT NULL,
  `descricao` varchar(1000),
  `foto` varchar(200),
  `capa` varchar(200),
  `data_atu` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE `mensagem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(45) DEFAULT NULL,
  `assunto` text NOT NULL,
  `envio` datetime NOT NULL,
  `id_empresa` int NOT NULL,
  `id_candidato` int NOT NULL,
  `data_atu` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_empresa` (`id_empresa`),
  KEY `id_candidato` (`id_candidato`),
  CONSTRAINT `mensagem_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `user_empresa` (`id`) ON DELETE CASCADE,
  CONSTRAINT `mensagem_ibfk_2` FOREIGN KEY (`id_candidato`) REFERENCES `user_candidato` (`id`) ON DELETE CASCADE
);


CREATE DATABASE guipress;

USE guipress;

CREATE TABLE `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `categoryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
);
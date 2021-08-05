------------------ CREATE DATABASE -----------------------
CREATE DATABASE groupomania;

------------------ CREATE TABLES -----------------------
------------------ CREATE users -----------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `password` varchar(80) NOT NULL,
  `admin` tinyint(2) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

------------------ CREATE posts -----------------------
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `userId` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` varchar(400) NOT NULL,
  `publicationDate` DATE NOT NULL,
  `author` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

------------------ CREATE comments -----------------------
CREATE TABLE `comments` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `userId` int(10) UNSIGNED NOT NULL,
  `postId` int(10) UNSIGNED NOT NULL,
  `date` DATETIME NOT NULL,
  `content` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

------------------ CREATE ADMIN -----------------------
INSERT INTO `users` (`firstName`, `lastName`, `password`, `email`, `admin`) VALUES
('Admin', 'Admin', '$2b$10$QuYnDuCybMIOT6rO/ArrM.IGcpsDvhiwqj/4zsFBDLHAcpwdcXSYm', 'admin@admin.com', 1);

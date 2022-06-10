-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           10.4.24-MariaDB - mariadb.org binary distribution
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour reseau_social
DROP DATABASE IF EXISTS `reseau_social`;
CREATE DATABASE IF NOT EXISTS `reseau_social` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `reseau_social`;


-- Listage de la structure de table reseau_social. images2
DROP TABLE IF EXISTS `images2`;
CREATE TABLE IF NOT EXISTS `images2` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image_url` varbinary(100) NOT NULL,
  `post_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4;

-- Listage des données de la table reseau_social.images2 : ~8 rows (environ)
INSERT INTO `images2` (`id`, `image_url`, `post_id`) VALUES
	(16, _binary 0x67697068792e676966313635343735393239313434342e676966, 53),
	(17, _binary 0x69636f6e2d6c6566742d666f6e742d726563616472652e706e67313635343735393637323936372e706e67, 60),
	(23, _binary 0x67697068792e676966313635343834393332373939362e676966, 72),
	(24, _binary 0x67697068792e676966313635343834393635393731352e676966, 73),
	(25, _binary 0x526f746174696e675f65617274685f286c61726765292e676966313635343836373331353138322e676966, 76),
	(26, _binary 0x526f746174696e675f65617274685f286c61726765292e676966313635343837353031363434312e676966, 77),
	(27, _binary 0x526f746174696e675f65617274685f286c61726765292e676966313635343837373236333231382e676966, 78),
	(28, _binary 0x526f746174696e675f65617274685f286c61726765292e676966313635343837373332323634362e676966, 79);



-- Listage de la structure de table reseau_social. likes2
DROP TABLE IF EXISTS `likes2`;
CREATE TABLE IF NOT EXISTS `likes2` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8mb4;

-- Listage des données de la table reseau_social.likes2 : ~34 rows (environ)
INSERT INTO `likes2` (`id`, `post_id`, `user_id`) VALUES
	(56, 34, 4),
	(57, 44, 9),
	(58, 45, 3),
	(59, 46, 3),
	(60, 34, 3),
	(61, 48, 3),
	(63, 49, 11),
	(64, 50, 11),
	(65, 34, 11),
	(69, 50, 9),
	(70, 49, 3),
	(72, 52, 9),
	(73, 53, 11),
	(74, 53, 12),
	(75, 54, 12),
	(76, 59, 13),
	(77, 53, 13),
	(78, 54, 13),
	(79, 60, 9),
	(80, 54, 9),
	(81, 53, 9),
	(85, 54, 14),
	(87, 62, 11),
	(90, 59, 9),
	(91, 59, 14),
	(92, 60, 14),
	(95, 54, 11),
	(99, 64, 12),
	(101, 67, 11),
	(107, 73, 25),
	(108, 61, 25),
	(109, 73, 9),
	(114, 74, 26);


-- Listage de la structure de table reseau_social. posts2
DROP TABLE IF EXISTS `posts2`;
CREATE TABLE IF NOT EXISTS `posts2` (
  `author_firstname` varchar(50) NOT NULL,
  `author_lastname` varchar(50) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(500) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date_creation` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4;

-- Listage des données de la table reseau_social.posts2 : ~5 rows (environ)
INSERT INTO `posts2` (`author_firstname`, `author_lastname`, `id`, `message`, `user_id`, `date_creation`) VALUES
	('Jean-Paul', 'Dupuis', 53, 'Hello !!', 11, '2022-06-09 09:21:31'),
	('Quinn', 'Joanna', 54, 'Génial la nouvelle cantine ! On y mange super bien.', 12, '2022-06-09 09:23:09'),
	('Heloise', 'Miron', 59, 'On oublie pas l\'anniversaire de Jean-Paul demain !', 13, '2022-06-09 09:26:57'),
	('Admin', 'Admin', 60, 'Voici le nouveau logo du groupe !', 9, '2022-06-09 09:27:52'),
	('Richard', 'Lebrun', 61, 'A tous, merci de bien changer les recharges de l\'imprimante.\r\nMerci et bonne journée! ', 14, '2022-06-09 09:31:24');

-- Listage de la structure de table reseau_social. users2
DROP TABLE IF EXISTS `users2`;
CREATE TABLE IF NOT EXISTS `users2` (
  `user_id` int(200) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(50) NOT NULL,
  `user_lastname` varchar(50) NOT NULL,
  `user_firstname` varchar(100) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  `user_admin` tinyint(4) DEFAULT 0,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_email` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4;

-- Listage des données de la table reseau_social.users2 : ~8 rows (environ)
INSERT INTO `users2` (`user_id`, `user_email`, `user_lastname`, `user_firstname`, `user_password`, `user_admin`) VALUES
	(3, 'test5@test5.fr', 'test', 'test', '$2b$10$Swzl9/v3LdfhU9l.rW6GJ.NthmIe2uN0OoCI6x1BZ7SOC5o68bc/a', 0),
	(8, 'Jeanfritz@hotmail.com', 'Fritz', 'Jean', '$2b$10$XkBehGKMfCGLCFFFOSwP0.48n1V.RwD1WV/KcYU7juPPhDnKOqL6.', 0),
	(9, 'Admin@admin.fr', 'Admin', 'Admin', '$2b$10$1.ICVI1sMhEF02LZf3tiv.88Uw9pgmJAIZWdDkqhflfJG44OxaaZ.', 1),
	(11, 'JeanPaul@sfr.fr', 'Dupuis', 'Jean-Paul', '$2b$10$gxYB1u1YRjDcK7HVDyoCpOA8pz0JtpphBS0LhhLE0OwvgxJTcEUc.', 0),
	(12, 'QuinnJoanna@sfr.fr', 'Joanna', 'Quinn', '$2b$10$ANe2CBSOoqjzPe0MAncN/OrBjxrLCMSTCDAN6KLSNZcCzzURxAVYO', 0),
	(13, 'MironHeloise@sfr.fr', 'Miron', 'Heloise', '$2b$10$S9OvRLmQYiYP6NfuHdPrPeZNOGuBfQxIj1HmC3ezb6jkyduL2xFOq', 0),
	(14, 'LebrunRichard@sfr.fr', 'Lebrun', 'Richard', '$2b$10$AzILeXShopEWZM/At5jtG.bQidb3Em1VIcibGoSU57l19lRk4rn5W', 0);




/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

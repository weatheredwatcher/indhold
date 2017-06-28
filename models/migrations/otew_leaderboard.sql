CREATE TABLE `leaderboard` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `description` text,
  `container` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `orderis` mediumint(9) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
